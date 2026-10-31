import { describe, expect, it } from "vitest";
import { discount, subtotal, total } from "./order";

const order = (unitPrice: number) => ({ items: [{ name: "Item", quantity: 1, unitPrice }] });

describe("regras do pedido", () => {
  it("soma os itens", () => {
    expect(subtotal(order(120))).toBe(120);
  });

  it("nao da desconto ate R$ 300", () => {
    expect(discount(order(300))).toBe(0);
  });

  it("da 10% acima de R$ 300", () => {
    expect(total(order(350))).toBe(315);
  });
});
