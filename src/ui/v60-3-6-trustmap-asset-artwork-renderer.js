// V60.3.6 TrustMap Layer 1 Asset Rendering Correction
// Purpose: preserve the existing TrustMap radar / constellation system and replace only the artwork inside Layer 1 asset bubbles.
// This is not a new TrustMap overlay.

function v6036$(selector, root = document){ return root.querySelector(selector); }
function v6036$$(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }

function v6036InstallStyles(){
  if(v6036$('#v60-3-6-asset-artwork-style')) return;
  const style = document.createElement('style');
  style.id = 'v60-3-6-asset-artwork-style';
  style.textContent = `
    #v6035Layer{display:none!important}
    #trustmap.active .v554-domain .orb{width:118px!important;height:118px!important;border-radius:34px!important;background:radial-gradient(circle at 34% 18%,rgba(255,255,255,.22),rgba(66,215,255,.12) 30%,rgba(3,13,24,.92) 76%)!important;box-shadow:inset -10px -14px 22px rgba(0,0,0,.32),inset 8px 8px 18px rgba(255,255,255,.06),0 0 22px currentColor,0 0 54px rgba(66,215,255,.22)!important;display:grid!important;place-items:center!important;overflow:hidden!important;position:relative!important}
    #trustmap.active .v554-domain .orb:before{content:"";position:absolute;inset:7px;border-radius:28px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(145deg,rgba(255,255,255,.08),transparent 45%);pointer-events:none}
    #trustmap.active .v554-domain .orb:after{content:"";position:absolute;left:14%;top:8%;width:46%;height:28%;border-radius:999px;background:rgba(255,255,255,.16);filter:blur(10px);pointer-events:none}
    .v6036-art{width:96px;height:96px;position:relative;display:grid;place-items:center;transform-style:preserve-3d;filter:drop-shadow(0 0 10px currentColor)}
    .v6036-art svg{width:96px;height:96px;overflow:visible}.v6036-art .stroke{fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}.v6036-art .soft{fill:currentColor;opacity:.16}.v6036-art .glow{fill:currentColor;opacity:.32;filter:blur(3px)}
    .v6036-cloud .cloud-a{position:absolute;left:7px;top:30px;width:82px;height:42px;border-radius:999px;background:radial-gradient(circle at 30% 24%,rgba(255,255,255,.9),rgba(184,242,255,.56) 36%,rgba(66,215,255,.16) 70%,rgba(3,13,24,.08));box-shadow:0 0 20px rgba(184,242,255,.7), inset -12px -11px 16px rgba(0,0,0,.18)}
    .v6036-cloud .cloud-a:before{content:"";position:absolute;left:13px;top:-23px;width:42px;height:42px;border-radius:50%;background:radial-gradient(circle at 34% 22%,rgba(255,255,255,.96),rgba(184,242,255,.62) 54%,rgba(66,215,255,.12));box-shadow:0 0 17px rgba(184,242,255,.5)}
    .v6036-cloud .cloud-a:after{content:"";position:absolute;right:9px;top:-15px;width:36px;height:36px;border-radius:50%;background:radial-gradient(circle at 32% 22%,rgba(255,255,255,.9),rgba(184,242,255,.5) 56%,rgba(66,215,255,.12))}
    .v6036-cloud .infra{position:absolute;left:25px;bottom:8px;width:46px;height:22px;transform:skewX(-18deg);border:1px solid currentColor;border-radius:6px;background:linear-gradient(145deg,rgba(66,215,255,.28),rgba(3,13,24,.45));box-shadow:0 0 12px currentColor}.v6036-cloud .infra:before,.v6036-cloud .infra:after{content:"";position:absolute;left:7px;right:7px;height:1px;background:currentColor;opacity:.6}.v6036-cloud .infra:before{top:7px}.v6036-cloud .infra:after{top:14px}
    .v6036-identity .ring{position:absolute;width:76px;height:76px;border-radius:50%;border:3px solid currentColor;box-shadow:0 0 18px currentColor,inset 0 0 18px rgba(66,215,255,.18)}.v6036-identity .badge{position:absolute;width:40px;height:52px;border-radius:18px 18px 14px 14px;background:linear-gradient(145deg,rgba(255,255,255,.22),rgba(66,215,255,.18),rgba(3,13,24,.58));border:1px solid currentColor;box-shadow:0 0 16px currentColor}.v6036-identity .badge:before{content:"";position:absolute;left:13px;top:9px;width:14px;height:14px;border-radius:50%;background:currentColor;opacity:.72}.v6036-identity .badge:after{content:"";position:absolute;left:9px;right:9px;bottom:11px;height:9px;border-radius:999px;border:1px solid currentColor}
    .v6036-data .tile{position:absolute;width:34px;height:34px;border-radius:10px;border:1px solid currentColor;background:linear-gradient(145deg,rgba(255,255,255,.16),rgba(66,215,255,.13),rgba(3,13,24,.62));box-shadow:0 0 14px currentColor}.v6036-data .t1{left:13px;top:13px}.v6036-data .t2{right:13px;top:18px}.v6036-data .t3{left:31px;bottom:13px}.v6036-data .line{position:absolute;height:2px;background:currentColor;box-shadow:0 0 8px currentColor;opacity:.8}.v6036-data .l1{left:43px;top:34px;width:18px;transform:rotate(10deg)}.v6036-data .l2{left:34px;top:52px;width:26px;transform:rotate(60deg)}
    .v6036-ai .core{position:absolute;width:68px;height:68px;border-radius:42% 58% 48% 52%;border:2px solid currentColor;background:radial-gradient(circle at 35% 25%,rgba(255,255,255,.18),rgba(66,215,255,.12),rgba(3,13,24,.72));box-shadow:0 0 20px currentColor,inset 0 0 16px rgba(66,215,255,.18)}.v6036-ai .node{position:absolute;width:8px;height:8px;border-radius:50%;background:currentColor;box-shadow:0 0 10px currentColor}.v6036-ai .n1{left:28px;top:29px}.v6036-ai .n2{right:25px;top:35px}.v6036-ai .n3{left:38px;bottom:25px}.v6036-ai .arc{position:absolute;width:54px;height:2px;background:currentColor;opacity:.72;box-shadow:0 0 8px currentColor}.v6036-ai .a1{transform:rotate(17deg)}.v6036-ai .a2{transform:rotate(108deg)}
    .v6036-vendor .case{position:absolute;width:70px;height:48px;border-radius:12px;background:linear-gradient(145deg,rgba(255,255,255,.16),rgba(66,215,255,.12),rgba(3,13,24,.68));border:1px solid currentColor;box-shadow:0 0 18px currentColor;transform:perspective(140px) rotateX(10deg) rotateY(-12deg)}.v6036-vendor .case:before{content:"";position:absolute;left:22px;top:-12px;width:26px;height:13px;border:2px solid currentColor;border-bottom:0;border-radius:10px 10px 0 0}.v6036-vendor .link{position:absolute;width:18px;height:18px;border-radius:50%;border:1px solid currentColor;box-shadow:0 0 10px currentColor}.v6036-vendor .l1{left:8px;bottom:15px}.v6036-vendor .l2{right:7px;top:12px}
    .v6036-endpoint .screen{position:absolute;width:62px;height:44px;border-radius:8px;border:1px solid currentColor;background:linear-gradient(145deg,rgba(255,255,255,.16),rgba(66,215,255,.12),rgba(3,13,24,.7));box-shadow:0 0 16px currentColor;transform:perspective(120px) rotateX(8deg) rotateY(-10deg)}.v6036-endpoint .screen:after{content:"";position:absolute;left:20px;right:20px;bottom:-12px;height:10px;border-left:2px solid currentColor;border-right:2px solid currentColor}.v6036-endpoint .phone{position:absolute;right:7px;bottom:11px;width:22px;height:40px;border-radius:7px;border:1px solid currentColor;background:rgba(3,13,24,.72);box-shadow:0 0 12px currentColor}
    .v6036-pentagon svg{filter:drop-shadow(0 0 12px currentColor)}.v6036-pentagon .roof{fill:rgba(66,215,255,.18);stroke:currentColor;stroke-width:2}.v6036-pentagon .side{fill:rgba(66,215,255,.09);stroke:currentColor;stroke-width:1.5}.v6036-pentagon .court{fill:rgba(3,13,24,.92);stroke:currentColor;stroke-width:1.5}.v6036-pentagon .seal{fill:currentColor;opacity:.55}
  `;
  document.head.appendChild(style);
}

