# CyberShield Release Checklist

Purpose: Use this checklist before calling any CyberShield build complete.

## 1. Version identity

- [ ] Current build label is clear
- [ ] `index.html` reflects the current version
- [ ] `bots.txt` reflects the current version
- [ ] `governance-summary.json` reflects the current version
- [ ] `README.md` reflects the current version
- [ ] Relevant `docs/` file exists or was updated
- [ ] `docs/successor-builder-handoff-and-job-docket.md` was updated if strategy, roadmap, risk, or operating instructions changed

## 2. Core product regression

- [ ] Onboarding appears with `?reset=onboarding`
- [ ] Onboarding completion reveals the workspace
- [ ] Briefing opens
- [ ] Runtime opens
- [ ] TrustMap opens
- [ ] Reports opens
- [ ] Adoption opens
- [ ] Pilot opens
- [ ] Settings opens
- [ ] Advanced navigation opens

## 3. Runtime checks

- [ ] Scenario switching works
- [ ] Runtime scores update
- [ ] Decision outcome updates
- [ ] Owner updates
- [ ] Runtime governance feed updates when simulation runs
- [ ] No freezing or slow tab switching

## 4. TrustMap checks

- [ ] TrustMap nodes render
- [ ] TrustMap nodes are clickable
- [ ] Selected-node panel updates
- [ ] Relationship confidence appears
- [ ] Weak-link indicators appear where intended
- [ ] Runtime scenario context affects TrustMap content
- [ ] TrustMap remains usable on desktop, tablet, and mobile

## 5. Reports checks

- [ ] Report catalog renders
- [ ] Report body changes by report selection
- [ ] Report content reflects current scenario
- [ ] Report content reflects audience where applicable
- [ ] Copy report works locally
- [ ] Download text works locally
- [ ] Download markdown works locally
- [ ] Download JSON works locally

## 6. Evidence and persistence checks

- [ ] Evidence packet renders
- [ ] Evidence packet reflects current scenario
- [ ] Evidence export works locally
- [ ] Buyer payload renders
- [ ] Technical payload renders
- [ ] Advisory summary renders
- [ ] Pilot scope payload renders
- [ ] Report bundle payload renders
- [ ] No hidden network calls were added

## 7. Pilot and adoption checks

- [ ] Adoption tab still explains buyer fit
- [ ] First paid wedge remains visible
- [ ] Pilot package renders
- [ ] Pilot one-pager renders
- [ ] Pilot one-pager copy/download works
- [ ] Prototype boundary remains visible

## 8. Quality checks

- [ ] No new top-level tabs unless absolutely necessary
- [ ] No dead buttons
- [ ] No dead bubbles
- [ ] No repeated filler cards
- [ ] No stale version names
- [ ] No production overclaiming
- [ ] No chatbot-first drift
- [ ] No external integrations added without owner approval

## 9. Final release note

Before ending a build, report:

- version label
- commit list
- test URL
- what changed
- what was not changed
- known issues
- next required input, if any
