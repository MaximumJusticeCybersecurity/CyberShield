# 2026060414 ATDR QA Status

## Branch

`feature/2026060414-atdr-decision-assurance`

## Direct Prototype File

`atdr.html`

## Current Status

The branch adds the first CyberShield AI Decision Assurance prototype.

The default demo is the vendor-risk contradictory-evidence scenario.

The deterministic engine now atomizes the default vendor-risk recommendation into seven evaluable claims:

1. Vendor approval claim
2. SOC 2 existence claim
3. SOC 2 service-scope claim
4. Encryption claim
5. Customer-data access claim
6. Low-risk conclusion
7. Unsupported-leap claim

## Must Verify in Browser Before Merge

1. `atdr.html` loads
2. The default demo appears automatically
3. Decision Brief appears on the right side
4. Claims screen shows seven claims for the default vendor-risk recommendation
5. Evidence screen shows the synthetic evidence repository
6. Local file upload reads text in the browser for the current session
7. Evidence note can be added
8. Gaps screen shows missing support
9. Risk screen shows High Risk If Wrong for the default demo
10. Confidence screen explains the confidence band
11. Review screen saves human decision and notes
12. Decision Record screen shows structured record JSON
13. JSON export downloads
14. Browser print opens the executive brief
15. Signature block appears as a blank rectangle
16. Footer includes record metadata
17. Limitations appear in the exported brief

## Known Prototype Boundaries

- Static GitHub Pages build
- One-session record only
- Local browser file handling only
- No backend record storage
- No user login enforcement
- No live model call
- No server-side document generation
- Browser print is the current PDF path

## Merge Guidance

Do not merge until a browser run confirms that the page loads and exports without visible errors.
