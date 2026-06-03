// V60.3.27 No-Dead-Click and Interaction Meaning Pass
// Purpose: mark and trace interaction meaning without inventing unsupported live actions.

function v60327$(selector, root = document){ return root.querySelector(selector); }
function v60327$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }

function v60327MeaningFor(el){
  const text = (el.textContent || el.getAttribute('aria-label') || '').trim().toLowerCase();
  const view = el.dataset?.view;
  if(view) return { type:'route', target:view };
  if(text.includes('expand') && text.includes('trustmap')) return { type:'route', target:'trustmap' };
  if(text.includes('download') || text.includes('export')) return { type:'download', target:'local_prototype_artifact' };
  if(text.includes('fit map') || text.includes('kernel view') || text.includes('domain view') || text.includes('object view')) return { type:'calculate', target:'trustmap_view_state' };
  if(el.closest('#trustmap')) return { type:'explain', target:'trustmap_detail_or_view_state' };
  if(text.includes('settings') || text.includes('architecture') || text.includes('evidence') || text.includes('proof')) return { type:'route', target:text };
  return { type:'unknown', target:null };
}

function v60327Audit(){
  const selectors = 'button,a,[role="button"],[tabindex="0"],.v554-domain,.v554-asset,.v554-tag,.v554-kernel';
  const items = v60327$$(selectors).map((el, index) => {
    const meaning = v60327MeaningFor(el);
    if(!el.dataset.interactionMeaning) el.dataset.interactionMeaning = meaning.type;
    return {
      index,
      tag: el.tagName?.toLowerCase?.() || 'unknown',
      text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0,80),
      meaning: meaning.type,
      target: meaning.target,
      in_trustmap: Boolean(el.closest('#trustmap'))
    };
  });
  const unknown = items.filter(item => item.meaning === 'unknown');
  return {
    build:'V60.3.27 No-Dead-Click and Interaction Meaning Pass',
    rule:'Every visible interaction should explain, route, calculate, download, or trigger a supported client-side next step. Unknown items require QA review.',
    total_interactions: items.length,
    unknown_count: unknown.length,
    unknown_sample: unknown.slice(0,10),
    github_pages_browser_qa_required:true
  };
}

function v60327MarkMeta(){
  const payload = v60327$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.interaction_meaning_audit = v60327Audit();
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

window.CyberShieldInteractionMeaningV60327 = { audit:v60327Audit, markMeta:v60327MarkMeta };
document.addEventListener('click', () => setTimeout(v60327MarkMeta, 160), true);
document.addEventListener('cybershield:trustmap-render-detected', () => setTimeout(v60327MarkMeta, 250));
setTimeout(v60327MarkMeta, 1600);
