# language: pt
Funcionalidade: Consultar pedidos

  Cenário: ver a lista de pedidos
    Dado que abri a lista de pedidos
    Então vejo o pedido "1042"

  Cenário: ver um pedido parado por falta de estoque
    Dado que abri o pedido "1042"
    Então vejo o aviso "Aguardando estoque: Teclado Mecanico"
    E vejo o total "R$ 360,00"
