context('Header actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Checks dropdown', () => {
    it('Products dropdown', () => {
      cy.get('.jsSubMenuButton').should('not.have.class', 'is-active')

      cy.get('.menu')
        .contains('Products')
        .click()

      cy.get('.jsSubMenuButton').should('have.class', 'is-active')

      cy.get('.submenu').invoke('show')
      cy.get('.menu')
        .contains('Chat')
        .should('be.visible')
    })
  })
})
