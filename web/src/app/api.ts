const API_URL = process.env.API_URL ?? "http://localhost:3200";

/** Busca na API; devolve null quando nao encontra. */
export async function api<T>(path: string): Promise<T | null> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`API respondeu ${response.status}`);
  return (await response.json()) as T;
}

export type CouponResult = { total: number; discount: number } | { error: string };

/** Pede à API o total com cupom; devolve a mensagem de erro quando o cupom é recusado. */
export async function applyCoupon(orderId: string, code: string): Promise<CouponResult> {
  const response = await fetch(`${API_URL}/orders/${orderId}/coupon`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ code }),
    cache: "no-store",
  });
  const body = await response.json();
  if (response.status === 400) return { error: body.message as string };
  if (!response.ok) throw new Error(`API respondeu ${response.status}`);
  return body as CouponResult;
}
