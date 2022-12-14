/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface OpfOccEndpoints {
  /**
   * Endpoint to get active payment configurations
   */
  getActiveConfigurations?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends OpfOccEndpoints {}
}
