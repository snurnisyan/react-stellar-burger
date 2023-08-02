import {testSelectors} from "../../src/utils/constans";

describe('creating order', () => {
  const login = (email, password) => {
    cy.session([email, password], () => {
      cy.request({
        method: 'POST',
        url: 'https://norma.nomoreparties.space/api/auth/login',
        body: { email, password },
      }).then(({ body }) => {
        cy.setCookie('token', body.accessToken.split(" ")[1]);
        cy.setCookie('refreshToken', body.refreshToken);
      })
    })
    cy.visit('/');
  }

  before(() => {
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
    login("aa@aaa.uu", "Qwerty228");
  });

  it('adds ingredients in constructor and makes order', () => {
    const dataTransfer = new DataTransfer();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get(testSelectors.ingredient).contains('Краторная булка').trigger('dragstart', { dataTransfer });
    cy.get(testSelectors.constructor).find('div').first().as('dropTarget');
    cy.get('@dropTarget').trigger('drop', { dataTransfer });
    cy.get(testSelectors.ingredient).contains('Соус Spicy').trigger('dragstart', { dataTransfer });
    cy.get('@dropTarget').trigger('drop', { dataTransfer });
    cy.get('button').contains('Оформить заказ').should('be.enabled').click();
    cy.get('#order-details',  { timeout: 20000 }).should('contain', 'идентификатор заказа');
    cy.get('#order-details').parent().find('button').click();
  })
})
