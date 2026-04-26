#!/usr/bin/env node
/**
 * check-orthography.cjs
 *
 * Scans guide source files for U+0027 APOSTROPHE used in place of the correct
 * Unicode characters for two language collections:
 *
 *   Hawaiian: ʻokina should be U+02BB (ʻ), not U+0027 (')
 *     Rule: flag ' when the character immediately before AND after are both
 *     in the Hawaiian letter set [aeiouāēīōūhklmnpwAEIOUĀĒĪŌŪHKLMNPW].
 *
 *   Arabic (Latin transliteration): ʿayn and hamza should be U+02BF/U+02BE,
 *     not U+0027 (').
 *     Rule: flag ' when both neighbors are in the Latin-extended Arabic
 *     transliteration set [āīūḥḍṣṭẓʿʾaeiouAEIOU].
 *
 * Both-neighbor requirement means English contractions in instructional prose
 * ("don't", "it's") are NOT flagged because the non-language neighbor (e.g.
 * 'n', 't') is not in the language class.
 *
 * Usage:
 *   node scripts/check-orthography.cjs
 *
 * Exit codes:
 *   0 — no violations
 *   1 — one or more violations found
 *
 * DO NOT wire into `npm run validate` until the Hawaiian + Arabic sweeps
 * (Phases 3 + 4) have cleared the existing violations.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Character classes ────────────────────────────────────────────────────────

// Hawaiian: vowels (including macronised), consonants used in modern Hawaiian.
const HAW_CLASS = new Set('aeiouāēīōūhklmnpwAEIOUĀĒĪŌŪHKLMNPW');

// Arabic Latin transliteration: basic vowels + macronised vowels +
// emphatic/pharyngeal consonants in transliteration + correct ʿ/ʾ characters
// (the correct chars won't trigger the rule since we only check for U+0027).
const AR_CLASS = new Set('aeiouāīūAEIOUĀĪŪḥḍṣṭẓʿʾ');

// ── File discovery ───────────────────────────────────────────────────────────

const guidesRoot = path.join(__dirname, '..', 'src', 'guides');

/**
 * Returns [{slug, collection}] pairs to check.
 * Currently we only lint Hawaiian and Arabic.
 */
function getTargetFiles() {
  const targets = [];
  const collections = [
    { slug: 'hawaiian', charClass: HAW_CLASS },
    { slug: 'arabic',   charClass: AR_CLASS  },
  ];

  for (const { slug, charClass } of collections) {
    const dir = path.join(guidesRoot, slug);
    if (!fs.existsSync(dir)) continue;

    // meta.js / meta.ts
    for (const metaName of ['meta.ts', 'meta.js']) {
      const metaFile = path.join(dir, metaName);
      if (fs.existsSync(metaFile)) { targets.push({ file: metaFile, charClass, slug }); break; }
    }

    // guides/*.jsx / *.tsx / *.js / *.ts
    const guidesDir = path.join(dir, 'guides');
    if (fs.existsSync(guidesDir)) {
      for (const f of fs.readdirSync(guidesDir)) {
        if (f.endsWith('.jsx') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.ts')) {
          targets.push({ file: path.join(guidesDir, f), charClass, slug });
        }
      }
    }
  }

  return targets;
}

// ── Violation detection ──────────────────────────────────────────────────────

/**
 * Scan a single file for U+0027 violations using `charClass`.
 * Returns an array of { line, col, context } objects.
 */
function scanFile(filePath, charClass) {
  const src = fs.readFileSync(filePath, 'utf8');
  const lines = src.split('\n');
  const violations = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    for (let col = 0; col < line.length; col++) {
      if (line[col] !== "'") continue; // U+0027

      const prev = col > 0 ? line[col - 1] : null;
      const next = col < line.length - 1 ? line[col + 1] : null;

      if (prev && next && charClass.has(prev) && charClass.has(next)) {
        const start = Math.max(0, col - 10);
        const end   = Math.min(line.length, col + 11);
        const context = line.slice(start, end).replace(/\n/g, '↵');
        violations.push({ line: lineIdx + 1, col: col + 1, context });
      }
    }
  }

  return violations;
}

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const targets = getTargetFiles();
  let totalViolations = 0;
  const bySlug = {};

  for (const { file, charClass, slug } of targets) {
    const violations = scanFile(file, charClass);
    if (violations.length === 0) continue;

    if (!bySlug[slug]) bySlug[slug] = 0;
    bySlug[slug] += violations.length;
    totalViolations += violations.length;

    const relPath = path.relative(path.join(__dirname, '..'), file);
    for (const v of violations) {
      console.log(`${relPath}:${v.line}:${v.col}: U+0027 apostrophe in ${slug} context — "${v.context}"`);
    }
  }

  if (totalViolations === 0) {
    console.log('check-orthography: no violations found.');
    process.exit(0);
  } else {
    console.log('');
    console.log('Summary:');
    for (const [slug, count] of Object.entries(bySlug)) {
      console.log(`  ${slug}: ${count} violation${count === 1 ? '' : 's'}`);
    }
    console.log(`  Total: ${totalViolations}`);
    console.log('');
    console.log('Fix: replace U+0027 (\') with:');
    console.log("  Hawaiian: U+02BB (ʻ) — ʻokina");
    console.log("  Arabic:   U+02BF (ʿ) for ʿayn, U+02BE (ʾ) for hamza");
    process.exit(1);
  }
}

main();
