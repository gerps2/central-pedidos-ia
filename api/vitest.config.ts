import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { include: ["src/**/*.test.ts"], env: { DATABASE_PATH: ":memory:" } },
  plugins: [swc.vite({ module: { type: "es6" } })],
});
