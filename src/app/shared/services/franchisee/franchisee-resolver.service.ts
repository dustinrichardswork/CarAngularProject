// Resolver service for FranchiseeViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { FranchiseeViewModel } from '@app-shared/models/franchisee-view-model.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { FranchiseeService } from './franchisee.service';

@Injectable()
export class FranchiseeResolverService implements Resolve<FranchiseeViewModel> {
  constructor(
    private franchiseeService: FranchiseeService,
    private spinnerService: SpinnerOverlayService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): FranchiseeViewModel | Observable<FranchiseeViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.franchiseeService.getFranchisee(route.params['uid']).pipe(
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
      return this.franchiseeService.createFranchisee();
    }
  }
}
