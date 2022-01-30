/// <reference types="cypress" />
// @ts-check
describe("products modal works correctly", function () {
  before(function () {
    cy.visit(Cypress.env("host"));
  });
  it("should show modal current product and close", function () {
    cy.get("[class^=burger-ingredients_ListItemLink__]").first().as("product");
    let itemName = "";
    let itemModalName = "";
    cy.get("@product")
      .find("[class^=burger-ingredients_ListItemName__]")
      .then(($name) => (itemName = $name.text()));

    cy.get("@product").click();
    cy.url().should("include", "/ingredients/");

    cy.get("[class*=modal]").as("modal");

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get("@modal")
      .find("[class*=text_type_main-medium]")
      .then(($name) => {
        itemModalName = $name.text();
        //@ts-ignore
        // eslint-disable-next-line jest/valid-expect
        expect(itemModalName).to.equal(itemName);
      });
    // Закрытие по кнопке крестика
    cy.get("[class*=modal_modalCloseBtn__]").as("closeBtn");
    cy.get("@closeBtn").click();
    // Закрытие по esc
    cy.get("@product").click();
    cy.get("body").type("{esc}");
    // Закрытие по оверлей
    cy.get("@product").click();
    cy.get("[class^=modal_modalOverlay__]").as("closeOverlay");
    cy.get("body").click(0, 0);
  });
});
export {};
