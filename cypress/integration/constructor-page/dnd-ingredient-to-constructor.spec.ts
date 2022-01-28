/// <reference types="cypress" />
// @ts-check

describe("dnd ingredient to constructor", function () {
  before(function () {
    cy.visit(Cypress.env("host"));
  });
  it("dnd ingredient", function () {
    cy.get("[class*=ingredient-item]").first().as("item");
    cy.get("[class*=burger-constructor_noBunsMiddle__]")
      .first()
      .as("ingredientDropZone");
    cy.dnd("@item", "@ingredientDropZone");

    cy.get("@item")
      .find("[class*=counter_counter__num__]")
      .should("contain", "1");

    let imgUrlItem = "";
    let imgUrlTopItemDrop = "";

    cy.get("[class*=burger-constructor_constructorSubListItem__]").as(
      "ingredientItem"
    );

    cy.get("@item")
      .find("img")
      .then($img => {
        imgUrlItem = $img.attr("src")!;
      });

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get("@ingredientItem")
      .find("img")
      .then($img => {
        imgUrlTopItemDrop = $img.attr("src")!;
        // @ts-ignore
        // eslint-disable-next-line jest/valid-expect
        expect(imgUrlItem).to.equal(imgUrlTopItemDrop);
      });
  });
});
