import {testSelectors} from "../../src/utils/constans";

describe('displaying ingredients', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays ingredients', () => {
    cy.contains('Соберите бургер');
    cy.get('div[class*=scrollbar]').as('ingredientsScrollbar');
    cy.get('@ingredientsScrollbar').should('contain', 'Булки');
    cy.get('@ingredientsScrollbar').should('contain', 'Соусы');
    cy.get('@ingredientsScrollbar').should('contain', 'Начинки');

    cy.get('@ingredientsScrollbar').find('div[class*=grid]').first().as('buns');
    cy.get('@buns').next().next().as('sauces');
    cy.get('@ingredientsScrollbar').find('div[class*=grid]').last().as('fillings');

    cy.get('@buns').find(testSelectors.ingredient).should('have.length.above', 0);
    cy.get('@sauces').find(testSelectors.ingredient).should('have.length.above', 0);
    cy.get('@fillings').find(testSelectors.ingredient).should('have.length.above', 0);
  })

  it('clicks Tab correctly', () => {
    cy.get(testSelectors.tab).first().should('have.class', 'tab_type_current');
    cy.get(testSelectors.tab).next().first().should('not.have.class', 'tab_type_current');
    cy.get(testSelectors.tab).last().should('not.have.class', 'tab_type_current');

    cy.get(testSelectors.tab).next().first().click();
    cy.get(testSelectors.tab).first().should('not.have.class', 'tab_type_current');
    cy.get(testSelectors.tab).next().first().should('have.class', 'tab_type_current');
    cy.get(testSelectors.tab).last().should('not.have.class', 'tab_type_current');

    cy.get(testSelectors.tab).next().last().click();
    cy.get(testSelectors.tab).first().should('not.have.class', 'tab_type_current');
    cy.get(testSelectors.tab).next().first().should('not.have.class', 'tab_type_current');
    cy.get(testSelectors.tab).last().should('have.class', 'tab_type_current');
  })
})
