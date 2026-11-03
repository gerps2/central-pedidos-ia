import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "../../api";
import { money, statusClass, statusLabel } from "../../format";

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
      <Link href="/" className="back">
        ← Pedidos
      </Link>
      <div className="page-head">
        <h1>Pedido {order.id}</h1>
        <span className={statusClass(order.status)}>{statusLabel(order.status)}</span>
      </div>
      <div className="card meta">
        <div>
          <span>Cliente</span>
          {order.customerName}
        </div>
        <div>
          <span>Itens</span>
          {order.items.reduce((sum, item) => sum + item.quantity, 0)}
        </div>
      </div>
      {order.missingItems.length > 0 && (
        <p className="alert">Aguardando estoque: {order.missingItems.join(", ")}</p>
      )}
      <div className="card">
        <h2>Itens</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th className="num">Qtd.</th>
              <th className="num">Preço</th>
              <th className="num">Soma</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td className="num">{item.quantity}</td>
                <td className="num">{money(item.unitPrice)}</td>
                <td className="num">{money(item.quantity * item.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="summary">
          <div>
            <span>Subtotal</span>
            <span>{money(order.subtotal)}</span>
          </div>
          <div className="discount">
            <span>Desconto</span>
            <span>- {money(order.discount)}</span>
          </div>
          <div className="total">
            <span>Total</span>
            <strong data-testid="total">{money(order.total)}</strong>
          </div>
        </div>
      </div>
    </>
  );
}
