import { xit } from "mocha";

describe('home page', () => {
  xit('has a heading', () => {
    cy.visit('/');

    cy.get('.header__title').should('contain', 'Blandford.dev');
  });
});
