describe('ingredients modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('opens and closes ingredient details modal by close-button click', () => {
    cy.get('div[class*=ingredient__]').contains('Краторная булка').click();
    cy.contains('Детали ингредиента');
    cy.get('#ingredient-details').parent().find('button').click({force: true});
  })

  it('opens and closes ingredient details modal by Escape', () => {
    cy.get('div[class*=ingredient__]').contains('Краторная булка').click();
    cy.contains('Детали ингредиента');
    cy.get('body').type('{esc}');
  })

  it('opens and closes ingredient details modal by overlay click', () => {
    cy.get('div[class*=ingredient__]').contains('Краторная булка').click();
    cy.contains('Детали ингредиента');
    cy.get('#ingredient-details').parent().parent().click({force: true});
  })
})
