/// <reference types="cypress" />

import 'cypress-xpath';
import locators from '../support/locators';

describe('Products List', () => {
    beforeEach(() => {
        cy.visit('/products');
    });

    it('should display the products list', () => {
        cy.get(locators.PRODUCTS.FEATURES_ITEMS).should('be.visible');
    });

    it('should search for a product', () => {
        const searchTerm = 'Men Tshirt';

        cy.searchProducts(searchTerm);

        cy.xpath(locators.PRODUCTS.SEARCHED_TITLE_XPATH).should('contain', 'Searched Products');
        cy.get(locators.PRODUCTS.PRODUCT_INFO).each(($el) => {
            cy.wrap($el).should('contain.text', searchTerm);
        });
    });

    it('should filter products by category', () => {
        cy.get(locators.PRODUCTS.CATEGORY_SIDEBAR).should('contain', 'Category');
        cy.filterByCategory('Women', 1);
        cy.xpath(locators.PRODUCTS.SEARCHED_TITLE_XPATH).should('contain', 'Women - Dress Products');
        cy.get(locators.PRODUCTS.PRODUCT_INFO).each(($el) => {
            cy.wrap($el).should('contain.text', 'Dress');
        });
    });
    
    it('should view product details', () => {
        cy.get(locators.PRODUCTS.PRODUCT_DETAILS_LINK(1)).click();
        cy.get(locators.PRODUCTS.PRODUCT_DETAILS_CONTAINER).should('be.visible');
        cy.get(locators.PRODUCTS.PRODUCT_DETAILS_TITLE).should('contain.text', 'Blue Top');
    });
});