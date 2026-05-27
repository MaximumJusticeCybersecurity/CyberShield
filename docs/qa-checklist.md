# CyberShield QA Checklist

Purpose: Use this checklist to validate the live prototype after each material build.

## Test URL

Use a cache-busting URL when testing:

`https://maximumjusticecybersecurity.github.io/CyberShield/?v=qa-check&reset=onboarding`

## Browsers

Test at minimum:

- [ ] Firefox desktop
- [ ] Chrome desktop
- [ ] Brave desktop
- [ ] Android mobile browser
- [ ] iOS Safari if available

## Viewports

Test:

- [ ] desktop wide
- [ ] laptop medium
- [ ] tablet width
- [ ] phone width

## First-load tests

- [ ] page loads without browser performance warning
- [ ] onboarding appears first when reset parameter is used
- [ ] no blank page
- [ ] no endless spinner
- [ ] no console-blocking JavaScript error if dev tools are available

## Onboarding tests

- [ ] Step 1 fields accept input
- [ ] role lens selection works
- [ ] industry selection works
- [ ] evidence and ownership selections work
- [ ] dashboard shape selection works
- [ ] Generate Dashboard opens workspace
- [ ] Skip for Demo opens workspace
- [ ] Restart Assessment works from Settings

## Primary navigation tests

- [ ] Briefing opens
- [ ] TrustMap opens
- [ ] Runtime opens
- [ ] Evidence opens
- [ ] Proof Pack opens
- [ ] Architecture opens
- [ ] Settings opens

## Runtime tests

- [ ] scenario queue renders
- [ ] each scenario can be selected
- [ ] selected scenario updates action title
- [ ] selected scenario updates outcome
- [ ] selected scenario updates owner
- [ ] selected scenario updates scores
- [ ] replayable decision record updates
- [ ] feed or decision record remains readable

## TrustMap tests

- [ ] TrustMap renders center object
- [ ] TrustMap renders first-layer objects
- [ ] TrustMap renders second-layer details where implemented
- [ ] node click updates relationship intelligence
- [ ] relationship hover glow works where implemented
- [ ] endpoint connector dots appear where implemented
- [ ] pinned relationship detail works where implemented
- [ ] weak-link styling is visible where implemented
- [ ] relationship confidence is visible where implemented
- [ ] TrustMap remains readable on smaller screens
- [ ] lines do not make the map unreadable

## Evidence tests

- [ ] evidence section renders
- [ ] evidence JSON or decision record reflects selected scenario
- [ ] manual evidence artifacts accumulate where implemented
- [ ] TrustMap impact appears in evidence where implemented
- [ ] copy evidence works where implemented
- [ ] download evidence works where implemented

## Proof Pack tests

- [ ] Proof Pack renders
- [ ] Proof Pack reflects selected scenario
- [ ] Proof Pack reflects report recipient or role where applicable
- [ ] Proof Pack includes decision outcome, rationale, evidence, owner, consequence, and next action
- [ ] copy/download works where implemented
- [ ] no unsupported audit-ready or enforcement claims appear

## Architecture tests

- [ ] Advisory Prototype path renders
- [ ] Guided Pilot path renders
- [ ] Enterprise Trust Platform path renders
- [ ] prototype boundary remains visible
- [ ] no production enforcement claims are added

## Settings / Admin tests

- [ ] build metadata is visible only in Settings/Admin where intended
- [ ] admin payload remains hidden from main user-facing experience
- [ ] local/export-only posture remains clear
- [ ] no external sync claim appears unless actually implemented and approved

## V45 Executive Authority tests

For V45 or later:

- [ ] first screen answers risky action, decision, consequence, and next action within 9 seconds
- [ ] Briefing leads with consequence before product architecture
- [ ] decision language uses Allow, Constrain, Escalate, Block, Evidence missing, Owner required, Decision recorded, or equivalent decisive phrasing
- [ ] weak language such as may possibly, could maybe, might help, intended to support, or potentially useful is removed from primary decision surfaces
- [ ] Pressure Points module appears
- [ ] Pressure Points are specific, evidence-linked, and not hype-driven

## V46 Evidence-Backed Confidence tests

For V46 or later:

- [ ] each major score shows top score reducers
- [ ] each major score shows top score improvers
- [ ] evidence used is visible
- [ ] evidence missing is visible
- [ ] score confidence is explained, not decorative
- [ ] Runtime shows consequence avoided and proof generated

## V47 Commitment Record tests

For V47 or later:

- [ ] Executive Commitment Record appears
- [ ] commitment includes decision owner
- [ ] commitment includes commitment statement
- [ ] commitment includes due date
- [ ] commitment includes status
- [ ] commitment includes Proof Pack impact
- [ ] commitment includes escalation path
- [ ] unresolved gaps can carry deadline pressure without artificial urgency

## V48 TrustMap Power Network tests

For V48 or later:

- [ ] TrustMap shows CyberShield as coordination layer
- [ ] TrustMap includes executive and operational role nodes where implemented
- [ ] affected roles highlight based on runtime decision
- [ ] missing owner weakens the corresponding relationship
- [ ] missing evidence weakens the corresponding relationship
- [ ] Proof Pack impact is visible from the network
- [ ] map remains readable on desktop and tablet widths

## V49 Before Consequence and Proof tests

For V49 or later:

- [ ] Before Consequence module appears
- [ ] Without CyberShield path shows action proceeding before review
- [ ] With CyberShield path shows action checked, blocked, constrained, or escalated before negative consequence
- [ ] outcome shows exposure avoided, decision recorded, owner assigned, and proof generated
- [ ] Proof Pack is framed as the authority artifact
- [ ] Proof Pack includes commitments and deadline state

## V50 External Demo Readiness tests

For V50 or later:

- [ ] first-time executive can understand the risky action within 60 seconds
- [ ] first-time executive can identify what evidence matters within 60 seconds
- [ ] first-time executive can identify who owns the decision within 60 seconds
- [ ] first-time executive can identify why the action was allowed, constrained, escalated, or blocked
- [ ] first-time executive can identify what proof leadership can use
- [ ] urgency is present without hype or manipulation

## Performance checks

- [ ] tab switching is responsive
- [ ] Firefox does not warn that the page is slowing the browser
- [ ] TrustMap does not freeze the page
- [ ] repeated scenario switching does not degrade performance
- [ ] repeated Proof Pack or report switching does not degrade performance

## Failure rule

If a build fails onboarding, Runtime, TrustMap, Evidence, Proof Pack, Architecture, or the applicable V45-V50 authority-layer gates, do not ship the next version until the failure is fixed.
