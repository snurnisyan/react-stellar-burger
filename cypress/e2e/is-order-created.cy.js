describe('creating order', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('shows empty constructor by default', () => {
    cy.contains('Пожалуйста, перетащите булку');
    cy.get('button').contains('Оформить заказ').should('be.disabled');
  })

/*  const login = (email, password) => {
    cy.session([email, password], () => {
      cy.visit('http://localhost:3000/login');
      cy.contains('Вход');
      cy.get('form').within(() => {
        cy.get('input:first').should('have.attr', 'name', 'email').type(email);
        cy.get('input:last').should('have.attr', 'name', 'password').type(password);
      })
      cy.get('button').contains('Войти').click();
      cy.visit('http://localhost:3000/');
    })
  }*/

  it('adds ingredients in constructor and clicks order button', () => {
    const dataTransfer = new DataTransfer();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get('div[class*=ingredient__]').contains('Краторная булка').trigger('dragstart', { dataTransfer });
    cy.get('section[class*=constructor]').find('div').first().as('dropTarget');
    cy.get('@dropTarget').trigger('drop', { dataTransfer });
    cy.get('div[class*=ingredient__]').contains('Соус Spicy').trigger('dragstart', { dataTransfer });
    cy.get('@dropTarget').trigger('drop', { dataTransfer });
    cy.get('button').contains('Оформить заказ').should('be.enabled').click();

    cy.contains('Вход');
    cy.get('form').within(() => {
      cy.get('input:first').should('have.attr', 'name', 'email').type('aa@aaa.uu');
      cy.get('input:last').should('have.attr', 'name', 'password').type('Qwerty228');
    })
    cy.get('button').contains('Войти').click();

    cy.contains('Соберите бургер');
    cy.get('button').contains('Оформить заказ').click();
    cy.get('#order-details',  { timeout: 20000 }).should('contain', 'идентификатор заказа');
    cy.get('#order-details').parent().find('button').click();
  })
})
