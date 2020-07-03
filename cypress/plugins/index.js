/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const { writeFileSync } = require('fs')

module.exports = (on, config) => {
  // Disable fake camera for Chrome
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args = launchOptions.args.filter((arg) => {
        return arg !== '--use-fake-ui-for-media-stream' && arg !== '--use-fake-device-for-media-stream'
      })
      launchOptions.args.push('--allow-file-access-from-files')
      writeFileSync('./log.txt', JSON.stringify(launchOptions.args))
      return launchOptions
    }
  })
  // on('before:browser:launch', (browser, launchOptions) => {
  //   if (browser.family === 'firefox') {
  //     writeFileSync('./log.txt', JSON.stringify(launchOptions))
  //     launchOptions.preferences['media.navigator.streams.fake'] = true
  //     return launchOptions
  //   }
  // })
}
