export async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Registry load failed: ${path}`);
  }

  return response.json();
}
