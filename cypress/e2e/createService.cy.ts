import 'cypress-file-upload';

describe('Login Test', () => {
  it('should log in with valid credentials', () => {
    // Visita la página de inicio de sesión
    cy.visit('http://localhost:3000');

    // Encuentra y haz clic en el botón de login para mostrar el formulario de inicio de sesión
    cy.get('#login').click();

    // Encuentra el campo de nombre de usuario e ingresa un valor
    cy.get('#loginInput').type('prov@mail.com');

    // Encuentra el campo de contraseña e ingresa un valor
    cy.get('#passwordInput').type('pass');

    // Encuentra el botón de inicio de sesión y haz clic en él
    cy.get('#loginButton').click();

    // Verifica que el usuario fue redirigido a la página de perfil o dashboard
    cy.url().should('include', '/home');

    cy.get('#createService').click();

    cy.url().should('include', '/createService')

    // Encuentra el campo de nombre del evento e ingresa un valor
    cy.get('#serviceName').type('Servicio de globos');

    // Encuentra el campo de descripción del evento e ingresa un valor
    cy.get('#serviceDescription').type('Diseñamos cualquier tipo de globos');
  
    // Encuentra el campo de ubicación del evento e ingresa un valor
    cy.get('#price').type('123');

    // Encuentra el botón de crear evento y haz clic en él
    cy.get('#create').click();

  });
});