import { Injectable } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { McpController, Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import { Database } from "../../../common/database/database";

const MAX_ORDERS = 20;

export type SupportOrdersResponse = { id: string; status: string }[];

@Injectable()
export class ListSupportOrdersHandler {
  constructor(private readonly database: Database) {}

  /** Lista resumida, com limite de pedidos por consulta. */
  handle(status?: string): SupportOrdersResponse {
    const db = this.database.connection;
    const rows = status
      ? db.prepare("SELECT id, status FROM orders WHERE status = ? ORDER BY id DESC LIMIT ?").all(status, MAX_ORDERS)
      : db.prepare("SELECT id, status FROM orders ORDER BY id DESC LIMIT ?").all(MAX_ORDERS);
    return rows as SupportOrdersResponse;
  }
}

@McpController()
export class ListSupportOrdersTool {
  constructor(private readonly handler: ListSupportOrdersHandler) {}

  @Tool({
    name: "list_orders",
    description: "Lista ate 20 pedidos com numero e status",
    parameters: z.object({ status: z.enum(["PAID", "SHIPPED"]).optional() }),
  })
  run(@Payload() { status }: { status?: string }) {
    return { content: [{ type: "text", text: JSON.stringify(this.handler.handle(status)) }] };
  }
}
