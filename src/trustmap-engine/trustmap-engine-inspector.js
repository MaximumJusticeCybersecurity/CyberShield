// 20260602-1915 TrustMap Engine Inspector Scaffold
// Boundary: scaffold only. Not wired into live runtime.

import { getTrustMapEngineInspector } from './trustmap-engine-layout.js';

export function renderTrustMapEngineInspector(root, node){
  const inspector = getTrustMapEngineInspector(root);
  if(!inspector) return;
  if(!node){
    inspector.innerHTML = '<p>Select a TrustMap object to inspect trust, evidence, confidence, and action.</p>';
    return;
  }
  inspector.innerHTML = `
    <h3>${escapeTrustMapEngineHtml(node.label)}</h3>
    <p><strong>Type:</strong> ${escapeTrustMapEngineHtml(node.type)}</p>
    <p><strong>Trust score:</strong> ${escapeTrustMapEngineHtml(node.score)}</p>
    <p><strong>Trust state:</strong> ${escapeTrustMapEngineHtml(node.trustState)}</p>
    <p><strong>Confidence:</strong> ${escapeTrustMapEngineHtml(node.confidence)}</p>
    <p><strong>Evidence status:</strong> ${escapeTrustMapEngineHtml(node.evidenceStatus)}</p>
    <p><strong>Owner:</strong> ${escapeTrustMapEngineHtml(node.owner)}</p>
    <p><strong>Risk if wrong:</strong> ${escapeTrustMapEngineHtml(node.riskIfWrong)}</p>
    <p><strong>Available action:</strong> ${escapeTrustMapEngineHtml(node.availableAction)}</p>
    <button type="button" data-tm-engine-route="${escapeTrustMapEngineHtml(node.route)}">Open route</button>
  `;
}

function escapeTrustMapEngineHtml(value){
  return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}
