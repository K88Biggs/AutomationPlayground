// Cucumber.js configuration file
// Controls how BDD tests run and are reported
// Documentation: https://cucumber.io/docs/cucumber/configuration/

module.exports = {
  // Default configuration for all test runs
  default: {
    // Files to load before running tests (step definitions)
    require: ['features/step_definitions/**/*.js'],

    // Modules to require for ES6+ support
    requireModule: ['@babel/register'],

    // Output formatters for test results
    format: [
      // Show progress bar during test execution
      'progress-bar',
      // Generate HTML report file
      'html:cucumber-report.html'
    ],

    // Formatter-specific options
    formatOptions: {
      // Generate step definition snippets in async/await style
      snippetInterface: 'async-await'
    },

    // Timeout for individual steps (in milliseconds)
    // Increase if tests are timing out
    timeout: 30000
  }
};
