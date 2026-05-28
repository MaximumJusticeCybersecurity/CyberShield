# CyberShield Requirements Traceability Matrix

Date: 2026-05-28
Baseline: V51.1 Executive Story and CTA Cleanup

## Purpose

This matrix tracks critical requirements from founder feedback, advisor feedback, product doctrine, and engineering discipline.  Future builders must update this file when a requirement is implemented, deferred, changed, or tested.

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

## Builder rule

Update this matrix when:

- requirement is implemented
- target version changes
- requirement is deferred
- requirement is rejected
- test result changes
- new requirement is discovered
