import Link from "next/link";
import { api } from "./api";
import { money, statusLabel } from "./format";

export const dynamic = "force-dynamic";

type OrderRow = { id: string; customerName: string; status: string; total: number };

const FILTERS = [
  { label: "Todos", status: "" },
  { label: "Pago", status: "PAID" },
  { label: "Enviado", status: "SHIPPED" },
];

export default async function HomePage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status = "" } = await searchParams;
  const orders = (await api<OrderRow[]>(`/orders?status=${encodeURIComponent(status)}`)) ?? [];
  return (
    <>
      <h1>Pedidos</h1>
      <nav aria-label="Filtrar por status">
        {FILTERS.map((filter) => (
          <Link key={filter.label} href={filter.status ? `/?status=${filter.status}` : "/"}>
            {filter.label}
          </Link>
        ))}
      </nav>
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
