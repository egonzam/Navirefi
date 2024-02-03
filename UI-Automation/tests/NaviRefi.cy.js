/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// / <reference types="cypress" />
/* eslint-enable no-unused-vars */

describe('NaviRefi - happy path', () => {
  beforeEach(() => {
    // cy.clearCookies();
    cy.visit('https://qa.navirefi.com/');
    cy.createPrimaryCredentials('primary_main_fixture');
  });

  it('Unified: Primary-led application bachelor app can be submitted', () => {
    // click Check your Rate
    cy.pause();
    cy.get(':nth-child(4) > .row > .v-btn > .v-btn__content').should('be.visible').click();

    cy.fillStudentDetailsRateEstimate({
      main: 'primary_main_fixture',
      custom: 'primary_test_scenario_data',
      condition: 'primary_pass',
    });

    cy.get('#button-one').should('be.visible').click();


    cy.get('[for="employerName"]').type(userInfo.address_state);
    cy.get('[for="employmentStatus"]').select(userInfo.address_state);
    cy.get('[for="annualGrossIncome"]').type(userInfo.address_state);
    cy.get('#additionalIncome').type(userInfo.address_state);
    cy.get('[for="cashRetirementInvestments"]').type(userInfo.address_state);
    cy.get('#lastSchoolAttendedlabel').type(userInfo.address_state);
    cy.get('.v-list-item__title', {delay: 100}).wait(500).click({force: true});
    cy.get('#highestDegreeEarned').type(userInfo.address_state);
    cy.get('[for="lastDateOfAttendanceTextField"]').type(userInfo.address_state);

    cy.get('#button-one').should('be.visible').click();

    cy.get('#phoneNumberInput').type(userInfo.address_state);   
    cy.get('#citizenStatus').type(userInfo.address_state);
    cy.get('#ssnInput').type(userInfo.address_state);
    cy.get('#confirmSsnInput').type(userInfo.address_state);
    cy.get('.text-transform-none text-subtitle-1 font-weight-bold').type(userInfo.address_state);
    cy.get('#accept-btn').click();
    cy.get('#input-420').click();
    cy.get('#input-420').click();
    cy.get('#button-one').should('be.visible').click();

    
    
    
    

  });
});
