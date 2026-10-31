import { Module } from "@nestjs/common";
import { DatabaseModule } from "./common/database/database.module";
import { OrdersModule } from "./features/orders/orders.module";
import { StockModule } from "./features/stock/stock.module";
import { SupportModule } from "./features/support/support.module";

@Module({ imports: [DatabaseModule, OrdersModule, StockModule, SupportModule] })
export class AppModule {}
