// 20260603-0648 Source-of-Truth Drift Guard
// Purpose: expose runtime/source-of-truth alignment status in admin metadata so future builders can detect version drift quickly.

const BUILD_20260603_0648 = {
  id: '20260603-0648',
  name: 'Source-of-Truth Drift Guard',
  schema: 'YYYYMMDD-HHMM',
  timezone: 'America/New_York',
  previous_build: '20260603-0638 Timestamp Governance Runtime Alignment',
  expected_current_build: '20260603-0648 Source-of-Truth Drift Guard'
};

function sotGuard202606030648$(selector, root = document){ return root.querySelector(selector); }

function sotGuard202606030648Payload(){
  const payload = sotGuard202606030648$('#adminPayload');
  if(!payload) return null;
  try { return JSON.parse(payload.textContent || '{}'); } catch { return null; }
}

function sotGuard202606030648Signals(parsed){
  const buildText = [
    parsed?.build,
    parsed?.version,
    parsed?.current_timestamp_build?.build,
    parsed?.release_hardening?.current_build,
    parsed?.layer1_v2_src_rewrite?.build
  ].filter(Boolean).join(' | ');

  const hasTimestampSchema = /\d{8}-\d{4}/.test(buildText) || parsed?.current_timestamp_build?.schema === BUILD_20260603_0648.schema;
  const hasCurrentBuild = buildText.includes(BUILD_20260603_0648.id);
  const hasPreviousRuntimeAlignment = buildText.includes('20260603-0638') || buildText.includes('Timestamp Governance Runtime Alignment');
  const hasLayer1V2Rewrite = Boolean(parsed?.layer1_v2_src_rewrite);
  const hasReleaseTrain = Boolean(parsed?.release_hardening || parsed?.trustmap_render_lifecycle || parsed?.model_trace_alignment);

  return {
    has_timestamp_schema: hasTimestampSchema,
    has_current_build: hasCurrentBuild,
    has_previous_runtime_alignment: hasPreviousRuntimeAlignment,
    has_layer1_v2_rewrite: hasLayer1V2Rewrite,
    has_release_train_metadata: hasReleaseTrain,
    observed_build_text: buildText.slice(0, 600)
  };
}

function sotGuard202606030648Status(signals){
  const blockers = [];
  if(!signals.has_timestamp_schema) blockers.push('timestamp_schema_missing');
  if(!signals.has_current_build) blockers.push('current_build_not_yet_marked_in_admin_payload');
  if(!signals.has_previous_runtime_alignment) blockers.push('previous_timestamp_alignment_not_observed');
  if(!signals.has_layer1_v2_rewrite) blockers.push('layer1_v2_rewrite_metadata_not_observed_yet');
  if(!signals.has_release_train_metadata) blockers.push('release_train_metadata_not_observed_yet');
  return {
    status: blockers.length ? 'watch' : 'aligned',
    blockers
  };
}

function sotGuard202606030648MarkMeta(reason = 'scheduled'){
  const payload = sotGuard202606030648$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = BUILD_20260603_0648.expected_current_build;
    parsed.version = BUILD_20260603_0648.id;
    const signals = sotGuard202606030648Signals(parsed);
    const status = sotGuard202606030648Status(signals);
    parsed.source_of_truth_drift_guard = {
      build: BUILD_20260603_0648.expected_current_build,
      status: status.status,
      reason,
      schema: BUILD_20260603_0648.schema,
      timezone: BUILD_20260603_0648.timezone,
      previous_build: BUILD_20260603_0648.previous_build,
      signals,
      blockers: status.blockers,
      rule: 'Current implemented build should be timestamped and aligned across runtime/admin metadata and source-of-truth docs. Historical V60.x labels remain lineage only.',
      github_pages_browser_qa_required: true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

window.CyberShieldSourceOfTruthDriftGuard202606030648 = {
  info: BUILD_20260603_0648,
  inspect: () => {
    const parsed = sotGuard202606030648Payload();
    const signals = sotGuard202606030648Signals(parsed || {});
    return { ...sotGuard202606030648Status(signals), signals };
  },
  markMeta: sotGuard202606030648MarkMeta
};

setTimeout(() => sotGuard202606030648MarkMeta('initial'), 720);
setTimeout(() => sotGuard202606030648MarkMeta('post-startup'), 1700);
document.addEventListener('click', () => setTimeout(() => sotGuard202606030648MarkMeta('interaction'), 220), true);
document.addEventListener('cybershield:trustmap-stack-loaded', () => setTimeout(() => sotGuard202606030648MarkMeta('trustmap-stack-loaded'), 340));
