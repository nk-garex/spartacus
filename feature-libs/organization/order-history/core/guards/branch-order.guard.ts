import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  B2BUserRole,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BranchOrderGuard implements CanActivate {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean> {
    return this.userAccountFacade.get().pipe(
      filter((user) => !!user && Object.keys(user).length > 0),
      pluck('roles'),
      map((roles) => {
        const hasRole =
          Array.isArray(roles) &&
          (roles.includes(B2BUserRole.APPROVER) || // TODO CHANGE THIS TO OUR NEW USER GROUP
            roles.includes(B2BUserRole.ADMIN));

        if (!hasRole) {
          this.routingService.go({ cxRoute: 'home' });

          this.globalMessageService.add(
            {
              key: 'orderApprovalGlobal.notification.noSufficientPermissions',
            },
            GlobalMessageType.MSG_TYPE_WARNING
          );
        }

        return hasRole;
      })
    );
  }
}
