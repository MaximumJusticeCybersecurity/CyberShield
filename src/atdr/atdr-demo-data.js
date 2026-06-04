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
    {
      evidence_id: 'DEMO-E-001',
      evidence_name: 'SOC 2 report summary',
      evidence_type: 'Vendor SOC 2 report',
      source_type: 'Synthetic demo evidence',
      source_authority_band: 'Medium',
      evidence_date: '2025',
      freshness_band: 'Aging',
      independence_band: 'Independent summary, full report not attached',
      sensitivity_label: 'Demo',
      text_extract: 'Vendor X has a SOC 2 Type II report dated 2025. The summary references cloud infrastructure controls but does not clearly identify whether the evaluated AI service is inside the SOC 2 report scope.'
    },
    {
      evidence_id: 'DEMO-E-002',
      evidence_name: 'SOC 2 scope excerpt',
      evidence_type: 'Vendor SOC 2 report',
      source_type: 'Synthetic demo evidence',
      source_authority_band: 'Medium',
      evidence_date: '2025',
      freshness_band: 'Aging',
      independence_band: 'Independent excerpt, incomplete scope',
      sensitivity_label: 'Demo',
      text_extract: 'The SOC 2 scope excerpt covers Vendor X core platform operations. It does not name the AI assistant module or customer-data analytics service under review.'
    },
    {
      evidence_id: 'DEMO-E-003',
      evidence_name: 'Encryption architecture note',
      evidence_type: 'Architecture diagram',
      source_type: 'Synthetic demo evidence',
      source_authority_band: 'Low',
      evidence_date: '2026',
      freshness_band: 'Current',
      independence_band: 'Self-attested',
      sensitivity_label: 'Demo',
      text_extract: 'Vendor X states that customer data is encrypted in transit and at rest. The note does not include independent test evidence, key management details, or customer-specific tenant boundary evidence.'
    },
    {
      evidence_id: 'DEMO-E-004',
      evidence_name: 'Data Processing Agreement excerpt',
      evidence_type: 'Data processing agreement',
      source_type: 'Synthetic demo evidence',
      source_authority_band: 'High',
      evidence_date: '2026',
      freshness_band: 'Current',
      independence_band: 'Contractual',
      sensitivity_label: 'Demo',
      text_extract: 'The DPA permits Vendor X to use de-identified or aggregated customer data for service improvement, model evaluation, and product analytics unless restricted by a separate order form.'
    },
    {
      evidence_id: 'DEMO-E-005',
      evidence_name: 'Vendor security questionnaire excerpt',
      evidence_type: 'Vendor security questionnaire excerpt',
      source_type: 'Synthetic demo evidence',
      source_authority_band: 'Low',
      evidence_date: '2026',
      freshness_band: 'Current',
      independence_band: 'Self-attested',
      sensitivity_label: 'Demo',
      text_extract: 'Vendor X answers yes to encryption, access control, and annual penetration testing, but provides no attached penetration test summary, control test results, or independent validation.'
    },
    {
      evidence_id: 'DEMO-E-006',
      evidence_name: 'Subprocessor list',
      evidence_type: 'Subprocessor list',
      source_type: 'Synthetic demo evidence',
      source_authority_band: 'Medium',
      evidence_date: '2024',
      freshness_band: 'Stale',
      independence_band: 'Vendor-published',
      sensitivity_label: 'Demo',
      text_extract: 'The listed subprocessors include cloud hosting, support tooling, and analytics providers. The list is dated 2024 and does not show whether AI processing subprocessors are current.'
    },
    {
      evidence_id: 'DEMO-E-007',
      evidence_name: 'Incident notification clause',
      evidence_type: 'Contract clause',
      source_type: 'Synthetic demo evidence',
      source_authority_band: 'High',
      evidence_date: '2026',
      freshness_band: 'Current',
      independence_band: 'Contractual',
      sensitivity_label: 'Demo',
      text_extract: 'Vendor X will notify customers of confirmed security incidents without undue delay. The clause does not specify a fixed notification period such as 24, 48, or 72 hours.'
    },
    {
      evidence_id: 'DEMO-E-008',
      evidence_name: 'Business owner comment',
      evidence_type: 'Human reviewer note',
      source_type: 'Synthetic demo evidence',
      source_authority_band: 'Low',
      evidence_date: '2026',
      freshness_band: 'Current',
      independence_band: 'Internal business comment',
      sensitivity_label: 'Demo',
      text_extract: 'Business owner requests fast approval because the vendor is needed for a customer-facing project this quarter. No risk acceptance authority is documented.'
    }
  ]
};

export const DEMO_MODES = [
  {
    id: 'vendor-risk-contradictory-evidence',
    label: 'Vendor Risk: Contradictory Evidence',
    description: 'SOC 2 exists, but scope, customer data use, subprocessors, and self-attested encryption evidence create a not-defensible-as-written outcome.',
    demo: VENDOR_RISK_CONTRADICTORY_DEMO
  }
];
