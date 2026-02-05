/// <reference types="cypress" />

import locators from '../support/locators';
import 'cypress-xpath';
    
describe('Account Creation - Sign Up', () => {
    before(function() {
        cy.fixture('user').then((user) => {
            this.user = user;
        });
    });

    beforeEach(function() {
        cy.visit('/login');
    });

    it('should display the sign up form', () => {
        cy.get(locators.SIGNUP.NAME).should('be.visible');
        cy.get(locators.SIGNUP.EMAIL).should('exist');
        cy.get(locators.SIGNUP.BTN_SIGNUP).should('exist');
    });

    it('should allow user to enter email and password', function() {
        cy.get(locators.SIGNUP.NAME).type(this.user.name);
        cy.get(locators.SIGNUP.EMAIL).type(this.user.email);
        cy.get(locators.SIGNUP.BTN_SIGNUP).click();
        cy.url().should('include', '/signup');
        cy.get(locators.SIGNUP_FORM.PASSWORD).type(this.user.password);
        cy.get(locators.SIGNUP_FORM.NAME).should('have.value', this.user.name);
        cy.get(locators.SIGNUP_FORM.EMAIL).should('have.value', this.user.email);
        cy.get(locators.SIGNUP_FORM.PASSWORD).should('have.value', this.user.password);
    });

    it('should check title radio button', function() {
        cy.get(locators.SIGNUP.NAME).type(this.user.name);
        cy.get(locators.SIGNUP.EMAIL).type(this.user.email);
        cy.get(locators.SIGNUP.BTN_SIGNUP).click();
        cy.url().should('include', '/signup');
        cy.get(locators.SIGNUP_FORM.TITLE).first().check().should('be.checked');
    });

    it('should allow user to select date of birth', function() {
        cy.get(locators.SIGNUP.NAME).type(this.user.name);
        cy.get(locators.SIGNUP.EMAIL).type(this.user.email);
        cy.get(locators.SIGNUP.BTN_SIGNUP).click();
        cy.url().should('include', '/signup');
        cy.get(locators.SIGNUP_FORM.PASSWORD).type(this.user.password);
        cy.get(locators.SIGNUP_FORM.NAME).should('have.value', this.user.name);
        cy.get(locators.SIGNUP_FORM.EMAIL).should('have.value', this.user.email);
        cy.get(locators.SIGNUP_FORM.PASSWORD).should('have.value', this.user.password);
        cy.get(locators.SIGNUP_FORM.DAYS).select('10').should('have.value', '10');
        cy.get(locators.SIGNUP_FORM.MONTHS).select('May').should('have.value', '5');
        cy.get(locators.SIGNUP_FORM.YEARS).select('1990').should('have.value', '1990');
    });
    
    it('should allow user to check newsletter and special offers', function() {
        cy.get(locators.SIGNUP.NAME).type(this.user.name);
        cy.get(locators.SIGNUP.EMAIL).type(this.user.email);
        cy.get(locators.SIGNUP.BTN_SIGNUP).click();
        cy.url().should('include', '/signup');
        cy.get(locators.SIGNUP_FORM.PASSWORD).type(this.user.password);
        cy.get(locators.SIGNUP_FORM.NAME).should('have.value', this.user.name);
        cy.get(locators.SIGNUP_FORM.EMAIL).should('have.value', this.user.email);
        cy.get(locators.SIGNUP_FORM.PASSWORD).should('have.value', this.user.password);
        cy.get(locators.SIGNUP_FORM.NEWSLETTER).check().should('be.checked');
        cy.get(locators.SIGNUP_FORM.SPECIAL_OFFERS).check().should('be.checked');
    });     
        it('should fill all the form fields', function() {
            cy.get(locators.SIGNUP.NAME).type(this.user.name);
            cy.get(locators.SIGNUP.EMAIL).type(this.user.email);
            cy.get(locators.SIGNUP.BTN_SIGNUP).click();
            cy.url().should('include', '/signup');
            cy.get(locators.SIGNUP_FORM.TITLE).first().check()
            cy.get(locators.SIGNUP_FORM.PASSWORD).type(this.user.password);
            cy.get(locators.SIGNUP_FORM.DAYS).select('10');
            cy.get(locators.SIGNUP_FORM.MONTHS).select('May');
            cy.get(locators.SIGNUP_FORM.YEARS).select('1990');
            cy.get(locators.SIGNUP_FORM.NEWSLETTER).check();
            cy.get(locators.SIGNUP_FORM.SPECIAL_OFFERS).check();
            cy.get(locators.SIGNUP_FORM.FIRST_NAME).type('Usuario');
            cy.get(locators.SIGNUP_FORM.LAST_NAME).type('Teste');
            cy.get(locators.SIGNUP_FORM.COMPANY).type('Empresa de Teste');
            cy.get(locators.SIGNUP_FORM.ADDRESS1).type('Rua de Teste, 123');
            cy.get(locators.SIGNUP_FORM.ADDRESS2).type('Apto 456');
            cy.get(locators.SIGNUP_FORM.COUNTRY).select('Canada');
            cy.get(locators.SIGNUP_FORM.STATE).type('Estado de Teste');
            cy.get(locators.SIGNUP_FORM.CITY).type('Cidade de Teste');
            cy.get(locators.SIGNUP_FORM.ZIPCODE).type('A1B2C3');
            cy.get(locators.SIGNUP_FORM.MOBILE_NUMBER).type('+1234567890');
            cy.get(locators.SIGNUP_FORM.BTN_CREATE_ACCOUNT).click();
            cy.url().should('include', '/account_created');
            cy.xpath('//b[text()="Account Created!"]').should('be.visible');

        });
    }); 