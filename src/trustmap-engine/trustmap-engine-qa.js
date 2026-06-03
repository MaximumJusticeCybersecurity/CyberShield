// 20260602-1915 TrustMap Engine QA Scaffold
// Boundary: scaffold only. Not wired into live runtime.

export function runTrustMapEngineQa(root, registry){
  const result = {
    ok:true,
    errors:[],
    nodeCount:root?.querySelectorAll?.('[data-tm-engine-node]')?.length || 0,
    kernelVisible:Boolean(root?.querySelector?.('[data-tm-engine-node="kernel"] img')),
    layer1Visible:root?.querySelectorAll?.('[data-tm-engine-node-type="layer1-domain"] img')?.length || 0,
    connectorCount:root?.querySelectorAll?.('.tm-engine-connectors line')?.length || 0,
    inspectorPresent:Boolean(root?.querySelector?.('[data-tm-engine-inspector]'))
  };
  if(result.nodeCount < 8) result.errors.push('Expected at least 8 TrustMap Engine nodes.');
  if(!result.kernelVisible) result.errors.push('Kernel image missing.');
  if(result.layer1Visible < 7) result.errors.push('Expected 7 Layer 1 images.');
  if(result.connectorCount < 7) result.errors.push('Expected 7 connector lines.');
  if(!result.inspectorPresent) result.errors.push('Inspector missing.');
  result.ok = result.errors.length === 0;
  return result;
}

export function publishTrustMapEngineQa(root, qa){
  if(!root) return;
  root.dataset.trustmapEngineQa = qa.ok ? 'pass' : 'fail';
  root.dataset.trustmapEngineQaSummary = JSON.stringify(qa);
}
