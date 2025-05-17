describe('e2e', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('successful authentication', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.intercept('POST', '/api/auth*').as('loginRequest');
    cy.visit(' https://path-explorer-beta.vercel.app/');
    cy.get('.w-50').click();
    cy.get('.mt-5 > .transparent-input').clear('a');
    cy.get('.mt-5 > .transparent-input').type('antonio.sosa');
    cy.get('.mt-3 > .transparent-input').clear('h');
    cy.get('.mt-3 > .transparent-input').type('hola123');
    cy.get('.customSubmitButton').click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('auth + nav 1', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.intercept('POST', '/api/auth*').as('loginRequest');
    cy.visit(' https://path-explorer-beta.vercel.app/');
    cy.get('.w-50').click();
    cy.get('.mt-5 > .transparent-input').clear('a');
    cy.get('.mt-5 > .transparent-input').type('antonio.sosa');
    cy.get('.mt-3 > .transparent-input').clear('h');
    cy.get('.mt-3 > .transparent-input').type('hola123');
    cy.get('.customSubmitButton').click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);


    cy.intercept('GET', '/api/projects').as('getProjects');
    // cy.intercept('GET', '/api/skills').as('getSkills'); // skills no funciona aún
    cy.get('.nav-icons > :nth-child(1) > .bi').click();
    cy.wait('@getProjects').its('response.statusCode').should('eq', 200);
    // cy.wait('@getSkills').its('response.statusCode').should('eq', 200); // skills no funciona aún

    cy.get('.position-relative > .icon-btn > .bi').click();
    cy.get('.position-relative > .icon-btn > .bi').click();
    cy.get('.dropdown-arrow').click();
    cy.get('.btn-close').click();
    cy.get('.dashboard-header-buttons > .btn-primary').click();
    cy.get('.nav-icons > :nth-child(3) > .bi').click();
    cy.get('.profile-tabs > :nth-child(1)').click();
    cy.get('.profile-tabs > :nth-child(3)').click();
    /* ==== End Cypress Studio ==== */
  });
})