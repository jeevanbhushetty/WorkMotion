// Custom command for login into the WorkMotion.
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login')
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get('form>button').click();
})

