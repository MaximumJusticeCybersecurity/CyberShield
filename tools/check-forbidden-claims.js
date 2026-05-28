#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const roots = ['README.md', 'bots.txt', 'governance-summary.json', 'docs'];
const forbidden = [
  'live takedown automation',
  'live marketplace scanning',
  'live ad-platform enforcement',
  'live identity verification',
  'live CRM sync',
  'production agent blocking',
  'autonomous enforcement'
];
const allowedBoundary = [
  'does not',
  'do not claim',
  'not connected',
  'not yet',
  'unless implemented',
  'no live'
];

function walk(p){
  if(!fs.existsSync(p)) return [];
  const stat = fs.statSync(p);
  if(stat.isFile()) return [p];
  return fs.readdirSync(p).flatMap(x => walk(path.join(p, x)));
}
function context(text, idx){return text.slice(Math.max(0, idx - 80), Math.min(text.length, idx + 120)).toLowerCase();}

let failed = false;
const files = roots.flatMap(walk).filter(p => /\.(md|txt|json|html|js)$/i.test(p));
for(const file of files){
  const text = fs.readFileSync(file, 'utf8');
  const lower = text.toLowerCase();
  for(const phrase of forbidden){
    let idx = lower.indexOf(phrase);
    while(idx !== -1){
      const ctx = context(lower, idx);
      const isBoundary = allowedBoundary.some(a => ctx.includes(a));
      if(!isBoundary){
        console.error(`FAIL: possible overclaim '${phrase}' in ${file}`);
        failed = true;
      }
      idx = lower.indexOf(phrase, idx + phrase.length);
    }
  }
}
if(failed) process.exit(1);
console.log('OK: no obvious forbidden live-capability overclaims found.');
