// Cenario ja commitado e contrato: bloqueia a edicao para a IA nao adaptar o teste ao codigo.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { relative } from "node:path";

const input = JSON.parse(readFileSync(0, "utf8"));
const file = input.tool_input?.file_path ?? "";
if (!file.endsWith(".feature")) process.exit(0);

const path = relative(process.cwd(), file);
const tracked = spawnSync("git", ["ls-files", "--error-unmatch", path], { stdio: "ignore" });
if (tracked.status !== 0) process.exit(0);

console.error(`${path} ja esta commitado e e contrato. Nao altere: pare e pergunte ao dev.`);
process.exit(2);
