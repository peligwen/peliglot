#!/usr/bin/env node
/**
 * Generic guide splitter — extracts GuideN functions from a monolithic components.jsx
 * into individual guideN.jsx files + _helpers.jsx + barrel components.jsx.
 *
 * Usage: node scripts/split-guides.js <slug>
 *
 * Requirements:
 * - src/guides/<slug>/components.jsx must exist (monolithic)
 * - Will create src/guides/<slug>/guides/ directory with individual files
 */

const fs = require('fs');
const path = require('path');

const slug = process.argv[2];
if (!slug) { console.error('Usage: node scripts/split-guides.js <slug>'); process.exit(1); }

const srcDir = path.join(__dirname, '..', 'src', 'guides', slug);
const compFile = path.join(srcDir, 'components.jsx');
const guidesDir = path.join(srcDir, 'guides');

if (!fs.existsSync(compFile)) { console.error(`File not found: ${compFile}`); process.exit(1); }

const src = fs.readFileSync(compFile, 'utf8');
const lines = src.split('\n');

// 1. Parse imports (lines starting with 'import')
const importLines = [];
let importEnd = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('import ')) {
    importLines.push(lines[i]);
    importEnd = i + 1;
  } else if (importLines.length > 0 && lines[i].trim() === '') {
    continue; // skip blank lines between imports
  } else if (importLines.length > 0) {
    break;
  }
}

// 2. Find all function boundaries (GuideN and helpers)
const funcRanges = []; // {name, start, end, isGuide, guideNum}
const dataRanges = []; // {name, start, end}

