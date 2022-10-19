/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfiguratorBasicEffects } from './configurator-basic.effect';
import { ConfiguratorCartEffects } from './configurator-cart.effect';

export const ConfiguratorEffects: any[] = [
  ConfiguratorBasicEffects,
  ConfiguratorCartEffects,
];
