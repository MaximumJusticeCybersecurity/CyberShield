# Migration to 0.1.0

Replace direct domain-neutral imports with exact package imports.  Existing CyberShield imports through `src/agent-spine/reusable-agent-spine.js` remain compatible because that path re-exports the canonical package core.  New consumers shall install the verified tarball and import the package or a stable subpath.  Domain-specific selectors, authority boundaries, limitations, and Human Gate rules remain in the consuming domain pack.
