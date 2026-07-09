#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createReusableAgentSpine, PACKAGE_NAME, PACKAGE_VERSION, MAXIMUM_ACTION_TIER, validateTrustedAgentRecord } from '../packages/trusted-agent-spine/src/index.js';
const pkg=JSON.parse(await readFile(new URL('../packages/trusted-agent-spine/package.json',import.meta.url)));
const lock=JSON.parse(await readFile(new URL('../packages/trusted-agent-spine/package-lock.json',import.meta.url)));
const manifest=JSON.parse(await readFile(new URL('../packages/trusted-agent-spine/package-manifest.json',import.meta.url)));
assert.equal(PACKAGE_NAME,'@maximumjustice/trusted-agent-spine');assert.equal(PACKAGE_VERSION,'0.1.0');assert.equal(MAXIMUM_ACTION_TIER,'tier-0');assert.equal(pkg.private,true);assert.equal(pkg.version,lock.version);assert.equal(manifest.public_npm_release,false);assert.equal(manifest.source_copying,false);
for(const path of ['context-pack','source-record','missing-evidence','human-gate','agent-work-receipt']) JSON.parse(await readFile(new URL(`../packages/trusted-agent-spine/schemas/${path}.schema.json`,import.meta.url)));
const now=new Date('2026-07-09T00:00:00.000Z');
const spine=createReusableAgentSpine({spineVersion:'0.1.0',domainPackId:'non-cybershield-consumer',domainPackVersion:'1.0.0',agentIdentity:'synthetic-consumer',taskId:'PACKAGE-CHECK',taskObjective:'Prepare a reviewable synthetic record.',requestedOutput:'Synthetic review packet',authorityBoundary:'Prepare only; no external action.',exclusions:['external action','credential use'],limitations:['Synthetic package test only.'],operationsPerformed:['structured evidence'],reviewerRoles:['Accountable Owner']});
const record={record_id:'PKG-001',created_timestamp:now.toISOString(),decision_domain:'recruiting_opportunity',recommendation_type:'opportunity review',decision_owner:'Dr. Max Justice',recommendation:'Prepare; do not submit',claims:[{claim_id:'C-1',claim_type:'fact',normalized_claim:'Synthetic posting permits remote work.',evidence_links:[{evidence_id:'E-1'}]}],evidence_items:[{evidence_id:'E-1',title:'Synthetic official posting',source_type:'official_posting',summary:'Remote work stated.',synthetic_demo_flag:true}],missing_support:[{claim_id:'C-2',category:'Compensation',finding:'Compensation evidence missing.',severity:'High'}]};
const attached=spine.attach(record,{engineRecord:{missing_support:record.missing_support,human_review:{triggers:['Owner decision required'],required_reviewers:['Dr. Max Justice']}},state:{},now});
assert.equal(spine.validate(attached).ok,true);assert.equal(validateTrustedAgentRecord(attached).ok,true);assert.equal(attached.human_gate.selected_decision,'not_recorded');assert.match(attached.agent_work_receipt.candidate_digest,/^fnv1a32-demo:/);
console.log(JSON.stringify({result:'PASS',package:PACKAGE_NAME,version:PACKAGE_VERSION,domain:attached.context_pack.domain_pack_id,external_action_paths:0},null,2));
