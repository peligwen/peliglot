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
    // Check that /support URL is present
    if (!sitemapContent.includes('/support')) {
      console.error('ERROR: dist/sitemap.xml missing URL for /support');
      errors++;
    }

    // Check that /analytics URL is present
    if (!sitemapContent.includes('/analytics')) {
      console.error('ERROR: dist/sitemap.xml missing URL for /analytics');
      errors++;
    }

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
      console.log('sitemap.xml OK (' + urlCount + ' URLs, ' + slugs.length + ' slugs covered, /support and /analytics included)');
    }
  }
}

// ---------------------------------------------------------------------------
// Check OG images (Phase 1.3)
// Reads first 24 bytes of each PNG to verify IHDR width+height = 1200x630.
// ---------------------------------------------------------------------------
var OG_DIR = path.join(DIST, 'og');

function checkPngDimensions(filePath) {
  // PNG IHDR: 8-byte signature + 4-byte length + 4-byte 'IHDR' + 4-byte width + 4-byte height
  // Width at byte offset 16, height at byte offset 20 (big-endian uint32)
  try {
    var buf = Buffer.alloc(24);
    var fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buf, 0, 24, 0);
    fs.closeSync(fd);
    // PNG signature check: first 8 bytes
    if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4E || buf[3] !== 0x47) {
      return { ok: false, reason: 'not a valid PNG (bad signature)' };
    }
    var width = buf.readUInt32BE(16);
    var height = buf.readUInt32BE(20);
    return { ok: true, width: width, height: height };
  } catch (e) {
    return { ok: false, reason: e.message };
  }
}

if (!fs.existsSync(OG_DIR)) {
  console.error('ERROR: dist/og/ not found. Run `npm run build` (which runs prebuild) first.');
  errors++;
} else {
  // Check site card
  var siteOgPath = path.join(OG_DIR, 'site.png');
  if (!fs.existsSync(siteOgPath)) {
    console.error('ERROR: dist/og/site.png not found.');
    errors++;
  } else {
    var siteCheck = checkPngDimensions(siteOgPath);
    if (!siteCheck.ok) {
      console.error('ERROR: dist/og/site.png is invalid: ' + siteCheck.reason);
      errors++;
    } else if (siteCheck.width !== 1200 || siteCheck.height !== 630) {
      console.error('ERROR: dist/og/site.png wrong dimensions: ' + siteCheck.width + 'x' + siteCheck.height + ' (expected 1200x630)');
      errors++;
    } else {
      console.log('og/site.png OK (' + siteCheck.width + 'x' + siteCheck.height + ')');
    }
  }

  // Check one card per collection slug
  var ogErrors = 0;
  for (var k = 0; k < slugs.length; k++) {
    var ogSlug = slugs[k];
    var ogPath = path.join(OG_DIR, ogSlug + '.png');
    if (!fs.existsSync(ogPath)) {
      console.error('ERROR: dist/og/' + ogSlug + '.png not found.');
      ogErrors++;
      errors++;
    } else {
      var ogCheck = checkPngDimensions(ogPath);
      if (!ogCheck.ok) {
        console.error('ERROR: dist/og/' + ogSlug + '.png invalid: ' + ogCheck.reason);
        ogErrors++;
        errors++;
      } else if (ogCheck.width !== 1200 || ogCheck.height !== 630) {
        console.error('ERROR: dist/og/' + ogSlug + '.png wrong dimensions: ' + ogCheck.width + 'x' + ogCheck.height);
        ogErrors++;
        errors++;
      }
    }
  }
  if (ogErrors === 0) {
    console.log('og/<slug>.png OK (' + slugs.length + ' collection cards, all 1200x630)');
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