// Find all top-level function declarations and const declarations
for (let i = importEnd; i < lines.length; i++) {
  const line = lines[i];

  // Match: function Name( or function Name () — top-level only (no leading spaces except possible empty)
  const funcMatch = line.match(/^function\s+(\w+)\s*\(/);
  if (funcMatch) {
    const name = funcMatch[1];
    const isGuide = /^Guide\d+$/.test(name);
    const guideNum = isGuide ? parseInt(name.replace('Guide', '')) : -1;
    funcRanges.push({ name, start: i, end: -1, isGuide, guideNum });
    continue;
  }

  // Match: const name = ... (top-level data)
  const constMatch = line.match(/^const\s+(\w+)\s*=/);
  if (constMatch && constMatch[1] !== 'guideComponents') {
    dataRanges.push({ name: constMatch[1], start: i, end: -1 });
  }

  // Match: export const guideComponents — this is the barrel export, marks end of content
  if (line.startsWith('export const guideComponents')) {
    break;
  }
}

// Calculate end lines for functions (each function ends where the next top-level thing starts)
const allStarts = [...funcRanges.map(f => f.start), ...dataRanges.map(d => d.start)].sort((a, b) => a - b);

for (const f of funcRanges) {
  const nextStart = allStarts.find(s => s > f.start);
  // Walk backwards from nextStart to skip blank lines and comments
  let end = nextStart !== undefined ? nextStart - 1 : lines.length - 1;
  while (end > f.start && lines[end].trim() === '') end--;
  f.end = end;
}

for (const d of dataRanges) {
  const nextStart = allStarts.find(s => s > d.start);
  let end = nextStart !== undefined ? nextStart - 1 : lines.length - 1;
  while (end > d.start && lines[end].trim() === '') end--;
  d.end = end;
}

// 3. Identify which data constants belong to which guide
// A data constant "belongs" to a guide if it's referenced in the guide body
function getBody(range) {
  return lines.slice(range.start, range.end + 1).join('\n');
}

// 4. Identify helper functions (non-Guide functions)
const helpers = funcRanges.filter(f => !f.isGuide);
const guides = funcRanges.filter(f => f.isGuide).sort((a, b) => a.guideNum - b.guideNum);

console.log(`Found ${guides.length} guides, ${helpers.length} helpers, ${dataRanges.length} data constants`);

// 5. Determine which data constants are used by each guide vs shared
const dataUsage = new Map(); // dataName -> Set of guide names that use it
for (const d of dataRanges) {
  dataUsage.set(d.name, new Set());
}
for (const g of guides) {
  const body = getBody(g);
  for (const d of dataRanges) {
    if (body.includes(d.name)) {
      dataUsage.get(d.name).add(g.name);
    }
  }
}
// Also check if helpers use data constants
for (const h of helpers) {
  const body = getBody(h);
  for (const d of dataRanges) {
    if (body.includes(d.name)) {
      dataUsage.get(d.name).add(`helper:${h.name}`);
    }
  }
}

// Data used by multiple guides or by helpers → goes to _helpers.jsx
// Data used by exactly one guide → goes into that guide's file
const sharedData = [];
const guideSpecificData = new Map(); // guideName -> [dataRange]

for (const d of dataRanges) {
  const users = dataUsage.get(d.name);
  const guideUsers = [...users].filter(u => !u.startsWith('helper:'));
  const helperUsers = [...users].filter(u => u.startsWith('helper:'));

  if (helperUsers.length > 0 || guideUsers.length > 1) {
    sharedData.push(d);
  } else if (guideUsers.length === 1) {
    const gName = guideUsers[0];
    if (!guideSpecificData.has(gName)) guideSpecificData.set(gName, []);
    guideSpecificData.get(gName).push(d);
  } else {
    // Unused data — check if it immediately precedes a guide
    const nextFunc = funcRanges.find(f => f.start > d.end);
    if (nextFunc && nextFunc.isGuide) {
      const gName = nextFunc.name;
      if (!guideSpecificData.has(gName)) guideSpecificData.set(gName, []);
      guideSpecificData.get(gName).push(d);
    } else {
      sharedData.push(d); // fallback: put in helpers
    }
  }
}

// 6. Determine imports needed by each guide file
// Parse the original imports to create a lookup
const importMap = new Map(); // symbol -> import line
for (const imp of importLines) {
  // Match: import { Foo, Bar } from '...'  or  import { Foo as Bar } from '...'
  const m = imp.match(/import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/);
  if (m) {
    const symbols = m[1].split(',').map(s => s.trim());
    const from = m[2];
    for (const sym of symbols) {
      const parts = sym.split(/\s+as\s+/);
      const imported = parts[0].trim();
      const local = (parts[1] || parts[0]).trim();
      importMap.set(local, { imported, local, from });
    }
  }
}

// Helper names set
const helperNames = new Set(helpers.map(h => h.name));
const sharedDataNames = new Set(sharedData.map(d => d.name));

function resolveImports(body, isHelper = false) {
  const neededImports = new Map(); // from -> [{imported, local}]
  const neededHelpers = new Set();

  for (const [local, info] of importMap) {
    // Check if symbol is used in body (word boundary match)
    const re = new RegExp(`\\b${local.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
    if (re.test(body)) {
      // Adjust path: ../../ -> ../../../ for files in guides/ subdirectory
      let from = info.from;
      if (from.startsWith('../../')) {
        from = '../' + from; // ../../ -> ../../../
      }
      if (!neededImports.has(from)) neededImports.set(from, []);
      const entry = info.imported === info.local ? info.local : `${info.imported} as ${info.local}`;
      if (!neededImports.get(from).find(e => e === entry)) {
        neededImports.get(from).push(entry);
      }
    }
  }

  // Check if body uses helper functions or shared data
  if (!isHelper) {
    for (const h of helperNames) {
      const re = new RegExp(`\\b${h}\\b`);
      if (re.test(body)) neededHelpers.add(h);
    }
    for (const d of sharedDataNames) {
      const re = new RegExp(`\\b${d}\\b`);
      if (re.test(body)) neededHelpers.add(d);
    }
  }

  // Build import strings
  const importStrs = [];

  // React imports first
  for (const [from, symbols] of neededImports) {
    if (from === 'react') {
      importStrs.unshift(`import { ${symbols.join(', ')} } from '${from}';`);
    }
  }

  // Other imports
  for (const [from, symbols] of neededImports) {
    if (from !== 'react') {
      importStrs.push(`import { ${symbols.join(', ')} } from '${from}';`);
    }
  }

  // Helper imports
  if (neededHelpers.size > 0) {
    importStrs.push(`import { ${[...neededHelpers].join(', ')} } from './_helpers';`);
  }

  return importStrs;
}

// 7. Create guides directory
fs.mkdirSync(guidesDir, { recursive: true });

// 8. Write _helpers.jsx
if (helpers.length > 0 || sharedData.length > 0) {
  let helpersBody = '';
  for (const d of sharedData) {
    helpersBody += lines.slice(d.start, d.end + 1).join('\n') + '\n\n';
  }
  for (const h of helpers) {
    helpersBody += lines.slice(h.start, h.end + 1).join('\n') + '\n\n';
  }

  // Add 'export' to functions and constants that don't have it
  helpersBody = helpersBody.replace(/^(function\s+)/gm, 'export $1');
  helpersBody = helpersBody.replace(/^(const\s+)/gm, 'export $1');

  const helperImports = resolveImports(helpersBody, true);
  const helpersContent = helperImports.join('\n') + (helperImports.length ? '\n\n' : '') + helpersBody.trimEnd() + '\n';
  fs.writeFileSync(path.join(guidesDir, '_helpers.jsx'), helpersContent);
  console.log(`  _helpers.jsx written (${helpers.length} helpers, ${sharedData.length} shared data)`);
}

// 9. Write each guideN.jsx
for (const g of guides) {
  const specificData = guideSpecificData.get(g.name) || [];

  // Build the guide body: data constants + function
  let body = '';
  for (const d of specificData) {
    body += lines.slice(d.start, d.end + 1).join('\n') + '\n\n';
  }
  body += lines.slice(g.start, g.end + 1).join('\n') + '\n';

  // Add export to the function if missing
  body = body.replace(new RegExp(`^function\\s+${g.name}\\s*\\(`), `export function ${g.name}(`);
  // Also handle case where export is already there
  if (!body.includes(`export function ${g.name}`)) {
    body = body.replace(new RegExp(`^(function\\s+${g.name})`, 'm'), `export $1`);
  }

  const imports = resolveImports(body);
  const content = imports.join('\n') + (imports.length ? '\n\n' : '') + body.trimEnd() + '\n';

  const fileName = `guide${g.guideNum}.jsx`;
  fs.writeFileSync(path.join(guidesDir, fileName), content);
}
console.log(`  ${guides.length} guide files written`);

// 10. Write barrel components.jsx
let barrel = '';
for (const g of guides) {
  barrel += `import { ${g.name} } from './guides/guide${g.guideNum}';\n`;
}
barrel += '\nexport const guideComponents = [\n';
const guideNames = guides.map(g => g.name);
// Group 10 per line
for (let i = 0; i < guideNames.length; i += 10) {
  const chunk = guideNames.slice(i, i + 10);
  barrel += '  ' + chunk.join(', ') + ',\n';
}
barrel += '];\n';
fs.writeFileSync(compFile, barrel);
console.log(`  components.jsx barrel written`);

console.log('Done!');
