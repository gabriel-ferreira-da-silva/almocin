Feature: Sharing link
    As a user
    I want to share specific details of my order with others
    So that they can see what I purchased, the cost, and the status of my order.

Scenario: acesso a link com acesso público sem conta registrada
Given "Rodrigo Real" gerou um "Link de compartilhamento" com "acesso público"
When acesso "Link de compartilhamento"
Then estou na página "login/cadastro" do site
And vejo uma mensagem de "Login necessário"

Scenario: acesso a link com acesso privado sem conta registrada
Given "Rodrigo Real" gerou um "Link de compartilhamento" com "acesso privado"
When acesso "Link de compartilhamento"
Then estou na página "login/cadastro" do site
And vejo uma mensagem de "Login necessário"

Scenario: acesso a link com acesso público e login efetuado
Given "Rodrigo Real" gerou um "Link de compartilhamento" com "acesso público"
And estou logado como "João Alfredo" no sistema do restaurante
When acesso "Link de compartilhamento"
Then estou na página do "link de compartilhamento"
And consigo ver que "Rodrigo Real" é o dono do link, o "custo da compra", os "itens da compra" e o "status da compra"

Scenario: acesso a link com acesso privado e login efetuado
Given "Rodrigo Real" gerou um "Link de compartilhamento" com "acesso privado"
And estou logado como "João Alfredo" no sistema do restaurante
When acesso "Link de compartilhamento"
Then estou na página "Home"
And vejo mensagem "erro ao acessar"

Scenario: acesso a link proprietário com acesso privado e login efetuado
Given "Rodrigo Real" gerou um "Link de compartilhamento" com "acesso privado"
And estou logado como "Rodrigo Real" no sistema do restaurante
When acesso "Link de compartilhamento"
Then estou na página do "link de compartilhamento"
And consigo ver que "Rodrigo Real" é o dono do link, o "custo da compra", os "itens da compra" e o "status da compra"
