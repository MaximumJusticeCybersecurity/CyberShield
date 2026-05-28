export async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Registry load failed: ${path}`);
  }

  return response.json();
}

export async function loadRegistryBundle() {
  const models = await loadJson("./data/models/model-registry.json");
  const roles = await loadJson("./data/profiles/role-profiles.json");
  return { models, roles };
}
