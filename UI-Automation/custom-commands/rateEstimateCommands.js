/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

/**
 * @method
 * @description
 * Method to start rate-estimate flow
 */function fillStudentDetailsRateEstimate(dataObj) {
    cy.task('generate', {
      main: dataObj.main,
      custom: dataObj.custom,
      condition: dataObj.condition,
    }).then((userInfo) => {
  
      cy.get('[data-testid=rate-check-ffs_name-first]').type(userInfo.firstName);

      cy.get('#piFirstnameTextField').type(userInfo.firstName);
      cy.get('#piLastnameTextField').type(userInfo.lastNme);
      cy.get('#piDobTextField').type(userInfo.birthDateFull);
  
      cy.get('#piEmailTextField').type(userInfo.primaryEmail);
      cy.get('#piStreetAddressTextField').type(userInfo.address);
      cy.get('#piAptUnitTextField').type(userInfo.address_apartmen);
      cy.get('[for="piCityTextField"]').type(userInfo.address_state);
      cy.get('#piStateTextField').type(userInfo.address_city);
      cy.get('#piZipcodeTextField').type(userInfo.address_zip);
      cy.get('#recaptcha-anchor').click().pause();
      cy.wait(1000);
    //   if (userInfo.citizenship !== 'other') {
    //     cy.get('body').then(($body) => {
    //       if ($body.find('[data-testid=rate-check-ffs_ssn-optional-label]').is(':visible')) {
    //         cy.get('[data-testid=rate-check-ffs_ssn-optional-label]').should('have.text', 'OPTIONAL');
    //       } else {
    //         cy.get('input[id="entities.student.ssn"]').type(userInfo.primarySSN);
    //       }
    //     });
    //   }
    });
  }
  Cypress.Commands.add('fillStudentDetailsRateEstimate', fillStudentDetailsRateEstimate);
  