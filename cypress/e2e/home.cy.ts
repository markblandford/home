describe('home page', () => {
  it('has a heading', () => {
    cy.visit('/');

    cy.get('.app__title').should('contain', 'Blandford.dev');
  });
});
