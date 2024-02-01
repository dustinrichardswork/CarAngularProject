import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { LoginData } from '../models/auth/logindata';
import { AuthService } from './auth.new.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const login_data_string = this.authService.getLoginData();
    if (login_data_string) {
      const login_data: LoginData = JSON.parse(login_data_string);
      if (login_data.expiresOn > new Date().getTime()) {
        return true;
      }
    }
    this.authService.logout();
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const login_data_string = this.authService.getLoginData();
    if (login_data_string) {
      const login_data: LoginData = JSON.parse(login_data_string);
      if (login_data.expiresOn > new Date().getTime()) {
        return true;
      }
    }
    this.authService.logout();
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
