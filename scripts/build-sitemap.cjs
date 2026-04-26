#!/usr/bin/env node
/**
 * Build-time sitemap + robots.txt generator.
 *
 * Run after `vite build` to produce dist/sitemap.xml.
 * (dist/robots.txt comes from public/robots.txt — Vite copies it automatically.)
 *
 * Usage: node scripts/build-sitemap.cjs
 * Env:   PELIGLOT_SITE_URL — override base URL (default: https://peliglot.com)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

const BASE_URL = (process.env.PELIGLOT_SITE_URL || 'https://peliglot.com').replace(/\/$/, '');
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ---------------------------------------------------------------------------
// Read active slugs from router.tsx (single source of truth)
// ---------------------------------------------------------------------------
const routerContent = fs.readFileSync(path.join(SRC, 'router.tsx'), 'utf-8');
const slugMatch = routerContent.match(/const guideSlugs\s*(?::[^=]+)?\s*=\s*\[([\s\S]*?)\]/);
if (!slugMatch) {
  console.error('ERROR: Could not parse guideSlugs from src/router.tsx');
  process.exit(1);
}

const slugs = [];
const quoteRegex = /['"]([^'"]+)['"]/g;
let m;
while ((m = quoteRegex.exec(slugMatch[1])) !== null) {
  slugs.push(m[1]);
}

if (slugs.length === 0) {
  console.error('ERROR: No slugs found in guideSlugs array');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// For each slug, parse the guide ids from meta.ts (same pattern as validate-guides.cjs)
// ---------------------------------------------------------------------------
function getGuideIds(slug) {
  const dir = path.join(SRC, 'guides', slug);
  const metaPath = fs.existsSync(path.join(dir, 'meta.ts'))
    ? path.join(dir, 'meta.ts')
    : path.join(dir, 'meta.js');
  if (!fs.existsSync(metaPath)) return [];

  const content = fs.readFileSync(metaPath, 'utf-8');
  const ids = [];
  const idRegex = /\{\s*id:\s*(\d+)/g;
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    ids.push(parseInt(match[1], 10));
  }
  return ids;
}

// ---------------------------------------------------------------------------
// Build XML
// ---------------------------------------------------------------------------
function urlEntry(loc) {
  return '  <url>\n    <loc>' + loc + '</loc>\n    <lastmod>' + TODAY + '</lastmod>\n  </url>';
}

var entries = [];

// Landing page
entries.push(urlEntry(BASE_URL + '/'));

// Supporters / donation page
entries.push(urlEntry(BASE_URL + '/support'));

// Each collection page + per-guide hash URLs
for (var i = 0; i < slugs.length; i++) {
  var slug = slugs[i];
  entries.push(urlEntry(BASE_URL + '/guides/' + slug));

  var ids = getGuideIds(slug);
  for (var j = 0; j < ids.length; j++) {
    // Hash fragments: id is 1-based in meta; URL hash is (id - 1) following useGuideNavigation convention
    entries.push(urlEntry(BASE_URL + '/guides/' + slug + '#' + (ids[j] - 1)));
  }
}

var xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
].concat(entries).concat(['</urlset>']).join('\n');

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------
if (!fs.existsSync(DIST)) {
  console.error('ERROR: dist/ directory not found at ' + DIST + '. Run vite build first.');
  process.exit(1);
}

var sitemapPath = path.join(DIST, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf-8');

console.log('Sitemap written: ' + sitemapPath);
console.log('  Base URL: ' + BASE_URL);
console.log('  Slugs: ' + slugs.join(', '));
console.log('  Total URLs: ' + entries.length);
