// V55.5 TrustMap CSS and Visual Object Cleanup
// Purpose: externalize TrustMap styling into src/styles/trustmap-v55-5.css while preserving V55.4
// registry-rendered behavior. This is a stabilization step, not a redesign.

const V555_STYLESHEET_PATH = 'src/styles/trustmap-v55-5.css';

function v555$(selector, root = document){
  return root.querySelector(selector);
}

function v555InstallStylesheet(){
  if(v555$('link[data-cybershield-style="trustmap-v55-5"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = V555_STYLESHEET_PATH;
  link.dataset.cybershieldStyle = 'trustmap-v55-5';
  document.head.appendChild(link);
}

function v555MarkMeta(){
  document.title = 'CyberShield V55.5 TrustMap CSS and Visual Object Cleanup';
  const payload = v555$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V55.5 TrustMap CSS and Visual Object Cleanup';
    parsed.version = 'V55.5';
    parsed.previous_operational_build = 'V55.4 TrustMap Registry Consumption';
    parsed.trustmap_css_cleanup = {
      status: 'stylesheet_loaded',
      stylesheet: V555_STYLESHEET_PATH,
      rule: 'TrustMap visual styles are now externalized for maintainability while preserving V55.4 registry-rendered behavior and thick neon-blue CyberShield Core boundary.',
      injected_css_boundary: 'Legacy injected CSS may still exist as a fallback from prior modules, but V55.5 stylesheet is now the maintainable visual source for the active v554 TrustMap classes.',
      github_pages_browser_qa_required: true
    };
    parsed.prototype_boundary = 'Static advisory prototype only. No live enforcement, live banking verification, live evidence retrieval, CMMC certification, healthcare compliance validation, live integrations, or live internet claim verification.';
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {
    // Metadata failure must not break the prototype.
  }
}

function v555Apply(){
  v555InstallStylesheet();
  v555MarkMeta();
}

function v555Handlers(){
  if(window.__v555Handlers) return;
  window.__v555Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-reset],[data-v554-domain],[data-v554-asset],[data-v554-core]')){
      setTimeout(v555Apply, 220);
    }
  }, true);
}

v555Handlers();
v555Apply();
window.addEventListener('load', () => setTimeout(v555Apply, 1300), { once: true });
setTimeout(v555Apply, 1800);
