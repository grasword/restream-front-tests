import { headerLinks } from '../../testData/testData'

context('Header links', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('testing links', () => {
    headerLinks.forEach((anchor) => {
      it(`'${anchor.name}' have valid href`, () => {
        cy.get('.menu')
          .contains(anchor.name)
          .should(($a) => {
            expect($a).to.have.prop('href')
            expect($a.prop('href')).eq(anchor.href)
          })
      })

      if (!anchor.isVisible) {
        it(`'${anchor.name}' is hidden`, () => {
          cy.get('.menu')
            .contains(anchor.name)
            .should(($a) => {
              expect($a).to.be.hidden
            })
        })
      }
    })
  })

  describe('request without visiting', () => {
    headerLinks.forEach((anchor) => {
      it(`'${anchor.name}' have valid response`, () => {
        cy.get('.menu')
          .contains(anchor.name)
          .then(($a) => {
            const href = $a.prop('href')

            cy.request(href).then((resp) => {
              expect(resp.status).to.eq(200)
              expect(resp.body).to.include(anchor.title)
              expect(resp.body).to.include(anchor.text)
            })
          })
      })
    })
  })
})
