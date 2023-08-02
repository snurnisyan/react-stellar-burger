import {testSelectors} from "../../src/utils/constans";

describe('ingredients modal', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('opens and closes ingredient details modal by close-button click', () => {
    cy.get(testSelectors.ingredient).contains('Краторная булка').click();
    cy.contains('Детали ингредиента');
    cy.get('#ingredient-details').parent().find('button').click({force: true});
  })

  it('opens and closes ingredient details modal by Escape', () => {
    cy.get(testSelectors.ingredient).contains('Краторная булка').click();
    cy.contains('Детали ингредиента');
    cy.get('body').type('{esc}');
  })

  it('opens and closes ingredient details modal by overlay click', () => {
    cy.get(testSelectors.ingredient).contains('Краторная булка').click();
    cy.contains('Детали ингредиента');
    cy.get('#ingredient-details').parent().parent().click({force: true});
  })
})
