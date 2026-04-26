#!/usr/bin/env node
/**
 * Hex-color audit for inline-styles drift.
 *
 * Reports raw hex literals (#RGB, #RRGGBB, #RRGGBBAA) used in guide and
 * component source files. Per-guide accent colors in meta.ts files are
 * legitimate — they define the guide's identity — and are excluded.
 *
 * The signal worth tracking: are body colors / surface tints drifting away
 * from src/styles/tokens.ts, or staying disciplined? When token migration
 * lands later (Phase 3+), this baseline shows where the work concentrates.
 *
 * Run with `npm run audit:hex`. Report-only — does not fail the build.
 *
 * If you want to ratchet (fail when any file's count goes UP from baseline):
 *   1. Run `node scripts/audit-hex-colors.cjs --snapshot` to write
 *      .audit/hex-baseline.json
 *   2. Wire `node scripts/audit-hex-colors.cjs --check` into validate.
 *   3. The check command will exit 1 if any file regresses.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const AUDIT_DIR = path.join(ROOT, '.audit');
const BASELINE_PATH = path.join(AUDIT_DIR, 'hex-baseline.json');

const SCAN_DIRS = [path.join(SRC, 'guides'), path.join(SRC, 'components')];
const HEX_PATTERN = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;

const args = process.argv.slice(2);
const mode = args.includes('--snapshot') ? 'snapshot' :
             args.includes('--check') ? 'check' : 'report';

function walk(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, out);
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      // meta.ts files define the legitimate per-guide accent colors —
      // exclude. We're auditing inline body/surface usage, not identity.
      if (entry === 'meta.ts') continue;
      out.push(full);
    }
  }
}

function countHexInFile(file) {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = content.match(HEX_PATTERN);
  return matches ? matches.length : 0;
}

function collect() {
  const files = [];
  for (const d of SCAN_DIRS) walk(d, files);
  files.sort();

  const counts = {};
  let total = 0;
  for (const f of files) {
    const rel = path.relative(ROOT, f);
    const n = countHexInFile(f);
    counts[rel] = n;
    total += n;
  }
  return { counts, total };
}

function readBaseline() {
  if (!fs.existsSync(BASELINE_PATH)) return null;
  return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf-8'));
}

function writeBaseline(data) {
  if (!fs.existsSync(AUDIT_DIR)) fs.mkdirSync(AUDIT_DIR, { recursive: true });
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function reportTopOffenders(counts) {
  const sorted = Object.entries(counts)
    .filter(([, n]) => n > 0)
    .sort(([, a], [, b]) => b - a);
  const top = sorted.slice(0, 20);
  console.log('');
  console.log('Top 20 files by hex-literal count:');
  for (const [rel, n] of top) {
    console.log(`  ${String(n).padStart(4)}  ${rel}`);
  }
  console.log('');
  const filesWithAny = sorted.length;
  console.log(`Files with at least one hex literal: ${filesWithAny}`);
}

function main() {
  const { counts, total } = collect();
  console.log('');
  console.log('Hex-color audit');
  console.log('===============');
  console.log(`Total raw hex literals across ${Object.keys(counts).length} scanned files: ${total}`);

  if (mode === 'snapshot') {
    writeBaseline({ counts, total, capturedAt: new Date().toISOString() });
    console.log(`Baseline written to ${path.relative(ROOT, BASELINE_PATH)}.`);
    return;
  }

  if (mode === 'check') {
    const baseline = readBaseline();
    if (!baseline) {
      console.error('No baseline found. Run with --snapshot to create one.');
      process.exit(1);
    }
    let regressions = 0;
    for (const [file, n] of Object.entries(counts)) {
      const prev = baseline.counts[file] ?? 0;
      if (n > prev) {
        console.error(`  REGRESSION: ${file} had ${prev}, now has ${n}`);
        regressions++;
      }
    }
    if (regressions > 0) {
      console.error(`FAILED: ${regressions} file(s) regressed against baseline.`);
      process.exit(1);
    }
    console.log('No regressions vs baseline.');
    return;
  }

  // Default: report only.
  reportTopOffenders(counts);
  console.log('Run with --snapshot to capture a baseline, or --check to fail on regressions.');
}

main();
