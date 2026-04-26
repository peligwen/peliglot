#!/usr/bin/env node
/**
 * SEO artifact validator.
 *
 * Checks that dist/robots.txt and dist/sitemap.xml exist and are well-formed.
 * Skips silently (with a note) when dist/ does not exist — safe to run during
 * pure linting before a build has occurred.
 *
 * During `npm run check`, build runs before validate, so dist/ will be present.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

// ---------------------------------------------------------------------------
// Early exit if dist/ doesn't exist
// ---------------------------------------------------------------------------
if (!fs.existsSync(DIST)) {
  console.log('validate-seo: dist/ not found — skipping SEO artifact checks (run build first).');
  process.exit(0);
}

let errors = 0;

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

// ---------------------------------------------------------------------------
// Check robots.txt
// ---------------------------------------------------------------------------
const robotsPath = path.join(DIST, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  console.error('ERROR: dist/robots.txt not found.');
  errors++;
} else {
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
  if (!robotsContent.includes('Sitemap:')) {
    console.error('ERROR: dist/robots.txt does not contain a Sitemap: line.');
    errors++;
  } else {
    console.log('robots.txt OK');
  }
}

// ---------------------------------------------------------------------------
// Check sitemap.xml
// ---------------------------------------------------------------------------
const sitemapPath = path.join(DIST, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('ERROR: dist/sitemap.xml not found.');
  errors++;
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

  // Basic XML structure check
  if (!sitemapContent.startsWith('<?xml') || !sitemapContent.includes('<urlset')) {
    console.error('ERROR: dist/sitemap.xml does not appear to be valid XML.');
    errors++;
  } else {
    // Check that each active slug has at least one <url> entry
    var missingSlug = false;
    for (var i = 0; i < slugs.length; i++) {
      var slug = slugs[i];
      if (!sitemapContent.includes('/guides/' + slug)) {
        console.error('ERROR: dist/sitemap.xml missing URL for slug: ' + slug);
        errors++;
        missingSlug = true;
      }
    }

    // Count <url> elements
    var urlCount = (sitemapContent.match(/<url>/g) || []).length;
    if (urlCount === 0) {
      console.error('ERROR: dist/sitemap.xml contains no <url> elements.');
      errors++;
    } else if (!missingSlug) {
      console.log('sitemap.xml OK (' + urlCount + ' URLs, ' + slugs.length + ' slugs covered)');
    }
  }
}

// ---------------------------------------------------------------------------
// Result
// ---------------------------------------------------------------------------
if (errors > 0) {
  console.error('SEO validation FAILED: ' + errors + ' error(s).');
  process.exit(1);
} else {
  console.log('SEO validation passed.');
}
