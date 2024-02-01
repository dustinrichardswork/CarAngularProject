// Resolver service for InviteUserViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { InviteUserViewModel } from '../../models/invite-user-view-model.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { UserProfileService } from './user-profile.service';

@Injectable()
export class InviteUserResolverService implements Resolve<InviteUserViewModel> {
  constructor(
    private userProfileService: UserProfileService,
    private spinnerService: SpinnerOverlayService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): InviteUserViewModel | Observable<InviteUserViewModel> | Observable<never> {
    return new InviteUserViewModel();
    //if (route.params['uid'] && route.params['uid'] !== 'new') {
    //  this.spinnerService.show();
    //  return this.userProfileService.get(route.params['uid']).pipe(catchError(() => {
    //    this.spinnerService.hide();
    //    return EMPTY;
    //  }), mergeMap(something => {
    //      if (something) {
    //        this.spinnerService.hide();
    //        return of(something);
    //    } else {
    //        this.spinnerService.hide();
    //      return EMPTY;
    //    }
    //  })
    //  );
    //}
    //else {
    //  return this.userProfileService.create();
    //}
  }
}
