# Central de pedidos

Monorepo com API em NestJS (vertical slice), tela em Next.js e SQLite local. Roda sem Docker.

## Comandos

- `npm run dev`: sobe a API em :3200 e a tela em :3100
- `npm test`: testes da API com Vitest
- `npm run test:e2e`: cenários Gherkin; exige `npm run build` antes
- `npm run validar`: lint, tipos, testes, build e cenários

## Arquitetura

- `api/src/features/<área>/<slice>/`: uma pasta por funcionalidade.
- `api/src/features/<área>/`: entidade e regras da área, como `order.ts`.
- `api/src/common/`: só o que é transversal de verdade, como o banco.
- `api/src/mcp.ts`: configura o servidor MCP em `/mcp`.
- `web/`: telas em Next.js. Fala com a API por HTTP e não tem regra de negócio.
- `features/`: cenários Gherkin, o contrato de comportamento.

## Regras

- Comportamento novo começa por um cenário em `features/`.
- Cenário commitado é contrato: se parecer errado, pare e pergunte.
- Um slice não importa outro slice. O teste de arquitetura confere isso.
- Regra de negócio fica no slice ou na entidade da área, com teste ao lado.
- Identificadores em inglês; textos de tela e cenários em português.
- Não altere `api/src/common/database/seed.ts` sem pedir.
- Nada de CPF, e-mail completo ou segredo em logs, respostas de API ou MCP.

## Aprendizados

Cada erro repetido do agente vira uma linha aqui ou uma regra em `.claude/rules/`.

- Tabela de busca por texto vindo do usuário (cupons, códigos) usa `Map`, não objeto comum: `obj["toString"]` devolve função herdada. Teste com `toString` e `constructor`.
