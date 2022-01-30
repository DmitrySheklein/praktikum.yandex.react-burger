/// <reference types="cypress" />
// @ts-check

describe("order", function () {
  before(function () {
    cy.visit(Cypress.env("host"));
  });
  it("send order", function () {
    cy.get("[class*=ingredient-item]").first().as("item");
    cy.get("[class*=burger-constructor_noBunsMiddle__]")
      .first()
      .as("ingredientDropZone");
    cy.dnd("@item", "@ingredientDropZone");

    cy.get("[class*=bun-item]").first().as("item");
    cy.get("[class*=burger-constructor_noBuns__]").first().as("bunDropZone");
    cy.dnd("@item", "@bunDropZone");

    cy.get("button").contains("Оформить заказ").click();

    cy.location("pathname").should("eq", "/login");
    cy.login();
    cy.get("button").contains("Войти").click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get("button").contains("Оформить заказ").click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(15500);
    cy.get("[class*=modal_modal__]").contains("идентификатор заказа");
    cy.get("[class*=text_type_digits-large]")
      .invoke("text")
      .should("match", /^[0-9]*$/);
  });
});
