export const VENDOR_RISK_CONTRADICTORY_DEMO = {
  scenario_id: 'vendor-risk-contradictory-evidence',
  title: 'Vendor Risk: Contradictory Evidence',
  domain: 'vendor-risk',
  original_ai_recommendation: 'AI recommends approving Vendor X because they have a SOC 2 report, encrypt customer data, and appear low risk.',
  ai_source: 'User-pasted AI recommendation',
  source_model_if_known: 'Unknown',
  intended_use: 'Vendor approval recommendation review before enterprise action',
  decision_context: 'The business owner wants fast approval of Vendor X for a customer-facing AI-enabled service. The recommendation relies on SOC 2, encryption, and a low-risk conclusion.',
  synthetic_demo_data_flag: true,
  record_value_category: 'Investor Demo',
  decision_owner: 'Pending assignment',
  evidence_repository: [
    { evidence_id: 'DEMO-E-001', evidence_name: 'SOC 2 report summary', evidence_type: 'Vendor SOC 2 report', source_type: 'Synthetic demo evidence', source_authority_band: 'Medium', evidence_date: '2025', freshness_band: 'Aging', independence_band: 'Independent summary, full report not attached', sensitivity_label: 'Demo', text_extract: 'Vendor X has a SOC 2 Type II report dated 2025. The summary references cloud infrastructure controls but does not clearly identify whether the evaluated AI service is inside the SOC 2 report scope.' },
    { evidence_id: 'DEMO-E-002', evidence_name: 'SOC 2 scope excerpt', evidence_type: 'Vendor SOC 2 report', source_type: 'Synthetic demo evidence', source_authority_band: 'Medium', evidence_date: '2025', freshness_band: 'Aging', independence_band: 'Independent excerpt, incomplete scope', sensitivity_label: 'Demo', text_extract: 'The SOC 2 scope excerpt covers Vendor X core platform operations. It does not name the AI assistant module or customer-data analytics service under review.' },
    { evidence_id: 'DEMO-E-003', evidence_name: 'Encryption architecture note', evidence_type: 'Architecture diagram', source_type: 'Synthetic demo evidence', source_authority_band: 'Low', evidence_date: '2026', freshness_band: 'Current', independence_band: 'Self-attested', sensitivity_label: 'Demo', text_extract: 'Vendor X states that customer data is encrypted in transit and at rest. The note does not include independent test evidence, key management details, or customer-specific tenant boundary evidence.' },
    { evidence_id: 'DEMO-E-004', evidence_name: 'Data Processing Agreement excerpt', evidence_type: 'Data processing agreement', source_type: 'Synthetic demo evidence', source_authority_band: 'High', evidence_date: '2026', freshness_band: 'Current', independence_band: 'Contractual', sensitivity_label: 'Demo', text_extract: 'The DPA permits Vendor X to use de-identified or aggregated customer data for service improvement, model evaluation, and product analytics unless restricted by a separate order form.' },
    { evidence_id: 'DEMO-E-005', evidence_name: 'Vendor security questionnaire excerpt', evidence_type: 'Vendor security questionnaire excerpt', source_type: 'Synthetic demo evidence', source_authority_band: 'Low', evidence_date: '2026', freshness_band: 'Current', independence_band: 'Self-attested', sensitivity_label: 'Demo', text_extract: 'Vendor X answers yes to encryption, access control, and annual penetration testing, but provides no attached penetration test summary, control test results, or independent validation.' },
    { evidence_id: 'DEMO-E-006', evidence_name: 'Subprocessor list', evidence_type: 'Subprocessor list', source_type: 'Synthetic demo evidence', source_authority_band: 'Medium', evidence_date: '2024', freshness_band: 'Stale', independence_band: 'Vendor-published', sensitivity_label: 'Demo', text_extract: 'The listed subprocessors include cloud hosting, support tooling, and analytics providers. The list is dated 2024 and does not show whether AI processing subprocessors are current.' },
    { evidence_id: 'DEMO-E-007', evidence_name: 'Incident notification clause', evidence_type: 'Contract clause', source_type: 'Synthetic demo evidence', source_authority_band: 'High', evidence_date: '2026', freshness_band: 'Current', independence_band: 'Contractual', sensitivity_label: 'Demo', text_extract: 'Vendor X will notify customers of confirmed security incidents without undue delay. The clause does not specify a fixed notification period such as 24, 48, or 72 hours.' },
    { evidence_id: 'DEMO-E-008', evidence_name: 'Business owner comment', evidence_type: 'Human reviewer note', source_type: 'Synthetic demo evidence', source_authority_band: 'Low', evidence_date: '2026', freshness_band: 'Current', independence_band: 'Internal business comment', sensitivity_label: 'Demo', text_extract: 'Business owner requests fast approval because the vendor is needed for a customer-facing project this quarter. No risk acceptance authority is documented.' }
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
    description: 'SOC 2 exists, but scope, customer data use, subprocessors, and self-attested encryption evidence create a not-defensible-as-written outcome.',
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
