import {userEmail, basePassword} from '../fixtures/users';

/**
 * @method
 * @description
 * Create the credentials for the Primary (student) user
 * @param {string} jsonFile - The fixture file used for this test
 * @param {string} condition - The key name of a specific sub scenario in the fixture file
 */
Cypress.Commands.add('createPrimaryCredentials', (jsonFile, condition = null) => {
    cy.fixture(jsonFile).then((userData) => {
      let userInfo;
      if (condition === null) {
        userInfo = userData;
      } else {
        userInfo = userData[condition];
      }
      let primaryMail;
      let primaryMailDomain;
  
      if (Object.prototype.hasOwnProperty.call(userInfo, 'student_mail_id')) {
        primaryMail = userInfo.student_mail_id;
      } else {
        primaryMail = userInfo.primary_mail;
      }
  
      if (Object.prototype.hasOwnProperty.call(userInfo, 'student_mail_id_domain')) {
        primaryMailDomain = userInfo.student_mail_id_domain;
      } else {
        primaryMailDomain = userInfo.primary_mail_domain;
      }
  
      cy.buildUserCredentials('primary', primaryMail, primaryMailDomain, userInfo.password);
    });
  });

  Cypress.Commands.add('buildUserCredentials', (userType, userEmailLocal, userEmailDomain, password = null) => {
    if (userType === 'primary') {
      cy.wrap(userEmail(userEmailLocal, userEmailDomain)).as('primaryStudentEmail');
      cy.wrap(basePassword(password)).as('primaryStudentPassword');
    }
    if (userType === 'cosigner') {
      cy.wrap(userEmail(userEmailLocal, userEmailDomain)).as('cosignerEmail');
      cy.wrap(basePassword(password)).as('cosignerPassword');
    }
    if (userType === 'parent') {
      cy.wrap(userEmail(userEmailLocal, userEmailDomain)).as('parentEmail');
      cy.wrap(basePassword(password)).as('parentPassword');
    }
    if (userType === 'child') {
      cy.wrap(userEmail(userEmailLocal, userEmailDomain)).as('childEmail');
      cy.wrap(basePassword(password)).as('childPassword');
    }
  });