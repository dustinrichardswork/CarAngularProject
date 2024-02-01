import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanActivateChild,
} from '@angular/router';
import { AuthService } from '../services/auth.new.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn()) {
      void this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    return this.authService.isLoggedIn();
  }
}
