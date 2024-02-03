/* eslint-disable import/extensions */
/* eslint no-undef: 0 */

// ***********************************************************
// This module is processed and loaded
// automatically before your test files.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Alternatively you can use CommonJS syntax:
import './commands';
import './utilityCommands';
// Custom commands:
import './landingPage';
import './rateEstimateCommands';

// Plugins
require('cypress-terminal-report/src/installLogsCollector')();

Cypress.Keyboard.defaults({
  keystrokeDelay: 50,
});
