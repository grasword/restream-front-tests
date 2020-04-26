context("Chat", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.login(Cypress.env("email"), Cypress.env("password"));
  });

  it("Checks xhr in /user endpoint", () => {
    cy.server();
    cy.route("GET", "/api/client/user").as("getUser");

    cy.visit("https://chat.restream.io/new-chat-golive");

    cy.wait("@getUser").then((xhr) => {
      expect(xhr.status).to.eq(200);
      // request
      expect(xhr.request.body).to.eq(null);
      expect(xhr.request.headers)
        .to.haveOwnProperty("x-axsrf-token")
        .and.to.be.a("string");
      // response
      expect(xhr.response.body)
        .to.have.property("userId")
        .and.to.be.a("number");
      expect(xhr.response.body)
        .to.haveOwnProperty("language")
        .and.to.be.a("string")
        .and.to.eq("english");
      expect(xhr.response.body)
        .to.haveOwnProperty("timezone")
        .and.to.be.a("string");

      //cy.request("POST", "https://backend.chat.restream.io/api/client/reply", {"connectionIdentifiers":["2187862-twitch-103967553"],"clientReplyUuid":"","text":"gggqq111222"});
    });
  });

  it("Types in chat", () => {
    cy.server();
    cy.route("/api/client/user").as("getUser");
    cy.route("/api/client/platform-features").as("plat");
    cy.route("POST", "/metrics/client/counter/inits").as("inits");

    cy.visit("https://chat.restream.io/new-chat-golive");
    cy.wait("@getUser");
    cy.wait("@plat");
    cy.wait("@inits").then((xhr) => {
      expect(xhr.requestBody.client_type).to.eq("golive");
    });
    cy.get("form > div > div > div > input").type("Chat 4ek");
    cy.get("form > div > button").click();
    cy.get(".styles_scrollable-div__1DOyU").should("contain", "Chat 4ek");
  });
});
