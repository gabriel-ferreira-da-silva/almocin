import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuario esta na pagina {string} ', (page: string) => {
    cy.visit(`/`);
});

When('o usuario vai para pagina {string}', (page: string) => {
    cy.visit(`/historico`); 
});

Then('o usuario recebe o carrinho', () => {
    cy.get(`orderContainer`)
      .should('have.length.at.least', 0);
});


Given('usuario não validado esta na pagina de {string}', (page: string) => {
});
  
Then('usuario recebe erro de validação', () => {
});