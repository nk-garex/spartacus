/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnonymousConsentsActions } from '../actions/index';

export const initialState = false;

export function reducer(
  state = initialState,
  action: AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed
): boolean {
  switch (action.type) {
    case AnonymousConsentsActions.TOGGLE_ANONYMOUS_CONSENTS_BANNER_DISMISSED: {
      return action.dismissed;
    }
  }

  return state;
}
