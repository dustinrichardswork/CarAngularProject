// Resolver service for UserProfileViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { UserProfileViewModel } from '../../models/user-profile-view-model.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { UserProfileService } from './user-profile.service';

@Injectable()
export class UserProfileResolverService implements Resolve<UserProfileViewModel> {
  constructor(
    private userProfileService: UserProfileService,
    private spinnerService: SpinnerOverlayService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): UserProfileViewModel | Observable<UserProfileViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      if (route.params['uid'] === 'profile') {
        return this.userProfileService.getCurrentUserProfile().pipe(catchError(() => {
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
      } else {
        return this.userProfileService.getUserProfile(route.params['uid']).pipe(catchError(() => {
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
    }
    else {
      return this.userProfileService.createUserProfile();
    }
  }
}
