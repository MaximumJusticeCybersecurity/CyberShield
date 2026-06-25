# Requirements Steward Packet: Trust-Led Conversion Implementation

Version timestamp: 2026062510  
Task ID: `2026062510-trust-led-conversion-implementation`  
Owner and final human authority: Dr. Max Justice  
Requirements steward: Aegis / My AI Business Partner  
Repository: `MaximumJusticeCybersecurity/CyberShield`  
Baseline commit: `fb4ea57d640c47c54a1733d51ffbe88321ad3a18`  
Decision: **Proceed with constraints**

## 1. Problem statement

CyberShield's current public landing and preferred vendor-risk route explain the Decision Assurance concept but still divide attention across internal review routes, expose implementation and capture details, request reviewer information before showing the first useful insight, and end with product-function buttons rather than a clear customer action.

The conversion path must move the buyer from a concrete AI-generated recommendation to visible evidence problems, a useful AI Trust Decision Record, a real-recommendation review request, and a controlled pilot conversation without weakening human authority or overstating product maturity.

## 2. Intended users

   - CISOs and vCISOs.
   - Vendor-risk and third-party-risk teams.
   - GRC and compliance leaders.
   - Security reviewers.
   - AI governance leaders.
   - Executives accountable for high-impact AI-influenced decisions.

## 3. Non-users

   - General consumers.
   - Buyers seeking autonomous vendor approval.
   - Buyers seeking compliance certification.
   - Buyers expecting a finished multi-tenant production SaaS platform.
   - Users seeking broad TrustMap or runtime-control functionality in this build.

## 4. Desired customer journey

```text
Recognize a risky AI-generated recommendation
-> judge whether it sounds actionable
-> see the evidence contradiction
-> inspect claims, validators, Risk If Wrong, and human-review needs
-> receive a useful AI Trust Decision Record
-> review one real recommendation
-> explore a controlled 3-to-5 recommendation pilot
```

## 5. Approved content decisions

### Primary customer action

```text
Challenge One AI Recommendation
```

### Secondary customer action

```text
See the 3-Minute Vendor-Risk Example
```

### Final customer actions

```text
Review One of My Recommendations
Explore the 3-to-5 Recommendation Pilot
```

### Required trust language

```text
No integration required for the initial review.  No autonomous approval.  Your organization retains the decision.
```

### Required demonstration limitation

```text
Controlled demonstration using synthetic vendor evidence.  CyberShield does not approve vendors or replace accountable human review.
```

### Required AI-judging-AI explanation

CyberShield shall explain that it does not treat a second model's opinion as proof.  It separates claims, maps evidence, exposes missing and contradictory support, applies defined checks, classifies Risk If Wrong, and preserves the accountable human decision.

## 6. Exact implementation scope

### Required files

   - `index.html`
   - `vendor-risk-next.html`
   - `pilot-package.html`
   - `src/vercel-analytics.js`
   - `docs/2026062312-vercel-web-analytics.md`
   - `route-manifest.json`
   - `docs/requirements-traceability-matrix.md`
   - `docs/builder-version-log.md`

Additional files may be changed only when required to keep links, tests, or manifests consistent and must be listed in the completion packet.

### Landing page changes

   - Remove the automatic 18-second redirect.
   - Replace competing primary CTAs with one primary and one secondary CTA.
   - Remove buyer-facing links to review packages, fallback demos, internal routes, and generic demo requests from the hero.
   - Replace internal release and redirect language with the approved demonstration limitation.
   - Add the AI-judging-AI explanation.
   - Add a concise Dr. Max Justice credibility block.
   - Link to the controlled pilot page.

### Preferred vendor-risk route changes

   - Change the first visible step from reviewer/company/vendor intake to the AI recommendation and a buyer judgment prompt.
   - Provide three response choices: `Probably`, `I would ask for more evidence`, and `I am not sure`.
   - Reveal the evidence problem before requesting reviewer, organization, or vendor personalization.
   - Move personalization to a later optional step.
   - Remove `Experimental route`, fallback-route, Google Sheet ID, capture endpoint, build, MutationObserver, and internal QA language from the buyer-facing side panel.
   - Retain truthful capture behavior and row-verification language only in status feedback after a capture action.
   - Replace `Save Follow-Up` as the dominant final action with the real-recommendation review and pilot CTAs while retaining print and JSON functions.
   - Preserve Risk If Wrong, confidence, validator, candidate-action, human-review, report, and signature logic.

