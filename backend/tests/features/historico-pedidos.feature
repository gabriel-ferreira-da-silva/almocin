Feature: Exibir Historico de pedidos
    As a: usuario
    I want: ver meu Histórico de pedidos
    so that: Acompanhar meus pedidos
    
    Scenario: Ver Historico de pedidos - 
        Given usuario esta na pagina "home"
        And o usuario fez o pedido "cuscuz com leite" cujos campos sao:
            "pedido" ="cuscuz com leite" 
            "Preco" = "RS 13,00"
            "status"= "cancelado"
            "data" = "0/0/2222"
            "img_hef"="www.imagem1.com"
        And o usuario fez o pedido "banana com plutonio" cujos campos sao:
            "pedido" ="banana com plutonio"
            "Preco" = "RS 1000,00"
            "status"= "entregue"
            "data" = "01/01/2222"
            "img_hef"="www.imagem2.com"
        And o usuario fez o pedido "coxinha de avestrus" cujos campos sao:
            "pedido" = "coxinha de avestrus"
            "Preco" = "RS 1,00"
            "status"= "entregue"
            "data" = "02/02/2222"
            "img_hef"="www.imagem1.com"
        When usuario seleciona botao "exibir historico"
        Then usuario e redirecionado para pagina "historico"
        And os pedidos feitos sao listados como:
            "pedido" ="cuscuz com leite" 
            "Preco" = "RS 13,00"
            "status"= "cancelado"
            "data" = "0/0/2222"
            "img_hef"="www.imagem1.com"

            "pedido" ="banana com plutonio"
            "Preco" = "RS 1000,00"
            "status"= "entregue"
            "data" = "01/01/2222"
            "img_hef"="www.imagem2.com"
            
            "pedido" = "coxinha de avestrus"
            "Preco" = "RS 1,00"
            "status"= "entregue"
            "data" = "02/02/2222"
            "img_hef"="www.imagem1.com"





