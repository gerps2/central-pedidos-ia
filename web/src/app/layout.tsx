import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata = { title: "Central de pedidos" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <nav>
            <span className="logo">CP</span>
            <Link href="/">Central de pedidos</Link>
            <small>Painel de atendimento</small>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