### Pilot page changes

   - Remove the `Internal QA` link.
   - Link to the preferred vendor-risk example.
   - Add the buyer-effort and deliverables agreed in the current requirements.
   - Add an application or scope-conversation CTA without publishing unapproved pricing or delivery timing.
   - State: `Pilot pricing and delivery schedule are confirmed after scope review.`
   - Preserve the controlled advisory and non-production limitations.

### Conversion measurement

Define and instrument these events without collecting recommendation text, evidence, email, or other sensitive content in analytics payloads:

   - `example_started`
   - `buyer_judgment_selected`
   - `evidence_problem_viewed`
   - `decision_record_viewed`
   - `real_recommendation_review_clicked`
   - `pilot_clicked`
   - `report_print_clicked`
   - `report_json_downloaded`

The implementation shall provide a small static-site tracking helper that:

   - Emits a browser `cybershield:conversion` CustomEvent for local verification.
   - Queues a Vercel Analytics custom event only when the supported browser analytics function is available.
   - Sends no recommendation, evidence, name, company, vendor, email, record ID, or Sheet ID.
   - Fails silently without breaking the customer journey.

A custom event appearing in local browser instrumentation is not proof that Vercel received or stored it.  Production receipt must be verified separately before claiming analytics success.

## 7. Explicitly out of scope

   - Changing claim extraction.
   - Changing validator outcomes.
   - Changing Risk If Wrong or confidence logic.
   - Changing the recommended action from `Request Evidence`.
   - Changing the AI Trust Decision Record schema.
   - Replacing or removing preserved fallback routes.
   - Changing Google Apps Script, Sheet schema, or capture backend.
   - Publishing exact pilot pricing or delivery timing.
   - Production authentication, persistence, or tenant isolation.
   - TrustMap, runtime agents, broad dashboards, or multi-industry expansion.
   - Deployment or public release.

## 8. Security and privacy constraints

   - Do not expose Sheet IDs, endpoints, or implementation details on public pages.
   - Do not add production credentials or secrets.
   - Do not send entered recommendation or evidence content to analytics.
   - Do not change capture destinations or consent behavior.
   - Do not imply that browser submission proves downstream capture.
   - Preserve synthetic-evidence labeling.
   - Preserve accountable human review.

## 9. Verification plan

### Static checks

   - Search public files for prohibited phrases and identifiers.
   - Validate links and route destinations.
   - Validate changed JavaScript syntax.
   - Confirm JSON manifests parse.
   - Confirm the Vercel page-view loader remains present.

### Behavioral checks

   - Landing page has no forced redirect.
   - Landing primary CTA opens the preferred vendor-risk route.
   - Landing secondary CTA starts or clearly opens the three-minute example.
   - The first vendor-risk screen shows the AI recommendation before personal fields.
   - Each judgment choice advances without losing the selected response.
   - Personalization remains optional and occurs after initial value.
   - The evidence, review, decision, and record stages still render.
   - Print and JSON export still work.
   - Capture status remains truthful.
   - Real-recommendation and pilot CTAs point to approved destinations.
   - Conversion events can be observed locally without sensitive payload fields.
   - Mobile and desktop layouts remain usable.

### Regression checks

   - `Request Evidence` remains the strongest defensible action.
   - Risk If Wrong remains High for the controlled example.
   - Confidence remains Low.
   - Human review remains required.
   - Synthetic evidence remains clearly labeled.
   - Stable fallback route remains intact.
   - Vercel analytics page-view integration remains intact.

## 10. Human validation zones

Dr. Max Justice must approve before:

   - Merge of the implementation pull request.
   - Deployment or public release.
   - Exact pilot price or delivery commitment.
   - New claims about customer outcomes, ROI, safety, compliance, or production maturity.
   - Any material change to the approved headline, CTA hierarchy, credibility statement, or limitation language.

## 11. Definition of done

The implementation is done when:

   - The exact customer journey is implemented on a review branch.
   - Public internal-route and capture leakage is removed.
   - Value precedes unnecessary data capture.
   - The primary and final CTAs are consistent.
   - The pilot page is publicly legible but does not publish unapproved terms.
   - Analytics instrumentation is privacy-minimized and locally observable.
   - Static, behavioral, regression, mobile, and desktop checks are documented.
   - No product decision logic changes.
   - A reviewable pull request and completion packet are prepared.
   - No deployment or public release occurs without explicit owner approval.

## 12. Builder decision

**Proceed with constraints.**

Create implementation branch:

```text
agent/2026062510-trust-led-conversion
```

Return a completion packet and pull request for human review.  Do not merge or deploy the implementation autonomously.