function v6036Art(type){
  const map = {
    cloud: '<span class="v6036-art v6036-cloud"><span class="cloud-a"></span><span class="infra"></span></span>',
    identity: '<span class="v6036-art v6036-identity"><span class="ring"></span><span class="badge"></span></span>',
    data: '<span class="v6036-art v6036-data"><span class="tile t1"></span><span class="tile t2"></span><span class="tile t3"></span><span class="line l1"></span><span class="line l2"></span></span>',
    brain: '<span class="v6036-art v6036-ai"><span class="core"></span><span class="arc a1"></span><span class="arc a2"></span><span class="node n1"></span><span class="node n2"></span><span class="node n3"></span></span>',
    handshake: '<span class="v6036-art v6036-vendor"><span class="case"></span><span class="link l1"></span><span class="link l2"></span></span>',
    endpoint: '<span class="v6036-art v6036-endpoint"><span class="screen"></span><span class="phone"></span></span>',
    pentagon: '<span class="v6036-art v6036-pentagon"><svg viewBox="0 0 100 100"><polygon class="side" points="50,10 86,36 72,80 28,80 14,36"/><polygon class="roof" points="50,18 77,39 67,72 33,72 23,39"/><polygon class="court" points="50,34 60,42 56,56 44,56 40,42"/><circle class="seal" cx="50" cy="84" r="5"/></svg></span>'
  };
  return map[type] || map.data;
}

