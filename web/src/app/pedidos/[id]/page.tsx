import { notFound } from "next/navigation";
import { api } from "../../api";
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

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await api<Order>(`/orders/${id}`);
  if (!order) notFound();
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
      <p>Desconto: {money(order.discount)}</p>
      <p>
        Total: <strong data-testid="total">{money(order.total)}</strong>
      </p>
    </>
  );
}
