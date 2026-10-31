import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

const FILTER_URLS: Record<string, RegExp> = {
  Todos: /\/$/,
  Pago: /\?status=PAID$/,
  Enviado: /\?status=SHIPPED$/,
};

async function filterBy(page: import("@playwright/test").Page, label: string) {
  await page.getByRole("navigation", { name: "Filtrar por status" }).getByRole("link", { name: label }).click();
  await page.waitForURL(FILTER_URLS[label]);
}

When("filtro a lista por {string}", async ({ page }, label: string) => filterBy(page, label));

Given("que abri a lista de pedidos", async ({ page }) => {
  await page.goto("/");
});

Given("que abri o pedido {string}", async ({ page }, id: string) => {
  await page.goto(`/pedidos/${id}`);
});

Then("vejo o pedido {string}", async ({ page }, id: string) => {
  await expect(page.getByRole("link", { name: id })).toBeVisible();
});

Then("não vejo o pedido {string}", async ({ page }, id: string) => {
  await expect(page.getByRole("link", { name: id, exact: true })).toHaveCount(0);
});

Then("vejo o aviso {string}", async ({ page }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
});

Then("vejo o total {string}", async ({ page }, value: string) => {
  const text = (await page.getByTestId("total").textContent()) ?? "";
  expect(text.replace(/\s/g, " ")).toBe(value);
});
