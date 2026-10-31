import { Module } from "@nestjs/common";
import { GetSupportOrderHandler, GetSupportOrderTool } from "./get-support-order/get-support-order";
import { ListSupportOrdersHandler, ListSupportOrdersTool } from "./list-support-orders/list-support-orders";

@Module({
  controllers: [ListSupportOrdersTool, GetSupportOrderTool],
  providers: [ListSupportOrdersHandler, GetSupportOrderHandler],
})
export class SupportModule {}
