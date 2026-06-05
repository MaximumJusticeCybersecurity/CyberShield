# 20260605xxV14 Executive Brief Export Release Note

## Summary

This release improves the static prototype executive brief export path for CyberShield Decision Assurance.

## Primary Goal

Make the browser print/PDF path feel more like a polished executive artifact and less like a plain HTML report.

## Updated Code

```text
atdr.html
```

## Print/PDF Improvements

- Letter-size print page rule
- Tighter executive brief margins
- Logo header treatment
- Stronger subject/header presentation
- Better executive callout styling
- Cleaner table styling
- Smaller table font for dense claims/evidence content
- Improved section hierarchy
- Better signature block spacing
- Footer treatment with record metadata

## V13 Dependency

This release builds on V13, which added:

- V12 synthetic vendor-risk evidence pack in demo data
- Ten vendor-risk claims
- Material contradiction detection
- Conservative Request Evidence outcome
- Dedicated contradiction display in the workbench and print brief

## Export Boundary

This remains a static GitHub Pages prototype.

The current export path is:

```text
Browser Print / Save PDF
```

Production-grade DOCX and server-rendered PDF remain future backend work.

## Product Rule

The executive brief is the proof artifact.

The record is the product.
