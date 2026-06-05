export const VENDOR_RISK_CONTRADICTORY_DEMO = {
  scenario_id: 'vendor-risk-contradictory-evidence',
  title: 'Vendor Risk: Contradictory Evidence',
  domain: 'vendor-risk',
  original_ai_recommendation: 'AI recommends approving Vendor X because they have a SOC 2 report, encrypt customer data, and appear low risk.',
  ai_source: 'User-pasted AI recommendation',
  source_model_if_known: 'Unknown',
  intended_use: 'Vendor approval recommendation review before enterprise action',
  decision_context: 'The business owner wants fast approval of Vendor X for an AI-assisted customer support analytics service. The recommendation relies on SOC 2, encryption, and a low-risk conclusion.',
  synthetic_demo_data_flag: true,
  record_value_category: 'Vendor-Risk Review',
  decision_owner: 'Pending vendor-risk owner assignment',
  vendor_name: 'Vendor X',
  service_evaluated: 'AI-assisted customer support analytics service',
  expected_conclusion: 'The recommendation is not defensible as written.',
  expected_action: 'Request Evidence',
  expected_risk_if_wrong: 'High',
  expected_confidence: 'Low Confidence',
  expected_defensibility: 'Not defensible as written',
  evidence_repository: [
    { evidence_id: 'EVD-SOC2-SUMMARY-001', evidence_name: 'SOC 2 Summary', evidence_type: 'SOC 2 report summary', source_type: 'Vendor-provided artifact', source_authority_band: 'Medium', evidence_date: '2025-12-31', freshness_band: 'Current with caveat', independence_band: 'Third-party report summary, incomplete scope detail', sensitivity_label: 'Demo', scope_status: 'Scope not proven for evaluated AI service', self_attestation_flag: false, contradiction_flag: false, related_claims: ['CLM-SOC2-EXISTS', 'CLM-SOC2-CURRENT'], text_extract: 'Vendor X provided a SOC 2 Type II report covering January 1, 2025 through December 31, 2025. The report references security, availability, and confidentiality criteria for Vendor X cloud operations.', caveat: 'Confirms a SOC 2 report exists, but does not prove the evaluated AI-assisted customer support analytics service is in scope.' },
    { evidence_id: 'EVD-SOC2-SCOPE-002', evidence_name: 'SOC 2 Scope Excerpt', evidence_type: 'SOC 2 scope excerpt', source_type: 'Vendor-provided artifact', source_authority_band: 'Medium', evidence_date: '2025-12-31', freshness_band: 'Current with caveat', independence_band: 'Third-party report excerpt', sensitivity_label: 'Demo', scope_status: 'AI service not clearly covered', self_attestation_flag: false, contradiction_flag: true, related_claims: ['CLM-SOC2-SCOPE', 'CLM-LOW-RISK'], text_extract: 'The SOC 2 examination covers Vendor X core cloud hosting, identity management, production change management, backup operations, and general infrastructure controls. AI analytics modules, beta features, customer support intelligence features, and third-party model providers are not expressly listed in the system description.', caveat: 'The evaluated AI service is not clearly included in SOC 2 scope.' },
    { evidence_id: 'EVD-ENC-ARCH-003', evidence_name: 'Encryption Architecture Note', evidence_type: 'Encryption architecture note', source_type: 'Vendor-provided note', source_authority_band: 'Low', evidence_date: '2026-01-12', freshness_band: 'Current', independence_band: 'Vendor assertion', sensitivity_label: 'Demo', scope_status: 'Partially covers data protection', self_attestation_flag: true, contradiction_flag: false, related_claims: ['CLM-ENCRYPTION', 'CLM-DATA-USE'], text_extract: 'Vendor X states that customer data is encrypted in transit using TLS 1.2 or higher and encrypted at rest using managed cloud key services. Application logs may include customer metadata for troubleshooting and service analytics.', caveat: 'Encryption is described, but metadata handling and log content require further review.' },
    { evidence_id: 'EVD-DPA-004', evidence_name: 'Data Processing Agreement Excerpt', evidence_type: 'DPA excerpt', source_type: 'Contract artifact', source_authority_band: 'High', evidence_date: '2026-01-10', freshness_band: 'Current', independence_band: 'Contract language', sensitivity_label: 'Demo', scope_status: 'Covers data processing terms', self_attestation_flag: false, contradiction_flag: true, related_claims: ['CLM-DATA-USE', 'CLM-LOW-RISK'], text_extract: 'Vendor X may process customer data to provide, maintain, secure, support, analyze, and improve the services. Aggregated or derived service data may be used to improve platform functionality, service performance, analytics, and customer support features.', caveat: 'Permits service improvement use, which conflicts with a simple claim that customer data is only used to provide the contracted service.' },
    { evidence_id: 'EVD-SUBPROC-005', evidence_name: 'Subprocessor List', evidence_type: 'Subprocessor list', source_type: 'Vendor-provided artifact', source_authority_band: 'Medium', evidence_date: '2026-01-09', freshness_band: 'Current with caveat', independence_band: 'Vendor assertion', sensitivity_label: 'Demo', scope_status: 'Incomplete AI analytics provider visibility', self_attestation_flag: true, contradiction_flag: true, related_claims: ['CLM-SUBPROCESSOR', 'CLM-LOW-RISK'], text_extract: 'Vendor X lists primary cloud hosting and email notification subprocessors. The list notes that additional analytics, support, and AI service providers may be used where required to deliver platform features. Provider names for AI analytics services are available upon request.', caveat: 'AI analytics subprocessors are not fully identified in the provided list.' },
    { evidence_id: 'EVD-INCIDENT-006', evidence_name: 'Incident Notification Clause', evidence_type: 'Contract clause', source_type: 'Contract artifact', source_authority_band: 'High', evidence_date: '2026-01-10', freshness_band: 'Current', independence_band: 'Contract language', sensitivity_label: 'Demo', scope_status: 'Covers notification terms with ambiguity', self_attestation_flag: false, contradiction_flag: false, related_claims: ['CLM-INCIDENT-NOTIFICATION'], text_extract: 'Vendor X will notify customer of a confirmed security incident without undue delay after Vendor X determines that notification is required under applicable law or contract obligations.', caveat: 'Does not provide a specific notification timeline and may be too weak for sensitive customer data use cases.' },
    { evidence_id: 'EVD-QUESTIONNAIRE-007', evidence_name: 'Security Questionnaire Excerpt', evidence_type: 'Security questionnaire', source_type: 'Vendor self-attestation', source_authority_band: 'Low', evidence_date: '2026-01-08', freshness_band: 'Current', independence_band: 'Self-attested', sensitivity_label: 'Demo', scope_status: 'Ambiguous data use explanation', self_attestation_flag: true, contradiction_flag: true, related_claims: ['CLM-DATA-USE', 'CLM-LOW-RISK'], text_extract: 'Vendor X indicates that customer data is not used to train machine learning models. Vendor X also indicates that product analytics may be used to improve service quality and feature performance.', caveat: 'Separates training from service improvement but does not clearly explain whether customer data, metadata, or derived data supports AI-assisted features.' },
    { evidence_id: 'EVD-BUSINESS-008', evidence_name: 'Business Owner Approval Note', evidence_type: 'Business owner comment', source_type: 'Internal note', source_authority_band: 'Low', evidence_date: '2026-01-13', freshness_band: 'Current', independence_band: 'Internal stakeholder note', sensitivity_label: 'Demo', scope_status: 'Business context only', self_attestation_flag: false, contradiction_flag: false, related_claims: ['CLM-APPROVAL'], text_extract: 'The business owner requests approval this week to meet implementation timelines. The business owner states that Vendor X is important for customer support efficiency and that delay may affect the planned rollout.', caveat: 'Business urgency is not evidence that the vendor-risk recommendation is defensible.' },
    { evidence_id: 'EVD-SECURITY-REVIEW-009', evidence_name: 'Security Reviewer Note', evidence_type: 'Security reviewer note', source_type: 'Internal reviewer note', source_authority_band: 'Medium', evidence_date: '2026-01-14', freshness_band: 'Current', independence_band: 'Internal security review', sensitivity_label: 'Demo', scope_status: 'Review guidance', self_attestation_flag: false, contradiction_flag: false, related_claims: ['CLM-APPROVAL', 'CLM-SOC2-SCOPE', 'CLM-DATA-USE'], text_extract: 'Security review notes that SOC 2 scope should be validated against the evaluated AI service, DPA language should be reviewed for data use restrictions, AI analytics subprocessors should be identified, and customer data handling should be confirmed before approval.', caveat: 'Supports escalation or evidence request, not approval.' }
  ]
};

