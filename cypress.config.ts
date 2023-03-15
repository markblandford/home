import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 2000,
  video: true,
  screenshotsFolder: 'reports/ui-tests/screenshots',
  videosFolder: 'reports/ui-tests/videos',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:4200',
  },
})
