/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationChunksConfig {
  [chunk: string]: string[];
}

export const translationChunksConfig: TranslationChunksConfig = {
  common: [
    'common',
    'spinner',
    'searchBox',
    'navigation',
    'sorting',
    'httpHandlers',
    'pageMetaResolver',
    'miniCart',
    'skipLink',
    'formErrors',
    'errorHandlers',
    'carousel',
    'assistiveMessage',
    'passwordVisibility',
    'generalErrors',
    'chatMessaging',
  ],
  address: [
    'addressForm',
    'addressBook',
    'addressCard',
    'addressSuggestion',
    'addressMessages',
  ],
  payment: [
    'paymentForm',
    'paymentMethods',
    'paymentCard',
    'paymentTypes',
    'paymentMessages',
  ],
  myAccount: [
    'closeAccount',
    'updatePasswordForm',
    'updateProfileForm',
    'consentManagementForm',
    'myCoupons',
    'notificationPreference',
    'myInterests',
  ],
  pwa: ['pwa'],
  product: [
    'productDetails',
    'productList',
    'productFacetNavigation',
    'productCarousel',
    'productSummary',
    'productReview',
    'addToCart',
    'addToWishList',
    'stockNotification',
    'TabPanelContainer',
    'itemCounter',
    'productView',
  ],
  user: ['anonymousConsents', 'checkoutLogin', 'authMessages'],
  video: ['player'],
};
