import { notFound } from "next/navigation";
import { api, applyCoupon } from "../../api";
import { money, statusLabel } from "../../format";

export const dynamic = "force-dynamic";

type Order = {
  id: string;
  customerName: string;
  status: string;
  items: { name: string; quantity: number; unitPrice: number }[];
  subtotal: number;
  discount: number;
  total: number;
  missingItems: string[];
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cupom?: string }>;
}) {
  const { id } = await params;
  const { cupom } = await searchParams;
  const order = await api<Order>(`/orders/${id}`);
  if (!order) notFound();
  const coupon = cupom ? await applyCoupon(id, cupom) : null;
  const error = coupon && "error" in coupon ? coupon.error : null;
  const shown = coupon && "total" in coupon ? coupon : order;
  return (
    <>
      <h1>Pedido {order.id}</h1>
      <p>Cliente: {order.customerName}</p>
      <p>Status: {statusLabel(order.status)}</p>
      {order.missingItems.length > 0 && (
        <p className="alert">Aguardando estoque: {order.missingItems.join(", ")}</p>
      )}
      <ul>
        {order.items.map((item) => (
          <li key={item.name}>
            {item.quantity} x {item.name}: {money(item.unitPrice)}
          </li>
        ))}
      </ul>
      <p>Subtotal: {money(order.subtotal)}</p>
      <p>Desconto: {money(shown.discount)}</p>
      <form method="get">
        <label>
          Cupom: <input name="cupom" defaultValue={cupom ?? ""} />
        </label>{" "}
        <button type="submit">Aplicar cupom</button>
      </form>
      {error && (
        <p className="alert" data-testid="coupon-error">
          {error}
        </p>
      )}
      <p>
        Total: <strong data-testid="total">{money(shown.total)}</strong>
      </p>
    </>
  );
}
