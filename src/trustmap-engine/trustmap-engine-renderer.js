// 20260602-1915 TrustMap Engine Renderer Scaffold
// Boundary: scaffold only. Not wired into live runtime.

import { createTrustMapEngineAssetFrame } from './trustmap-engine-assets.js';
import { getTrustMapEngineWorld } from './trustmap-engine-layout.js';

const ENGINE_POSITIONS = {
  kernel: { x: 50, y: 48 },
  cloud: { x: 50, y: 13 },
  identity: { x: 75, y: 25 },
  appsData: { x: 82, y: 55 },
  ai: { x: 62, y: 78 },
  endpoints: { x: 38, y: 78 },
  cmmc: { x: 18, y: 55 },
  third: { x: 25, y: 25 }
};

export function renderTrustMapEngine(registry, root, state = {}){
  const world = getTrustMapEngineWorld(root);
  if(!world) throw new Error('TrustMap Engine world not found');
  world.innerHTML = '';
  const nodes = registry.nodes || [];
  const byId = Object.fromEntries(nodes.map(node => [node.id, node]));

  renderEngineConnectors(registry, world, byId);
  nodes.forEach(node => renderEngineNode(registry, world, node, state));
  root.dataset.trustmapEngineRendered = 'true';
  root.dataset.trustmapEngineLastMode = state.activeMode || 'domain';
  return { nodeCount:nodes.length, edgeCount:(registry.edges || []).length };
}

function renderEngineNode(registry, world, node, state){
  const asset = registry.assets?.[node.assetId];
  const pos = ENGINE_POSITIONS[node.id] || { x:50, y:50 };
  const item = document.createElement('button');
  item.type = 'button';
  item.className = `tm-engine-node tm-engine-node-${node.type}`;
  item.dataset.tmEngineNode = node.id;
  item.dataset.tmEngineNodeType = node.type;
  item.dataset.tmEngineTrustState = node.trustState;
  item.style.left = `${pos.x}%`;
  item.style.top = `${pos.y}%`;
  item.style.transform = node.type === 'kernel' ? 'translate(-50%,-50%)' : 'translate(-50%,-50%)';
  item.appendChild(createTrustMapEngineAssetFrame(asset, node));
  const label = document.createElement('span');
  label.className = 'tm-engine-node-label';
  label.textContent = node.label;
  item.appendChild(label);
  world.appendChild(item);
}

function renderEngineConnectors(registry, world){
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'tm-engine-connectors');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  Object.assign(svg.style, { position:'absolute', inset:'0', width:'100%', height:'100%', zIndex:'0', pointerEvents:'none' });
  (registry.edges || []).forEach(edge => {
    const from = ENGINE_POSITIONS[edge.from];
    const to = ENGINE_POSITIONS[edge.to];
    if(!from || !to) return;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', String(from.x));
    line.setAttribute('y1', String(from.y));
    line.setAttribute('x2', String(to.x));
    line.setAttribute('y2', String(to.y));
    line.setAttribute('stroke', edge.state === 'at-risk' ? '#ff5c5c' : edge.state === 'strong' ? '#58f29b' : '#ffd43b');
    line.setAttribute('stroke-width', String(Math.max(0.8, (edge.strength || 0.5) * 2.8)));
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', '.48');
    svg.appendChild(line);
  });
  world.appendChild(svg);
}