export const SECURITY_RISK_ACCEPTANCE_DEMO = {
  scenario_id: 'security-vulnerability-risk-acceptance',
  title: 'Security: Vulnerability Risk Acceptance',
  domain: 'security',
  original_ai_recommendation: 'AI recommends accepting this vulnerability as low risk because exploitation is unlikely and compensating controls appear sufficient.',
  ai_source: 'User-pasted AI recommendation',
  source_model_if_known: 'Unknown',
  intended_use: 'Security risk acceptance review before production decision',
  decision_context: 'A product team wants to defer remediation for a vulnerability on an internet-facing production asset. The AI recommendation concludes low risk without a named risk owner.',
  synthetic_demo_data_flag: true,
  record_value_category: 'Security Demo',
  decision_owner: 'Pending security owner assignment',
  evidence_repository: [
    { evidence_id: 'SEC-E-001', evidence_name: 'Vulnerability scan excerpt', evidence_type: 'Vulnerability scan output', source_type: 'Synthetic demo evidence', source_authority_band: 'Medium', evidence_date: '2026', freshness_band: 'Current', independence_band: 'Tool output', sensitivity_label: 'Demo', text_extract: 'Scanner reports CVE-style finding on an internet-facing production service. Severity is medium-high. No exploitability validation is attached.' },
    { evidence_id: 'SEC-E-002', evidence_name: 'Asset inventory note', evidence_type: 'Asset inventory', source_type: 'Synthetic demo evidence', source_authority_band: 'Medium', evidence_date: '2026', freshness_band: 'Current', independence_band: 'Internal system record', sensitivity_label: 'Demo', text_extract: 'The affected asset supports customer-facing authentication workflows and is tagged production. Business owner is not listed in the record.' },
    { evidence_id: 'SEC-E-003', evidence_name: 'Compensating control note', evidence_type: 'Control implementation evidence', source_type: 'Synthetic demo evidence', source_authority_band: 'Low', evidence_date: '2025', freshness_band: 'Aging', independence_band: 'Self-attested', sensitivity_label: 'Demo', text_extract: 'Team states that web application firewall rules reduce exploit likelihood. No control test result, log validation, or attack-path validation is attached.' },
    { evidence_id: 'SEC-E-004', evidence_name: 'Risk owner approval status', evidence_type: 'Risk register entry', source_type: 'Synthetic demo evidence', source_authority_band: 'Low', evidence_date: '2026', freshness_band: 'Current', independence_band: 'Internal status note', sensitivity_label: 'Demo', text_extract: 'Risk acceptance owner is not documented. Remediation exception has not been approved by Security SME or vCISO.' }
  ]
};

