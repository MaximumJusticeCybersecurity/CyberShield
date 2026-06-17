# CyberShield Decision Assurance Requirements

Date: 2026-06-17
Owner: Dr. Max Justice
Target: Next vendor-risk build
Audience: Engineer, architect, builder, advisor reviewers

## 1. Purpose

This document is the product requirements source for the next CyberShield build.  It consolidates founder feedback, business partner feedback, operator feedback, Aegis architecture input, and engineering questions into one buyer-facing CyberShield direction.

The first visible build must make the vendor-risk demo work end to end.  Everything else is subordinate.

## 2. North Star

Before relying on AI, CyberShield shows whether the recommendation is defensible.

Working product flow:

AI-generated recommendation in.  Defensible Trust Decision Record out.

## 3. Product Boundary

CyberShield is the commercial AI Decision Assurance product.

Aegis is the broader trusted partner and agency architecture.  Aegis should remain internal for this build.  The public CyberShield demo should not require the buyer to understand Aegis.

Acceptable internal language:

CyberShield is built from the Aegis trust architecture.

Public demo language should focus on the buyer problem:

Before relying on AI, know whether the recommendation is defensible.

## 4. First Visible Build Priority

The first visible build must support one complete loop:

1. Visitor enters first name, optional company, and optional vendor.
2. Visitor selects a contradiction type.
3. CyberShield displays an AI-generated vendor-risk recommendation.
4. CyberShield extracts claims.
5. CyberShield identifies material claims.
6. CyberShield maps required evidence.
7. CyberShield shows synthetic evidence.
8. CyberShield identifies missing, weak, stale, self-attested, or contradictory evidence.
9. CyberShield runs validator checks.
10. CyberShield compares candidate actions.
11. CyberShield recommends Request Evidence.
12. CyberShield triggers Escalate for Review.
13. CyberShield classifies Risk If Wrong.
14. CyberShield assigns a Confidence Band.
15. CyberShield requires human review.
16. CyberShield generates a polished Trust Decision Record.
17. Visitor enters email only when generating, printing, or downloading the report.
18. Metadata plus full structured record JSON is prepared for Google Sheet capture.

Do not prioritize TrustMap, Runtime, multi-industry demos, generic dashboards, or broad platform expansion until this works.

## 5. Above-the-Fold Landing Page Requirements

The first screen must answer four questions in 15 to 30 seconds:

1. Who is this for?
2. What problem does it solve?
3. What do I put in?
4. What do I get out?

Hero line:

Before relying on AI, know whether the recommendation is defensible.

Subheadline:

CyberShield turns AI-generated recommendations into clear decision records showing claims, evidence, gaps, Risk If Wrong, confidence, and required human review.

Primary CTA:

Try a Vendor-Risk Sample

Secondary CTA:

Request a Demo

Tertiary link:

Contact Maximum Justice Cybersecurity

## 6. Who It Is For

Add a section titled:

Built for teams that must defend AI-influenced decisions

Initial buyer groups:

- Vendor-risk teams
- GRC and compliance teams
- CISOs and vCISOs
- Security reviewers
- AI governance leaders
- Executives reviewing high-impact AI recommendations

Do not position the first version as a general business-user product.

## 7. When to Use CyberShield

Add this section:

Use CyberShield before relying on AI to:

- Approve a vendor
- Accept a security risk
- Submit a compliance response
- Rely on an AI-generated executive summary
- Act on an AI-generated recommendation
- Send a customer-facing answer based on AI output

## 8. Why Add CyberShield

Add this section:

Why add CyberShield before relying on AI?

CyberShield helps teams:

- Save time finding weak assumptions
- Expose missing evidence faster
- Catch unsupported conclusions before action
- Know when human review is required
- Create a defensible record before the decision is challenged
- Reduce costly mistakes from polished but unsupported AI output
- Skip the blank-page review

The product should not feel like added bureaucracy.  It should feel like a faster way to produce a defensible decision.

## 9. How It Works Strip

Add a simple strip near the top:

1. Paste an AI recommendation.
2. CyberShield breaks it into claims.
3. Evidence gaps and assumptions are exposed.
4. Risk If Wrong is classified.
5. Human review is triggered where needed.
6. A Trust Decision Record is created.

## 10. Language Rules

Avoid acronyms in the executive demo.

Do not use:

- ATDR
- Prototype V1
- Build number
- Internal version number
- Trust score
- Safe or unsafe as the primary decision label
- Good or bad as the primary decision label
- Operational trust control plane above the fold
- Runtime governance above the fold
- Aegis as a public landing page concept

Use:

- Trust Decision Record
- AI Trust Decision Record
- AI Decision Assurance
- AI Recommendation Review
- Decision Readiness
- Strongest Defensible Action
- Risk If Wrong
- Confidence Band
- Evidence Gaps
- Contradictory Evidence
- Validator Checks
- Human Review Required
- Before relying on AI
- Evidence before action

No visible prototype or build version numbers should appear in the application or user-facing reports.  Internal docs may use dates and target labels.

## 11. Onboarding and Personalization

The demo begins with lightweight onboarding.

Fields:

- First name
- Company or organization, optional
- Vendor or technology provider under review, optional

Do not prefill the visitor's name.

If first name is blank, use:

