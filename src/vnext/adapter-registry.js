const ADAPTER_REGISTRY_VERSION = '20260716-p1';

const registry = new Map();

function text(value) {
  return String(value ?? '').trim();
}

function validateVendorRiskExtension(extension = {}) {
  const errors = [];
  const required = ['extension_schema_id', 'extension_schema_digest', 'vendor_name', 'service_evaluated', 'legacy_record_id'];
  for (const key of required) if (!text(extension[key])) errors.push(`domain_extension.${key} is required`);
  if (extension.extension_schema_id !== 'cybershield.vendor-risk.v1') errors.push('domain_extension.extension_schema_id is not registered');
  if (extension.extension_schema_digest !== 'fnv1a32-demo:vendor-risk-v1') errors.push('domain_extension.extension_schema_digest does not match the registered adapter');
  const allowed = new Set([...required, 'legacy_related_claim_ids', 'migration_notes']);
  const unknown = Object.keys(extension).filter(key => !allowed.has(key));
  if (unknown.length) errors.push(`domain_extension contains unregistered fields: ${unknown.sort().join(', ')}`);
  return errors;
}

function registerAdapter(adapter) {
  const required = ['adapter_id', 'adapter_version', 'recommendation_domain', 'support_level', 'extension_schema_id', 'extension_schema_digest', 'validate_extension'];
  const missing = required.filter(key => !adapter?.[key]);
  if (missing.length) throw new Error(`Adapter registration missing: ${missing.join(', ')}`);
  const key = `${adapter.adapter_id}@${adapter.adapter_version}`;
  if (registry.has(key)) throw new Error(`Duplicate adapter registration: ${key}`);
  registry.set(key, Object.freeze({ ...adapter }));
  return registry.get(key);
}

registerAdapter({
  adapter_id: 'cybershield.vendor-risk',
  adapter_version: '1.0.0-pilot',
  recommendation_domain: 'vendor_risk',
  support_level: 'pilot',
  extension_schema_id: 'cybershield.vendor-risk.v1',
  extension_schema_digest: 'fnv1a32-demo:vendor-risk-v1',
  limitations: [
    'Pilot adapter validated only against the controlled synthetic vendor-risk fixture.',
    'No live source verification, production identity, or protected audit service is active.'
  ],
  validate_extension: validateVendorRiskExtension
});

registerAdapter({
  adapter_id: 'cybershield.generic',
  adapter_version: '1.0.0-pilot',
  recommendation_domain: 'unknown',
  support_level: 'generic',
  extension_schema_id: 'cybershield.generic.v1',
  extension_schema_digest: 'fnv1a32-demo:generic-v1',
  limitations: ['Generic analysis cannot claim domain-specific evidence sufficiency.'],
  validate_extension: extension => {
    const errors = [];
    if (extension?.extension_schema_id !== 'cybershield.generic.v1') errors.push('generic extension schema is not identified');
    if (extension?.extension_schema_digest !== 'fnv1a32-demo:generic-v1') errors.push('generic extension schema digest does not match');
    return errors;
  }
});

function resolveAdapter(domainAdapter = {}) {
  return registry.get(`${domainAdapter.adapter_id}@${domainAdapter.adapter_version}`) || null;
}

function describeAdapters() {
  return [...registry.values()].map(({ validate_extension, ...adapter }) => adapter);
}

export { ADAPTER_REGISTRY_VERSION, describeAdapters, registerAdapter, resolveAdapter };
