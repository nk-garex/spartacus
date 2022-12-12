/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const user = {
  anonymousConsents: {
    preferences: 'Consent Preferences',
    dialog: {
      title: 'Consent Management',
      legalDescription:
        "We use cookies/browser's storage to personalize the content and improve user experience. We also might share the data about your site usage with our social media. For more, please review our privacy policy.",
      selectAll: 'Select all',
      clearAll: 'Clear all',
    },
    banner: {
      title: 'This website uses cookies',
      description:
        "We use cookies/browser's storage to personalize the content and improve user experience.",
      allowAll: 'Allow All',
      viewDetails: 'View Details',
    },
  },
  checkoutLogin: {
    emailAddress: {
      label: 'Email address',
      placeholder: 'Enter email',
    },
    confirmEmail: {
      label: 'Confirm email',
      placeholder: 'Confirm email',
      required: 'Confirm email is required.',
      cxEmailsMustMatch: 'Email and Confirm email must match.',
    },
    continue: 'Continue',
    emailIsRequired: 'Invalid email format',
    emailsMustMatch: 'Email does not match',
  },
  authMessages: {
    signedOutSuccessfully: 'You have successfully signed out.',
  },
};
