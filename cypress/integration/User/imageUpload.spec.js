context('Image upload', () => {
  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'))
    cy.visit('/live-studio?live-studio-paid')
    cy.get('#liveStudioOverlaysTabButton').click()
  })

  it('upload logo', function () {
    cy.server()
    cy.route('POST', '/images/logos').as('postLogo')

    cy.get(':nth-child(1) > .ImageSelect_root__Dgtcy > div').its('length').then(($length) => {
      cy.get('#liveStudioOverlaysTab > section:nth-child(1) > div > input').attachFile('img/nani.png').trigger('input')
      cy.wait('@postLogo').then(xhr => {
        expect(xhr.status).eq(201)
      })
      cy.get(':nth-child(1) > .ImageSelect_root__Dgtcy > div').its('length').should('eq', $length + 1)
    })
  })

  it('delete logo', () => {
    cy.server()
    cy.route('POST', '/images/logos').as('postLogo')
    cy.route('DELETE', '/images/logos/*').as('deleteLogo')

    cy.get(':nth-child(1) > .ImageSelect_root__Dgtcy > div').its('length').then(($length) => {
      // Upload the logo if there is none
      if ($length <= 1) {
        cy.get('#liveStudioOverlaysTab > section:nth-child(1) > div > input').attachFile('img/nani.png').trigger('input')
        cy.wait('@postLogo').then(xhr => {
          expect(xhr.status).eq(201)
        })
        cy.get(':nth-child(1) > .ImageSelect_root__Dgtcy > div').its('length').should('eq', $length + 1)
        $length = $length + 1
      }

      // Delete logo
      cy.get(':nth-child(1) > .ImageSelect_root__Dgtcy > div').find('button').last().click()
      cy.wait('@deleteLogo').then(xhr => {
        expect(xhr.status).eq(200)
      })
      cy.get(':nth-child(1) > .ImageSelect_root__Dgtcy > div').its('length').should('eq', $length - 1)
    })
  })
})
