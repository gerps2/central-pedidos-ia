---
name: aprender-com-erro
description: Transforma um erro do agente em proteção permanente. Use quando uma revisão encontrar um erro do agente.
disable-model-invocation: true
---

Erro encontrado: $ARGUMENTS

1. Escreva a causa em uma frase.
2. Crie um teste ou cenário que falhe por causa desse erro.
3. Corrija o código até passar.
4. Escolha uma proteção: linha no `CLAUDE.md`, regra em `.claude/rules/`, hook ou caso de eval.
5. Prefira a proteção automática quando der para verificar por comando.

Termine com: erro, causa, teste criado e proteção criada.
