Feature: Statistics
    As an administrator
    I want to view various performance metrics
    So that I can monitor and analyze the system's usage and its profitability.


Scenario: visualize statistics
Given I am at page "Home"
When I access page "Statistics"
Then I am at page "Statistics"
And I can see "totalUsers", "totalitems", "totalOrders", "monthOrders", "totalRevenue", "monthRevenue" e "averageTicket"
