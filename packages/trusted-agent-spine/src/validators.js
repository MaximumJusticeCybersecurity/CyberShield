const SPECS = Object.freeze({
  contextPack: {required:['context_pack_id','context_pack_version','domain_pack_id','domain_pack_version','created_at','domain','decision_type','task_objective','recommendation_under_review','decision_owner','intended_use','scope','exclusions','source_ids','known_constraints','known_uncertainties','requested_output','authority_boundary','allowed_actions','prohibited_actions'], arrays:['scope','exclusions','source_ids','known_constraints','known_uncertainties','allowed_actions','prohibited_actions']},
  sourceRecord: {required:['source_id','title','source_type','origin','author_or_provider','collected_at','effective_date','expiration_or_review_date','freshness_status','independence_status','scope_status','content_hash_or_reference','claim_ids_supported','contradiction_ids','limitations','synthetic_demo_flag'], arrays:['claim_ids_supported','contradiction_ids','limitations']},
  missingEvidence: {required:['missing_evidence_id','claim_id','required_evidence_type','reason_required','severity','decision_impact','minimum_sufficient_evidence','responsible_role','requested_by','due_or_review_date','status','recorded_at'], arrays:[]},
  humanGate: {required:['human_gate_id','gate_reason','triggering_conditions','required_reviewer_roles','permitted_decisions','reviewer_name','reviewer_role','selected_decision','rationale','residual_risk_acknowledgment','timestamp','override_of_agent_recommendation','context_pack_id'], arrays:['triggering_conditions','required_reviewer_roles','permitted_decisions']},
  agentWorkReceipt: {required:['receipt_id','agent_identity','canonical_role','task_id','context_pack_id','input_source_ids','operations_performed','tools_used','claims_created_or_modified','evidence_created_or_modified','missing_evidence_created','human_gate_id','output_record_id','limitations','unresolved_findings','start_timestamp','completion_timestamp','candidate_digest','candidate_digest_algorithm','verification_status','spine_version','core_spine_version','domain_pack_id','domain_pack_version'], arrays:['input_source_ids','operations_performed','tools_used','claims_created_or_modified','evidence_created_or_modified','missing_evidence_created','limitations','unresolved_findings']}
});
function validateRecord(value,spec){
  const errors=[];
  if(!value||typeof value!=='object'||Array.isArray(value)) return {ok:false,errors:['record must be an object']};
  for(const key of spec.required) if(!Object.hasOwn(value,key)) errors.push(`missing ${key}`);
  for(const key of spec.arrays) if(Object.hasOwn(value,key)&&!Array.isArray(value[key])) errors.push(`${key} must be an array`);
  const unknown=Object.keys(value).filter(key=>!spec.required.includes(key));
  if(unknown.length) errors.push(`unknown fields: ${unknown.sort().join(', ')}`);
  return {ok:errors.length===0,errors};
}
function assertValid(result,label){if(!result.ok) throw new Error(`${label} validation failed: ${result.errors.join('; ')}`);return true;}
export const validateContextPack=v=>validateRecord(v,SPECS.contextPack);
export const validateSourceRecord=v=>validateRecord(v,SPECS.sourceRecord);
export const validateMissingEvidence=v=>validateRecord(v,SPECS.missingEvidence);
export const validateHumanGate=v=>validateRecord(v,SPECS.humanGate);
export const validateAgentWorkReceipt=v=>validateRecord(v,SPECS.agentWorkReceipt);
export const assertContextPack=v=>assertValid(validateContextPack(v),'Context Pack');
export const assertSourceRecord=v=>assertValid(validateSourceRecord(v),'Source Record');
export const assertMissingEvidence=v=>assertValid(validateMissingEvidence(v),'Missing Evidence');
export const assertHumanGate=v=>assertValid(validateHumanGate(v),'Human Gate');
export const assertAgentWorkReceipt=v=>assertValid(validateAgentWorkReceipt(v),'Agent Work Receipt');
export function validateTrustedAgentRecord(record={}){
  const results={context_pack:validateContextPack(record.context_pack),sources:(record.sources||[]).map(validateSourceRecord),missing_evidence:(record.missing_evidence_records||[]).map(validateMissingEvidence),human_gate:validateHumanGate(record.human_gate),agent_work_receipt:validateAgentWorkReceipt(record.agent_work_receipt)};
  return {ok:results.context_pack.ok&&results.human_gate.ok&&results.agent_work_receipt.ok&&results.sources.every(x=>x.ok)&&results.missing_evidence.every(x=>x.ok),results};
}
