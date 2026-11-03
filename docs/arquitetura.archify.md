# Como a central de pedidos funciona {#central-pedidos}

A central de pedidos tem duas partes. A **web em Next** (porta 3100) mostra os pedidos, e a **API em NestJS** (porta 3200) responde com dados de um arquivo SQLite. A feature da live é um filtro por status na lista de pedidos.

- A API tem uma pasta por funcionalidade, como `orders` e `stock`.[](source:list-orders)
- Os dados ficam em um arquivo SQLite, então não precisa de Docker.[](source:seed)
- `GET /orders` já aceita `?status=`, então a feature começa na tela.[](source:list-orders)

@answer scope="Branch main (tag estado-0) · só web, API e banco · o MCP fica para a terceira parte"
@meta locale=en style=product
@source web-page title="Tela da lista de pedidos" path=web/src/app/page.tsx lines=1:38
@source web-api title="Cliente HTTP da web" path=web/src/app/api.ts lines=1:9
@source list-orders title="Slice list-orders" path=api/src/features/orders/list-orders/list-orders.ts lines=1:37
@source get-order title="Slice get-order" path=api/src/features/orders/get-order/get-order.ts lines=14:66
@source check-stock title="Slice check-stock" path=api/src/features/stock/check-stock/check-stock.ts lines=1:47
@source seed title="Tabelas e dados de exemplo" path=api/src/common/database/seed.ts lines=1:55
@source order title="Regra de desconto e colunas sem CPF" path=api/src/features/orders/order.ts lines=18:53
@source sem-harness title="Resultado do pedido sem harness (tag filtro-sem-harness)" url=https://github.com/gerps2/central-pedidos-ia/tree/filtro-sem-harness
@source com-harness title="Resultado do pedido com harness (tag filtro-com-harness)" url=https://github.com/gerps2/central-pedidos-ia/tree/filtro-com-harness

## Quais são as peças e como elas conversam? {#pecas}

@architecture id=central-arch title="Central de pedidos"
| browser | Navegador | external |
| web | Web Next :3100 | frontend | source:web-page |
| orders | Slice orders | backend | source:list-orders |
| db | SQLite central.db | database | source:seed |
| browser > web | HTTP |
| web > orders | GET /orders | emphasis |
| orders > db | SELECT |

@steps id=pecas-passos
| p1 | Navegador | Quem atende abre a lista ou um pedido. | central-arch | browser |
| p2 | Web Next :3100 | As telas buscam os dados na API com `fetch`, sem cache. | central-arch | web |
| p3 | Slice orders | Atende `GET /orders` e `GET /orders/:id`, calcula o total e confere o estoque. | central-arch | orders |
| p4 | SQLite central.db | Um arquivo só, criado com os dados de exemplo. Não precisa de Docker. | central-arch | db |

## Quais endpoints a API tem? {#endpoints}

| Endpoint | Slice | Quem usa | Devolve |
| --- | --- | --- | --- |
| `GET /orders?status=` | `orders/list-orders` | Tela da lista | Número, cliente, status e total |
| `GET /orders/:id` | `orders/get-order` | Tela do pedido | Itens, subtotal, desconto, total e itens sem estoque |
| `GET /stock/:product` | `stock/check-stock` | Nenhuma tela hoje | Quantidade e data de reposição |

@callout level=note title="O CPF não sai do banco"
A coluna `customer_cpf` existe na tabela, mas nenhuma consulta a seleciona.[](source:order)

## Como os dados estão guardados? {#dados}

@erd id=central-dados title="Tabelas do SQLite"
| entity orders | orders |
| entity order_items | order_items |
| entity stock | stock |
| orders.id | text | pk |
| orders.customer_name | text |
| orders.customer_email | text |
| orders.customer_cpf | text |
| orders.status | text |
| order_items.order_id | text | fk | orders.id |
| order_items.name | text |
| order_items.quantity | integer |
| order_items.unit_price | real |
| stock.product | text | pk |
| stock.available | integer |
| stock.restock_date | text |
| order_items > orders | many:one | pertence a |

@facts
| Pedidos | 1040 e 1041 enviados; 1042 e 1043 pagos |
| Desconto | 10% quando o subtotal passa de R$ 300 |
| Pedido 1042 | 1 teclado de R$ 350 + 2 mouse pads de R$ 25 = R$ 400; com 10% de desconto, R$ 360 |
| Estoque | Teclado Mecanico com 0 unidades, reposição em 10/11/2026 |

## O que a feature vai mudar? {#feature}

O pedido é o mesmo nas duas vezes: “Adicione na lista de pedidos um filtro por status: todos, pago e enviado.”

@workflow id=filtro-fluxo title="Filtro por status"
| escolhe | Escolhe Pago | external |
| tela | Lista com filtro | frontend |
| api | GET /orders?status=PAID | backend |
| banco | WHERE status = PAID | database |
| lista | Mostra 1042 e 1043 | frontend |
| escolhe > tela | clique |
| tela > api | status |
| api > banco | consulta | emphasis |
| banco > lista | linhas |

| Critério | Sem harness | Com harness |
| --- | --- | --- |
| Arquivos alterados | Só `web/src/app/page.tsx`[](source:sem-harness) {bad:Só a tela} | Tela, `list-orders.ts`, teste, cenários e passos[](source:com-harness) {good:Com prova} |
| Cenários em Gherkin | Nenhum | 4, em `features/filtrar-pedidos.feature` |
| Status inválido na URL | A API filtra pelo texto e devolve lista vazia | Mostra todos, decisão tomada pelo professor |
| Tempo e custo no ensaio | 30 s, US$ 0,17 | 2min23, US$ 0,48 |

## O que mostrar na live? {#roteiro}

- [ ] Abrir http://localhost:3100 e o pedido 1042.
- [ ] Abrir http://localhost:3200/orders?status=PAID no navegador para mostrar que a API já filtra.
- [ ] Pedir a feature sem harness e conferir quais arquivos mudaram.
- [ ] Na branch `com-harness`, pedir de novo e comparar os dois PRs.
