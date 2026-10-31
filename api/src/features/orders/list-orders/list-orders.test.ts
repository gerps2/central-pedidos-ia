import { beforeEach, describe, expect, it } from "vitest";
import { Database } from "../../../common/database/database";
import { ListOrdersHandler } from "./list-orders";

describe("ListOrdersHandler", () => {
  let handler: ListOrdersHandler;

  const ids = (status?: string) => handler.handle(status).map((order) => order.id);

  beforeEach(() => {
    handler = new ListOrdersHandler(new Database());
  });

  it("filtra só os pagos", () => {
    expect(ids("PAID")).toEqual(expect.arrayContaining(["1042", "1043"]));
    expect(ids("PAID")).not.toContain("1040");
  });

  it("filtra só os enviados", () => {
    expect(ids("SHIPPED")).toEqual(expect.arrayContaining(["1040", "1041"]));
    expect(ids("SHIPPED")).not.toContain("1042");
  });

  it("mostra todos sem status ou com status inválido", () => {
    const all = ids();
    expect(all).toHaveLength(4);
    expect(ids("QUALQUER")).toEqual(all);
    expect(ids("")).toEqual(all);
  });
});
