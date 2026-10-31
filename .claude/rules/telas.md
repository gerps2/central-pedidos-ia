---
paths:
  - "web/src/**"
---

# Telas

- A tela chama a API por `api()`; nunca acesse o banco.
- Sem cálculo de preço, desconto ou regra de negócio em componente.
- Use `data-testid` nos valores que um cenário precisa conferir.
