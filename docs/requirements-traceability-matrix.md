# CyberShield Requirements Traceability Matrix

Date: 2026-06-19
Baseline: 2026061909 Decision Assurance Implementation Agent Package

## Purpose

This matrix tracks critical requirements from founder feedback, advisor feedback, product doctrine, source lessons, and engineering discipline.  Future builders must update this file when a requirement is implemented, deferred, changed, or tested.

| Requirement ID | Requirement | Source | Priority | Target Version | Status | Test / Acceptance |
|---|---|---|---|---|---|---|
| REQ-ARCH-001 | Move scoring logic out of `index.html` into model registry files | Founder + advisor feedback | Critical | V52 | Planned | Model files exist and UI reads from them |
| REQ-ARCH-002 | Use registry-driven roles, industries, scenarios, dashboards, reports, evidence, and frameworks | Founder feedback | Critical | V52 | Planned | Registry files exist and app routes through them |
| REQ-LAYER-001 | Define UI, Interaction, Governance, Model, Evidence, Decision, Report, and Boundary/Audit layers | Founder feedback | Critical | V52 | Documented | `docs/layered-control-plane-requirements.md` exists |
| REQ-ONB-001 | Public onboarding fast path has five steps | Founder feedback | Critical | V55 | Documented | Industry, role, scenario, value range, evidence maturity route correctly |
| REQ-ONB-002 | Pilot onboarding supports deeper configuration | Founder feedback | High | V55 | Documented | Advanced path captures owner roles, frameworks, AI maturity, evidence, recipients |
| REQ-DEMO-001 | Support DIB / Federal Contractor SMB demo path | Founder feedback | Critical | V55 | Documented | Demo uses CMMC/NIST 800-171 and CUI/evidence context |
| REQ-DEMO-002 | Support Financial Services / Community Banking demo path | Founder feedback | Critical | V55 | Documented | Demo uses vendor/payment/customer trust context |
| REQ-DEMO-003 | Support AI-Enabled SMB / SaaS / Professional Services demo path | Founder feedback | Critical | V55 | Documented | Demo uses AI adoption and governance visibility context |
| REQ-DEMO-004 | Support Healthcare / Federal Health Security demo path | Founder feedback | Critical | V55 | Documented | Demo uses sensitive health data, vendor, AI, continuity context |
| REQ-NDC-001 | No dead clicks: every visible interactive object must explain, route, calculate, download, or trigger next step | Founder feedback | Critical | V53 | Documented | Manual click test passes across all tabs |
| REQ-MODEL-001 | Operational Trust score must route to model explanation | Founder feedback | Critical | V54 | Planned | Scorecard opens model detail |
| REQ-MODEL-002 | Authenticity Trust score must route to model explanation | Founder feedback | Critical | V54 | Planned | Scorecard opens model detail |
| REQ-MODEL-003 | Proof Strength score must route to model explanation | Founder feedback | Critical | V54 | Planned | Scorecard opens model detail |
| REQ-MODEL-004 | Avoided Exposure must route to assumptions and calculation logic | Founder feedback | Critical | V54 | Planned | Metric opens exposure model detail |
| REQ-MODEL-005 | Trust Under Attack must route to model and evidence detail | Founder feedback | Critical | V54 | Planned | Trust Under Attack detail explains status and next action |
| REQ-TMAP-001 | TrustMap is the flagship memory surface | Founder + advisor feedback | Critical | V56 | Documented | User remembers operational visibility gap |
| REQ-TMAP-002 | TrustMap visual style must be executive operational map, not sci-fi cyber theater | Advisor feedback | Critical | V56 | Documented | Visual review passes |
| REQ-TMAP-003 | TrustMap nodes and edges must route to explanation/model/evidence/report | Founder feedback | Critical | V53/V56 | Planned | No-dead-click test passes |
| REQ-TMAP-004 | MJC logo appears in header and center shield unless intentionally changed | Founder feedback | High | V56 | Documented | Visual QA passes |
| REQ-REPORT-001 | Export Executive Briefing Summary | Founder + advisor feedback | Critical | V57 | Planned | Download works and includes boundary/model metadata |
| REQ-REPORT-002 | Export TrustMap / Authenticity Trust Summary | Founder + advisor feedback | High | V57 | Planned | Download works and includes boundary/model metadata |
| REQ-REPORT-003 | Export Operational Trust Roadmap | Founder feedback | High | V57 | Planned | Download works and includes priorities |
| REQ-REPORT-004 | Export Proof Pack with boundary and model versions | Existing build + feedback | Critical | V57 | Partially Implemented | Proof Pack includes boundary and model metadata |
| REQ-ACTION-001 | Add future Action Engine / Priority Queue | Advisor feedback | High | V58 | Documented | Action items show changed, owner, next step, model impact |
| REQ-MEM-001 | Add future Organizational Memory / Continuity Intelligence | Advisor feedback | High | V59 | Documented | Records persist unresolved risks, decisions, maturity, roadmap |
| REQ-SEC-001 | No live capability overclaims | Founder + advisor feedback | Critical | All | Documented | Forbidden claim check passes |
| REQ-SEC-002 | Security engineering baseline exists before first sale | Founder feedback | Critical | V52 | Documented | `docs/security-engineering-baseline.md` exists |
| REQ-REL-001 | Release chain must align after every material build | Recurring issue | Critical | All | Documented | README, bots, governance, handoff, log agree |
| REQ-HM-001 | CyberShield must support Agent Maintenance / Harness Health Assessment as a buyer-facing use case. | Nate B. Jones agent maintenance lesson + founder decision | Critical | 2026061717+ | Accepted | Demo can explain and capture Inputs, Reach, Job, Proof, and Value. |
| REQ-HM-002 | CyberShield must evaluate Inputs / Sources for currency, authority, and stale-truth risk. | Nate B. Jones + Harness Maintenance doctrine | Critical | 2026061717+ | Accepted | ATDR or Harness Review includes source freshness and source-of-truth status. |
| REQ-HM-003 | CyberShield must evaluate Reach / Permissions for read, draft, update, publish, spend, send, delete, and external-action authority. | Nate B. Jones + Agent Governance doctrine | Critical | 2026061717+ | Accepted | Review screen exposes permission scope and flags overbroad reach. |
| REQ-HM-004 | CyberShield must evaluate Job / Purpose and detect silent job drift. | Nate B. Jones + Agent Governance doctrine | Critical | 2026061717+ | Accepted | Review identifies whether the workflow is summary, planning, recommendation, or action. |
| REQ-HM-005 | CyberShield must evaluate Proof / Evidence and require an inspectable trail where feasible. | Nate B. Jones + ATDR evidence doctrine | Critical | 2026061717+ | Accepted | ATDR includes proof trail, sources checked, and sources unavailable. |
| REQ-HM-006 | CyberShield must evaluate Value / Usefulness and support Improve, Constrain, Rebuild, Retire recommendations. | Nate B. Jones + Harness Maintenance doctrine | High | 2026061717+ | Accepted | Harness review produces a value decision and next action. |
| REQ-HM-007 | CyberShield must identify model-improved / harness-did-not risk. | Nate B. Jones agent maintenance lesson | Critical | 2026061717+ | Accepted | Risk taxonomy includes this category. |
| REQ-HM-008 | CyberShield must identify workflow-changed / docs-did-not risk. | Nate B. Jones agent maintenance lesson | Critical | 2026061717+ | Accepted | Risk taxonomy includes this category. |
| REQ-HM-009 | CyberShield must distinguish useful learning loops from unsafe self-modification. | Founder decision + Agent Governance doctrine | Critical | 2026061717+ | Accepted | Learning-loop review captures what changed, who approved, and rollback path. |
| REQ-HM-010 | CyberShield must treat pruning or deletion as a valid improvement action. | Nate B. Jones + Harness Maintenance doctrine | High | 2026061717+ | Accepted | Recommendations may include Delete, Remove Tool, Reduce Access, Retire Workflow. |
| REQ-HM-011 | Model upgrades must trigger harness review. | Nate B. Jones + Shared Trust Architecture | High | 2026061717+ | Accepted | Harness review records last model/version change and review status. |
| REQ-HM-012 | Workflow changes must trigger harness review. | Nate B. Jones + Shared Trust Architecture | High | 2026061717+ | Accepted | Harness review records last workflow/process change and review status. |
| REQ-HM-013 | CyberShield must not imply that self-improvement means autonomous authority expansion. | Founder decision + no-overclaim doctrine | Critical | 2026061717+ | Accepted | No product copy or UI implies uncontrolled self-modification. |
| REQ-LEG-001 | CyberShield must make AI-influenced decisions legible, reviewable, and accountable. | Catie Cuan robotics lesson + founder decision | Critical | 2026061717+ | Accepted | ATDR explains what happened, why, evidence used, uncertainty, and human approval point. |
| REQ-MHA-001 | Meaningful Human Authority requires legibility, contestability, rejection path, and residual risk acknowledgment. | Founder decision + decision assurance doctrine | Critical | 2026061717+ | Accepted | Human review screen shows what the reviewer is approving and allows override/rejection rationale. |
| REQ-GAIN-001 | CyberShield should classify AI use as Give, Accelerate, Integrate, or No AI where relevant. | Dan Martell / Omar Eltakrori conversation + founder decision | Medium | Future | Accepted | AI adoption review supports task classification without broadening first demo. |
| REQ-TALENT-001 | CyberShield should flag Talent Pipeline / Apprenticeship Risk when AI removes work that trains human judgment. | Ethan Mollick / Simon Sinek conversation + founder decision | Medium | Future | Accepted | Governance assessment includes training and judgment-development risk where applicable. |
| REQ-HLA-001 | CyberShield must include a Human Legibility section in the AI Trust Decision Record. | Catie Cuan + Aegis Legibility doctrine | Critical | 2026061721+ | Accepted | ATDR shows what happened, why, evidence used, assumptions, uncertainty, and decision owner action. |
| REQ-HLA-002 | CyberShield must include a Meaningful Human Authority check. | Human-AI Command doctrine + founder decision | Critical | 2026061721+ | Accepted | Reviewer can understand, accept, reject, modify, or escalate with rationale. |
| REQ-HLA-003 | CyberShield must detect ceremonial approval risk. | Aegis Human Legibility and Agency doctrine | Critical | 2026061721+ | Accepted | Finding triggers when human review exists but decision basis is not legible. |
| REQ-HLA-004 | CyberShield must include an AI Sycophancy / Over-Agreement check. | Simon Sinek / Ethan Mollick conversation | High | 2026061721+ | Accepted | Review asks whether AI challenged the premise or merely optimized around it. |
| REQ-HLA-005 | CyberShield must distinguish facts, assumptions, inferences, and recommendations. | Aegis decision-governance doctrine | Critical | 2026061721+ | Accepted | ATDR separates these fields or labels them clearly in the narrative. |
| REQ-HLA-006 | CyberShield must include a Why Gate for major AI-influenced decisions or agent workflows. | Catie Cuan + Simon Sinek Start With Why alignment | High | 2026061721+ | Accepted | Review captures why this AI use exists, why now, and what trust failure it prevents. |
| REQ-HLA-007 | CyberShield must include a Productive Friction / Judgment Preservation check where applicable. | Ethan Mollick learning / effort lesson | Medium | Future | Accepted | Assessment flags whether automation removes work that trains human judgment or apprenticeship. |
| REQ-HLA-008 | CyberShield must identify generic AI output risk. | Simon Sinek / Ethan Mollick voice and taste lesson | High | 2026061721+ | Accepted | Finding triggers when output is polished but non-specific, unsupported, or not operationally useful. |
| REQ-HLA-009 | CyberShield must preserve accountable human ownership in every consequential ATDR. | Human-AI Command doctrine | Critical | 2026061721+ | Accepted | Export identifies the accountable human decision owner or shows owner missing. |
| REQ-HLA-010 | CyberShield must make the model / app / harness distinction clear in builder and product documentation. | Ethan Mollick + Nate B. Jones harness lesson | Medium | 2026061721+ | Accepted | Docs and UI do not confuse model intelligence with controlled decision assurance. |
| REQ-HLA-011 | CyberShield must include Taste / Expert Judgment as an evaluation input when reviewing strategy, policy, communications, or governance artifacts. | Simon Sinek / Ethan Mollick taste lesson | Medium | Future | Accepted | Assessment can record expert judgment notes and reviewer rationale. |
| REQ-HLA-012 | CyberShield must include Legibility Failure in the risk taxonomy. | Catie Cuan + CyberShield decision assurance | Critical | 2026061721+ | Accepted | Risk taxonomy includes opaque recommendation, unclear assumption, missing proof, and ceremonial approval. |
| REQ-HLA-013 | CyberShield must include Human Agency Erosion in the risk taxonomy. | Simon Sinek / Ethan Mollick agency lesson | High | Future | Accepted | Assessment flags when AI removes human judgment without a compensating control. |
| REQ-HLA-014 | CyberShield must include Challenge-Tested status. | Ethan Mollick critic-mode lesson + Aegis Red Team doctrine | High | 2026061721+ | Accepted | ATDR records whether the AI recommendation was red-teamed, critiqued, or reviewed from a skeptical lens. |
| REQ-HLA-015 | CyberShield must not overclaim live AI monitoring, autonomous enforcement, or model introspection unless implemented. | No-overclaim doctrine | Critical | All | Accepted | No-overclaim checklist passes. |
| REQ-VRDA-001 | First visible build must make the vendor-risk AI Decision Assurance demo work end to end before TrustMap, Runtime, multi-industry demos, or dashboards. | Founder + business partner + operator feedback | Critical | Next vendor-risk build | Accepted | User can complete landing to Trust Decision Record export with no broken core path. |
| REQ-VRDA-002 | Public landing page must lead with Before relying on AI and explain who it is for, what goes in, and what comes out within 30 seconds. | Tim Murphy operator feedback + founder decision | Critical | Next vendor-risk build | Accepted | Non-technical operator can explain the product back accurately. |
| REQ-VRDA-003 | CyberShield public demo must use very little Aegis language and keep Aegis internal for this build. | Founder + Aegis architecture package | Critical | Next vendor-risk build | Accepted | Landing page focuses on buyer problem and does not require Aegis understanding. |
| REQ-VRDA-004 | Trust Kernel Lite must include domain-fit, claims, evidence mapping, contradiction detection, validators, Risk If Wrong, Confidence Band, candidate action comparison, and human review. | Aegis / CyberShield architecture + engineer questions | Critical | Next vendor-risk build | Accepted | Demo produces decision path and Trust Decision Record from a vendor-risk recommendation. |
| REQ-VRDA-005 | Trust Decision Record must separate AI claim, evidence, CyberShield inference, and human decision. | Decision provenance doctrine + Meaningful Human Authority | Critical | Next vendor-risk build | Accepted | Export clearly labels each source of decision influence. |
| REQ-VRDA-006 | Broad trust scoring must be avoided in the first visible demo in favor of plain bands. | Founder decision + operator clarity feedback | Critical | Next vendor-risk build | Accepted | UI uses Risk If Wrong, Confidence Band, Evidence Sufficiency, and Decision Readiness. |
| REQ-VRDA-007 | Google Sheet capture must store metadata plus full structured Trust Decision Record JSON after email is collected at report generation. | Founder decision | Critical | Next vendor-risk build | Accepted | Payload includes metadata fields and structured_record_json. |
| REQ-VRDA-008 | Google Sheet capture must use a configurable Apps Script endpoint and simulate honestly if the endpoint is not configured. | Founder decision + static GitHub Pages constraint | Critical | Next vendor-risk build | Accepted | No front-end credentials.  Save success is not claimed unless POST succeeds. |
| REQ-VRDA-009 | Report generation must support on-screen report, browser print, and PDF or print-to-PDF before polished client-side DOCX/PDF generation. | Founder decision | High | Next vendor-risk build | Accepted | Visitor can print or save a polished executive report after email capture. |
| REQ-VRDA-010 | Add a single engineer handoff document that points builders to the current requirements library. | Founder decision | Critical | Next vendor-risk build | Accepted | `docs/engineer-next-build-instructions.md` exists and names source docs. |
| REQ-RSA-001 | The first Codex-style agent must be the CyberShield Requirements Steward Agent, not a code-writing implementation agent. | Founder decision + Requirements Steward package | Critical | 2026061815+ | Accepted | `docs/2026061815-first-codex-agent-requirements-steward.md` exists and is referenced in handoff. |
| REQ-RSA-002 | Requirements Steward must use the defined source-of-truth precedence order when repo docs conflict. | Agent question response + founder direction | Critical | 2026061815+ | Accepted | Steward file contains precedence order and conflict rule. |
| REQ-RSA-003 | Requirements Steward checks are required before code changes that touch demo scope, positioning, routes, ATDR schema, risk logic, claims, evidence, harness, legibility, exports, production claims, or Aegis / CyberShield boundary. | Agent question response + founder direction | Critical | 2026061815+ | Accepted | Steward file defines when checks are mandatory. |
| REQ-RSA-004 | Requirements Steward output must use the compact packet: Requirements Alignment Check, Scope Boundary Check, Builder Instructions, Definition of Done, and PR Summary Draft. | Agent question response + founder direction | High | 2026061815+ | Accepted | Steward file defines output packet. |
| REQ-RSA-005 | Requirements Steward may block work in written guidance when accepted boundaries are violated and may require owner approval for ambiguous exceptions. | Agent question response + founder direction | Critical | 2026061815+ | Accepted | Steward file defines Do not implement and Requires owner approval outcomes. |
| REQ-RSA-006 | Dr. Max Justice is the approval authority for boundary exceptions, demo expansion, public Aegis positioning, production claims, live integrations, autonomous-agent authority, pilot-offer changes, route changes, and recommendation logic changes. | Agent question response + founder decision | Critical | 2026061815+ | Accepted | Steward file defines approval authority. |
| REQ-RSA-007 | Systems other than Aegis and CyberShield are reserved until explicitly defined by Dr. Max Justice. | Agent question response + founder direction | Medium | 2026061815+ | Accepted | Steward file includes reserved-boundary rule. |
| REQ-RSA-008 | `/vendor-risk-next.html` is the formal golden path for Sandeep and advisor review; `/vendor-risk.html` remains fallback. | Agent question response + founder direction | Critical | 2026061815+ | Accepted | Advisor briefing and steward docs identify golden path and fallback. |
| REQ-BIZ-001 | CyberShield first pilot should be AI Decision Assurance plus Harness Health Assessment for 3 to 5 AI-generated recommendations. | Founder decision + business-case package | Critical | 2026061815+ | Accepted | Business-case doc and advisor briefing define the first paid pilot. |
| REQ-BIZ-002 | CyberShield must be positioned as decision evidence before action, not broad AI safety or full production SaaS. | Founder decision + business-case package | Critical | 2026061815+ | Accepted | Business-case doc uses decision evidence language and no-overclaim boundaries. |
| REQ-DAIA-001 | The second Codex-style agent must be the Decision Assurance Implementation Agent and must operate after the Requirements Steward Agent. | Founder decision | Critical | 2026061909+ | Accepted | Agent contract exists and README, AGENTS.md, bots, governance, and handoff identify the sequence. |
| REQ-DAIA-002 | Material implementation requires a task-specific Requirements Steward decision of Proceed or Proceed with constraints. | Founder decision + agent separation-of-duties doctrine | Critical | 2026061909+ | Accepted | AGENTS.md and implementation-agent contract contain the authorization gate. |
| REQ-DAIA-003 | The implementation agent must implement only approved scope and must not redefine requirements, recommendation logic, risk logic, product positioning, or its own authority. | Founder decision + boundary doctrine | Critical | 2026061909+ | Accepted | Agent contract defines allowed and prohibited authority. |
| REQ-DAIA-004 | Material implementation must use a task branch and review packet or pull request; the agent may not merge without human approval. | Founder decision + human authority doctrine | Critical | 2026061909+ | Accepted | AGENTS.md and agent contract define branch, PR, and no-autonomous-merge rules. |
| REQ-DAIA-005 | The implementation agent must verify behavior at the strongest available level and must not claim browser, print, capture, or accessibility success from source inspection alone. | Founder decision + evidence doctrine | Critical | 2026061909+ | Accepted | Agent contract and first mission define the verification hierarchy and actual-print requirement. |
| REQ-DAIA-006 | Every material implementation run must produce a completion packet and update traceability, builder history, and successor handoff. | Founder decision + repo continuity doctrine | High | 2026061909+ | Accepted | Agent contract defines the completion packet and documentation obligations. |
| REQ-TAEI-001 | All CyberShield builders and agents must conform to the Trusted Authority and Ethical Influence Standard. | Founder decision + Luxury Academy lesson synthesis | Critical | 2026061908+ | Accepted | Standard is in repo and required reading in AGENTS.md, engineer instructions, README, bots, and governance summary. |

