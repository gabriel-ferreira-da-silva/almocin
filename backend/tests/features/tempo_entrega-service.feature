Feature: Calculo do tempo de entrega

Background:
    Given no serviço "OrderService" têm os métodos "CreateOrder", "UpdateOrder", "calculateDeliveryTime"
    And no repository "OrderRepository" há os itens:
        | id | itemsId    | userID | totalPrice |   status    | totalDeliveryTime | cep       | address_number |
        |  0 |     1, 0   |    2   |    20.00   | concluded   |       15 min      | 12345-678 |      478       |
        |  1 |  1, 2, 3   |    1   |    32.00   | inProgress  |       30 min      | 50504-707 |      123       |
        |  2 |  0, 4, 4   |    4   |    21.00   | inCart      |       23 min      | 50594-000 |      987       |
        |  3 |     3, 3   |    3   |    14.00   | canceled    |       12 min      | 50689-000 |      852       |
    And Existe um obejto "OrderEntity" com os atributos: "itemsId", "userID", "totalPrice", "status", "totalDeliveryTime", "cep", "address_number"
    And Given o método "calculateDeliveryTime" têm como parâmetros "data: cepValue"
    And o método "calculateDeliveryTime" retorna o valor do tempo de entrega

    Scenario: Um CEP foi inserido corretamente
        Given para o parâmetros "50740-170" o método retorna o valor "9"
        When eu chamo o método "calculateDeliveryTime" com o parâmetro "50740-170"
        Then o método "calculateDeliveryTime" retorna o valor "9"

    Scenario: Um CEP que não existe foi inserido
    Given para o parâmetros "99999-999" o método retorna o valor "Endereço não encontrado para o CEP fornecido."
    When eu chamo o método "calculateDeliveryTime" com o parâmetro "99999-999"
    Then o método "calculateDeliveryTime" retorna o valor "Endereço não encontrado para o CEP fornecido."

    Scenario: Um CEP incompleto foi inserido
    Given para o parâmetros "5074" o método retorna o valor "Endereço não encontrado para o CEP fornecido."
    When eu chamo o método "calculateDeliveryTime" com o parâmetro "5074"
    Then o método "calculateDeliveryTime" retorna o valor "Endereço não encontrado para o CEP fornecido."

