Feature: Sharing link
    As a user
    I want to share specific details of my order with others
    So that they can see what I purchased, the cost, and the status of my order.

Scenario: access to a link with public access whitout login
Given "Rodrigo Real" created "Link de compartilhamento" with "pbac"
When I access "Link de compartilhamento"
Then I am at page "login/cadastro"
And I see the message "Login necessário"

Scenario: access to a link with private access whitout login
Given "Rodrigo Real" created "Link de compartilhamento" with "pvac"
When I access "Link de compartilhamento"
Then I am at page "Login/cadastro"
And I see the message "Login necessário"

Scenario: access to a link with public access and logged in
Given "Rodrigo Real" created "Link de compartilhamento" with "pbac"
And I am logged as "João Alfredo" on the system
When I access "Link de compartilhamento"
Then I am at page "link de compartilhamento"
And I see "Rodrigo Real" as the link owner, "custo da compra", "itens da compra", "status da compra"

Scenario: access to a link with private access and logged in
Given "Rodrigo Real" created "Link de compartilhamento" with "pvac"
And I am logged as "João Alfredo" on the system
When I access "Link de compartilhamento"
Then I am at page "Home"
And I see the message "erro ao acessar"

Scenario: access to own link with private access and logged in
Given "Rodrigo Real" created "Link de compartilhamento" with "pvac"
And I am logged as "Rodrigo Real" on the system
When I access "Link de compartilhamento"
Then I am at page "Link de compartilhamento"
And I see "Rodrigo Real" as the link owner, "custo da compra", "itens da compra","status da compra"
