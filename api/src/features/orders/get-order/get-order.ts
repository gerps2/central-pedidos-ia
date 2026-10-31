import { Controller, Get, Injectable, NotFoundException, Param } from "@nestjs/common";
import { Database } from "../../../common/database/database";
import {
  ORDER_COLUMNS,
  type Order,
  type OrderRow,
  type OrderStatus,
  discount,
  subtotal,
  toOrder,
  total,
} from "../order";

export type GetOrderResponse = {
  id: string;
  customerName: string;
  status: OrderStatus;
  items: Order["items"];
  subtotal: number;
  discount: number;
  total: number;
  missingItems: string[];
};

@Injectable()
export class GetOrderHandler {
  constructor(private readonly database: Database) {}

  /** Devolve o pedido e os itens que seguram o envio. */
  handle(id: string): GetOrderResponse {
    const db = this.database.connection;
    const row = db.prepare(`SELECT ${ORDER_COLUMNS} FROM orders WHERE id = ?`).get(id) as OrderRow | undefined;
    if (!row) throw new NotFoundException(`order ${id} not found`);
    const order = toOrder(db, row);
    return {
      id: order.id,
      customerName: order.customerName,
      status: order.status,
      items: order.items,
      subtotal: subtotal(order),
      discount: discount(order),
      total: total(order),
      missingItems: order.status === "PAID" ? this.missing(order) : [],
    };
  }

  private missing(order: Order): string[] {
    const stock = this.database.connection.prepare("SELECT available FROM stock WHERE product = ?");
    return order.items
      .filter((item) => {
        const row = stock.get(item.name) as { available: number } | undefined;
        return (row?.available ?? 0) < item.quantity;
      })
      .map((item) => item.name);
  }
}

@Controller("orders")
export class GetOrderController {
  constructor(private readonly handler: GetOrderHandler) {}

  @Get(":id")
  get(@Param("id") id: string): GetOrderResponse {
    return this.handler.handle(id);
  }
}
