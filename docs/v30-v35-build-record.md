# CyberShield V30-V35 Build Record

Date: 2026-05-26
Builder: Builder-20260526-003, GPT-5.5 Thinking

## Scope

This record documents the implementation path from V30 through V35. The live app is released as a consolidated V35 prototype because the platform is static and each intermediate version was folded into the final integrated build.

## V30: TrustMap usability and executive de-branding cleanup

Built:

- Removed version/release-train language from the executive dashboard
- Kept build metadata in Settings/Admin only
- Added hoverable TrustMap line explanations
- Added TrustMap legend for green, yellow, and red lines
- Preserved the website-aligned model: Assess Exposure, Analyze Runtime Risk, Deliver Control

Acceptance check:

- User-facing dashboard avoids visible build/version labels
- TrustMap lines contain tooltip rationale through SVG path data-tip attributes
- Settings contains build metadata

## V31: Decision engine depth and rationale trace

Built:

- Added explicit decision thresholds for Allow, Allow with Constraints, Escalate, and Block
- Added runtime decision rationale text
- Added scoring dimensions for trust, evidence, policy, authority, and consequence
- Connected TrustMap edge color logic to decision outcome and scenario effect

Acceptance check:

- Runtime view shows threshold logic
- Runtime view shows decision rationale and next action
- TrustMap edge colors derive from the current scenario and score conditions

## V32: Executive Proof Pack and board output upgrade

Built:

- Added Executive Proof Pack view
- Added copy/download support for proof pack text
- Added role-specific reports for CEO/President, CFO, CIO/CTO, and CISO/vCISO
- Added TrustMap snapshot narrative in the Proof Pack view

Acceptance check:

- Proof Pack renders from current decision state
- Reports vary by audience role
- Report copy/download controls are present

## V33: CRM-lite workflow and lead/pilot payloads

Built:

- Added CRM-Lite view
- Added lead/company/email/source inputs
- Added readiness score and recommended offer logic
- Added CRM JSON payload generation
- Added CSV copy support using Google Sheets-compatible column order

Acceptance check:

- CRM payload renders
- Copy CSV button exists
- Download JSON button exists
- No live CRM sync is performed from the browser

## V34: Mock evidence source layer

Built:

- Added Evidence Layer view
- Added mock evidence source selector for SharePoint, OneDrive, and Outlook-style artifacts
- Added evidence confidence control
- Connected evidence confidence to decision scoring through local evidence state

Acceptance check:

- Evidence packet renders as JSON
- Evidence is local/mock only
- Applying evidence changes scoring and downstream decision state

## V35: Controlled backend decision build

Built:

- Added Backend view
- Added backend decision matrix
- Added consent/transmission model text
- Kept live app static and export-oriented
- Preserved Google Sheets CRM as row payload only

Acceptance check:

- Backend decision matrix renders
- Settings shows the internal build label
- Executive dashboard does not show the version label
- No hidden network calls were added

## Static build constraints

The app remains a static GitHub Pages prototype. It does not include authentication, production enforcement, live CRM sync, live Microsoft 365 integration, live telemetry ingestion, or controlled backend persistence.

## Manual QA still required

Manual QA is still required in Firefox, Chrome/Brave, and mobile browsers. The builder performed static code-level checks through repository inspection and reduced implementation complexity after connector safety blocking on larger HTML payloads.