## 2026061816 Implementation Trace

`/vendor-risk-next.html` now partially implements the advisor-route Human Legibility and Harness Health demo package.  The update adds visible Human Legibility, Meaningful Human Authority, Challenge-Tested, next human action, and Harness Health Assessment content to the Sandeep/advisor golden path and carries those fields into the AI Trust Decision Record payload and print report.

Affected requirement IDs: `REQ-HM-001` through `REQ-HM-006`, `REQ-HM-013`, `REQ-HLA-001` through `REQ-HLA-006`, `REQ-HLA-008` through `REQ-HLA-010`, `REQ-HLA-012`, `REQ-HLA-014`, `REQ-HLA-015`, `REQ-VRDA-001`, `REQ-VRDA-005`, `REQ-VRDA-009`, `REQ-RSA-003`, `REQ-RSA-008`, `REQ-BIZ-001`, and `REQ-BIZ-002`.

Status note: implemented for the static `/vendor-risk-next.html` advisor route only.  `/vendor-risk.html` remains fallback.  No live model-backed analysis, production CRM infrastructure, compliance certification, autonomous vendor approval, autonomous enforcement, or full Aegis expansion was added.

Test / acceptance note: inline module syntax was checked with the bundled Node runtime.  Browser smoke testing remains required after GitHub Pages publishes the branch or PR preview.

## 2026061909 Agent Governance and First-Mission Trace

The repository now contains the Decision Assurance Implementation Agent contract, repo-level `AGENTS.md`, task-specific Requirements Steward packet, and first mission for `2026061143-report-layout-polish-after-print-test`.

Affected requirement IDs: `REQ-REL-001`, `REQ-VRDA-009`, `REQ-RSA-003`, `REQ-DAIA-001` through `REQ-DAIA-006`, and `REQ-TAEI-001`.

Status note: the agent framework and first-mission instructions are accepted and documented.  The report-layout code change has not yet been implemented.  Actual browser print or saved PDF inspection remains required before that mission can be accepted.

## Builder rule

Update this matrix when:

- requirement is implemented
- target version changes
- requirement is deferred
- requirement is rejected
- test result changes
- new requirement is discovered

Every new requirement should include source, priority, target version, status, and test / acceptance criteria.