Welcome to CyberShield.

If first name is entered, use:

Hello, [First Name].  Let us review whether this AI-generated vendor recommendation is defensible enough for enterprise action.

If company is blank, use:

your company name would go here

If vendor is blank, use:

vendor name would go here

Use session storage for the first build.  Use local storage only if a Remember this for next time option is added.  Include Reset Demo.

## 12. Vendor Personalization

Do not hard-code ApexAI Cloud Services as the only demo vendor.

If a visitor enters a vendor name, use it across the recommendation, claims, evidence, Decision Brief, Trust Decision Record, report title, report subject line, and Google Sheet payload.

If vendor is blank, use:

vendor name would go here

Optional sample button:

Use Sample Vendor

If selected, populate:

ApexAI Cloud Services

Service description:

AI-enabled customer support analytics platform

The vendor should handle both customer data and regulated data.

## 13. Primary Demo Recommendation

If vendor entered:

AI recommends approving [Vendor Name] because they have a SOC 2 report, encrypt customer data, and appear low risk.

If vendor blank:

AI recommends approving [vendor name would go here] because they have a SOC 2 report, encrypt customer data, and appear low risk.

CyberShield must extract claims including:

- Vendor should be approved
- Vendor has a SOC 2 report
- SOC 2 report is current
- SOC 2 report covers the relevant service
- Vendor encrypts customer data
- Vendor customer data access is acceptable
- Vendor is low risk
- SOC 2 plus encryption is sufficient for approval

CyberShield must flag SOC 2 plus encryption is sufficient for approval as an unsupported leap unless sufficient evidence exists.

## 14. Contradiction Type Selection

Prompt:

Choose the evidence issue CyberShield should evaluate:

Options:

1. SOC 2 Scope Conflict
2. Data Use Conflict
3. Subprocessor Gap
4. Incident Notification Weakness
5. Show All Evidence Issues

Default:

Show All Evidence Issues

The demo must remain coherent if the visitor selects only one contradiction type.

## 15. Synthetic Evidence Repository

Create realistic synthetic evidence for the first demo:

- SOC 2 report summary
- SOC 2 scope excerpt
- Encryption architecture note
- Data Processing Agreement
- Subprocessor list
- Incident notification clause
- Vendor security questionnaire excerpt
- Privacy policy excerpt
- Cloud hosting overview
- Access control policy excerpt
- Customer data flow note
- Prior risk exception note
- Procurement approval draft
- Business owner comment
- Security reviewer note

Each item should include evidence ID, title, type, source type, date, freshness, scope status, independence status, self-attestation flag, synthetic demo data flag, relevant claims, contradiction flag, and summary.

Synthetic evidence must be internally marked as synthetic.  Do not present fake evidence as real third-party documentation.

## 16. Required UI Sections

Required sections:

- Landing
- Intake
- Claims
- Evidence
- Validator Checks
- Gaps and Contradictions
- Candidate Actions
- Risk If Wrong
- Confidence
- Human Review
- Decision Record
- Export

Use a persistent Decision Brief panel that answers:

- Can I act on this?
- Why or why not?
- What is missing?
- What contradicts the recommendation?
- Which validators failed?
- Who needs to review it?
- What action is most defensible?
- Is the record export-ready?

Default Decision Brief:

Decision Readiness: Not Defensible Yet
Strongest Defensible Action: Request Evidence
Escalation Triggered: Yes
Risk If Wrong: High
Confidence Band: Low Confidence
Primary Issue: The vendor approval recommendation depends on claims that are unsupported, incomplete, or contradicted.
Top Contradiction: Vendor assurance language conflicts with contractual data-use permissions.
Review Required: Vendor-Risk Owner, Security SME, Legal Counsel
Export Status: Executive brief ready with limitations

## 17. Email Capture

Do not ask for email during onboarding.

Ask for email only when the visitor chooses to generate, download, print, send, or save the final Trust Decision Record.

Modal title:

Generate Trust Decision Record

Modal copy:

To generate, download, print, or send this executive report, enter your email address.

Consent copy:

CyberShield will use this email to associate your Trust Decision Record with this demo request.

Validate email format.  Do not block the demo walkthrough before this step.

## 18. Report Output

Minimum first implementation:

1. Generate report view on screen.
2. Allow browser print.
3. Allow PDF download or browser print-to-PDF.

Client-side PDF and DOCX generation may follow after the vendor-risk loop works.

Browser print must print only the report, not the app interface.

## 19. Out-of-Scope Handling

If input is outside vendor-risk, security-risk, or compliance/control recommendation review, show:

This demo is intentionally focused on AI-generated vendor-risk, security, and compliance recommendations.  Your input appears outside the current demo scope.

Primary CTA: Try Vendor-Risk Sample
Secondary CTA: Request a Demo
Tertiary link: Contact Maximum Justice Cybersecurity

Use Out of Scope for Current Review.  Do not say rejected.

## 20. Success Criteria

Build succeeds when a non-technical operator can explain CyberShield back as:

It helps you check whether an AI recommendation is safe or defensible to rely on before you act.

Build also succeeds when the vendor-risk workflow produces a polished Trust Decision Record and the viewer understands that the AI recommendation sounded reasonable but was not defensible without more evidence and human review.
