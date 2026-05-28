import { loadJson } from "./registryLoader.js";

export async function loadCyberShieldRegistry() {
  const models = await loadJson("data/models/model-registry.json");
  const evidence = await loadJson("data/evidence/evidence-types.json");
  const roles = await loadJson("data/profiles/role-profiles.json");
  const layers = await loadJson("data/architecture/control-plane-layers.json");
  return { models, evidence, roles, layers };
}

export function validateRegistry(registry) {
  if (!registry.models || !registry.models.models || !registry.models.models.length) {
    throw new Error("Missing model registry models.");
  }
  if (!registry.evidence || !registry.evidence.types || !registry.evidence.types.length) {
    throw new Error("Missing evidence type registry.");
  }
  if (!registry.roles || !registry.roles.roles || !registry.roles.roles.length) {
    throw new Error("Missing role profile registry.");
  }
  if (!registry.layers || !registry.layers.layers || !registry.layers.layers.length) {
    throw new Error("Missing control-plane layer registry.");
  }

  const model = registry.models.models.find(item => item.model_id === "operational_trust_decision_model");
  if (!model) {
    throw new Error("Missing operational_trust_decision_model.");
  }

  ["model_id", "name", "version", "cybershield_release", "status_label", "limitations"].forEach(field => {
    if (!model[field]) {
      throw new Error("Model registry missing required field: " + field);
    }
  });
}
