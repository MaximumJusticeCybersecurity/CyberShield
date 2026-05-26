(() => {
  "use strict";
  const STORAGE_KEY="cybershield_executive_os_state";
  const DECISION_KEY="cybershield_admissibility_decisions";
  const $=(s,r=document)=>r.querySelector(s);
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  const frameworks={
    contractor:["CMMC / NIST SP 800-171","NIST CSF","Incident Response","Access Control","Audit and Accountability"],
    healthcare:["HIPAA Security Rule","NIST CSF","Access Control","Audit Controls","Contingency Planning"],
    finance:["SOC 2","NIST CSF","Vendor Risk","Access Control","Business Continuity"],
    manufacturing:["NIST CSF","Operational Resilience","Vendor Risk","Incident Response","Recovery Validation"],
    professional:["SOC 2 Lite","NIST CSF","AI Governance","Vendor Risk","Incident Response"],
    retail:["PCI DSS Awareness","NIST CSF","Vendor Risk","Access Control","Incident Response"]
  };
  const controls=[
    {family:"Access Control",evidence:"Identity boundaries, privileged access records, MFA ownership",gap:"Identity provider telemetry not yet integrated"},
    {family:"Audit and Accountability",evidence:"Executive Decision Records and saved admissibility events",gap:"Persistent audit archive needs backend storage"},
    {family:"AI Governance",evidence:"AI posture, admissibility simulator, runtime rules",gap:"Approved AI system inventory needed"},
    {family:"Incident Response",evidence:"Scenario briefings, decision chain, escalation owner",gap:"IR plan and tabletop artifacts need upload path"},
    {family:"Vendor Risk",evidence:"Vendor access node, payment workflow scenario, handoff record",gap:"Contracts and assurance evidence not attached"},
    {family:"Recovery Validation",evidence:"Roadmap, recovery scenario, workflow maturity input",gap:"Backup validation and RTO/RPO evidence needed"}
  ];
  function profile(){try{return(JSON.parse(localStorage.getItem(STORAGE_KEY))||{}).profile||{};}catch{return{};}}
  function decisions(){try{return JSON.parse(localStorage.getItem(DECISION_KEY))||[];}catch{return[];}}
  function recommended(){const p=profile();return frameworks[p.industry]||frameworks.professional;}
  function mapped(){const rec=recommended();return controls.map(c=>({...c,relevant:rec.some(r=>r.toLowerCase().includes(c.family.toLowerCase())||c.family.toLowerCase().includes(r.toLowerCase().split(" ")[0]))||c.family==="AI Governance"}));}
  function styles(){if($("#v16Styles"))return;const s=document.createElement("style");s.id="v16Styles";s.textContent=`.framework-hero{border:1px solid rgba(66,215,255,.3);border-radius:20px;background:rgba(66,215,255,.07);padding:16px;margin-bottom:14px}.framework-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.framework-tags span{border:1px solid rgba(66,215,255,.35);border-radius:999px;background:rgba(66,215,255,.1);padding:7px 10px;color:#fff;font-size:.82rem;font-weight:800}.control-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.control-card{border:1px solid var(--omega-line);border-radius:18px;background:rgba(7,27,48,.44);padding:14px}.control-card.relevant{border-color:rgba(126,230,162,.35);background:rgba(126,230,162,.07)}.control-card strong{display:block;color:#fff}.control-card p{color:var(--omega-muted);margin:7px 0}.control-card span{display:inline-flex;border:1px solid rgba(255,209,102,.3);border-radius:999px;padding:6px 9px;color:#ffd166;font-size:.78rem}.framework-table{width:100%;border-collapse:collapse;margin-top:14px}.framework-table th,.framework-table td{border-bottom:1px solid var(--omega-line);padding:10px;text-align:left;vertical-align:top}.framework-table th{color:#fff}.framework-table td{color:var(--omega-muted)}@media(max-width:820px){.control-grid{grid-template-columns:1fr}}`;document.head.appendChild(s);}
  function nav(){const n=$("#primaryNav");if(!n||n.querySelector('[data-view="frameworks"]'))return;const b=document.createElement("button");b.className="nav-item";b.dataset.view="frameworks";b.textContent="Frameworks";n.insertBefore(b,n.querySelector('[data-view="reports"]')||n.querySelector('[data-view="settings"]'));}
  function panel(){const m=$("#main");if(!m||$('[data-view-panel="frameworks"]'))return;const sec=document.createElement("section");sec.className="view-panel";sec.dataset.viewPanel="frameworks";sec.innerHTML=`<div class="section-head operational-only"><span class="boundary-chip live">Framework Mapping</span><h2>Governance & Compliance Control Mapping</h2><p>CyberShield maps executive decisions and evidence gaps to frameworks buyers already recognize.</p></div><div class="framework-hero"><div class="card-kicker">Recommended framework stack</div><h3 id="frameworkTitle"></h3><p id="frameworkWhy"></p><div class="framework-tags" id="frameworkTags"></div></div><div class="control-grid" id="controlGrid"></div><article class="omega-card" style="margin-top:16px"><div class="card-kicker">Evidence gap matrix</div><h3>Control Families</h3><table class="framework-table"><thead><tr><th>Control</th><th>Evidence</th><th>Gap</th></tr></thead><tbody id="frameworkTable"></tbody></table></article>`;m.insertBefore(sec,$('[data-view-panel="reports"]')||$('[data-view-panel="settings"]'));}
  function render(){const p=profile(),rec=recommended(),ds=decisions();if($("#frameworkTitle"))$("#frameworkTitle").textContent=rec[0]||"NIST CSF";if($("#frameworkWhy"))$("#frameworkWhy").textContent=`Based on industry ${p.industry||"professional"}, review goal ${p.reviewGoal||"trust"}, and ${ds.length} saved decision record(s).`;if($("#frameworkTags"))$("#frameworkTags").innerHTML=rec.map(x=>`<span>${esc(x)}</span>`).join("");const rows=mapped();if($("#controlGrid"))$("#controlGrid").innerHTML=rows.map(c=>`<article class="control-card ${c.relevant?"relevant":""}"><strong>${esc(c.family)}</strong><span>${c.relevant?"Recommended":"Optional"}</span><p>${esc(c.evidence)}</p><p><b>Gap:</b> ${esc(c.gap)}</p></article>`).join("");if($("#frameworkTable"))$("#frameworkTable").innerHTML=rows.map(c=>`<tr><td>${esc(c.family)}</td><td>${esc(c.evidence)}</td><td>${esc(c.gap)}</td></tr>`).join("");}
  function init(){styles();nav();panel();render();new MutationObserver(render).observe(document.body,{childList:true,subtree:true,characterData:true});}
  document.addEventListener("DOMContentLoaded",init);
})();