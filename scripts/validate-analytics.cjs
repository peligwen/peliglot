#!/usr/bin/env node
/**
 * Analytics transparency validator.
 *
 * Greps the source tree for known third-party hostnames and fails the build
 * if any of them appear in code without a matching mention in
 * docs/analytics.md. The intent is to keep the privacy promise honest: every
 * external domain the site contacts must be enumerated in the transparency
 * doc before it can ship.
 *
 * To add a new third-party domain to the project:
 *   1. Add the hostname (or a fragment of it) to KNOWN_DOMAINS below.
 *   2. Add an entry to docs/analytics.md describing what loads from that host.
 *   3. Update src/AnalyticsPage.tsx to mirror the doc change.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DOCS = path.join(ROOT, 'docs');
const ANALYTICS_MD = path.join(DOCS, 'analytics.md');
const ANALYTICS_TSX = path.join(SRC, 'AnalyticsPage.tsx');
const INDEX_HTML = path.join(ROOT, 'index.html');
const VITE_CONFIG = path.join(ROOT, 'vite.config.ts');

// Known domains that the site contacts at runtime. Substring + case-insensitive.
const KNOWN_DOMAINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'ko-fi.com',
  'static.cloudflareinsights.com',
  'cloudflareinsights.com',
  // BYOK: contacted only when the user explicitly tests their own API key
  'api.anthropic.com',
  'api.openai.com',
];

// Hostnames that may appear in code but are not actually contacted. Comments,
// schema.org URIs, the project's own host, and well-known references the
// transparency doc doesn't need to enumerate.
const NON_RUNTIME_HOSTS = [
  'peliglot.com',
  'localhost',
  '127.0.0.1',
  'example.com',
  'schema.org',         // JSON-LD type URIs, never fetched
  'opengraph.xyz',      // referenced in PR description, not fetched
  'cloudflare.com',     // human-facing dashboard link
  'github.com',         // links in the analytics page
  'anthropic.com',      // commit metadata (non-api subdomain)
  'claude.com',         // commit metadata
  'w3.org',             // SVG XML namespace strings, not fetched
  'irs.gov',            // educational citation in math/guide29
  // BYOK placeholder/example URLs — never fetched by production code
  'ts.net',             // Tailscale example URLs in BYOK UI copy and tests
  'trycloudflare.com',  // Cloudflare quick tunnels — trusted-host suffix in BYOK
  'my-home-server.local', // example hostname in test
  'your-tunnel',        // placeholder URL fragment in UI copy
  'corp.internal',      // example "untrusted" host in trustedHosts tests
];

const TRANSPARENCY_FILES = [ANALYTICS_MD, ANALYTICS_TSX];
const SCAN_PATHS = [SRC, INDEX_HTML, VITE_CONFIG];

function walk(p, out) {
  const stat = fs.statSync(p);
  if (stat.isFile()) {
    if (p.endsWith('.ts') || p.endsWith('.tsx') || p.endsWith('.html') ||
        p.endsWith('.js') || p.endsWith('.cjs')) {
      out.push(p);
    }
    return;
  }
  if (stat.isDirectory()) {
    if (p.endsWith('node_modules') || p.endsWith('.git')) return;
    for (const entry of fs.readdirSync(p)) walk(path.join(p, entry), out);
  }
}

function findReferences(domain, files) {
  const lc = domain.toLowerCase();
  const hits = [];
  for (const f of files) {
    const content = fs.readFileSync(f, 'utf-8').toLowerCase();
    if (content.includes(lc)) hits.push(f);
  }
  return hits;
}

function main() {
  const files = [];
  for (const p of SCAN_PATHS) {
    if (fs.existsSync(p)) walk(p, files);
  }

  const codeFiles = files.filter(f => !TRANSPARENCY_FILES.includes(f));

  const docContent = TRANSPARENCY_FILES
    .map(f => (fs.existsSync(f) ? fs.readFileSync(f, 'utf-8').toLowerCase() : ''))
    .join('\n');

  let errors = 0;
  console.log('');
  console.log('Analytics transparency check');
  console.log('============================');
  for (const domain of KNOWN_DOMAINS) {
    const referencedIn = findReferences(domain, codeFiles);
    const documented = docContent.includes(domain.toLowerCase());

    if (referencedIn.length === 0) {
      console.log(`  [-] ${domain}: not referenced in code (skip)`);
      continue;
    }
    if (documented) {
      console.log(`  [+] ${domain}: referenced in ${referencedIn.length} file(s), documented`);
    } else {
      console.error(`  [!] ${domain}: referenced in ${referencedIn.length} file(s) but NOT documented`);
      for (const f of referencedIn) {
        console.error(`        ${path.relative(ROOT, f)}`);
      }
      errors++;
    }
  }

  // Detect previously-unknown third-party hosts. Use String.matchAll so we
  // collect every URL match without the noisy iterative regex pattern.
  const urlRe = /https?:\/\/([a-z0-9.-]+\.[a-z]{2,})/gi;
  const seen = new Map();
  for (const f of codeFiles) {
    const content = fs.readFileSync(f, 'utf-8');
    for (const match of content.matchAll(urlRe)) {
      const host = match[1].toLowerCase();
      if (NON_RUNTIME_HOSTS.some(h => host.includes(h))) continue;
      if (KNOWN_DOMAINS.some(d => host.includes(d.toLowerCase()))) continue;
      if (!seen.has(host)) seen.set(host, new Set());
      seen.get(host).add(f);
    }
  }

  if (seen.size > 0) {
    console.error('');
    console.error('Unknown third-party host(s) detected — add to KNOWN_DOMAINS or NON_RUNTIME_HOSTS:');
    for (const [host, fileSet] of seen) {
      console.error(`  ${host}`);
      for (const f of fileSet) console.error(`    ${path.relative(ROOT, f)}`);
    }
    errors += seen.size;
  }

  console.log('');
  if (errors > 0) {
    console.error(`FAILED: ${errors} privacy-doc gap(s) found.`);
    process.exit(1);
  }
  console.log('All known third-party domains are documented in docs/analytics.md.');
}

main();
