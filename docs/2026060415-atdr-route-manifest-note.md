# 2026060415 ATDR Route Manifest Note

## Purpose

The file below is the machine-readable route map for the ATDR static MVP demo package:

```text
data/atdr/atdr-route-manifest.json
```

## Primary Route

After merge to main, the preferred entry point is:

```text
/demo.html
```

## Route Set

The manifest tracks these routes:

```text
/demo.html        Demo Control Room
/launch.html      AI Decision Assurance Launch Page
/atdr.html        ATDR Workbench
/brief.html       Executive Brief Preview
/atdr-smoke.html  Demo Readiness Check
/index.html       Trust Kernel
```

## Demo Modes

The manifest tracks these demo modes:

```text
vendor-risk-contradictory-evidence
security-vulnerability-risk-acceptance
compliance-nist-control-claim
```

Vendor risk should remain the default demo and primary wedge.

## QA Use

Future builders can use the manifest to keep docs, launch pages, smoke tests, and route labels aligned.

Before merge, check that every route in the manifest loads in the browser and that the smoke test reports a GO decision.
