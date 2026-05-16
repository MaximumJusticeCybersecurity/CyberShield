(function () {
  "use strict";

  const STORAGE_KEY = "cybershield-clean-static-state-v1";

  const frameworks = {
    SMB: { short: "CIS", long: "CIS Controls" },
    Healthcare: { short: "HIPAA", long: "HIPAA Security Rule" },
    Defense: { short: "CMMC", long: "CMMC / NIST 800-171" },
    Financial: { short: "FTC", long: "FTC Safeguards" },
    Technology: { short: "SOC 2", long: "SOC 2 Trust Services" },
    Manufacturing: { short: "NIST", long: "NIST CSF" }
  };

  const baseActions = [
    {
      title: "Assign executive ownership for AI governance",
      rationale: "AI exposure is rising faster than policy, evidence retention, and approval workflows.",
      owner: "CEO + CIO + Legal",
      impact: "High",
      color: "red",
      advisor: "The most urgent risk is not the AI tool itself.  It is unclear accountability for how the organization approves, monitors, and defends AI-enabled decisions."
    },
    {
      title: "Create a 90-day cyber readiness roadmap",
      rationale: "Current maturity is developing, but the next actions need sequencing and ownership.",
      owner: "vCISO + Operations",
      impact: "High",
      color: "yellow",
      advisor: "A roadmap converts assessment findings into operational motion.  Without sequencing, leadership gets a list instead of a governance system."
    },
    {
      title: "Validate incident response decision rights",
      rationale: "Response speed depends on knowing who can authorize containment, legal escalation, and customer communications.",
      owner: "COO + General Counsel",
      impact: "Moderate",
      color: "yellow",
      advisor: "Most cyber response failure is decision latency disguised as technical complexity.  Clarifying authority before disruption reduces operational drag."
    },
    {
      title: "Prepare board-ready cyber risk summary",
      rationale: "Leadership needs a concise, defensible view of risk, assumptions, evidence, and next decisions.",
      owner: "CEO + vCISO",
      impact: "Moderate",
      color: "green",
      advisor: "A board-ready report helps shift cybersecurity from technical activity to executive governance discipline."
    }
  ];

  const defaults = {
    industry: "SMB",
    evidence: "partial",
    ai: "moderate",
    health: 72,
    aiScore: 58,
    ownerScore: 64
  };

  function safeParse(value) {
    try { return JSON.parse(value); } catch (e) { return null; }
  }

  function loadState() {
    const stored = safeParse(localStorage.getItem(STORAGE_KEY));
    return Object.assign({}, defaults, stored || {});
  }

  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* non-blocking */ }
  }

  function byId(id) { return document.getElementById(id); }

  function calculateState() {
    const industry = byId("industrySelect").value;
    const evidence = byId("evidenceSelect").value;
    const ai = byId("aiSelect").value;

    let health = 72;
    let aiScore = 58;
    let ownerScore = 64;

    if (evidence === "strong") { health += 10; ownerScore += 8; }
    if (evidence === "weak") { health -= 12; ownerScore -= 10; }
    if (ai === "high") { aiScore -= 18; health -= 4; }
    if (ai === "low") { aiScore += 14; }
    if (industry === "Defense" || industry === "Healthcare" || industry === "Financial") { health -= 3; aiScore -= 4; }

    return {
      industry,
      evidence,
      ai,
      health: Math.max(18, Math.min(94, health)),
      aiScore: Math.max(18, Math.min(94, aiScore)),
      ownerScore: Math.max(18, Math.min(94, ownerScore))
    };
  }

  function maturity(score) {
    if (score >= 80) return "Resilient";
    if (score >= 65) return "Developing";
    if (score >= 50) return "Moderate exposure";
    return "Elevated exposure";
  }

  function renderMetrics(state) {
    const framework = frameworks[state.industry] || frameworks.SMB;
    byId("cyberScore").textContent = state.health;
    byId("healthMetric").textContent = state.health + "%";
    byId("healthText").textContent = maturity(state.health);
    byId("aiMetric").textContent = state.aiScore + "%";
    byId("aiText").textContent = maturity(state.aiScore);
    byId("ownerMetric").textContent = state.ownerScore + "%";
    byId("frameworkMetric").textContent = framework.short;
    byId("frameworkText").textContent = framework.long;
  }

  function renderActions(state) {
    const list = byId("actionList");
    const actions = baseActions.slice();
    if (state.ai === "high") {
      actions.unshift({
        title: "Freeze unsanctioned AI usage pending control review",
        rationale: "Shadow AI is likely and could create data leakage, admissibility, and accountability risk.",
        owner: "CIO + Legal",
        impact: "Critical",
        color: "red",
        advisor: "This is a control-boundary issue.  The organization needs to know where AI is being used before it can defend the decisions, data, or evidence trail."
      });
    }
    if (state.evidence === "weak") {
      actions.unshift({
        title: "Refresh aging evidence and control documentation",
        rationale: "Weak or stale evidence lowers confidence in readiness and audit defensibility.",
        owner: "Security + Compliance",
        impact: "High",
        color: "red",
        advisor: "A control without current evidence is a story, not a defensible posture.  Evidence maturity is what makes the recommendation credible."
      });
    }

    list.innerHTML = "";
    actions.slice(0, 5).forEach(function (action) {
      const card = document.createElement("article");
      card.className = "action-card";
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="action-top">
          <div>
            <h3>${action.title}</h3>
            <p>${action.rationale}</p>
          </div>
          <span class="badge ${action.color}">${action.impact}</span>
        </div>
        <p style="margin-top:.75rem"><strong>Recommended owner:</strong> ${action.owner}</p>
      `;
      function activate() {
        byId("advisorTitle").textContent = action.title;
        byId("advisorBody").textContent = action.advisor;
        byId("advisorPath").textContent = "Review this action with Maximum Justice Cybersecurity as part of an Executive CyberShield Review.";
      }
      card.addEventListener("click", activate);
      card.addEventListener("keydown", function (event) { if (event.key === "Enter") activate(); });
      list.appendChild(card);
    });
  }

  function applyState(state) {
    byId("industrySelect").value = state.industry;
    byId("evidenceSelect").value = state.evidence;
    byId("aiSelect").value = state.ai;
    renderMetrics(state);
    renderActions(state);
  }

  function boot() {
    const state = loadState();
    applyState(state);

    byId("generateBtn").addEventListener("click", function () {
      const next = calculateState();
      saveState(next);
      applyState(next);
      byId("actions").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    byId("resetBtn").addEventListener("click", function () {
      localStorage.removeItem(STORAGE_KEY);
      applyState(defaults);
      byId("advisorTitle").textContent = "Demo data reset";
      byId("advisorBody").textContent = "CyberShield restored safe default state.  This reset cannot corrupt the application because no executable state is persisted.";
      byId("advisorPath").textContent = "Run the Executive Assessment again to generate a fresh operational view.";
    });

    byId("printBtn").addEventListener("click", function () { window.print(); });
  }

  try {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  } catch (error) {
    document.body.innerHTML = '<main style="max-width:900px;margin:4rem auto;padding:2rem;color:white;background:#111827;border:1px solid #38bdf8;border-radius:20px;font-family:sans-serif"><h1>CyberShield Recovery Mode</h1><p>The app caught a startup error instead of showing a blank screen.</p><pre style="white-space:pre-wrap;color:#fecaca">' + String(error && error.message ? error.message : error) + '</pre><button onclick="localStorage.clear();location.reload()" style="padding:.8rem 1rem;border-radius:999px;border:0;background:#67e8f9;font-weight:800">Clear Local Data and Reload</button></main>';
  }
})();
