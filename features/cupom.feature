# language: pt
Funcionalidade: Cupom de desconto no detalhe do pedido

  Cenário: FIAP10 dá 10% em pedido sem desconto progressivo
    Dado que abri o pedido "1040"
    Quando aplico o cupom "FIAP10"
    Então vejo o total "R$ 108,00"

  Cenário: BEMVINDO20 dá 20% em pedido sem desconto progressivo
    Dado que abri o pedido "1040"
    Quando aplico o cupom "BEMVINDO20"
    Então vejo o total "R$ 96,00"

  Cenário: FIAP10 empata com o desconto progressivo e não acumula
    Dado que abri o pedido "1042"
    Quando aplico o cupom "FIAP10"
    Então vejo o total "R$ 360,00"

  Cenário: BEMVINDO20 vale mais que o desconto progressivo e não acumula
    Dado que abri o pedido "1042"
    Quando aplico o cupom "BEMVINDO20"
    Então vejo o total "R$ 320,00"

  Cenário: BEMVINDO20 em pedido de valor alto
    Dado que abri o pedido "1043"
    Quando aplico o cupom "BEMVINDO20"
    Então vejo o total "R$ 1.440,00"

  Cenário: cupom desconhecido é erro e mantém o total
    Dado que abri o pedido "1040"
    Quando aplico o cupom "PROMO50"
    Então vejo o erro "Cupom inválido: PROMO50"
    E vejo o total "R$ 120,00"

  Cenário: cupom desconhecido não tira o desconto progressivo
    Dado que abri o pedido "1042"
    Quando aplico o cupom "PROMO50"
    Então vejo o erro "Cupom inválido: PROMO50"
    E vejo o total "R$ 360,00"
