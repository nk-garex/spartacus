/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { ADDED_TO_CART_DIALOG_EVENT_LISTENER_CONSTRUCTOR_MIGRATION } from './data/added-to-cart-dialog-event.listener.migration';
import { ADDED_TO_CART_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/added-to-cart-dialog.component.migration';
import { ADDRESS_FORM_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/address-form.component.migration';
import { CDC_JS_SERVICE_CONSTRUCTOR_MIGRATION } from './data/cdc-js-service.migration';
import { CDS_MERCHANDISING_PRODUCT_SERVICE_CONSTRUCTOR_MIGRATION } from './data/cds-merchandising-product.service.migration';
import { CDS_MERCHANDISING_USER_CONTEXT_SERVICE_CONSTRUCTOR_MIGRATION } from './data/cds-merchandising-user-context.service.migration';
import { CLOSE_ACCOUNT_MODAL_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/close-account-modal.component.migration';
import { CLOSE_ACCOUNT_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/close-account.component.migration';
import { CONSIGNMENT_TRACKING_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/consignment-tracking.component.migration';
import { COUPON_CARD_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/coupon-card.component.migration';
import { COUPON_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/coupon-dialog.component.migration';
import { GENERATED_CONSTRUCTOR_MIGRATIONS } from './data/generated-constructor.migration';
import { JSON_LD_DIRECTIVE_CONSTRUCTOR_MIGRATION } from './data/json-ld.directive.migration';
import { JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION } from './data/json-ld.script.factory.migration';
import { REGISTER_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/register.component.migration';
import { STOCK_NOTIFICATION_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/stock-notification-dialog.component.migration';
import { STOCK_NOTIFICATION_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/stock-notification.component.migration';
import { SUGGESTED_ADDRESS_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/suggested-addresses-dialog.component-migration';
import { TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/tracking-events.component.migration';

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [
  ...GENERATED_CONSTRUCTOR_MIGRATIONS,
  CDS_MERCHANDISING_PRODUCT_SERVICE_CONSTRUCTOR_MIGRATION,
  CDS_MERCHANDISING_USER_CONTEXT_SERVICE_CONSTRUCTOR_MIGRATION,
  CONSIGNMENT_TRACKING_COMPONENT_CONSTRUCTOR_MIGRATION,
  TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION,
  SUGGESTED_ADDRESS_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
  ADDRESS_FORM_COMPONENT_CONSTRUCTOR_MIGRATION,
  ADDED_TO_CART_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
  ADDED_TO_CART_DIALOG_EVENT_LISTENER_CONSTRUCTOR_MIGRATION,
  CLOSE_ACCOUNT_COMPONENT_CONSTRUCTOR_MIGRATION,
  CLOSE_ACCOUNT_MODAL_COMPONENT_CONSTRUCTOR_MIGRATION,
  COUPON_CARD_COMPONENT_CONSTRUCTOR_MIGRATION,
  COUPON_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
  STOCK_NOTIFICATION_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
  STOCK_NOTIFICATION_COMPONENT_CONSTRUCTOR_MIGRATION,
  JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION,
  JSON_LD_DIRECTIVE_CONSTRUCTOR_MIGRATION,
  CDC_JS_SERVICE_CONSTRUCTOR_MIGRATION,
  REGISTER_COMPONENT_CONSTRUCTOR_MIGRATION,
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateConstructorDeprecation(
      tree,
      context,
      CONSTRUCTOR_DEPRECATIONS_DATA
    );
  };
}
