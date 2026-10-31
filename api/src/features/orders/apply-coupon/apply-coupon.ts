import { BadRequestException, Body, Controller, Injectable, NotFoundException, Param, Post } from "@nestjs/common";
import { Database } from "../../../common/database/database";
import { ORDER_COLUMNS, type OrderRow, discountWithCoupon, subtotal, toOrder } from "../order";

export type ApplyCouponRequest = { code: string };

export type ApplyCouponResponse = { subtotal: number; discount: number; total: number };

@Injectable()
export class ApplyCouponHandler {
  constructor(private readonly database: Database) {}

  /** Calcula o total do pedido com o cupom; não grava nada. */
  handle(id: string, request: ApplyCouponRequest): ApplyCouponResponse {
    const db = this.database.connection;
    const row = db.prepare(`SELECT ${ORDER_COLUMNS} FROM orders WHERE id = ?`).get(id) as OrderRow | undefined;
    if (!row) throw new NotFoundException(`order ${id} not found`);
    const order = toOrder(db, row);
    const code = String(request?.code ?? "").trim();
    const discount = discountWithCoupon(order, code);
    if (discount === null) throw new BadRequestException(`Cupom inválido: ${code}`);
    return { subtotal: subtotal(order), discount, total: subtotal(order) - discount };
  }
}

@Controller("orders")
export class ApplyCouponController {
  constructor(private readonly handler: ApplyCouponHandler) {}

  @Post(":id/coupon")
  apply(@Param("id") id: string, @Body() request: ApplyCouponRequest): ApplyCouponResponse {
    return this.handler.handle(id, request);
  }
}
