---
paths:
  - "api/src/features/**"
---

# Vertical slice

- Cada slice tem request, handler e endpoint juntos, em uma pasta só.
- O handler usa `Database` direto, com parâmetros `?`; não crie repositório.
- Divida em vários arquivos só quando o slice crescer demais.
- Mova para `common/` só o que vários slices precisam de verdade.
- Ferramenta MCP mora no slice e chama o handler, com `@McpController`.
- Ferramenta MCP é somente leitura e devolve lista fechada de campos.
