# CyberShield Security Build Hygiene

Date: 2026-05-28
Baseline: V51.1 Executive Story and CTA Cleanup

## Purpose

CyberShield is a security and governance product.  The build process must practice the discipline the product sells.

## Baseline rules

- Do not store secrets in the repo
- Do not place private keys or service credentials in browser code
- Do not ask public demo users to enter confidential or regulated data
- Do not store real customer confidential data in browser local storage
- Review new third-party scripts before adding them
- Keep exported reports honest about prototype limitations
- Keep capability labels clear: available now, assessment driven, analyst assisted, preview, planned, or not yet implemented
- Do not claim live integrations unless implemented and tested
- Do not claim production-grade controls unless implemented and tested

## Public demo data rule

Public demo text should remind users to use demo-safe information only.

Recommended copy:

Use demo-safe information only.  Do not enter regulated, confidential, customer-sensitive, or proprietary information into this public prototype.

## Pre-sale readiness items

Before first paid pilot or sale, complete:

- data handling policy
- customer data boundary
- authentication plan
- logging and audit plan
- integration credential handling plan
- report disclaimer and boundary language
- basic source review
- repo secret review
- release checklist review

## Builder checklist

Before accepting any security-sensitive build, verify:

- no secrets were added
- no unreviewed third-party scripts were added
- public demo data boundary is clear
- report limitations are visible
- prototype/pilot/production boundary is clear
- no live capability is implied without implementation
