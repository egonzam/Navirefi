import {v4 as uuidv4} from 'uuid';

let email = '';
/**
 * @method
 * @description
 * Generates an email using the passed in local part and email domain
 * @param {string} userEmailLocal - Local part of email address
 * @param {string} userEmailDomain - Domain of email address
 */

const userEmail = (userEmailLocal, userEmailDomain) => {
  email = `${userEmailLocal}${uuidv4().substring(0, 8)}${userEmailDomain}`;
  return email;
};

/**
 * @method
 * @description
 * Return either the default password or a specific password given by param 'password'
 * @param {string} password - The passwor to use for a user
 */
const basePassword = (password = null) => {
  if (password) {
    return password;
  }
  return 'passWord12#!@$5';
};

export {userEmail, basePassword};
