/// <reference types="cypress" />



describe('Add new employee', () => {

  beforeEach(() => {
    // Custom command for login.
    cy.login("aliaa+qahrmanager@workmotion.com", "Test1234");
  })

  it('HR should be able to addd new employee', () => {

    // Applicaiton throws uncaught exceptions in the console
    // suppressing the exception to avoid failuers.
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })

    const randomNum = Math.floor(Math.random() * 100000);
    
    // Create new epmloyee.
    cy.get('[data-testid="add-employee-menu"]').click();
    cy.get('[data-testid="create-new-item"]').click();

    // Select country.
    cy.get('#react-select-3-input').type('india')
    cy.get('#react-select-3-option-62').click();
    cy.contains('Get started').click();

    // Contract details
    cy.get('[placeholder="Talent\'s first name"]').type('Test' + randomNum);
    cy.get('[placeholder="Talent\'s last name"]').type('Test' + randomNum);
    cy.get('[value="Yes"]').check({force: true});
    cy.get('[placeholder="e.g. UI/UX Designer"]').type('QA Engineer');
    cy.get('textarea').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
    cy.get('[placeholder="e.g. Marta Ruiz"]').type('Marta Ruiz');
    cy.get('[placeholder="e.g. Head of Marketing"]').type('Head of Marketing');
    cy.get('[value="full-time"]').check({force: true});
    cy.get('[value="40"]').clear().type('48').trigger('change');
    cy.get('[aria-autocomplete="list"]').type('Fixed hour', { force: true });
    cy.get("#react-select-4-option-0").click();
    cy.get('.react-datepicker__input-container>input').type('28-02-2022', { force: true });
    cy.get('[placeholder="e.g. Cost Center"]').type('Cost Center');
    cy.get('[placeholder="Please insert entity name if relevant"]').type('Test Entity');
    cy.contains('Continue').click();

    // Contract clauses
    cy.get('[value="20"]').clear().type('60');
    cy.get('[type="checkbox"]').check({force: true});
    cy.get('[value="30"]').clear().type('10');
    cy.get('textarea').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
    cy.contains('Continue').click();

    // Salary calculator
    cy.get('[placeholder="e.g. 4000"]').type('4000');
    cy.get('[placeholder="e.g. 1000"]').type('4000');
    cy.get('[value="Deemed overtime payment in base salary"]').check({force: true});
    cy.contains('Continue').click();

    // Invite employee
    const inviteEmail = 'test' + randomNum + '@exmaple.com'
    cy.get('[placeholder="example@email.com"]').type(inviteEmail);
    cy.contains('Continue').click();

    // Summary Review
    cy.get('#serviceAgreement').check({force: true});
    cy.contains('Finish').click();
    
    // Asserting the successfull message after employee creation.
    cy.get('#main-container h1').should(($heading) => {
      expect($heading).to.have.text('Congratulations, Onboarding has started!');
    })

    // Verify and Perform action.
    cy.get('#sidebar-action-items-link').click();
    cy.get('#main-container section:nth-child(4)');

    // Visiting dashboard and coming back to to Actions
    // because new employee does not reflect in the list immediately.
    cy.get('#sidebar-dashboard-link').click();
    cy.wait(5000);
    cy.get('#sidebar-action-items-link').click();

    // Assert first item to be newly added employee.
    cy.get('#main-container section:nth-child(4) h4 > span').should(($heading)=> {
      expect($heading).to.contain('Test' + randomNum + ' Test' + randomNum + ' in India has been invited to join WorkMotion!');
    })

    // Assert the default action should be pending.
    cy.get('#main-container section:nth-child(4) h4 > div > span').should(($heading)=> {
      expect($heading).to.contain('Pending');
    })

    // Mark as done for newly added employee
    // and verify newly added employee is not shown in pending list.
    cy.get('#main-container section:nth-child(4) #action-items-mark-done-btn').click();
    cy.get('#main-container section:nth-child(4) h4 > span').should(($heading)=> {
      expect($heading).to.not.contain('Test' + randomNum + ' Test' + randomNum + ' in India has been invited to join WorkMotion!');
    });

    // Change the filter to done
    // and verify newly added employee is listed and status is done.
    cy.get('#main-container header button').click();
    cy.get('li.rc-dropdown-menu-item:nth-child(4)').click();
    cy.get('#main-container section:nth-child(4) h4 > span').should(($heading)=> {
      expect($heading).to.contain('Test' + randomNum + ' Test' + randomNum + ' in India has been invited to join WorkMotion!');
    });
    cy.get('#main-container section:nth-child(4) h4 > div > span').should(($heading)=> {
      expect($heading).to.contain('Done');
    });
    
  })

})
