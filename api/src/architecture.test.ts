import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { describe, expect, it } from "vitest";

const FEATURES = resolve(__dirname, "features");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : path.endsWith(".ts") ? [path] : [];
  });
}

/** Devolve a pasta do slice: features/<area>/<slice>. */
function sliceOf(file: string): string | null {
  const parts = relative(FEATURES, file).split(sep);
  return parts.length >= 3 && !parts[0].startsWith("..") ? parts.slice(0, 2).join("/") : null;
}

describe("vertical slice", () => {
  it("um slice nao importa outro slice", () => {
    const violations: string[] = [];
    for (const file of sourceFiles(FEATURES)) {
      const own = sliceOf(file);
      if (!own) continue;
      for (const [, path] of readFileSync(file, "utf8").matchAll(/from "(\.[^"]+)"/g)) {
        const target = sliceOf(resolve(dirname(file), path));
        if (target && target !== own) violations.push(`${own} -> ${target}`);
      }
    }
    expect(violations).toEqual([]);
  });
});
