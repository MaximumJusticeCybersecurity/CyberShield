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

## Demo Mode tests

- [ ] Start Demo routes to Runtime
- [ ] Next routes in sequence
- [ ] Previous routes backward
- [ ] Reset Demo returns to Briefing
- [ ] Demo side panel step text updates

Expected sequence:

1. Runtime
2. TrustMap
3. Reports
4. Adoption
5. Pilot

## Primary navigation tests

- [ ] Briefing opens
- [ ] Runtime opens
- [ ] TrustMap opens
- [ ] Reports opens
- [ ] Adoption opens
- [ ] Pilot opens
- [ ] Settings opens

## Advanced navigation tests

- [ ] Advanced menu opens
- [ ] Priorities opens
- [ ] Escalation opens
- [ ] Frameworks opens
- [ ] Roadmap opens
- [ ] Memory opens
- [ ] Evidence opens
- [ ] Guidance opens
- [ ] Persistence opens
- [ ] Website opens

## Runtime tests

- [ ] scenario queue renders
- [ ] each scenario can be selected
- [ ] selected scenario updates action title
- [ ] selected scenario updates outcome
- [ ] selected scenario updates owner
- [ ] selected scenario updates scores
- [ ] Run Decision Simulation adds event to feed
- [ ] feed remains readable

## TrustMap tests

- [ ] TrustMap renders nodes
- [ ] TrustMap renders lines
- [ ] node click updates relationship intelligence
- [ ] node click updates selected relationship panel
- [ ] weak-link styling is visible
- [ ] relationship confidence is visible
- [ ] TrustMap remains readable on smaller screens
- [ ] lines do not make the map unreadable

## Reports tests

- [ ] report list renders
- [ ] selecting each report updates center pane
- [ ] owner/audience panel updates
- [ ] copy report works
- [ ] download text works
- [ ] download markdown works
- [ ] download JSON works

## Frameworks tests

- [ ] framework cards render
- [ ] each framework shows evidence needed
- [ ] each framework shows owner
- [ ] each framework shows gap
- [ ] each framework shows affected report

## Memory tests

- [ ] before simulation, empty state is clear
- [ ] after simulation, decision appears in memory
- [ ] owner queue appears
- [ ] evidence gap appears
- [ ] closed-since-last-review placeholder appears

## Evidence tests

- [ ] evidence JSON renders
- [ ] evidence JSON reflects selected scenario
- [ ] TrustMap impact appears in evidence
- [ ] framework gaps appear in evidence
- [ ] copy evidence works
- [ ] download evidence works

## Persistence tests

- [ ] Buyer Payload renders
- [ ] Technical Evidence Payload renders
- [ ] Advisory Summary Payload renders
- [ ] Pilot Scope Payload renders
- [ ] Report Bundle Payload renders
- [ ] copy payload works
- [ ] download payload works
- [ ] local sync log updates
- [ ] no external sync claim appears

## Pilot tests

- [ ] pilot cards render
- [ ] pilot one-pager renders
- [ ] copy one-pager works
- [ ] download one-pager works
- [ ] prototype boundary is visible

## Website tests

- [ ] website modes render
- [ ] website copy renders
- [ ] copy website copy works
- [ ] CTA language remains executive-grade

## Performance checks

- [ ] tab switching is responsive
- [ ] Firefox does not warn that the page is slowing the browser
- [ ] TrustMap does not freeze the page
- [ ] repeated scenario switching does not degrade performance
- [ ] repeated report switching does not degrade performance

## Failure rule

If a build fails onboarding, Runtime, TrustMap, Reports, Adoption, or Pilot, do not ship the next version until the failure is fixed.
