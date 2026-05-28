export function calculateDecision(state, registry) {
  const model = registry.models.models.find(item => item.model_id === "operational_trust_decision_model");
  const evidenceScore = state.evidence === "high" ? 86 : state.evidence === "low" ? 42 : 68;
  const vendorScore = state.vendor === "Yes" ? 90 : state.vendor === "Unknown" ? 58 : 40;
  const roleWeight = state.role.includes("CFO") ? 4 : state.role.includes("CISO") ? 5 : 3;
  const score = Math.round((evidenceScore * 0.45) + (vendorScore * 0.35) + (roleWeight * 4));

  const stateBand = score >= 78 ? "approved" : score >= 52 ? "conditional_approval" : "blocked";
  const label = stateBand === "approved" ? "Approved" : stateBand === "blocked" ? "Blocked" : "Conditional Approval";
  const gaps = [];
  if (state.evidence !== "high") gaps.push("data_lineage", "policy_lineage");
  if (state.vendor !== "Yes") gaps.push("vendor_validation", "human_owner");

  const reason = stateBand === "approved"
    ? "Evidence and ownership are strong enough for advisory approval."
    : stateBand === "blocked"
      ? "Evidence and vendor validation are too weak to proceed safely."
      : "Evidence is incomplete and policy ownership is unclear.";

  const nextAction = stateBand === "approved"
    ? "Proceed with logged proof record and owner accountability."
    : stateBand === "blocked"
      ? "Block execution until vendor validation and evidence ownership are resolved."
      : "Require human owner approval before execution.";

  return {
    label,
    state: stateBand,
    score,
    reason,
    next_action: nextAction,
    trust_posture: stateBand === "approved" ? "High Trust" : stateBand === "blocked" ? "Low Trust" : "Conditional Trust",
    runtime_control: stateBand === "approved" ? "Log and monitor" : stateBand === "blocked" ? "Do not proceed" : "Human approval required",
    evidence_confidence: state.evidence[0].toUpperCase() + state.evidence.slice(1),
    proof_status: gaps.length ? "Draft-ready with gaps" : "Defensible",
    evidence_gaps: [...new Set(gaps)],
    improvements: [
      { action: "Confirm accountable human owner", owner: "Executive sponsor or control owner", lift: "+8 to +12" },
      { action: "Validate vendor and payment destination", owner: "Finance / Vendor Management", lift: "+10 to +18" },
      { action: "Attach policy and data lineage", owner: "CISO / vCISO or Compliance", lift: "+12 to +20" }
    ],
    model,
    record: {
      decision_id: "cs-v52-demo-001",
      generated_at: new Date().toISOString(),
      organization: state.org,
      role: state.role,
      model_id: model.model_id,
      model_version: model.version,
      cybershield_release: model.cybershield_release,
      score,
      decision_state: stateBand,
      evidence_gaps: [...new Set(gaps)],
      advisory_boundary: "Static advisory prototype. No live enforcement or enterprise integration is claimed."
    }
  };
}
