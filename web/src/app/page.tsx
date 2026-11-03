import Link from "next/link";
import { api } from "./api";
import { money, statusClass, statusLabel } from "./format";

export const dynamic = "force-dynamic";

type OrderRow = { id: string; customerName: string; status: string; total: number };

const FILTERS = [
  { status: "", label: "Todos" },
  { status: "PAID", label: "Pago" },
  { status: "SHIPPED", label: "Enviado" },
];

export default async function HomePage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status = "" } = await searchParams;
  const active = FILTERS.find((filter) => filter.status === status) ?? FILTERS[0];
  const query = active.status ? `?status=${active.status}` : "";
  const orders = (await api<OrderRow[]>(`/orders${query}`)) ?? [];
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Pedidos</h1>
          <p>{orders.length} pedidos, do mais novo para o mais antigo</p>
        </div>
        <nav className="filters" aria-label="Filtrar por status">
          {FILTERS.map((filter) => (
            <Link
              key={filter.label}
              href={filter.status ? `/?status=${filter.status}` : "/"}
              className={filter === active ? "filter active" : "filter"}
              aria-current={filter === active ? "page" : undefined}
            >
              {filter.label}
            </Link>
          ))}
        </nav>
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
