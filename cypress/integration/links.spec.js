import { headerLinks } from "../../testData/testData";

context("Header links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  headerLinks.forEach(anchor => {
    describe(`testing the target=/${anchor.name} link`, () => {
      it("verify the href", () => {
        cy.get(".menu")
          .contains(anchor.name)
          .should($a => {
            expect($a).to.be[anchor.isVisible ? "visible" : "hidden"];

            expect($a).to.have.prop("href");
            expect($a.prop("href")).eq(anchor.href);
          });
      });

      it("request without visiting", () => {
        cy.contains(anchor.name).then($a => {
          const href = $a.prop("href");

          cy.request(href).then(resp => {
            expect(resp.status).to.eq(200);

            expect(resp.body).to.include(anchor.title);
            expect(resp.body).to.include(anchor.text);
          });
        });
      });
    });
  });
});
