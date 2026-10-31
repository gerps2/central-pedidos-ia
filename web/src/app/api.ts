const API_URL = process.env.API_URL ?? "http://localhost:3200";

/** Busca na API; devolve null quando nao encontra. */
export async function api<T>(path: string): Promise<T | null> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`API respondeu ${response.status}`);
  return (await response.json()) as T;
}
