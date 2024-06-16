Feature: Statistics
    As an administrator
    I want to view various performance metrics
    So that I can monitor and analyze the system's usage and its profitability.


Scenario: visualizar estatísticas do restaurante
Given estou na página "Home"
When acesso a página "Estatistica"
Then estou na página "Estatistica"
And consigo ver "totalUsers", "totalitems", "totalOrders", "monthOrders", "totalRevenue", "monthRevenue" e "averageTicket"
