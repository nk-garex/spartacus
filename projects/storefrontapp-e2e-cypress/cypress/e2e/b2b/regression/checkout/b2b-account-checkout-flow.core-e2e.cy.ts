/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as b2bCheckout from '../../../../helpers/b2b/b2b-checkout';
import {
  b2bAccountShipToUser,
  b2bProduct,
  cartWithB2bProductAndPremiumShipping,
  order_type,
  POWERTOOLS_BASESITE,
} from '../../../../sample-data/b2b-checkout';
import { isolateTests } from '../../../../support/utils/test-isolation';

context('B2B - Account Checkout flow', { testIsolation: false }, () => {
  isolateTests();
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should login to b2b user', () => {
    b2bCheckout.loginB2bUser();
  });

  it('should add a product to cart', () => {
    b2bCheckout.addB2bProductToCartAndCheckout();
  });

  it('should select Account payment type', () => {
    b2bCheckout.enterPONumber();
    b2bCheckout.selectAccountPayment();
  });

  it('should enter shipping address', () => {
    b2bCheckout.selectAccountShippingAddress();
  });

  it('should select delivery mode', () => {
    b2bCheckout.selectAccountDeliveryMode();
  });

  it('should review and place order', () => {
    b2bCheckout.reviewB2bReviewOrderPage(
      b2bAccountShipToUser,
      cartWithB2bProductAndPremiumShipping,
      true,
      order_type.PLACE_ORDER
    );

    b2bCheckout.placeOrder('/order-confirmation');
  });

  it('should display summary page', () => {
    b2bCheckout.reviewB2bOrderConfirmation(
      b2bAccountShipToUser,
      b2bProduct,
      cartWithB2bProductAndPremiumShipping
    );
  });
});
