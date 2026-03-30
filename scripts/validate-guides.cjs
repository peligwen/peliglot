#!/usr/bin/env node
/**
 * Validate guide structure: ensures all guide collections are consistent
 * with router registration, meta entries, and file counts.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');

let errors = 0;
const results = [];

// Extract guideSlugs from router.jsx
const routerContent = fs.readFileSync(path.join(SRC, 'router.jsx'), 'utf-8');
const slugMatch = routerContent.match(/const guideSlugs\s*=\s*\[([\s\S]*?)\]/);
if (!slugMatch) {
  console.error('ERROR: Could not parse guideSlugs from src/router.jsx');
  process.exit(1);
}

const slugs = slugMatch[1].match(/'([^']+)'/g).map(s => s.replace(/'/g, ''));

// Check LandingPage references
const landingContent = fs.readFileSync(path.join(SRC, 'LandingPage.jsx'), 'utf-8');

for (const slug of slugs) {
  const dir = path.join(SRC, 'guides', slug);
  const row = { slug, dir: '✓', meta: '-', index: '-', barrel: '-', metaCount: 0, fileCount: 0, landing: '-', ok: true };

  // Check directory
  if (!fs.existsSync(dir)) {
    row.dir = '✗';
    row.ok = false;
    errors++;
    results.push(row);
    continue;
  }

  // Check meta.js
  const metaPath = path.join(dir, 'meta.js');
  if (fs.existsSync(metaPath)) {
    const metaContent = fs.readFileSync(metaPath, 'utf-8');
    const matches = metaContent.match(/\{\s*id:/g);
    row.metaCount = matches ? matches.length : 0;
    row.meta = row.metaCount > 0 ? '✓' : '✗';
    if (row.metaCount === 0) { row.ok = false; errors++; }
  } else {
    row.meta = '✗';
    row.ok = false;
    errors++;
  }

  // Check index.jsx
  row.index = fs.existsSync(path.join(dir, 'index.jsx')) ? '✓' : '✗';
  if (row.index === '✗') { row.ok = false; errors++; }

  // Check components.jsx (barrel)
  row.barrel = fs.existsSync(path.join(dir, 'components.jsx')) ? '✓' : '✗';
  if (row.barrel === '✗') { row.ok = false; errors++; }

  // Count guide files in guides/ subdirectory
  const guidesDir = path.join(dir, 'guides');
  if (fs.existsSync(guidesDir)) {
    const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.jsx') && f !== '_helpers.jsx');
    row.fileCount = files.length;
  }

  // Check meta count vs file count
  if (row.metaCount > 0 && row.fileCount > 0 && row.metaCount !== row.fileCount) {
    row.ok = false;
    errors++;
  }

  // Check LandingPage reference
  row.landing = landingContent.includes(slug) ? '✓' : '✗';
  if (row.landing === '✗') { row.ok = false; errors++; }

  results.push(row);
}

// Print summary table
console.log('');
console.log('Guide Validation Results');
console.log('========================');
console.log('');
console.log(
  'Slug'.padEnd(16) +
  'Dir  Meta Index Barrel Landing  Meta# Files#  Status'
);
console.log('-'.repeat(72));

for (const r of results) {
  const status = r.ok ? 'OK' : 'FAIL';
  console.log(
    r.slug.padEnd(16) +
    `${r.dir}    ${r.meta}    ${r.index}     ${r.barrel}      ${r.landing}        ${String(r.metaCount).padStart(3)}   ${String(r.fileCount).padStart(3)}   ${status}`
  );
}

console.log('');
if (errors > 0) {
  console.error(`FAILED: ${errors} error(s) found.`);
  process.exit(1);
} else {
  console.log(`All ${slugs.length} guide collections validated successfully.`);
}
