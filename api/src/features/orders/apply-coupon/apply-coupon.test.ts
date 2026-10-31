import { BadRequestException } from "@nestjs/common";
import { beforeEach, describe, expect, it } from "vitest";
import { Database } from "../../../common/database/database";
import { ApplyCouponHandler } from "./apply-coupon";

describe("ApplyCouponHandler", () => {
  let handler: ApplyCouponHandler;

  beforeEach(() => {
    handler = new ApplyCouponHandler(new Database());
  });

  it.each([
    ["1040", "FIAP10", 108],
    ["1040", "BEMVINDO20", 96],
    ["1042", "FIAP10", 360],
    ["1042", "BEMVINDO20", 320],
    ["1043", "BEMVINDO20", 1440],
  ])("pedido %s com %s fica em %d", (id, code, total) => {
    expect(handler.handle(id, { code }).total).toBe(total);
  });

  it("recusa cupom desconhecido", () => {
    expect(() => handler.handle("1040", { code: "PROMO50" })).toThrow(new BadRequestException("Cupom inválido: PROMO50"));
  });
});
