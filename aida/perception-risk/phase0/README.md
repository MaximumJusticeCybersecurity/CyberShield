# AIDA Perception Risk and Decision Invariance Phase 0

Version: `0.1.0-phase0`

This package implements the bounded synthetic, local, read-only, non-production engineering slice from CyberShield issue #46.

## Implemented

- Synthetic perturbation fixture contract.
- Latent Variable Record validator.
- Decision Invariance Profile generator.
- Recorded-output synthetic runner with no model, network, browser, or external action.
- Non-production Trust Decision Record adapter.
- Materiality classification for:
  - stable action;
  - explanation variation;
  - claim instability;
  - evidence interpretation instability;
  - material action instability;
  - boundary or authority instability.
- Acceptance and negative tests.

## Boundary

This package does not implement or activate:

- runtime production capability;
- public route activation;
- protected production schema mutation;
- model-introspection claims;
- deployment;
- buyer-facing claims;
- live testing;
- production assertions;
- external action.

## Run

```bash
node --test aida/perception-risk/phase0/tests/aida-perception-phase0.test.mjs
node aida/perception-risk/phase0/aida-perception-phase0.mjs \
  aida/perception-risk/phase0/fixtures/aida-perception-risk.synthetic.json \
  --output /tmp/aida-perception-risk-run.json
```

## Operational truth

This is a local synthetic adapter and test package only.  It is not the production AI Trust Decision Record schema, does not change public routes, and does not claim a buyer-facing operational capability.
