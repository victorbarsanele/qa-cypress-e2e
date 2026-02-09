/// <reference types="cypress" />

import 'cypress-xpath';
import locators from '../support/locators';

describe('Cart functionality', () => {
    beforeEach(function() {
        // Login first
        cy.visit('/login');
        cy.fixture('user').then((user) => {
            cy.login(user.email, user.password);
        });

        // Wait for login to complete and redirect
        cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    });

    it('should login and add a product to the cart', () => {
        // Add product to cart
        cy.addToCart(1);

        // Go to cart and verify product is added
        cy.get(locators.CART.QUANTITY_BUTTONS).should('have.length.at.least', 1);
    });

    it('should remove a product from the cart', () => {
        // Add product to cart first
        cy.addToCart(1);
        cy.get(locators.CART.QUANTITY_BUTTONS).should('have.length.at.least', 1);

        // Remove product from cart
        cy.removeFirstItemFromCart();

        // Verify if cart is empty
        cy.contains(locators.CART.EMPTY_MESSAGE).should('be.visible');
    });

    it('should check persistency of cart items after page reload', () => {
        // Add product to cart first
        cy.addToCart(1);
        cy.get(locators.CART.QUANTITY_BUTTONS).should('have.length.at.least', 1);

        // Reload the page to check cart persistence
        cy.reload();

        // Verify cart items are still present after reload
        cy.get(locators.CART.QUANTITY_BUTTONS).should('have.length.at.least', 1);
    });

    it('should proceed to checkout from the cart', () => {
        // Add product to cart first
        cy.addToCart(1);

        // Proceed to checkout
        cy.get(locators.CART.CHECKOUT_BTN).click();
        cy.url().should('include', '/checkout');
    });
});