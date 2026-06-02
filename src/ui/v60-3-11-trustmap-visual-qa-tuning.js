// V60.3.11 TrustMap Visual QA Tuning Only
// Purpose: small visual tuning layer after V60.3.10. No new panels, no new features, no duplicate render authority.
// Boundary: static advisory prototype only. No live scoring, evidence retrieval, workflow automation, or enforcement.

function v60311$(selector, root=document){ return root.querySelector(selector); }

function v60311InstallStyles(){
  if(v60311$('#v60-3-11-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-11-style';
  style.textContent = `
    #trustmap.active .v554-shell{
      align-items:start!important;
      overflow:visible!important;
      gap:18px!important;
    }
    #trustmap.active .v554-map-panel{
      align-self:start!important;
      min-height:650px!important;
      max-height:none!important;
      overflow:visible!important;
      margin-top:0!important;
      padding-top:0!important;
    }
    #trustmap.active .v554-viewport{
      min-height:610px!important;
      overflow:visible!important;
    }
    #trustmap.active #v554World{
      top:-108px!important;
      left:50%!important;
      transform:translateX(-50%) scale(.50)!important;
      transform-origin:top center!important;
      transition:none!important;
    }
    #trustmap.active .v554-shell > .v554-panel:last-child{
      align-self:start!important;
      max-height:calc(100vh - 104px)!important;
      overflow-y:auto!important;
      overflow-x:hidden!important;
      padding-right:8px!important;
      scrollbar-width:thin;
    }
    #trustmap.active .v60310-score-card,
    #trustmap.active .v60310-selected-panel{
      padding:13px!important;
      margin-bottom:11px!important;
      border-radius:16px!important;
    }
    #trustmap.active .v60310-score-ring{
      width:124px!important;
      height:124px!important;
      margin:9px auto!important;
    }
    #trustmap.active .v60310-score-ring:before{
      inset:15px!important;
    }
    #trustmap.active .v60310-score-ring strong{
      font-size:1.72rem!important;
    }
    #trustmap.active .v554-domain{
      width:148px!important;
      min-height:170px!important;
    }
    #trustmap.active .v554-domain .orb{
      width:144px!important;
      height:122px!important;
      margin-bottom:2px!important;
    }
    #trustmap.active .v60310-layer1-img{
      width:154px!important;
      height:154px!important;
      transform:translateY(-14px)!important;
      filter:drop-shadow(0 0 13px var(--v60310-tone,#42d7ff)) drop-shadow(0 0 22px color-mix(in srgb,var(--v60310-tone,#42d7ff) 36%,transparent))!important;
    }
    #trustmap.active .v554-domain:hover .v60310-layer1-img,
    #trustmap.active .v554-domain:focus-within .v60310-layer1-img{
      transform:translateY(-14px) scale(1.04)!important;
    }
    #trustmap.active .v554-domain-label{
      max-width:144px!important;
      font-size:.78rem!important;
      line-height:1.06!important;
      padding:3px 6px!important;
    }
    #trustmap.active .v554-status-dot{
      font-size:.62rem!important;
      margin-top:5px!important;
    }
    #trustmap.active .v554-status-dot:before{
      width:8px!important;
      height:8px!important;
    }
    #trustmap.active .v554-kernel{
      width:206px!important;
      height:236px!important;
    }
    #trustmap.active .v554-kernel .v60310-core-energy{
      bottom:-30px!important;
      width:194px!important;
      height:46px!important;
    }
    #trustmap.active .v554-kernel .v60310-core-energy:after{
      width:142px!important;
      height:26px!important;
    }
    #trustmap.active .v554-kernel .v60310-core-content{
      width:136px!important;
      margin-top:5px!important;
    }
    #trustmap.active .v554-kernel img{
      width:46px!important;
    }
    #trustmap.active .v554-kernel strong{
      font-size:.94rem!important;
      line-height:1.02!important;
    }
    #trustmap.active .v554-kernel .org{
      font-size:.58rem!important;
      line-height:1.08!important;
      max-width:128px!important;
    }
    #trustmap.active .v554-kernel small{
      font-size:.59rem!important;
    }
    #trustmap.active #v60310RightAuthority{
      margin-top:0!important;
    }
  `;
  document.head.appendChild(style);
}

function v60311MarkMeta(){
  const payload = v60311$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.11 TrustMap Visual QA Tuning Only';
    parsed.version = 'V60.3.11';
    parsed.previous_operational_build = 'V60.3.10 TrustMap Authoritative Render Consolidation';
    parsed.trustmap_visual_qa_tuning = {
      status: 'active_visual_tuning_layer',
      rule: 'Small visual tuning layer after V60.3.10 only. No new panels, no new scores, no new features, no renderer duplication.',
      github_pages_browser_qa_required: true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  }catch{}
}

function v60311Apply(){
  if(!v60311$('#trustmap.active')) return;
  v60311InstallStyles();
  v60311MarkMeta();
}

function v60311Handlers(){
  if(window.__v60311Handlers) return;
  window.__v60311Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-domain],[data-v554-asset],[data-v554-reset],[data-v554-zoom]')){
      requestAnimationFrame(v60311Apply);
      setTimeout(v60311Apply, 250);
    }
  }, true);
}

v60311Handlers();
setTimeout(v60311Apply, 2350);
window.addEventListener('load', () => setTimeout(v60311Apply, 2700), { once:true });
setTimeout(v60311Apply, 3600);
