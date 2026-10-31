import { Module } from "@nestjs/common";
import { CheckStockController, CheckStockHandler, CheckStockTool } from "./check-stock/check-stock";

@Module({ controllers: [CheckStockController, CheckStockTool], providers: [CheckStockHandler] })
export class StockModule {}
