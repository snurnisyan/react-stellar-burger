describe('drag and drop', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('shows empty constructor by default', () => {
    cy.contains('Пожалуйста, перетащите булку');
    cy.get('button').contains('Оформить заказ').should('be.disabled');
  })

  it('drags and drops ingredient in constructor and increases counter', () => {
    const dataTransfer = new DataTransfer();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get('div[class*=ingredient__]').contains('Краторная булка').as('bun');
    cy.get('@bun').trigger('dragstart', { dataTransfer } );
    cy.get('section[class*=constructor]').find('div').first().as('dropTarget');
    cy.get('@dropTarget').trigger('drop', { dataTransfer });
    cy.get('@bun').find('div[class*=counter]').should('contain', '1');
    cy.get('@dropTarget').find('div[class^=constructor-element]').should('have.length', 2);
    cy.get('button').contains('Оформить заказ').should('be.enabled');

    cy.get('div[class*=ingredient__]').contains('Соус Spicy').as('sauce');
    cy.get('@sauce').trigger('dragstart', { dataTransfer } );
    cy.get('@dropTarget').trigger('drop', { dataTransfer });
    cy.get('@sauce').find('div[class*=counter]').should('contain', '1');
    cy.get('@dropTarget').find('div[class^=constructor-element]').should('have.length', 3);
    cy.get('@sauce').trigger('dragstart', { dataTransfer } );
    cy.get('@dropTarget').trigger('drop', { dataTransfer });
    cy.get('@sauce').find('div[class*=counter]').should('contain', '2');
    cy.get('@dropTarget').find('div[class^=constructor-element]').should('have.length', 4);

    cy.get('@dropTarget').find('span[class*="action"]').find('svg[fill="#F2F2F3"]').first().click();
    cy.get('@sauce').find('div[class*=counter]').should('contain', '1');
    cy.get('@dropTarget').find('div[class^=constructor-element]').should('have.length', 3);
  })
})
