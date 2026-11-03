import Link from "next/link";
import { api } from "./api";
import { money, statusClass, statusLabel } from "./format";

export const dynamic = "force-dynamic";

type OrderRow = { id: string; customerName: string; status: string; total: number };

export default async function HomePage() {
  const orders = (await api<OrderRow[]>("/orders")) ?? [];
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Pedidos</h1>
          <p>{orders.length} pedidos, do mais novo para o mais antigo</p>
        </div>
      </div>
      <div className="card">
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Status</th>
            <th className="num">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <Link href={`/pedidos/${order.id}`}>{order.id}</Link>
              </td>
              <td>{order.customerName}</td>
              <td>
                <span className={statusClass(order.status)}>{statusLabel(order.status)}</span>
              </td>
              <td className="num">{money(order.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
