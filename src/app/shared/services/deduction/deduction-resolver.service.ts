// Resolver service for DeductionViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import {DeductionService} from './deduction.service';
import { DeductionViewModel } from '../../models/deduction/deduction-view-model.model';
import { UserProfileService } from '../user/user-profile.service';


@Injectable()
export class DeductionResolverService implements Resolve<DeductionViewModel> {

  constructor(private deductionService: DeductionService, private spinnerService: SpinnerOverlayService, private userProfileService: UserProfileService) { }

  resolve(route: ActivatedRouteSnapshot): DeductionViewModel | Observable<DeductionViewModel> | Observable<never> {
    let franchiseeUid = route.params.franchiseeUid;
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.deductionService.getDeduction(franchiseeUid, route.params['uid']).pipe(catchError(() => {
        this.spinnerService.hide();
        return EMPTY;
      }), mergeMap(something => {
          if (something) {
            this.spinnerService.hide();
            return of(something);
        } else {
            this.spinnerService.hide();
          return EMPTY;
        }
      })
      );
    }
    else {
      return this.userProfileService.getCurrentUserProfile().pipe(mergeMap(item => {
        let deduction = new DeductionViewModel();
        deduction.franchiseeUid = route.params.franchiseeUid;
        deduction.insertedBy = `${item.firstName} ${item.lastName}`;
        return of(deduction);
      }))
    }
  }
}
