/// <reference types="cypress" />
// @ts-check

describe("dnd bun to constructor", function () {
  before(function () {
    cy.visit(Cypress.env("host"));
  });
  it("dnd bun", function () {
    cy.get("[class*=bun-item]").first().as("item");
    cy.get("[class*=burger-constructor_noBuns__]").first().as("bunDropZone");
    cy.dnd("@item", "@bunDropZone");

    cy.get("@item")
      .find("[class*=counter_counter__num__]")
      .should("contain", "2");

    let imgUrlItem = "";
    let imgUrlTopItemDrop = "";
    let imgUrlBottomItemDrop = "";

    cy.get("[class*=constructor-element_pos_top]").as("bunTop");
    cy.get("[class*=constructor-element_pos_bottom]").as("bunBottom");

    cy.get("@item")
      .find("img")
      .then(($img) => {
        imgUrlItem = $img.attr("src")!;
      });

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get("@bunTop")
      .find("img")
      .then(($img) => {
        imgUrlTopItemDrop = $img.attr("src")!;
        // @ts-ignore
        // eslint-disable-next-line jest/valid-expect
        expect(imgUrlItem).to.equal(imgUrlTopItemDrop);
      });

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get("@bunBottom")
      .find("img")
      .then(($img) => {
        imgUrlBottomItemDrop = $img.attr("src")!;
        // @ts-ignore
        // eslint-disable-next-line jest/valid-expect
        expect(imgUrlItem).to.equal(imgUrlBottomItemDrop);
      });
  });
});
export {};
