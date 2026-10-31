import { describe, expect, it } from "vitest";
import { Database } from "../../../common/database/database";
import { GetSupportOrderHandler } from "./get-support-order";

describe("GetSupportOrderHandler", () => {
  it("explica o pedido 1042 sem expor dados pessoais", () => {
    const order = new GetSupportOrderHandler(new Database()).handle("1042");
    expect(order.items[0]).toEqual({ name: "Teclado Mecanico", quantity: 1, inStock: false });
    expect(order.customerEmail).toBe("a***@email.com");
    expect(JSON.stringify(order)).not.toContain("333.444.555-66");
    expect(JSON.stringify(order)).not.toContain("Ana Souza");
  });
});
