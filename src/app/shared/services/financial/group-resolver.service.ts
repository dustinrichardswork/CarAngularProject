// Resolver service for FranchiseeViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { GroupService } from './group.service';
import { GroupViewModel } from 'app/shared/models/financial/group-view.model';

@Injectable()
export class GroupResolverService implements Resolve<GroupViewModel> {
  constructor(
    private _groupService: GroupService,
    private spinnerService: SpinnerOverlayService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): GroupViewModel | Observable<GroupViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this._groupService.getGroup(route.params['uid']).pipe(
        catchError(() => {
          this.spinnerService.hide();
          return EMPTY;
        }),
        mergeMap((something) => {
          if (something) {
            this.spinnerService.hide();
            return of(something);
          } else {
            this.spinnerService.hide();
            return EMPTY;
          }
        }),
      );
    } else {
      return this._groupService.createGroup();
    }
  }
}
