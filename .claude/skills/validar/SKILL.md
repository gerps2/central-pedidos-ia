---
name: validar
description: Roda todas as validações locais antes de abrir um PR e resume o que falhou. Use ao terminar uma tarefa.
---

Rode `npm run validar`.

- Se passar, diga em uma linha que está pronto para o PR.
- Se falhar, informe a etapa, o arquivo e a causa provável.
- Corrija só o que for falha da mudança atual.
- Nunca altere um cenário nem apague um teste para passar.
