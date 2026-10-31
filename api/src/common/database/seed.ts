import type { DatabaseSync } from "node:sqlite";

const ORDERS = [
  ["1040", "Bia Rocha", "bia@email.com", "111.222.333-44", "SHIPPED"],
  ["1041", "Caio Melo", "caio@email.com", "222.333.444-55", "SHIPPED"],
  ["1042", "Ana Souza", "ana@email.com", "333.444.555-66", "PAID"],
  ["1043", "Davi Lima", "davi@email.com", "444.555.666-77", "PAID"],
] as const;

const ITEMS = [
  ["1040", "Mouse", 2, 60],
  ["1041", "Mouse Pad", 3, 25],
  ["1042", "Teclado Mecanico", 1, 350],
  ["1042", "Mouse Pad", 2, 25],
  ["1043", "Monitor 27", 1, 1800],
] as const;

const STOCK = [
  ["Mouse", 40, null],
  ["Mouse Pad", 120, null],
  ["Teclado Mecanico", 0, "2026-11-10"],
  ["Monitor 27", 8, null],
] as const;

/** Cria o schema e os dados de exemplo. O pedido 1042 esta pago, sem estoque do teclado. */
export function seedDatabase(db: DatabaseSync): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_cpf TEXT NOT NULL,
      status TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS order_items (
      order_id TEXT NOT NULL REFERENCES orders(id),
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL
    );
    CREATE TABLE IF NOT EXISTS stock (
      product TEXT PRIMARY KEY,
      available INTEGER NOT NULL,
      restock_date TEXT
    );
  `);
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM orders").get() as { count: number };
  if (count > 0) return;
  const order = db.prepare("INSERT INTO orders VALUES (?, ?, ?, ?, ?)");
  const item = db.prepare("INSERT INTO order_items VALUES (?, ?, ?, ?)");
  const stock = db.prepare("INSERT INTO stock VALUES (?, ?, ?)");
  ORDERS.forEach((row) => order.run(...row));
  ITEMS.forEach((row) => item.run(...row));
  STOCK.forEach((row) => stock.run(...row));
}
