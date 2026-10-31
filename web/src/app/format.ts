/** Formata valores em reais para a tela. */
export function money(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Traduz o status do pedido para a tela. */
export function statusLabel(status: string): string {
  return status === "SHIPPED" ? "Enviado" : "Pago";
}
