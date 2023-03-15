describe('home page', () => {
  it('has a heading', () => {
    cy.visit('/');

    cy.get('.app__header').should('contain', 'Blandford.dev');
  });
});
