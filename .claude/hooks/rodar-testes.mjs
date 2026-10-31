// Roda os testes da API depois de cada edicao; se falhar, devolve o erro ao Claude.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const file = (input.tool_input?.file_path ?? "").replaceAll("\\", "/");
if (!/\/api\/src\/.*\.ts$/.test(file)) process.exit(0);

const run = spawnSync("npm test", { shell: true, encoding: "utf8" });
if (run.status === 0) process.exit(0);

// Exit 2 faz o Claude Code mostrar o stderr ao modelo.
console.error(`Testes falhando depois de editar ${file}:\n${(run.stdout + run.stderr).slice(-1500)}`);
process.exit(2);
