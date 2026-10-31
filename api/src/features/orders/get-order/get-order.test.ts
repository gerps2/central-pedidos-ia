import { NotFoundException } from "@nestjs/common";
import { beforeEach, describe, expect, it } from "vitest";
import { Database } from "../../../common/database/database";
import { GetOrderHandler } from "./get-order";

describe("GetOrderHandler", () => {
  let handler: GetOrderHandler;

  beforeEach(() => {
    handler = new GetOrderHandler(new Database());
  });

  it("mostra o que segura o pedido 1042", () => {
    const order = handler.handle("1042");
    expect(order.total).toBe(360);
    expect(order.missingItems).toEqual(["Teclado Mecanico"]);
  });

  it("recusa pedido inexistente", () => {
    expect(() => handler.handle("9999")).toThrow(NotFoundException);
  });
});
