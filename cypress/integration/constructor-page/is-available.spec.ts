describe("service is available", function () {
  it("should be available on localhost:3001", function () {
    cy.visit(Cypress.env('host'));
  });
});
