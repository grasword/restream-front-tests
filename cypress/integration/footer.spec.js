import { footerLinks } from '../../testData/testData'

context('Footer links', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('testing links', () => {
    footerLinks.forEach(anchor => {
      it(`'${anchor.name}' have valid href`, () => {
        cy.get('footer')
          .contains(anchor.name)
          .should($a => {
            expect($a).to.have.prop('href')
            expect($a.prop('href')).eq(anchor.href)
          })
      })
    })
  })

  describe('request without visiting', () => {
    footerLinks.forEach(anchor => {
      it(`'${anchor.name}' have valid response`, () => {
        cy.get('footer')
          .contains(anchor.name)
          .then($a => {
            const href = $a.prop('href')

            cy.request(href).then(resp => {
              expect(resp.status).to.eq(200)
              expect(resp.body).to.include(anchor.title)
              expect(resp.body).to.include(anchor.text)
            })
          })
      })
    })
  })
})
