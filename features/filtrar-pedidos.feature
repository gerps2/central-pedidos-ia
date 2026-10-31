# language: pt
Funcionalidade: Filtrar pedidos por status

  Cenário: ver todos os pedidos por padrão
    Dado que abri a lista de pedidos
    Então vejo o pedido "1040"
    E vejo o pedido "1041"
    E vejo o pedido "1042"
    E vejo o pedido "1043"

  Cenário: filtrar só os pedidos pagos
    Dado que abri a lista de pedidos
    Quando filtro a lista por "Pago"
    Então vejo o pedido "1042"
    E vejo o pedido "1043"
    E não vejo o pedido "1040"
    E não vejo o pedido "1041"

  Cenário: filtrar só os pedidos enviados
    Dado que abri a lista de pedidos
    Quando filtro a lista por "Enviado"
    Então vejo o pedido "1040"
    E vejo o pedido "1041"
    E não vejo o pedido "1042"
    E não vejo o pedido "1043"

  Cenário: voltar para todos depois de filtrar
    Dado que abri a lista de pedidos
    E filtro a lista por "Pago"
    Quando filtro a lista por "Todos"
    Então vejo o pedido "1040"
    E vejo o pedido "1043"
