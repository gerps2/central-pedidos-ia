---
name: abrir-pr
description: Abre um pull request estruturado depois da validação local. Use quando a mudança estiver pronta para revisão.
disable-model-invocation: true
---

1. Confirme que `npm run validar` passou nesta sessão. Se não, rode.
2. Crie uma branch `feat/<assunto>` e faça o commit com mensagem no imperativo.
3. Preencha `.github/pull_request_template.md` com dados reais do diff.
4. Abra com `gh pr create --base main --title "<título>" --body-file <arquivo>`.
5. Mostre o link do PR.

Não invente testes que não rodaram. Em "Riscos", cite o risco real, ou escreva "Nenhum identificado".
