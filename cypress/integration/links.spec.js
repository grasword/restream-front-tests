context("Tab Handling Anchor Links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // About
  describe('testing the target="/about" link', () => {
    it("verify the href", () => {
      // We verify that the <a> has the right href
      cy.contains("About")
        .should("have.attr", "href")
        .and("include", "/about");

      // an <a> also has an 'href' property which always resolves
      // to the fully qualified URL. by asserting on this property
      // we are testing this element more thoroughly
      cy.contains("About")
        .should("have.prop", "href")
        .and("equal", "https://restream.io/about");
    });

    it("request without visiting", () => {
      cy.contains("About").then($a => {
        // extract the fully qualified href property
        const href = $a.prop("href");

        // make an http request for this resource
        // outside of the browser
        cy.request(href).then(resp => {
          expect(resp.status).to.eq(200);

          // drill into the response body
          // and assert that its contents have the <title> response
          expect(resp.body).to.include(
            "<title>About Us | Restream</title>",
            "Restream allows you to broadcast live video to 30+ social networks at the same time."
          );
        });
      });
    });
  });
});
