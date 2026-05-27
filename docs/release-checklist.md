# CyberShield Release Checklist

Purpose: Use this checklist before calling any CyberShield build complete.

## 1. Version identity

- [ ] Current build label is clear
- [ ] `index.html` reflects the current version
- [ ] `bots.txt` reflects the current version
- [ ] `governance-summary.json` reflects the current version
- [ ] `README.md` reflects the current version
- [ ] Relevant `docs/` file exists or was updated
- [ ] `docs/builder-version-log.md` was updated with builder version and primary value add
- [ ] `docs/successor-builder-handoff-and-job-docket.md` was updated if strategy, roadmap, risk, or operating instructions changed

## 2. Core product regression

- [ ] Onboarding appears with `?reset=onboarding`
- [ ] Onboarding completion reveals the workspace
- [ ] Briefing opens
- [ ] Runtime opens
- [ ] TrustMap opens
- [ ] Evidence opens
- [ ] Proof Pack opens
- [ ] Architecture opens
- [ ] Settings opens
- [ ] No required primary user flow is hidden behind stale navigation

## 3. Runtime checks

- [ ] Scenario switching works
- [ ] Runtime scores update
- [ ] Decision outcome updates
- [ ] Owner updates
- [ ] Runtime evidence state updates
- [ ] Replayable Decision Record updates
- [ ] No freezing or slow tab switching

## 4. TrustMap checks

- [ ] TrustMap nodes render
- [ ] TrustMap nodes are clickable
- [ ] Selected-node panel updates
- [ ] Relationship confidence appears if the current build requires it
- [ ] Weak-link indicators appear where intended
- [ ] Runtime scenario context affects TrustMap content
- [ ] TrustMap remains usable on desktop, tablet, and mobile
- [ ] Lines, nodes, icons, and labels do not create unreadable overlap at common breakpoints

## 5. Reports / Proof Pack checks

- [ ] Proof Pack renders
- [ ] Proof Pack reflects selected scenario
- [ ] Proof Pack reflects audience or report recipient where applicable
- [ ] Proof Pack includes decision, rationale, evidence, owner, consequence, and next action
- [ ] Copy/download works locally where implemented
- [ ] No unsupported audit-ready or enforcement claims are made

## 6. Evidence and persistence checks

- [ ] Evidence packet renders
- [ ] Evidence packet reflects current scenario
- [ ] Manual evidence artifacts accumulate where implemented
- [ ] Evidence export works locally where implemented
- [ ] Admin payload remains hidden in Settings/Admin if included
- [ ] No hidden network calls were added
- [ ] No live sync is implied unless actually implemented and approved

## 7. Pilot and adoption checks

- [ ] Commercial wedge remains visible
- [ ] Pilot or assessment path remains visible
- [ ] Prototype boundary remains visible
- [ ] CTA language is executive-grade and not cheesy
- [ ] No user-facing named-individual mode appears unless explicitly approved

## 8. V45-V50 Executive Authority checks

For any V45-V50 build, verify:

- [ ] First screen answers risky action, decision, consequence, and next action within 9 seconds
- [ ] Briefing leads with consequence before architecture
- [ ] Language is short, calm, and decisive
- [ ] Pressure Points appear if V45 or later has been implemented
- [ ] Trust scores show reducers and improvers if V46 or later has been implemented
- [ ] Runtime shows evidence used, evidence missing, owner required, consequence avoided, and proof generated if V46 or later has been implemented
- [ ] Executive Commitment Record appears if V47 or later has been implemented
- [ ] Commitments include owner, due date, status, Proof Pack impact, and escalation path if V47 or later has been implemented
- [ ] TrustMap power network appears if V48 or later has been implemented
- [ ] Before Consequence moment appears if V49 or later has been implemented
- [ ] Proof Pack feels like the authority artifact if V49 or later has been implemented
- [ ] V50 external-demo readiness test passes before any external executive demo

## 9. Quality checks

- [ ] No new top-level tabs unless absolutely necessary
- [ ] No dead buttons
- [ ] No dead bubbles
- [ ] No repeated filler cards
- [ ] No stale version names
- [ ] No production overclaiming
- [ ] No chatbot-first drift
- [ ] No manipulation, artificial fear, or unsupported pressure
- [ ] No external integrations added without owner approval

## 10. Final release note

Before ending a build, report:

- version label
- commit list
- test URL
- what changed
- what was not changed
- known issues
- next required input, if any
