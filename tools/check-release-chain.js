#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function read(p){return fs.readFileSync(path.join(process.cwd(), p), 'utf8');}
function fail(msg){console.error('FAIL:', msg); process.exitCode = 1;}
function ok(msg){console.log('OK:', msg);}

const files = {
  readme: read('README.md'),
  bots: read('bots.txt'),
  governance: read('governance-summary.json'),
  handoff: read('docs/successor-builder-handoff-and-job-docket.md'),
  log: read('docs/builder-version-log.md')
};

const match = files.governance.match(/"current_implemented_build"\s*:\s*"([^"]+)"/);
if(!match){fail('governance-summary.json does not include current_implemented_build'); process.exit(1);}
const current = match[1];

for (const [name, content] of Object.entries(files)) {
  if (!content.includes(current)) fail(`${name} does not include current build: ${current}`);
  else ok(`${name} includes ${current}`);
}

if(!process.exitCode) ok('Release chain appears aligned.');