function v6036ApplyArtwork(){
  const trustmap = v6036$('#trustmap.active');
  if(!trustmap) return;
  v6036$('#v6035Layer')?.remove();
  v6036$$('.v554-domain', trustmap).forEach(domain => {
    const orb = domain.querySelector('.orb');
    if(!orb || orb.dataset.v6036Rendered === 'true') return;
    const id = domain.dataset.v554Domain;
    const type = id === 'cloud' ? 'cloud' : id === 'identity' ? 'identity' : id === 'appsData' ? 'data' : id === 'ai' ? 'brain' : id === 'third' ? 'handshake' : id === 'endpoints' ? 'endpoint' : id === 'cmmc' ? 'pentagon' : 'data';
    orb.innerHTML = v6036Art(type);
    orb.dataset.v6036Rendered = 'true';
  });
}

function v6036MarkMeta(){
  const payload = v6036$('#adminPayload');
  if(!payload) return;
  try{
    const parsed = JSON.parse(payload.textContent || '{}');
    parsed.build = 'V60.3.6 TrustMap Layer 1 Asset Rendering Correction';
    parsed.version = 'V60.3.6';
    parsed.previous_operational_build = 'V60.3.5 TrustMap Layer 1 Graphical Asset Redesign';
    parsed.trustmap_asset_rendering_correction = {
      status: 'active_existing_bubble_artwork_renderer',
      rule: 'Preserve existing TrustMap radar, constellation, rings, object positions, and interactions. Replace only the artwork inside existing Layer 1 asset bubbles.',
      disables_overlay_layer: 'v6035Layer',
      github_pages_browser_qa_required: true
    };
    payload.textContent = JSON.stringify(parsed, null, 2);
  } catch {}
}

function v6036Apply(){ v6036InstallStyles(); v6036ApplyArtwork(); v6036MarkMeta(); }
function v6036Handlers(){
  if(window.__v6036Handlers) return;
  window.__v6036Handlers = true;
  document.addEventListener('click', event => {
    if(event.target.closest('#mainNav button,#nextStep,#backStep,#skipDemo,#restartAssessment,[data-v554-mode],[data-v554-domain],[data-v554-asset]')) setTimeout(v6036Apply, 900);
  }, true);
}

v6036Handlers();
setTimeout(v6036Apply, 10400);
window.addEventListener('load', () => setTimeout(v6036Apply, 11600), { once:true });
setTimeout(v6036Apply, 13400);
