// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("dnd", (element, dropBox) => {
  cy.get(element).trigger("dragstart").trigger("dragleave");
  cy.get(dropBox).trigger("dragenter").trigger("dragover").trigger("drop");
});

Cypress.Commands.add("login", () => {
  cy.get("input[name=email]").type(Cypress.env("userName"));
  cy.get("input[name=password]").type(Cypress.env("userPassword"));
});
