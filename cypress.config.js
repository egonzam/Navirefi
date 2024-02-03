const {defineConfig} = require('cypress');
const fs = require('fs');
const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter');
const {generateCustomJSON} = require('./UI-Automation/utils/generateData');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = defineConfig({
  env: {
    ENVIRONMENT: 'staging',
    BASIC_AUTH: '2F9DD130-CE1A-441D-8D34-9522739026AE',
    SERVICE_URI: 'https://qa.navirefi.com',
  },
  retries: 3,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'UI-Automation/test-reports',
    overwrite: false,
    html: true,
    json: true,
  },
  chromeWebSecurity: false,
  viewportWidth: 1200,
  viewportHeight: 1400,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 60000,
  taskTimeout: 60000,
  execTimeout: 60000,
  requestTimeout: 60000,
  responseTimeout: 60000,
  fixturesFolder: 'UI-Automation/fixtures',
  screenshotsFolder: 'screenshots',
  supportFolder: 'UI-Automation/custom-commands',
  videosFolder: 'videos',
  experimentalWebKitSupport: true,


  e2e: {
    async setupNodeEvents(on, config) {
      
      on('task', {
        async generate(jsonKeys) {
          const file = await generateCustomJSON(jsonKeys);
          return file;
        },
      });

      const instance = process.env.npm_config_instance || 'staging';
      const rawdata = fs.readFileSync(`./UI-Automation/config/conf.${instance}.json`);
      const instanceConfig = JSON.parse(rawdata);
      if (process.env.VAULT_URL && process.env.VAULT_TOKEN) {
        const secrets = await getV1Secrets(process.env.VAULT_URL, process.env.VAULT_TOKEN, 'qe-credentials')
        // Assigning Node enviroment variables to cypress env config object
        instanceConfig.env.QA_ADMIN_USERNAME = secrets.QA_ADMIN_USERNAME;
        instanceConfig.env.QA_ADMIN_PASSWORD = secrets.QA_ADMIN_PASSWORD;
        instanceConfig.env.SLO_SERVICE_READ_KEY_STAGING = secrets.SLO_SERVICE_READ_KEY_STAGING;
        instanceConfig.env.RATE_ESTIMATE_AUTH = secrets.RATE_ESTIMATE_AUTH;
        instanceConfig.env.HELLOSIGN_SLO_AUTH = secrets.HELLOSIGN_SLO_AUTH;
      } else {
        instanceConfig.env.QA_ADMIN_USERNAME = process.env.QA_ADMIN_USERNAME;
        instanceConfig.env.QA_ADMIN_PASSWORD = process.env.QA_ADMIN_PASSWORD;
        instanceConfig.env.QA_VERIFIER_USERNAME = process.env.QA_VERIFIER_USERNAME;
        instanceConfig.env.QA_VERIFIER_PASSWORD = process.env.QA_VERIFIER_PASSWORD;
        instanceConfig.env.SLO_SERVICE_READ_KEY_STAGING = process.env.SLO_SERVICE_READ_KEY_STAGING;
        instanceConfig.env.RATE_ESTIMATE_AUTH = process.env.RATE_ESTIMATE_AUTH;
        instanceConfig.env.HELLOSIGN_SLO_AUTH = process.env.HELLOSIGN_SLO_AUTH;
      }

      const mergedConfig = Object.assign(config, instanceConfig);
      installLogsPrinter(on);
      return mergedConfig;
    },
    baseUrl: 'https://qa.navirefi.com',
    specPattern: 'UI-Automation/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'UI-Automation/custom-commands/index.js',
  },
  component: {
    specPattern: 'UI-Automation/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'UI-Automation/custom-commands/index.js',
  },
});
