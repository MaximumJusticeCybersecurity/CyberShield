# CyberShield Product Invariants

Date: 2026-05-28
Baseline: V51.1 Executive Story and CTA Cleanup

## Purpose

Product invariants are rules future builders must not break without explicit approval.

## Invariants

1. CyberShield is an executive operational visibility and coordination system, not a generic dashboard.

2. Cybersecurity is the wedge.  Operational visibility and governance coordination are the larger category.

3. No new top-level tabs unless explicitly approved.

4. Build/version labels stay out of executive-facing UI.  They belong in Settings/admin metadata and repo docs.

5. TrustMap is the flagship memory surface and must not be treated as a secondary diagram.

6. Every score must route to a model explanation.

7. Every visible interactive object must explain, route, calculate, download, or trigger next step.

8. No dead clicks.

9. Shared engine, tailored lens.  Do not create separate products for each industry.

10. Public demo fast path and pilot deep path must both exist conceptually.

11. Industry demos must be credible to experienced operators.

12. Primary CTAs remain CyberShield Authenticity Trust Assessment and CyberShield Operational Trust Assessment unless changed intentionally.

13. Every report/export must include boundary language and model/version context when applicable.

14. Do not overclaim live enforcement, takedown automation, marketplace scanning, ad-platform enforcement, identity verification, CRM sync, ticketing, notifications, SIEM/EDR/IAM/GRC integration, or production agent blocking.

15. Scores are advisory and directional unless validated otherwise.

16. The repo is the institutional memory.  Important decisions must be documented.

17. Avoid sci-fi cyber theater.  Use calm, institutional, operational-map aesthetics.

18. Preserve the first-9-seconds standard: risky action, CyberShield decision, why it matters, what happens next.

19. Preserve the rent-free memory requirement: executives should leave thinking they may lack enough operational visibility into cyber and AI decision-making.

20. Do not add large hardcoded logic to `index.html` when a registry, model, module, or separate JS file should own it.

## Invariant change rule

If a builder believes an invariant must change, document:

- what invariant changes
- why it changes
- risks created
- files updated
- approval or rationale

Then update this file and builder-version-log.
