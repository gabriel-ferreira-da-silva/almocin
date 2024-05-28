Feature: Cancelar Pedidos
    As a: aluno de uma classe
    I want: adicionar notas às metas das atividades
    so that: Comparar minhas notas ao do professor
    
    Scenario: Pedido cancelado por Atraso - (GUI)
        Given Usuario esta na pagina "Pedidos"
        And O pedido "cuscuz com leite" esta cadastrado
        And "Tempo estimado de entrega" de "cuscuz com leite " e "1 hora"
        And "Status" do pedido "cuscuz com leite" e "Em andamento"
        When Contador do tempo de conta "1 hora e 30 min"
        Then Usuario recebe uma notificacao com mensagem "Pedido cancelado por atraso"
        And Status do pedido "cuscuz com leite" e "cancelado por atraso"
        
    Scenario : Pedido cancelado por Atraso - (serviço)
        Given pedido "123" esta salvo em "pedidos.json"
        And pedido "123" tem campo "tempo-estimado" igual "1 hora"
        And pedido tem "status" igual a "Andamento"
        When contador atinge "1 hora 30 min"
        Then pedido tem "status" igual a "Cancelado por atraso"
        




    Scenario: Pedido cancelado por usuario - (GUI)
        Given Usuario esta na pagina "Pedidos"
        And O pedido "cuscuz com leite" esta cadastrado
        And Status do pedido "cuscuz com leite" e "Em andamento"
        When usuario seleciona opcao "Cancelar pedido"
        And usuario digita seu "Longin" no campo "digite seu login 
            para confirmar cancelamento"
        And usuario seleciona opcao "confirmar"
        Then Usuario recebe uma notificacao com mensagem "Pedido cancelado 
            por usuario"
        And Status do pedido "cuscuz com leite" e "cancelado por usuario"
        
    Scenario : Pedido cancelado por usuario - (serviço)
        Given pedido "123" esta salvo em "pedidos.json"
        And pedido "123" tem campo "tempo-estimado" igual "1 hora"
        Then pedido tem "status" igual a "Andamento"
        When um requisição "put" é enviada para "/pedidos/123/delete"
        Then pedido tem "status" igual a "Cancelado por usuario"
        






    Scenario: Falha em cancelar pedido por usuario - (GUI)
        Given Usuário está na página "Pedidos"
        And O pedido "cuscuz com leite" está cadastrado
        And Status do pedido "cuscuz com leite" é "Em andamento"
        When usuario seleciona opção "Cancelar pedido"
        And o campo "digite seu login para confirmar cancelamento" está vazio
        And usuario seleciona opção "confirmar"
        Then Usuário recebe uma notificação com mensagem "digite a informação de segurança"
        