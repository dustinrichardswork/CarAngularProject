// Resolver service for CommissionViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import {CommissionService} from './commission.service';
import { CommissionViewModel } from '../../models/commission/commission-view-model.model';
import { UserProfileService } from '../user/user-profile.service';



@Injectable()
export class CommissionResolverService implements Resolve<CommissionViewModel> {

  constructor(private commissionService: CommissionService, private spinnerService: SpinnerOverlayService, private userProfileService: UserProfileService) { }

  resolve(route: ActivatedRouteSnapshot): CommissionViewModel | Observable<CommissionViewModel> | Observable<never> {
    let franchiseeUid = route.params.franchiseeUid;
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.commissionService.getCommission(franchiseeUid,route.params['uid']).pipe(catchError(() => {
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
        let commission = new CommissionViewModel();
        commission.franchiseeUid = route.params.franchiseeUid;
        return of(commission);
      }))
     }
  }
}
