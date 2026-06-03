// 20260602-1945 TrustMap Engine QA Preview Diagnostics
// Boundary: preview only. Not wired into live TrustMap runtime.

export function runTrustMapEngineQa(root, registry){
  const expectedLayer1 = (registry?.nodes || []).filter(node => node.type === 'layer1-domain').map(node => node.id);
  const renderedNodes = Array.from(root?.querySelectorAll?.('[data-tm-engine-node]') || []).map(node => node.dataset.tmEngineNode);
  const renderedLayer1 = Array.from(root?.querySelectorAll?.('[data-tm-engine-node-type="layer1-domain"]') || []).map(node => node.dataset.tmEngineNode);
  const imageNodes = Array.from(root?.querySelectorAll?.('[data-tm-engine-node] img') || []).map(img => img.closest('[data-tm-engine-node]')?.dataset.tmEngineNode).filter(Boolean);
  const loadedImages = Array.from(root?.querySelectorAll?.('[data-tm-engine-image-loaded="true"]') || []).map(img => img.closest('[data-tm-engine-node]')?.dataset.tmEngineNode).filter(Boolean);
  const errorImages = Array.from(root?.querySelectorAll?.('[data-trustmap-engine-image-error="true"], [data-tm-engine-image-error="true"], img[data-trustmap-engine-image-error="true"]') || []).map(img => img.closest('[data-tm-engine-node]')?.dataset.tmEngineNode).filter(Boolean);
  const missingLayer1 = expectedLayer1.filter(id => !renderedLayer1.includes(id));
  const missingLayer1Images = expectedLayer1.filter(id => !imageNodes.includes(id));

  const result = {
    ok:true,
    errors:[],
    expectedLayer1,
    renderedNodes,
    renderedLayer1,
    imageNodes,
    loadedImages,
    errorImages,
    missingLayer1,
    missingLayer1Images,
    nodeCount:renderedNodes.length,
    kernelVisible:Boolean(root?.querySelector?.('[data-tm-engine-node="kernel"] img')),
    layer1Visible:renderedLayer1.length,
    connectorCount:root?.querySelectorAll?.('.tm-engine-connectors line')?.length || 0,
    inspectorPresent:Boolean(root?.querySelector?.('[data-tm-engine-inspector]'))
  };
  if(result.nodeCount < 8) result.errors.push('Expected at least 8 TrustMap Engine nodes.');
  if(!result.kernelVisible) result.errors.push('Kernel image missing.');
  if(result.layer1Visible < 7) result.errors.push(`Expected 7 Layer 1 nodes. Missing: ${missingLayer1.join(', ') || 'unknown'}`);
  if(result.missingLayer1Images.length) result.errors.push(`Layer 1 images missing for: ${missingLayer1Images.join(', ')}`);
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
