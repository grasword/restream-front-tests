import * as testData from "../../testData/testData";

context("Tab Handling Anchor Links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Multistreaming
  describe('testing the target="/multistreaming" link', () => {
    it("verify the href", () => {
      cy.contains("Multistreaming").should($a => {
        expect($a).to.be.hidden;
        expect($a).to.have.prop("href");
        expect($a.prop("href")).eq("https://restream.io/multistreaming");
      });
    });

    it("request without visiting", () => {
      cy.contains("Multistreaming").then($a => {
        const href = $a.prop("href");

        cy.request(href).then(resp => {
          expect(resp.status).to.eq(200);

          expect(resp.body).to.include(
            "<title>Reach a Wider Audience with Multistreaming | Restream</title>",
            "<div>Reach a wider audience by streaming to multiple platforms simultaneously.</div>"
          );
        });
      });
    });
  });

  // Chat
  describe('testing the target="/chat" link', () => {
    it("verify the href", () => {
      cy.contains("Chat").should($a => {
        expect($a).to.be.hidden;
        expect($a).to.have.prop("href");
        expect($a.prop("href")).eq("https://restream.io/chat");
      });
    });

    it("request without visiting", () => {
      cy.contains("Chat").then($a => {
        const href = $a.prop("href");

        cy.request(href).then(resp => {
          expect(resp.status).to.eq(200);

          expect(resp.body).to.include(
            "<title>Cross-Platform Chat | Restream</title>",
            "<h1>Engage viewers in a multi chat</h1>"
          );
        });
      });
    });
  });

  // Scheduler
  describe('testing the target="/scheduler" link', () => {
    it("verify the href", () => {
      cy.contains("Scheduler").should($a => {
        expect($a).to.be.hidden;
        expect($a).to.have.prop("href");
        expect($a.prop("href")).eq("https://restream.io/scheduler");
      });
    });

    it("request without visiting", () => {
      cy.contains("Scheduler").then($a => {
        const href = $a.prop("href");

        cy.request(href).then(resp => {
          expect(resp.status).to.eq(200);

          expect(resp.body).to.include(
            "<title>Schedule and Stream Pre-Recorded Videos Live | Restream</title>",
            "<h1>Stream your recorded videos live</h1>"
          );
        });
      });
    });
  });

  // Analytics
  describe('testing the target="/analytics" link', () => {
    it("verify the href", () => {
      cy.contains("Analytics").should($a => {
        expect($a).to.be.hidden;
        expect($a).to.have.prop("href");
        expect($a.prop("href")).eq("https://restream.io/analytics");
      });
    });

    it("request without visiting", () => {
      cy.contains("Analytics").then($a => {
        const href = $a.prop("href");

        cy.request(href).then(resp => {
          expect(resp.status).to.eq(200);

          expect(resp.body).to.include(
            "<title>Analyze Your Stream Performance | Restream</title>",
            "<h1>Measure your success</h1>"
          );
        });
      });
    });
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
