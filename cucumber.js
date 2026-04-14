// Cucumber.js configuration file
// Controls how BDD tests run and are reported
// Documentation: https://cucumber.io/docs/cucumber/configuration/

module.exports = {
  default: {
    paths: ['tests/e2e/bdd/features/**/*.feature'],
    require: ['tests/e2e/bdd/step-definitions/**/*.js'],
    requireModule: ['@babel/register'],
    format: [
      'progress-bar',
      'html:reports/cucumber/cucumber-report.html'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    timeout: 30000
  }
};
