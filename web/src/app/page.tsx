import Link from "next/link";
import { api } from "./api";
import { money, statusLabel } from "./format";

export const dynamic = "force-dynamic";

type OrderRow = { id: string; customerName: string; status: string; total: number };

export default async function HomePage() {
  const orders = (await api<OrderRow[]>("/orders")) ?? [];
  return (
    <>
      <h1>Pedidos</h1>
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <Link href={`/pedidos/${order.id}`}>{order.id}</Link>
              </td>
              <td>{order.customerName}</td>
              <td>{statusLabel(order.status)}</td>
              <td>{money(order.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
