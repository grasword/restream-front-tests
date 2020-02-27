context("Tab Handling Anchor Links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // About
  describe('testing the target="/about" link', () => {
    it("verify the href", () => {
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

  // Customers
  describe('testing the target="/customers" link', () => {
    it("verify the href", () => {
      cy.contains("Customers")
        .should("have.prop", "href")
        .and("equal", "https://restream.io/customers");
    });

    it("request without visiting", () => {
      cy.contains("Customers").then($a => {
        const href = $a.prop("href");

        cy.request(href).then(resp => {
          expect(resp.status).to.eq(200);
          expect(resp.body).to.include(
            "<title>Our Customers | Restream</title>",
            "Over 2,000,000 streamers worldwide choose Restream"
          );
        });
      });
    });
  });

  // Pricing
  describe('testing the target="/pricing" link', () => {
    it("verify the href", () => {
      cy.contains("Pricing")
        .should("have.prop", "href")
        .and("equal", "https://restream.io/pricing");
    });

    it("request without visiting", () => {
      cy.contains("Pricing").then($a => {
        const href = $a.prop("href");

        cy.request(href).then(resp => {
          expect(resp.status).to.eq(200);
          expect(resp.body).to.include(
            "<title>Plans & Pricing | Restream</title>",
            "Pick the right Restream"
          );
        });
      });
    });
  });
});
