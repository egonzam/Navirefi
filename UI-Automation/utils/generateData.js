/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

/**
 * @fileOverview A utility to combine the main json file and test-scenario-data json file to produce a single data object that contains the necessary values to be inputted.
 * @module utils/generateData.js
 */

/**
 * @method
 * @description
 * This method will use the keys and values from the test-scenario-data object to overwrite the keys and values in the main object.
 * This is done so that the main object has the necessary data for a particular form and scenario
 * @param {list} jsonKeys - This list will contain the file name of main.json,test-scenario-data.json, and the key condition
 * @returns {mainFile} - This data object contains all necessary values to fill out forms in particular conditions
 */

const generateCustomJSON = async (jsonKeys) => {
    const fs = require('fs');
    const mainPath = `/UI-Automation/fixtures/${jsonKeys.main}.json`;
    const customPath = `/UI-Automation/fixtures/${jsonKeys.custom}.json`;
    const jsonMainData = JSON.parse(fs.readFileSync(process.cwd() + mainPath, 'utf-8'));
    const jsonCustomData = JSON.parse(fs.readFileSync(process.cwd() + customPath, 'utf-8'));
    const customkeys = jsonCustomData[jsonKeys.condition];
  
    Object.keys(customkeys).forEach((keys) => {
      jsonMainData[keys] = customkeys[keys];
    });
    return jsonMainData;
  };
  
  module.exports = {
    generateCustomJSON,
  };
  