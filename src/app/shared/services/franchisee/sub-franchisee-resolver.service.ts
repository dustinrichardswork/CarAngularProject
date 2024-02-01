// Resolver service for SubFranchiseeViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { SubFranchiseeViewModel } from '../../models/sub-franchisee-view-model.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { SubFranchiseeService } from './sub-franchisee.service';

@Injectable()
export class SubFranchiseeResolverService implements Resolve<SubFranchiseeViewModel> {
  constructor(
    private subFranchiseeService: SubFranchiseeService,
    private spinnerService: SpinnerOverlayService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): SubFranchiseeViewModel | Observable<SubFranchiseeViewModel> | Observable<never> {
    const franchiseeUid = route.params.franchiseeUid;
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.subFranchiseeService.getSubFranchisee(franchiseeUid, route.params['uid']).pipe(
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
      return this.subFranchiseeService.createSubFranchisee(franchiseeUid);
    }
  }
}
