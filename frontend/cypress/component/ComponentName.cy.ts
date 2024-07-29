import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


describe('ComponentName.cy.ts', () => {
  it('playground', () => {
    // cy.mount()
  })
})

Given('o usuário está logado com o email {string} e senha {string}', (admin: string) => {
  cy.visit('/');
  cy.get('[data-cy="login"]').type(admin);
  cy.get('[data-cy="password"]').type(admin);
  cy.get('[data-cy="submit-login"]').click();
});