# CyberShield V29 Decision Record

> **Historical decision record.**  This document preserves the May 2026 V29 architecture and persistence decisions.  It is not the current build authority.  For current routes, record architecture, build order, and Google Sheet source of truth, use `docs/ARCHITECT-ENGINEER-START-HERE.md`, `docs/architecture-library-status.md`, `docs/2026061909-forward-build-plan.md`, and `src/atdr/report-capture-config.js`.

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

This Sheet reference is historical and must not override the current configured Sheet ID.

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
