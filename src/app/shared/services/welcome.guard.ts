import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserProfileService } from './user/user-profile.service';

@Injectable()
export class WelcomeGuard implements CanActivate {
  constructor(private profileService: UserProfileService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = route.queryParams['token'];

    if (token) {
      return this.profileService.verifyInviteToken(token).pipe(
        tap(
          (isTokenValid) => {
            if (!isTokenValid) {
              this.router.navigate(['/not-found']);
            }
          },
          catchError(() => this.router.navigate(['/not-found'])),
        ),
      );
    } else {
      this.router.navigate(['/not-found']);
      return of(false);
    }
  }
}
