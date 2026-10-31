import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "features/*.feature",
  steps: "features/steps/*.ts",
});

export default defineConfig({
  testDir,
  workers: 1,
  use: { baseURL: "http://localhost:3100", channel: "chrome" },
  webServer: [
    {
      command: "npm run start -w api",
      url: "http://localhost:3200/orders",
      reuseExistingServer: true,
      timeout: 60_000,
    },
    {
      command: "npm run start -w web",
      url: "http://localhost:3100",
      reuseExistingServer: true,
      timeout: 60_000,
    },
  ],
});
