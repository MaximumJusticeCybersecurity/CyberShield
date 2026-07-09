#!/usr/bin/env node
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
const root=process.argv[2];if(!root) throw new Error('installed package root required');
const pkg=await import(pathToFileURL(join(root,'src/index.js')).href);
assert.equal(pkg.PACKAGE_NAME,'@maximumjustice/trusted-agent-spine');assert.equal(pkg.PACKAGE_VERSION,'0.1.0');
const builder=pkg.createContextPackBuilder({domainPackId:'recruiting-consumer-proof',domainPackVersion:'1.0.0',agentIdentity:'recruiting-agent',taskId:'CONSUMER-PROOF',taskObjective:'Prepare a recruiting opportunity packet.',requestedOutput:'Owner review packet',authorityBoundary:'Prepare only; no submit or outreach.',exclusions:['application submission','recruiter contact']});
const context=builder.build({record:{record_id:'REC-1',decision_domain:'recruiting_opportunity',recommendation_type:'pursuit review',decision_owner:'Dr. Max Justice',recommendation:'Prepare only'},engineRecord:{},state:{},sources:[],now:new Date('2026-07-09T00:00:00.000Z')});
assert.equal(builder.validate(context).ok,true);assert.equal(context.domain_pack_id,'recruiting-consumer-proof');assert.ok(context.prohibited_actions.includes('application submission'));
console.log(JSON.stringify({result:'PASS',installed_package:pkg.PACKAGE_NAME,version:pkg.PACKAGE_VERSION,consumer:'non-CyberShield recruiting proof',source_copying:false,external_action_paths:0},null,2));
