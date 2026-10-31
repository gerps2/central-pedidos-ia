import { Controller, Get, Injectable, NotFoundException, Param } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { McpController, Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import { Database } from "../../../common/database/database";

export type CheckStockResponse = { product: string; available: number; restockDate: string | null };

type StockRow = { product: string; available: number; restock_date: string | null };

@Injectable()
export class CheckStockHandler {
  constructor(private readonly database: Database) {}

  /** Consulta o estoque, ignorando maiusculas e minusculas. */
  handle(product: string): CheckStockResponse {
    const row = this.database.connection
      .prepare("SELECT * FROM stock WHERE LOWER(product) = LOWER(?)")
      .get(product) as StockRow | undefined;
    if (!row) throw new NotFoundException(`product ${product} not found`);
    return { product: row.product, available: row.available, restockDate: row.restock_date };
  }
}

@Controller("stock")
export class CheckStockController {
  constructor(private readonly handler: CheckStockHandler) {}

  @Get(":product")
  get(@Param("product") product: string): CheckStockResponse {
    return this.handler.handle(product);
  }
}

@McpController()
export class CheckStockTool {
  constructor(private readonly handler: CheckStockHandler) {}

  @Tool({
    name: "check_stock",
    description: "Consulta a quantidade em estoque de um produto e a data de reposicao",
    parameters: z.object({ product: z.string().describe("Nome do produto") }),
  })
  run(@Payload() { product }: { product: string }) {
    return { content: [{ type: "text", text: JSON.stringify(this.handler.handle(product)) }] };
  }
}
