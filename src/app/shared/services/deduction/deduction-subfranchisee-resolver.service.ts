import { Injectable } from '@angular/core';
import {DeductionService} from "@app-shared/services/deduction/deduction.service";
import {SpinnerOverlayService} from "@app-shared/services/spinner-overlay.service";
import {UserProfileService} from "@app-shared/services/user/user-profile.service";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {DeductionViewModel} from "@app-shared/models/deduction/deduction-view-model.model";
import {EMPTY, Observable, of} from "rxjs";
import {catchError, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeductionSubfranchiseeResolverService implements Resolve<DeductionViewModel> {

  constructor(private deductionService: DeductionService, private spinnerService: SpinnerOverlayService, private userProfileService: UserProfileService) { }

  resolve(route: ActivatedRouteSnapshot): DeductionViewModel | Observable<DeductionViewModel> | Observable<never> {
    let subFranchiseeUid = route.params.uid;
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.deductionService.getSubfranchiseeDeduction(subFranchiseeUid, route.params['uid']).pipe(catchError(() => {
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
