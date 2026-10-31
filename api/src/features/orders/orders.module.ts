import { Module } from "@nestjs/common";
import { GetOrderController, GetOrderHandler } from "./get-order/get-order";
import { ListOrdersController, ListOrdersHandler } from "./list-orders/list-orders";

@Module({
  controllers: [ListOrdersController, GetOrderController],
  providers: [ListOrdersHandler, GetOrderHandler],
})
export class OrdersModule {}
