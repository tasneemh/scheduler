const { CYCLIC_KEY } = require("@storybook/addon-actions");

describe("Appointments", ()=>{
  beforeEach(()=>{
    //"GET" to "/api/debug/reset" at the beginning of the test function.
    cy.request("GET", "/api/debug/reset")
    //visit the root
    cy.visit("/");
    //select DOM that contains Monday
    cy.contains("Monday");
  });
  it("should book an interview", ()=>{
    //clicks the add button for the empty appointment. We need to use first because there are two Add buttons,
    cy.get("[alt=Add]")
    .first()
    .click();
    //the command to type the name "Lydia Miller-Jones" into the student input field.
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", ()=>{
    ////clicks the edit button for the empty appointment. We need to use first because there are two edit buttons,
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
  cy.get("[alt=Delete]")
    .click({ force: true });

  cy.contains("Confirm").click();

  cy.contains("Deleting").should("exist");
  cy.contains("Deleting").should("not.exist");

  cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
});
});