import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, Then } = createBdd();

Given("que abri a lista de pedidos", async ({ page }) => {
  await page.goto("/");
});

Given("que abri o pedido {string}", async ({ page }, id: string) => {
  await page.goto(`/pedidos/${id}`);
});

Then("vejo o pedido {string}", async ({ page }, id: string) => {
  await expect(page.getByRole("link", { name: id })).toBeVisible();
});

Then("vejo o aviso {string}", async ({ page }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
});

Then("vejo o total {string}", async ({ page }, value: string) => {
  const text = (await page.getByTestId("total").textContent()) ?? "";
  expect(text.replace(/\s/g, " ")).toBe(value);
});
