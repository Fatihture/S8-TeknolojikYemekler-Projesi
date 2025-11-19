describe("Pizza Sipariş Formu", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/order");
  });

  it("Inputa metin girebiliyor", () => {
    cy.get("[data-testid='note-input']").type("Bol acı olsun");
  });

  it("Birden fazla malzeme seçebiliyor", () => {
    cy.get("[data-testid='topping-sosis']").check({ force: true });
    cy.get("[data-testid='topping-misir']").check({ force: true });
    cy.get("[data-testid='topping-biber']").check({ force: true });
  });

  it("Formu gönderebiliyor", () => {
    cy.get("[data-testid='name-input']").type("Fatih");

    cy.get("input[name='size']").first().check({ force: true });
    cy.get("select").select("Normal");

    cy.get("[data-testid='topping-sosis']").check({ force: true });
    cy.get("[data-testid='topping-misir']").check({ force: true });
    cy.get("[data-testid='topping-biber']").check({ force: true });
    cy.get("[data-testid='topping-domates']").check({ force: true });

    cy.get("[data-testid='note-input']").type("Test siparişi");

    cy.get("[data-testid='submit-btn']").click();

    cy.url().should("include", "/success");
  });

});
