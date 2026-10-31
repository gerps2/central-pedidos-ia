import { Injectable } from "@nestjs/common";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { seedDatabase } from "./seed";

/** Abre o SQLite uma vez e cria os dados de exemplo se estiver vazio. */
@Injectable()
export class Database {
  readonly connection: DatabaseSync;

  constructor() {
    const path = process.env.DATABASE_PATH ?? "data/central.db";
    const file = path === ":memory:" ? path : resolve(path);
    if (file !== ":memory:") mkdirSync(dirname(file), { recursive: true });
    this.connection = new DatabaseSync(file);
    seedDatabase(this.connection);
  }
}
