Feature: Calculo do tempo de entrega
    As eu sou um cliente
    I want ver qual o tempo estimado de entrega do meu pedido
    So that eu possa saber em quanto tempo o meu pedido será entregue

Scenario: Um CEP foi inserido corretamente
    Given O CEP "50670-901" foi inserido na variável "cepEntrega"
    When A API "brasil-api-promise" recebe o valor da variável "cepEntrega" 
    And retorna um "JSON" com os valores "cep": "05010000"
    And "state": "PE",
    And "city": "Recife",
    And "neighborhood": "Cidade Universitária",
    And "street": "Av. Prof. Moraes Rego"
    And o valor "street" é salvo na variável "endereçoEntrega"
    And A API "google-maps-services-js" recebe o valor da variável "endereçoEntrega"
    And retorna um "JSON" com o objeto "duration" com os valores "text": "15 mins"
    And "status": "OK"
    And o valor de "text" é salvo na variável "tempoEntrega"
    Then o valor de "tempoEntrega" é retornado
    And temos o tempo de entrega estimado

Scenario: Um CEP que não existe foi inserido
    Given O CEP "99999-999" foi inserido na variável "cepEntrega"
    When A API "brasil-api-promise" recebe o valor da variável "cepEntrega" 
    And retorna um "JSON" com o valor "message": "Todos os serviços de CEP retornaram erro."
    Then A mensagem "Todos os serviços de CEP retornaram erro." é retornada