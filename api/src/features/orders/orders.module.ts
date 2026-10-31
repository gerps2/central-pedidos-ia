import { Module } from "@nestjs/common";
import { ApplyCouponController, ApplyCouponHandler } from "./apply-coupon/apply-coupon";
import { GetOrderController, GetOrderHandler } from "./get-order/get-order";
import { ListOrdersController, ListOrdersHandler } from "./list-orders/list-orders";

@Module({
  controllers: [ListOrdersController, GetOrderController, ApplyCouponController],
  providers: [ListOrdersHandler, GetOrderHandler, ApplyCouponHandler],
})
export class OrdersModule {}
