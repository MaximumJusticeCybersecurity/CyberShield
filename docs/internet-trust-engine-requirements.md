# CyberShield Internet Trust Engine Requirements

Date: 2026-05-29
Status: Future scenario family requirement track
Applies to: CyberShield Executive OS, post-TrustMap stabilization

## Purpose

The CyberShield Internet Trust Engine is a future capability track for evaluating whether online artifacts, claims, transcripts, evidence wrappers, and decision inputs are reliable enough to cite, brief, teach, share, or act on.

This capability must extend the CyberShield Trust Model. It must not become a generic fact-checker, political validation tool, misinformation detector, or person-level trust score.

## Product framing

Use these names and phrases:

```text
CyberShield Internet Trust Engine
CyberShield Artifact Trust Engine
Claim Trust Intelligence
Evidence-Based Decision Trust
Reliance checking
Decision reliance risk
```

Avoid these names and phrases:

```text
fact-checker
truth engine
misinformation detector
political validation
trusted or untrusted person labels
artifact-level trust score as the MVP anchor
```

## Core question

```text
Do we have sufficient trust in this information for the decision, action, briefing, citation, or reliance purpose in front of us, and what is the risk if we are wrong?
```

## Doctrine

The engine must not ask, "Do we trust this person?"

It must ask:

```text
Which claims in this artifact can be relied upon, at what confidence level, based on what evidence, for what decision purpose, and with what consequence if wrong?
```

## Trust chain

The Internet Trust Engine must preserve this decision chain:

```text
Artifact -> Wrapper -> Transcript -> Sentence -> Claim -> Evidence -> Confidence -> Decision Impact -> Reliance Guidance -> Action
```

This complements the existing CyberShield chain:

```text
Information -> Evidence -> Trust -> Decision -> Action
```

## MVP scope

The MVP should ingest a transcript, article, report excerpt, or executive briefing artifact and produce:

1. Artifact metadata capture
2. Sentence extraction
3. Factual claim extraction
4. Claim type classification
5. Evidence need classification
6. Initial claim-level trust status
7. Primary-source verification flags
8. Decision reliance risk
9. Claim table
10. Sentence-level trust map
11. Proof Pack summary
12. Boundary language

The MVP must anchor on claim-level reliance, not a single artifact-level trust score.

## Required claim classes

The MVP should classify claims into at least these types:

```text
numerical claim
legal or regulatory claim
financial or budget claim
scientific or technical claim
historical claim
current-status claim
forecast or future claim
causal claim
policy interpretation
source attribution claim
```

## Required trust statuses

Use advisory trust statuses such as:

```text
trusted enough for current purpose
conditionally trusted
needs primary-source verification
insufficient evidence
high reliance risk
out of scope for prototype
```

Do not use person-level labels such as trusted person, untrusted person, liar, propagandist, or misinformation source.

## Evidence requirements

Evidence requirements should map to claim type. Examples:

```text
Numerical fiscal claim -> primary government data or source table
Legal claim -> statute, regulation, official agency guidance, or attorney-reviewed source
Scientific claim -> peer-reviewed paper, standards body, official technical documentation, or validated dataset
Current-status claim -> current primary source or fresh authoritative source
Forecast claim -> assumptions, model limits, uncertainty range, and source credibility
```

## USAFacts and Steve Ballmer pilot case

The USAFacts and Steve Ballmer video scenario is a useful pilot because it appears highly factual and data-driven, but still requires careful validation of:

```text
fiscal numbers
government entity definitions
federal, state, and local responsibility splits
Medicaid funding rules
education funding splits
future legal or policy shifts
source dates
claim context
```

The engine must not evaluate whether Steve Ballmer is trustworthy as a person. It must evaluate which claims in the artifact are reliable enough for a specific reliance purpose.

## User-facing outputs

The user-facing MVP should show:

```text
what artifact is under review
which claim matters
what evidence supports it
what evidence is missing
why reliance could be risky
what confidence level applies
what decision guidance follows
what should be verified next
```

## TrustMap relationship

Internet Trust Engine must be represented as a future scenario family or lens inside the existing CyberShield Executive OS. It must not add a new top-level tab without explicit approval.

Potential existing screen placement:

```text
Briefing: show artifact under review, top reliance risks, and recommended action
TrustMap: show artifact, claims, sources, evidence, owners, and decision paths as a scenario lens
Runtime: show whether an action should proceed based on claim reliance status
Evidence: show claim-evidence mapping and verification gaps
Proof Pack: show exportable claim reliance record and boundary language
Architecture: show the Internet Trust Engine model and limitations
Settings: show model/version metadata only
```

## Prototype boundaries

The current GitHub Pages prototype must not claim live internet verification, live evidence retrieval, live fact checking, live source monitoring, live takedown automation, legal determinations, political validation, or automated truth adjudication.

Acceptable prototype language:

```text
models claim reliance
flags verification needs
shows advisory trust status
identifies evidence gaps
creates a proof record
```

Prohibited prototype language:

```text
verifies the internet in real time
proves truth
detects misinformation
certifies claims
labels people as trustworthy or untrustworthy
performs live evidence retrieval
performs legal or political validation
```

## Build sequencing

V55.3 should not implement the Internet Trust Engine. V55.3 should stabilize TrustMap registries, visual object rules, and data separation first.

Recommended sequence:

```text
V55.3 TrustMap Registry and Visual Object Stabilization
V56 TrustMap Stability and Registry Consumption
V57 or later CyberShield Internet Trust Engine MVP, if TrustMap and registries are stable
```

If the build plan numbering changes, preserve the principle: stabilize the platform and registries before adding the Internet Trust Engine.

## Definition of done for future implementation

The Internet Trust Engine is not done until it has:

```text
requirements documented
registry or model schema created
sample artifact fixture added
claim extraction model documented
claim type taxonomy documented
evidence requirement mapping documented
claim table rendered
sentence-level trust map rendered
Proof Pack output created
boundary language shown
loader path verified
README updated
bots.txt updated
governance-summary.json updated
builder-version-log updated
lessons and successor handoff updated
overclaim scan completed
```

## Operational rule

A file sitting in the repo is not operational until it is imported, loaded, and verified. A requirement sitting in chat memory is not institutional memory until it is documented in the repo.
