# CyberShield V29 Decision Record

Decision date: 2026-05-26

Decision owner: Dr. Max Justice

Builder: Builder-20260526-002, GPT-5.5 Thinking

CyberShield version: V29 Integration Readiness and Performance Stabilization

## Objective

V29 stabilizes the static prototype and converts integration decisions into an executable readiness layer without adding live sync, hidden calls, or production enforcement claims.

## First persistence route

Decision: GitHub file-based persistence for demo/admin only.

Rationale: This creates a low-cost, auditable demo/admin persistence path without introducing credentials, live client data, or a premature backend.

Data allowed:

- non-sensitive demo records
- readiness review records
- pilot scope records
- governance summary snapshots
- decision records
- CRM-lite row payloads

Data not allowed:

- secrets
- credentials
- regulated data
- customer-sensitive records
- live telemetry
- SIEM, EDR, GRC, identity, or Microsoft 365 exports containing sensitive data

## Google Sheets CRM decision

Decision: Google Sheets CRM is the CRM-lite direction.

Spreadsheet target: CyberShield Google Sheets CRM

Spreadsheet URL: https://docs.google.com/spreadsheets/d/1B4bAykvCN_zi7_oJuvhasq33pHPgGnRPMRwpzO1r-Vw/edit?usp=sharing

Required columns:

- Created Date
- Lead Name
- Company
- Role
- Email
- Phone
- Source
- Buyer Type
- Pain Point
- Compliance Driver
- AI Governance Interest
- Readiness Score
- Recommended Offer
- Next Action
- Owner
- Status
- Notes
- Last Updated
- Data Boundary
- Source Tool
- Evidence Link

Append rule: Append-only for new leads.  Updates should preserve historical notes until a stronger CRM workflow exists.

Sensitive data restriction: Do not use the CRM for secrets, regulated records, or client telemetry.

## Microsoft 365 decision

Decision: SharePoint, OneDrive, and Outlook are future mockable evidence sources only.

Read-only systems for future prototype planning:

- SharePoint policy artifacts
- OneDrive evidence artifacts
- Outlook meeting evidence
- Outlook decision or approval emails

Write-capable systems: none in V29.

Excluded systems for V29:

- live Microsoft Graph integration
- Teams
- Entra ID
- Purview
- email scraping
- background sync

Rationale: V29 should show the evidence model without creating security, privacy, or integration risk.

## CRM direction

Decision: Google Sheets first.

Rationale: Maximum Justice Cybersecurity does not need a heavy CRM before the lead flow and offer structure mature.  Google Sheets gives Dr. Max Justice a low-cost, visible, editable CRM-lite foundation.

Minimum required fields are the column set listed above.

## Data handling boundary

Local browser storage allowed: demo context, local governance memory, selected scenario, and exportable payloads.

Export allowed: non-sensitive JSON, text, markdown, and CRM row payloads.

Backend storage allowed: none from the browser in V29.

Never store or transmit: secrets, regulated data, credentials, raw client telemetry, protected health information, financial account data, legal privileged content, or customer-sensitive records.

Sensitive customer data rule: summarize at the category level only.

Demo-only rule: all telemetry in V29 is simulated unless explicitly labeled as user-provided evidence.

## Identity assumptions

Authentication model: none, demo only.

Decision: V29 models CEO, CFO, and CISO/vCISO decision roles without user login.

Rationale: The goal is executive decision structure and pilot readiness, not production identity management.

Minimum identity fields:

- first name
- organization
- role
- audience
- owner

Role model:

- CEO / President
- CFO
- CIO / CTO
- CISO / vCISO

Dr. Max Justice remains positioned as vCISO, Security SME, Cybersecurity SME, U.S. veteran, and creator of The CHN vCISO GPT powered by Cyber Shield.

## Evidence sources

Decision: Manual answers plus uploaded or linked evidence placeholders.

Evidence source priority:

1. manual self-assessment answers
2. non-sensitive policy/control artifacts
3. SharePoint/OneDrive mock artifact references
4. Outlook meeting evidence placeholders
5. simulated telemetry clearly labeled as simulated

Evidence fields required:

- source type
- owner
- confidence
- policy relationship
- decision relationship
- data sensitivity
- retention boundary

Evidence confidence rule: low, medium, or high confidence must be explicit.  Unknown confidence defaults to medium or low, never high.

## AI tools to govern first

Decision:

- ChatGPT / custom GPTs
- Microsoft Copilot
- MJC sales agent

First governed workflows:

- AI vendor payment authorization
- AI-generated client communication
- privileged access reset request
- recovery validation automation
- shadow AI sensitive data upload
- MJC sales agent prospect qualification

Why these workflows first: They map directly to executive consequence, security governance, advisory sales, and the first MJC commercial wedge.

## Security and privacy requirements

Required controls:

- explicit user consent before any transmission in future versions
- no sensitive data in demo mode
- clear prototype boundary
- export-only mode remains available
- deletion or reset process exists through browser localStorage reset
- audit-style local decision log exists
- role-based access is considered for future builds

Additional requirements:

- no hidden network calls
- no direct browser write to GitHub
- no direct browser write to Google Sheets
- no production enforcement claim
- no chatbot-first positioning

## V29 acceptance criteria

V29 is acceptable only if:

- it documents the chosen persistence route
- it documents data handling boundaries
- it documents identity assumptions
- it documents first evidence sources
- it documents first governed AI tools
- it preserves the V28 executive demo flow
- it adds integration readiness without live sync
- it keeps the prototype boundary clear
- it updates metadata and the job docket
- it reduces browser performance risk

## Explicit non-goals for V29

V29 does not:

- add hidden network calls
- add uncontrolled external sync
- claim production enforcement
- collect sensitive data by default
- require a SaaS backend
- turn CyberShield into a generic CRM
- turn CyberShield into a chatbot
- add live Microsoft 365 integration
- add live CRM sync from the browser

## Final decision summary

Decision: Build V29 as Integration Readiness and Performance Stabilization.

Rationale: CyberShield needs a credible path from static prototype to pilot without pretending it is already production infrastructure.

Approved scope:

- GitHub demo/admin JSON persistence model
- Google Sheets CRM row schema
- Microsoft 365 mock evidence source model
- non-sensitive data boundary
- CEO, CFO, CISO/vCISO identity assumptions
- manual and placeholder evidence model
- ChatGPT/custom GPT, Microsoft Copilot, and MJC sales agent governance scenarios
- performance-oriented static prototype cleanup

Excluded scope:

- production backend
- authentication
- live Microsoft Graph
- live telemetry ingestion
- direct CRM sync from the browser
- sensitive data storage

Next action: QA the live GitHub Pages build, validate Firefox performance, then decide whether V30 should add a controlled backend, Apps Script append flow, or Microsoft Graph prototype.
