/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../../helpers/viewport-context';
import * as saveForLater from '../../../helpers/save-for-later';

context('Save for later', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    saveForLater.testAnonymousUserSaveForLater();

    saveForLater.testLoggedInUserSaveForLater();
  });
});
