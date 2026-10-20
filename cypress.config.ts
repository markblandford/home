import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 2000,
  video: true,
  screenshotsFolder: 'reports/ui-tests/screenshots',
  videosFolder: 'reports/ui-tests/videos',
  e2e: {
    baseUrl: 'http://127.0.0.1:4200',
  },
})