export const COMPLIANCE_CONTROL_DEMO = {
  scenario_id: 'compliance-nist-control-claim',
  title: 'Compliance: NIST Control Claim',
  domain: 'compliance',
  original_ai_recommendation: 'AI says this access control satisfies NIST 800-53 based on the current policy and should be marked compliant.',
  ai_source: 'User-pasted AI recommendation',
  source_model_if_known: 'Unknown',
  intended_use: 'Compliance evidence review before marking a control compliant',
  decision_context: 'A compliance owner is preparing evidence for a customer or auditor and wants to rely on an AI-generated control conclusion. The AI recommendation relies on policy text without implementation or test evidence.',
  synthetic_demo_data_flag: true,
  record_value_category: 'Compliance Demo',
  decision_owner: 'Pending compliance owner assignment',
  evidence_repository: [
    { evidence_id: 'COMP-E-001', evidence_name: 'Access control policy excerpt', evidence_type: 'Security policy', source_type: 'Synthetic demo evidence', source_authority_band: 'Medium', evidence_date: '2026', freshness_band: 'Current', independence_band: 'Internal policy', sensitivity_label: 'Demo', text_extract: 'Policy requires unique user IDs, multi-factor authentication for privileged access, and quarterly access reviews. The excerpt does not show implementation evidence.' },
    { evidence_id: 'COMP-E-002', evidence_name: 'Control owner note', evidence_type: 'Human reviewer note', source_type: 'Synthetic demo evidence', source_authority_band: 'Low', evidence_date: '2026', freshness_band: 'Current', independence_band: 'Internal note', sensitivity_label: 'Demo', text_extract: 'Control owner believes the policy satisfies the requirement. No access review sample, system configuration evidence, ticket, or test result is attached.' },
    { evidence_id: 'COMP-E-003', evidence_name: 'Prior audit observation', evidence_type: 'Control test result', source_type: 'Synthetic demo evidence', source_authority_band: 'Medium', evidence_date: '2025', freshness_band: 'Aging', independence_band: 'Internal audit note', sensitivity_label: 'Demo', text_extract: 'Prior review found that access review evidence was incomplete for one application. Remediation status is not shown in the current evidence package.' }
  ]
};

export const DEMO_MODES = [
  {
    id: 'vendor-risk-contradictory-evidence',
    label: 'Vendor Risk: Contradictory Evidence',
    description: 'SOC 2 exists, but scope, customer data use, subprocessors, incident notification, and self-attested encryption evidence create a not-defensible-as-written outcome.',
    demo: VENDOR_RISK_CONTRADICTORY_DEMO
  },
  {
    id: 'security-vulnerability-risk-acceptance',
    label: 'Security: Vulnerability Risk Acceptance',
    description: 'AI calls a vulnerability low risk, but exposure, exploitability, compensating controls, and owner approval are incomplete.',
    demo: SECURITY_RISK_ACCEPTANCE_DEMO
  },
  {
    id: 'compliance-nist-control-claim',
    label: 'Compliance: NIST Control Claim',
    description: 'AI says a control satisfies NIST 800-53 based on policy, but implementation and test evidence are missing.',
    demo: COMPLIANCE_CONTROL_DEMO
  }
];