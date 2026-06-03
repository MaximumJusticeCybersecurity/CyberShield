// 20260602-1915 TrustMap Engine Connector Scaffold
// Boundary: scaffold only. Not wired into live runtime.

export function getTrustMapEngineConnectorState(edge){
  if(edge?.state === 'strong') return { color:'#58f29b', label:'strong' };
  if(edge?.state === 'at-risk') return { color:'#ff5c5c', label:'at risk' };
  if(edge?.state === 'needs-verification') return { color:'#ffd43b', label:'needs verification' };
  return { color:'#42d7ff', label:'neutral' };
}

export function summarizeTrustMapEngineConnectors(registry){
  const edges = registry?.edges || [];
  return edges.reduce((acc, edge) => {
    const state = getTrustMapEngineConnectorState(edge).label;
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});
}
