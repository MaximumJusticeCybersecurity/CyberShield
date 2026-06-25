import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const failures = [];
const passes = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function expect(condition, message) {
  if (condition) passes.push(message);
  else failures.push(message);
}

function includes(file, text, message = `${file} includes ${text}`) {
  expect(read(file).includes(text), message);
}

function excludes(file, text, message = `${file} excludes ${text}`) {
  expect(!read(file).includes(text), message);
}

function checkInlineModules(file) {
  const html = read(file);
  const modules = [...html.matchAll(/<script\s+type=["']module["'][^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]);
  expect(modules.length > 0, `${file} contains an inline module for interaction or measurement`);
  modules.forEach((source, index) => {
    const stripped = source.replace(/^\s*import\s+.*?;\s*$/gm, '');
    const temp = path.join(os.tmpdir(), `cybershield-${path.basename(file)}-${index}.mjs`);
    fs.writeFileSync(temp, stripped);
    const result = spawnSync(process.execPath, ['--check', temp], { encoding: 'utf8' });
    expect(result.status === 0, `${file} inline module ${index + 1} passes node --check${result.stderr ? `: ${result.stderr.trim()}` : ''}`);
    fs.rmSync(temp, { force: true });
  });
}

const index = read('index.html');
expect(!/http-equiv=["']refresh["']/i.test(index), 'index.html has no forced redirect');
includes('index.html', 'Challenge One AI Recommendation');
includes('index.html', 'See the 3-Minute Vendor-Risk Example');
includes('index.html', 'Is this another AI judging the first AI?');
includes('index.html', 'Designed by Dr. Max Justice');
excludes('index.html', 'Open Review Package');
excludes('index.html', 'Stable Fallback');
excludes('index.html', 'controlled-review release');

includes('vendor-risk-next.html', 'Would your current process approve this recommendation?');
includes('vendor-risk-next.html', 'I would ask for more evidence');
includes('vendor-risk-next.html', 'Personalize the record, or continue without doing so.');
includes('vendor-risk-next.html', 'Review One of My Recommendations');
includes('vendor-risk-next.html', 'Explore the 3-to-5 Recommendation Pilot');
includes('vendor-risk-next.html', 'Strongest Defensible Action for This Evidence Set');
excludes('vendor-risk-next.html', 'Experimental route:');
excludes('vendor-risk-next.html', 'Sheet ID source of truth');
excludes('vendor-risk-next.html', 'stable buyer route');

includes('pilot-package.html', 'Pilot pricing and delivery schedule are confirmed after scope review.');
includes('pilot-package.html', 'Discuss a Controlled Pilot');
excludes('pilot-package.html', 'internal-qa.html');

const analytics = read('src/vercel-analytics.js');
includes('src/vercel-analytics.js', 'cybershield:conversion');
includes('src/vercel-analytics.js', "'route', 'stage', 'choice', 'destination'");
expect(!analytics.includes('visitor_email') && !analytics.includes('crm_sheet_id'), 'analytics helper contains no sensitive report or capture fields');

let manifest;
try {
  manifest = JSON.parse(read('route-manifest.json'));
  passes.push('route-manifest.json parses');
} catch (error) {
  failures.push(`route-manifest.json parses: ${error.message}`);
}
if (manifest) {
  expect(manifest.primary_customer_action === 'Challenge One AI Recommendation', 'route manifest records the primary customer action');
  expect(manifest.routes.some(route => route.path === '/pilot-package.html' && route.status === 'active-controlled-pilot'), 'route manifest exposes the controlled pilot route');
  expect(manifest.capture_source_of_truth?.public_display_allowed === false, 'route manifest prohibits public Sheet ID display');
}

checkInlineModules('index.html');
checkInlineModules('vendor-risk-next.html');
checkInlineModules('pilot-package.html');

console.log(`PASS: ${passes.length}`);
passes.forEach(item => console.log(`  ✓ ${item}`));

if (failures.length) {
  console.error(`FAIL: ${failures.length}`);
  failures.forEach(item => console.error(`  ✗ ${item}`));
  process.exit(1);
}

console.log('Trust-led conversion static checks passed.');
