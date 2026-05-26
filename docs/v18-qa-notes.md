# CyberShield V18 QA Notes

Date: 2026-05-26
Build: Integrated Runtime Roadmap v18

## Verified from repository source

- `index.html` identifies the live prototype as CyberShield v18 integrated runtime governance prototype
- Top navigation includes: Briefing, Runtime, Priorities, Escalation, TrustMap, Rules, Frameworks, Reports, Roadmap, Memory, Evidence, Guidance, Persistence, Pilot, Settings
- First-run onboarding remains gated before the app workspace
- Runtime Control Center is present with scenario queue, admissibility decision, why-this-decision panel, consequence model, evidence substrate, and runtime feed
- Governance Memory is present and uses browser localStorage
- Reports workspace is three-pane: catalog, generated report, audience/owner context
- Persistence view is local/export-only with CRM-ready payload and no hidden network calls
- Pilot Readiness view is present with pilot scope and known limitations
- `bots.txt`, `governance-summary.json`, and `README.md` identify Integrated Runtime Roadmap v18

## Known V18.1 polish items

1. Report active-state polish
   - Clicking a report updates the report body and context, but the selected report button may not visibly refresh because the report list is not re-rendered after `setReport()`
   - Fix target: after report click, re-render the report catalog or manually update active classes

2. Live browser QA still required
   - Firefox desktop
   - Chrome desktop
   - Brave desktop
   - tablet-width browser
   - mobile-width browser

3. Responsive TrustMap QA still required
   - Confirm nodes do not overlap at tablet and mobile widths
   - Confirm routed lines do not visually imply passing through unrelated nodes
   - Confirm selected-node rails remain readable

4. Top navigation density
   - V18 adds many tabs.  Verify that desktop wrapping remains readable and mobile menu behavior remains acceptable
   - If not, collapse secondary tabs into an Advanced section in V18.1

5. Report export refinement
   - Current report export is text-based
   - Future improvement: stronger markdown formatting before any PDF export is attempted

6. Persistence boundary
   - Current Persistence is intentionally local/export-only
   - No Google Sheets, CRM, telemetry, or external sync calls should be added until local runtime performance remains stable

## V18 acceptance checklist

- Onboarding appears with `?reset=onboarding`
- Onboarding completion reveals the workspace
- Runtime scenario switching works
- Run Decision Simulation creates a Runtime Feed and Memory entry
- Priorities update based on the current runtime scenario
- TrustMap nodes can be clicked and update the side rails
- Reports update center and right panes
- Evidence packet updates for the selected runtime scenario
- Guidance reflects current posture and recommended conversation
- Persistence payload copies/downloads locally
- Pilot brief reflects the current organization and runtime decision

## Architecture guardrails

- Do not reintroduce phase-file module sprawl
- Do not add broad MutationObserver loops
- Do not add dynamic script fan-out
- Do not add hidden network calls from the public prototype
- Keep the public build honest: it is a static prototype, not live enterprise enforcement yet
