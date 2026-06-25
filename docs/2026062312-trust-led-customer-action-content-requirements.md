# CyberShield Trust-Led Customer Action Content Requirements

Version timestamp: 2026062312  
Status: Proposed current content and conversion requirements  
Owner and final human authority: Dr. Max Justice  
Requirements steward: Aegis / My AI Business Partner  
Baseline reviewed: CyberShield `main` at `cecabf277a381d12671a7ebe3e15efc31420ff35`

## 1. Purpose

Define the current buyer-facing content, demonstration, call-to-action, and pilot-conversion requirements for CyberShield.

This document supplements and supersedes conflicting content requirements in `docs/cybershield-decision-assurance-requirements.md`.  It does not change the product's core decision logic or authorize implementation without a task-specific Requirements Steward packet.

## 2. Current product direction

```text
AI-generated recommendation in -> defensible AI Trust Decision Record out
```

First proof point:

```text
AI-generated vendor-risk recommendation in -> defensible AI Trust Decision Record out
```

The record remains the product.  Aegis remains internal for this customer journey.

## 3. Current conversion objective

The customer journey shall move through:

```text
Recognize the decision risk
-> inspect one concrete example
-> challenge one AI recommendation
-> receive a useful decision record
-> explore a bounded 3-to-5 recommendation pilot
```

The primary buyer action is:

```text
Challenge One AI Recommendation
```

The primary CTA shall not be `Generate Your TrustMap`, `Open Review Package`, an internal route name, or a generic `Request a Demo` when a more concrete action is available.

## 4. Above-the-fold requirements

The first screen shall answer:

1. What risky decision is occurring?
2. What does CyberShield examine?
3. What does the buyer receive?
4. What small action can the buyer take now?
5. Who retains decision authority?

Preferred vendor-risk headline:

```text
Before you approve a vendor based on AI, prove the recommendation can survive challenge.
```

Supporting copy shall explain that CyberShield shows:

   - What the AI claimed.
   - What evidence supports each material claim.
   - What evidence is missing, stale, self-attested, scope-limited, or contradictory.
   - What could happen if the recommendation is wrong.
   - Who must review the decision.
   - The strongest defensible next action.

Required trust line:

```text
No integration required for the initial review.  No autonomous approval.  Your organization retains the decision.
```

Primary CTA:

```text
Challenge One AI Recommendation
```

Secondary CTA:

```text
See the 3-Minute Vendor-Risk Example
```

## 5. Value-before-capture requirement

The demo shall show an AI recommendation and invite the buyer to judge it before requesting first name, company, vendor name, email, or meeting commitment.

Recommended first interaction:

```text
AI recommends approving Vendor X because it has a SOC 2 report, encrypts customer data, and appears low risk.

Would your current process approve this recommendation?
```

Response options:

   - Probably.
   - I would ask for more evidence.
   - I am not sure.

The next screen should reveal the evidence problem and explain why the recommendation is not yet defensible.

Name, company, vendor, and email may be requested later when the visitor chooses to personalize a record, review a real recommendation, save follow-up, generate a report, or explore a pilot.

## 6. Buyer-facing language boundary

Remove from public buyer routes:

   - `Experimental route`.
   - `Stable fallback` or route-status language.
   - Google Sheet IDs.
   - Capture endpoint details.
   - Build labels and internal versions.
   - MutationObserver, implementation, or smoke-test language.
   - Internal review-package navigation.
   - Claims that browser submission proves CRM capture.

Approved limitation language:

```text
Controlled demonstration using synthetic vendor evidence.  CyberShield does not approve vendors or replace accountable human review.
```

Internal route, capture, fallback, and verification details remain available only on internal QA surfaces.

## 7. AI-judging-AI objection

Add a visible explanation:

```text
Is this just another AI judging the first AI?

No.  CyberShield does not treat a second model's opinion as proof.  It separates the recommendation into reviewable claims, maps those claims to evidence, identifies contradictions and missing support, applies defined validator checks, classifies Risk If Wrong, and preserves the accountable human decision.
```

Do not claim that every current validator is cryptographic, independent, production-grade, or model-free unless implemented and evidenced.

## 8. End-of-demo conversion requirements

Keep report and JSON functions, but the final screen shall prioritize the customer decision:

```text
Your next decision does not need to remain hypothetical.

Bring one AI-generated recommendation your organization is currently considering.
```

Primary final CTA:

```text
Review One of My Recommendations
```

Secondary final CTA:

```text
Explore the 3-to-5 Recommendation Pilot
```

Explain:

```text
You provide the recommendation and available evidence.  CyberShield produces the claims analysis, evidence-gap assessment, Risk If Wrong, recommended next action, and AI Trust Decision Record.
```

## 9. Public pilot requirements

The pilot may be promoted publicly only as a controlled, software-assisted advisory pilot.

Minimum scope:

   - 3 to 5 AI-generated recommendations.
   - One defined decision domain.
   - Available supporting evidence.
   - One accountable decision owner.

Minimum deliverables:

   - One AI Trust Decision Record per recommendation.
   - Claims and evidence-gap matrix.
   - Risk If Wrong and confidence assessment.
   - Required reviewer and escalation map.
   - Executive findings briefing.
   - Recommended improvements to the buyer's AI-review process.

Required buyer effort:

   - Provide recommendations and available evidence.
   - Identify a decision owner.
   - Participate in kickoff and findings review.

No software integration shall be required for the initial pilot unless separately scoped.

## 10. Commercial terms not yet approved

The following remain proposals and shall not be published without explicit owner approval:

   - `$5,000 for three recommendations`.
   - `$7,500 for five recommendations`.
   - `10 business day` delivery.
   - Discounts, guarantees, urgency, scarcity, or availability statements.

Use:

```text
Pilot pricing and delivery schedule are confirmed after scope review.
```

until the owner approves exact terms.

## 11. Credibility requirements

Add a concise human credibility block without turning the page into a résumé:

```text
Designed by Dr. Max Justice
CISSP, Ph.D., vCISO, and cybersecurity leader with more than 25 years of experience across high-impact federal, healthcare, cloud, and enterprise environments.
```

Link to a fuller MJC biography or credentials page.

Any metric, award, customer, contract, or outcome claim must be verifiable and approved for public use.

## 12. Conversion measurement

Track, without falsely claiming success:

   - Example started.
   - Example completed.
   - Decision record generated.
   - Real recommendation review requested.
   - Pilot inquiry submitted.
   - Qualified conversation scheduled.
   - Pilot accepted.

A browser submission is not proof of downstream capture.  Verify the resulting record before claiming completion.

## 13. Superseded content requirements

These earlier directions are superseded for the primary buyer journey:

   - TrustMap as the primary CyberShield conversion surface.
   - Broad multi-industry demo expansion before vendor-risk conversion works.
   - Asking for first name, company, and vendor before showing the first useful insight.
   - Multiple equal-weight homepage CTAs.
   - Buyer-facing internal route and capture language.
   - Generic `Request a Demo` as the strongest available CTA.

Preserve legacy routes and documents for provenance unless separately authorized for removal.

## 14. Definition of done for implementation

Implementation is complete only when:

   - Public routes contain no internal QA or route-status leakage.
   - The primary CTA is consistent across landing, demo, report, and pilot paths.
   - Value appears before unnecessary data capture.
   - Human authority and limitations are explicit.
   - The AI-judging-AI objection is addressed.
   - Pilot scope is legible and exact pricing remains owner-gated.
   - Mobile and desktop paths are tested.
   - Conversion events are defined and truthfully verified.
   - The source-of-truth, feedback log, route manifest, and requirements traceability are updated.
