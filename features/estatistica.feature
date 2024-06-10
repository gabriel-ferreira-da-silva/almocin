Feature: Estatísticas
    As an administrator
    I want to view various performance metrics
    So that I can monitor and analyze the system's usage and its profitability.


Scenario: acesso às estatísticas do restaurante
Given estou logado com nome "admin", senha "admin" e função "admin"
And estou na página "Home" 
When acesso a página "Estatísticas"
Then estou na página "Estatísticas"