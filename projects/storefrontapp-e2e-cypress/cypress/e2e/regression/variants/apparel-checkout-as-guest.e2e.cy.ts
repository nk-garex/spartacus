/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login } from '../../../helpers/auth-forms';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import * as checkoutVariants from '../../../helpers/checkout-variants';
import * as loginHelper from '../../../helpers/login';
import {
  APPAREL_BASESITE,
  configureProductWithVariants,
} from '../../../helpers/variants/apparel-checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import {
  cartWithSingleVariantProduct,
  products,
  variantProduct,
} from '../../../sample-data/apparel-checkout-flow';
import { isolateTests } from '../../../support/utils/test-isolation';

context('Apparel - checkout as guest', { testIsolation: false }, () => {
  viewportContext(['mobile'], () => {
    isolateTests();
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
      checkoutVariants.generateVariantGuestUser();
    });

    beforeEach(() => {
      configureProductWithVariants();
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    // Core e2e test. Repeat in mobile.
    checkoutVariants.testCheckoutVariantAsGuest();
  });
  viewportContext(['desktop'], () => {
    isolateTests();
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
      checkoutVariants.generateVariantGuestUser();
    });

    beforeEach(() => {
      configureProductWithVariants();
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    // Core e2e test.
    checkoutVariants.testCheckoutVariantAsGuest();

    // Below tests depend on core test for setup.
    it('should keep guest cart content and restart checkout', () => {
      cy.clearLocalStorage();
      checkout.goToCheapProductDetailsPage(products[0]);
      checkout.addCheapProductToCartAndProceedToCheckout(variantProduct);

      guestCheckout.loginAsGuest(checkoutVariants.variantUser);

      checkout.fillAddressFormWithCheapProduct(
        checkoutVariants.variantUser,
        cartWithSingleVariantProduct
      );

      const deliveryAddressPage = checkout.waitForPage(
        '/checkout/delivery-address',
        'getDeliveryPage'
      );

      checkout.clickHamburger();

      const loginPage = checkout.waitForPage('/login', 'getLoginPage');
      cy.findByText(/Sign in \/ Register/i).click();
      cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

      login(
        checkoutVariants.variantUser.email,
        checkoutVariants.variantUser.password
      );
      cy.wait(`@${deliveryAddressPage}`)
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('cx-login div.cx-login-greet').should('exist');
      cy.get('.cx-checkout-title').should('contain', 'Delivery Address');

      cy.get('cx-mini-cart .count').contains('1');

      const cartPage = checkout.waitForPage('/cart', 'getCartPage');
      cy.get('cx-mini-cart').click();
      cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);

      cy.get('cx-cart-item-list')
        .contains('tr[cx-cart-item-list-row]', variantProduct.code)
        .within(() => {
          cy.get('cx-item-counter input').should('have.value', '1');
        });
      loginHelper.signOutUser();
    });
  });
});
