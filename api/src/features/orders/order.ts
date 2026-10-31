import type { DatabaseSync } from "node:sqlite";

export type OrderStatus = "PAID" | "SHIPPED";

export type OrderItem = { name: string; quantity: number; unitPrice: number };

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
};

type OrderRow = { id: string; customer_name: string; customer_email: string; status: OrderStatus };
type ItemRow = { name: string; quantity: number; unit_price: number };

const DISCOUNT_THRESHOLD = 300;
const DISCOUNT_RATE = 0.1;

/** Soma dos itens antes do desconto. */
export function subtotal(order: Pick<Order, "items">): number {
  return order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

/** Desconto progressivo: 10% acima de R$ 300. */
export function discount(order: Pick<Order, "items">): number {
  const value = subtotal(order);
  return value > DISCOUNT_THRESHOLD ? value * DISCOUNT_RATE : 0;
}

/** Valor final do pedido. */
export function total(order: Pick<Order, "items">): number {
  return subtotal(order) - discount(order);
}

const COUPONS: Record<string, number> = { FIAP10: 0.1, BEMVINDO20: 0.2 };

/** Desconto com cupom: vale o maior entre o cupom e o progressivo, sem acumular. Devolve null se o cupom não existe. */
export function discountWithCoupon(order: Pick<Order, "items">, code: string): number | null {
  const rate = COUPONS[code];
  if (rate === undefined) return null;
  return Math.max(discount(order), subtotal(order) * rate);
}

/** Monta o pedido com os itens; o CPF nunca sai do banco. */
export function toOrder(db: DatabaseSync, row: OrderRow): Order {
  const items = db
    .prepare("SELECT name, quantity, unit_price FROM order_items WHERE order_id = ?")
    .all(row.id) as ItemRow[];
  return {
    id: row.id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    status: row.status,
    items: items.map((item) => ({ name: item.name, quantity: item.quantity, unitPrice: item.unit_price })),
  };
}

/** Busca as linhas de pedido sem selecionar o CPF. */
export const ORDER_COLUMNS = "id, customer_name, customer_email, status";
export type { OrderRow };
