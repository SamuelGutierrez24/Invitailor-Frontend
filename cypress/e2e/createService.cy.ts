import 'cypress-file-upload';

describe('Login Test', () => {
  it('should log in with valid credentials', () => {
    cy.visit('http://localhost:3000');

    cy.get('#login').click();

    cy.get('#loginInput').type('prov@mail.com');

    cy.get('#passwordInput').type('pass');

    cy.get('#loginButton').click();

    cy.url().should('include', '/home');

    cy.get('#createService').click();

    cy.url().should('include', '/createService')

    cy.get('#serviceName').type('Servicio de globos');

    cy.get('#serviceDescription').type('Diseñamos cualquier tipo de globos');
  
    cy.get('#price').type('123');

    cy.get('#create').click();

    cy.get('#view-bdaae064-ff61-4be3-9705-27f85a3083ca').click();

    cy.wait(3000);

    cy.get('#logout').click();

  });
});