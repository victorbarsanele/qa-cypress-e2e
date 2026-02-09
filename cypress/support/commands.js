// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import locators from './locators';

Cypress.Commands.add('login', (email, password) => {
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();
});

// Add a small helper to add a product to cart by product id
Cypress.Commands.add('addToCart', (productId = 1) => {
    cy.visit('/products');
    cy.get(locators.PRODUCTS.ADD_TO_CART_BY_ID(productId)).first().click();
    cy.get(locators.CART.MODAL).should('be.visible');
    cy.contains(locators.CART.VIEW_CART_TEXT).click();
});

Cypress.Commands.add('openCart', () => {
    cy.contains(locators.CART.VIEW_CART_TEXT).click();
});

Cypress.Commands.add('removeFirstItemFromCart', () => {
    cy.get(locators.CART.DELETE_BTN).first().click();
});

Cypress.Commands.add('logout', () => {
    // Use known logout selector if present, otherwise click the Logout text
    cy.get('body').then(($body) => {
        if ($body.find(locators.USER.LOGOUT).length) {
            cy.get(locators.USER.LOGOUT).click();
        } else if ($body.text().includes('Logout')) {
            // If the page contains the text somewhere, click it without waiting
            cy.contains('Logout', { timeout: 0 }).click();
        } else {
            // Nothing to do (user already logged out)
            cy.log('logout: no logout control found, skipping');
        }
    });
});

Cypress.Commands.add('searchProducts', (searchTerm) => {
    cy.get(locators.PRODUCTS.SEARCH_INPUT).type(searchTerm);
    cy.get(locators.PRODUCTS.SEARCH_SUBMIT).click();
});

Cypress.Commands.add('filterByCategory', (category, itemIndex = 1) => {
    cy.get(locators.PRODUCTS.CATEGORY_EXPAND).click();
    cy.get(locators.PRODUCTS.CATEGORY_LINK(category, itemIndex)).click();
});
