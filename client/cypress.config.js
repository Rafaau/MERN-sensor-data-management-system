const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8000",
    experimentalSessionAndOrigin: true,
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
});
