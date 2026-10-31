---
name: criar-slice
description: Cria uma funcionalidade nova da API como vertical slice em NestJS. Use ao adicionar um endpoint ou caso de uso.
disable-model-invocation: true
---

Crie o slice para: $ARGUMENTS

1. Crie `api/src/features/<área>/<nome>/<nome>.ts` com response, handler e controller.
2. Escreva o teste ao lado, em `<nome>.test.ts`, e veja ele falhar.
3. Implemente o handler usando `Database` direto.
4. Registre controller e handler em `<área>.module.ts`.
5. Rode `npm test`.

Não importe outro slice. Se precisar de algo comum, use a entidade da área.
