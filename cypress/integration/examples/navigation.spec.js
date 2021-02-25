describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", ()=>{
    //visit the root of our web server
    cy.visit("/");
    //the below line means to target the list item element that contains "Tuesday".
    cy.contains("[data-testid=day]","Tuesday")
    .click()
    .should("have.class", "day-list__item--selected");
  });
});

