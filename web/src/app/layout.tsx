import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata = { title: "Central de pedidos" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <Link href="/">Central de pedidos</Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
