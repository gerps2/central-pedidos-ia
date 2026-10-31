import { Injectable, NotFoundException } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { McpController, Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import { Database } from "../../../common/database/database";

export type SupportOrderResponse = {
  id: string;
  status: string;
  customerEmail: string;
  items: { name: string; quantity: number; inStock: boolean }[];
};

type Row = { id: string; status: string; customer_email: string };
type ItemRow = { name: string; quantity: number; available: number | null };

/** Mascara o e-mail: a IA ve o suficiente para confirmar o cliente, nao o endereco. */
export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  return `${name[0]}***@${domain}`;
}

@Injectable()
export class GetSupportOrderHandler {
  constructor(private readonly database: Database) {}

  /** Visao de atendimento: lista fechada de campos, sem CPF e sem nome completo. */
  handle(id: string): SupportOrderResponse {
    const db = this.database.connection;
    const row = db.prepare("SELECT id, status, customer_email FROM orders WHERE id = ?").get(id) as Row | undefined;
    if (!row) throw new NotFoundException(`order ${id} not found`);
    const items = db
      .prepare(
        `SELECT i.name, i.quantity, s.available FROM order_items i
         LEFT JOIN stock s ON s.product = i.name WHERE i.order_id = ?`,
      )
      .all(id) as ItemRow[];
    return {
      id: row.id,
      status: row.status,
      customerEmail: maskEmail(row.customer_email),
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        inStock: (item.available ?? 0) >= item.quantity,
      })),
    };
  }
}

@McpController()
export class GetSupportOrderTool {
  constructor(private readonly handler: GetSupportOrderHandler) {}

  @Tool({
    name: "get_order",
    description: "Devolve status, itens com disponibilidade e e-mail mascarado de um pedido",
    parameters: z.object({ id: z.string().describe("Numero do pedido, ex.: 1042") }),
  })
  run(@Payload() { id }: { id: string }) {
    return { content: [{ type: "text", text: JSON.stringify(this.handler.handle(id)) }] };
  }
}
