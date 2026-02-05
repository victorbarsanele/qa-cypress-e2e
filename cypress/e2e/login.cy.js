/// <reference types="cypress" />

import 'cypress-xpath';
import locators from '../support/locators';

describe('Login at Web App', () => {
    before(function() {
        // Load user fixture once before all tests
        cy.fixture('user').then((user) => {
            this.user = user;
        });
    });

    beforeEach(function() {
        // Clean, unauthenticated starting state
        cy.visit('/');
        cy.logout();
        cy.visit('/login');
    });

    it('should display login form', () => {
        cy.get(locators.LOGIN.EMAIL).should('be.visible');
        cy.get(locators.LOGIN.PASSWORD).should('be.visible');
        cy.get(locators.LOGIN.BTN_LOGIN).should('be.visible');
    });

    it('should show error with invalid credentials', () => {
        cy.login('invalidemail@mail.com', 'wrongpassword');
        cy.get(locators.MESSAGE.INVALID_NAME_OR_PASSWORD).should('contain', 'Your email or password is incorrect!');
    });

    it('should require email field', () => {
        cy.get(locators.LOGIN.PASSWORD).type('admin123');
        cy.get(locators.LOGIN.BTN_LOGIN).click();
        cy.get(locators.LOGIN.EMAIL).should('have.attr', 'required');
        cy.get(locators.LOGIN.EMAIL)
        .invoke('prop', 'validationMessage')
        .should('not.be.empty')
    });

    it('should require password field', () => {
        cy.get(locators.LOGIN.EMAIL).type('test@example.com');
        cy.get(locators.LOGIN.BTN_LOGIN).click();
        cy.get(locators.LOGIN.PASSWORD).should('have.attr', 'required');
        cy.get(locators.LOGIN.PASSWORD)
        .invoke('prop', 'validationMessage')
        .should('not.be.empty')
    });

    it('should validate email format', () => {
        cy.get(locators.LOGIN.EMAIL).type('invalidemailformat');
        cy.get(locators.LOGIN.PASSWORD).type('somepassword');
        cy.get(locators.LOGIN.BTN_LOGIN).click();
        cy.get(locators.LOGIN.EMAIL)
        .invoke('prop', 'validationMessage')
        .should('not.be.empty')
        .should('contain', '\@');
    });

    it('should login successfully with valid credentials', function() {
        const { email, password } = this.user;
        // Perform login with custom command and fixture credentials
        cy.login(email, password);
        cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
        // Verify logged-in state
        cy.contains(locators.MESSAGE.LOGGED_IN_AS_TEXT).should('be.visible');
    });

    it('should display the logged-in username', function() {
        const { email, password, name } = this.user;
        cy.login(email, password);
        cy.xpath(locators.USER.LOGGED_IN_AS_XPATH).should('contain', name);
    });

    it('should logout and return to unauthenticated state', function() {
        const { email, password } = this.user;
        cy.login(email, password);
        cy.logout();
        cy.contains(locators.MESSAGE.LOGGED_IN_AS_TEXT).should('not.exist');
        cy.visit('/login');
        cy.get(locators.LOGIN.EMAIL).should('be.visible');
    });
});