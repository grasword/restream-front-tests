import { logos, backgrounds } from '../../../testData/testData'

context('Image upload', () => {
  beforeEach(() => {
    cy.setResolution([1920, 1080])
    cy.login(Cypress.env('email'), Cypress.env('password'))
    cy.visit('/live-studio?live-studio-paid')
    cy.get('#liveStudioOverlaysTabButton').click()
  })

  describe('logos', () => {
    beforeEach(() => {
      cy.server()
      cy.route('POST', '/images/logos').as('postLogo')
      cy.route('DELETE', '/images/logos/*').as('deleteLogo')

      cy.deleteLogos()
    })

    logos.forEach(logo => {
      it(`uploads logo with the '${logo.type}' extension`, function () {
        cy.logoUpload(logo.path)
        cy.wait(500) // Antipattern, temporary solution
        cy.get(':nth-child(1) > .ImageSelect_root__Dgtcy > div').last().matchImageSnapshot(`${logo.type}`)
      })
    })
  })

  describe('Backgrounds', () => {
    beforeEach(() => {
      cy.server()
      cy.route('POST', '/images/backgrounds').as('postBackground')
      cy.route('DELETE', '/images/backgrounds/*').as('deleteBackground')

      cy.deleteBackgrounds()
    })

    backgrounds.forEach((background) => {
      it(`uploads background with the '${background.type}' extension`, () => {
        cy.backgroundUpload(background.path)
        cy.wait(500) // Antipattern, temporary solution
        cy.get(':nth-child(4) > .ImageSelect_root__Dgtcy > div').last().matchImageSnapshot(`background '${background.type}'`)
      })
    })
  })
})
