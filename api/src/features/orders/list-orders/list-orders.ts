import { Controller, Get, Injectable, Query } from "@nestjs/common";
import { Database } from "../../../common/database/database";
import { ORDER_COLUMNS, type OrderRow, type OrderStatus, toOrder, total } from "../order";

export type ListOrdersResponse = {
  id: string;
  customerName: string;
  status: OrderStatus;
  total: number;
}[];

function isOrderStatus(value?: string): value is OrderStatus {
  return value === "PAID" || value === "SHIPPED";
}

@Injectable()
export class ListOrdersHandler {
  constructor(private readonly database: Database) {}

  /** Lista os pedidos, do mais novo para o mais antigo. Status desconhecido mostra todos. */
  handle(status?: string): ListOrdersResponse {
    const db = this.database.connection;
    const rows = isOrderStatus(status)
      ? db.prepare(`SELECT ${ORDER_COLUMNS} FROM orders WHERE status = ? ORDER BY id DESC`).all(status)
      : db.prepare(`SELECT ${ORDER_COLUMNS} FROM orders ORDER BY id DESC`).all();
    return (rows as OrderRow[]).map((row) => {
      const order = toOrder(db, row);
      return { id: order.id, customerName: order.customerName, status: order.status, total: total(order) };
    });
  }
}

@Controller("orders")
export class ListOrdersController {
  constructor(private readonly handler: ListOrdersHandler) {}

  @Get()
  list(@Query("status") status?: string): ListOrdersResponse {
    return this.handler.handle(status);
  }
}
