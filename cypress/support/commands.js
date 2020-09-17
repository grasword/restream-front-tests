// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 } // threshold for each pixel
})

Cypress.Commands.add('setResolution', (size) => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1])
  } else {
    cy.viewport(size)
  }
})

// Upload File
Cypress.Commands.add('upload_file', (fileName, type, selector) => {
  cy.get(selector).then((subject) => {
    cy.fixture(fileName, 'base64').then((content) => {
      const el = subject[0]
      const blob = b64toBlob(content, type)
      cy.window().then((win) => {
        const testFile = new win.File([blob], fileName, { type })
        const dataTransfer = new DataTransfer()

        dataTransfer.items.add(testFile)
        el.files = dataTransfer.files
      })
    })
  })

  cy.get(selector).trigger('change', { force: true })
})

function b64toBlob (b64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  blob.lastModifiedDate = new Date()
  return blob
}

// Login
Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://restream.io/api/auth/ajax_check_ip',
    body: { email: email, password: password }
  })
})

// Wait for event
Cypress.Commands.add('awaitEvent', (event, selector) => {
  cy.document().then($document => {
    return new Cypress.Promise(resolve => {
      const el = $document.querySelector(selector)
      el.addEventListener(event, (event) => {
        resolve()
      })
    })
  })
})

// Image upload
const imageUpload = (selector, route, path) => {
  cy.get(`${selector} > .ImageSelect_root__Dgtcy > div`, { log: false }).its('length').then(($length) => {
    cy.get(`${selector} > .ImageSelect_root__Dgtcy > input`).attachFile(path).trigger('input', { force: true })
    cy.wait(route).then(xhr => {
      expect(xhr.status).eq(201)
    })
    cy.get(`${selector} > .ImageSelect_root__Dgtcy > div`).its('length').should('eq', $length + 1)
  })
}

// Logo upload
Cypress.Commands.add('logoUpload', (imgPath) => {
  imageUpload(':nth-child(1)', '@postLogo', imgPath)
})

// Overlay upload
Cypress.Commands.add('overlayUpload', (imgPath) => {
  imageUpload(':nth-child(2)', '@postOverlay', imgPath)
})

// Background upload
Cypress.Commands.add('backgroundUpload', (imgPath) => {
  imageUpload(':nth-child(4)', '@postBackground', imgPath)
})

// Delete Image
const deleteImage = (selector, route) => {
  cy.get(`${selector} > .ImageSelect_root__Dgtcy > div`, { log: false }).its('length').then(($length) => {
    cy.get(`${selector} > .ImageSelect_root__Dgtcy > div`).find('button[title="Remove"]').last().click()
    cy.wait(route).then(xhr => {
      expect(xhr.status).eq(200)
    })
    cy.get(`${selector} > .ImageSelect_root__Dgtcy > div`).its('length').should('eq', $length - 1)
  })
}
// Delete logos
Cypress.Commands.add('deleteLogos', () => {
  const deleteLastLogo = () => {
    deleteImage(':nth-child(1)', '@deleteLogo')
  }

  const deleteLogos = function () {
    cy.get(':nth-child(1) > .ImageSelect_root__Dgtcy > div', { log: false }).its('length').then(($length) => {
      if ($length > 1) {
        deleteLastLogo()
        deleteLogos()
      }
    })
  }

  deleteLogos()
})

// Delete overlays
Cypress.Commands.add('deleteOverlays', () => {
  const deleteLastOverlay = () => {
    deleteImage(':nth-child(2)', '@deleteOverlay')
  }

  const deleteOverlays = function () {
    cy.get(':nth-child(2) > .ImageSelect_root__Dgtcy > div', { log: false }).its('length').then(($length) => {
      if ($length > 1) {
        deleteLastOverlay()
        deleteOverlays()
      }
    })
  }

  deleteOverlays()
})

// Delete backgrounds
Cypress.Commands.add('deleteBackgrounds', () => {
  const deleteLastBackground = () => {
    deleteImage(':nth-child(4)', '@deleteBackground')
  }

  const deleteBackgrounds = function () {
    cy.get(':nth-child(4) > .ImageSelect_root__Dgtcy > div', { log: false }).its('length').then(($length) => {
      if ($length > 1) {
        deleteLastBackground()
        deleteBackgrounds()
      }
    })
  }

  deleteBackgrounds()
})
