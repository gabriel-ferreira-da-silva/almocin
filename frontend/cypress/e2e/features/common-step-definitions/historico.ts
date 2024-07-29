import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuario esta na pagina {string}', (page: string) => {
    cy.visit(`/`);
});

When('o usuario vai para a pagina {string}', (page: string) => {
    cy.visit(`/historico`); 
});

Then('o usuario recebe o historico de pedidos', () => {
    
    cy.get(`orderContainer`)
      .should('have.length.at.least', 0);
});


Given('o usuario não validado esta na pagina {string}', (page: string) => {
});
  
Then('o usuario recebe uma mensagem de erro de validação', () => {

});