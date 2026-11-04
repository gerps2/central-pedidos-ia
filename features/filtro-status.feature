# language: pt
Funcionalidade: Filtrar pedidos por status

  Cenário: ver todos os pedidos sem filtro
    Dado que abri a lista de pedidos
    Então vejo o pedido "1040"
    E vejo o pedido "1042"

  Cenário: filtrar só os pedidos pagos
    Dado que abri a lista de pedidos
    Quando filtro por "Pago"
    Então vejo o pedido "1042"
    E vejo o pedido "1043"
    E não vejo o pedido "1040"
    E não vejo o pedido "1041"

  Cenário: filtrar só os pedidos enviados
    Dado que abri a lista de pedidos
    Quando filtro por "Enviado"
    Então vejo o pedido "1040"
    E vejo o pedido "1041"
    E não vejo o pedido "1042"

  Cenário: voltar para todos os pedidos
    Dado que abri a lista de pedidos
    E filtro por "Enviado"
    Quando filtro por "Todos"
    Então vejo o pedido "1040"
    E vejo o pedido "1042"
