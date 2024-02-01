import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { LoginData } from '../models/auth/logindata';
import { BaseService } from '../common/base.service';
import { UserRoles } from '../models/enums';

@Injectable()
//  { providedIn: 'root' }
export class AuthService extends BaseService {
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);

  // Observable navItem stream
  public authNavStatus$ = this._authNavStatusSource.asObservable();

  public loggedUser: string;
  public loggedUserRole: UserRoles;

  private isRefreshing = false;

  constructor(
    private readonly http: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
  ) {
    super();
    this._authNavStatusSource.next(this.isLoggedIn());
  }

  public login(userName: string, password: string, remember: boolean): Observable<boolean> {
    this.isRefreshing = false;
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http
      .post<any>(`${this.baseUrl}api/auth/login`, JSON.stringify({ userName, password }), options)
      .pipe(
        tap((res) =>
          this.doLoginUser(
            {
              userName: userName,
              authToken: res.auth_token,
              expiresOn: 1,
              refreshToken: res.refresh_token,
              role: res.role,
              profile: res['profile']
            },
            remember,
          ),
        ),
        mapTo(true),
        catchError((err) => this.handleError(err)),
      );
  }

  public logout() {
    this.isRefreshing = false;
    return this.http.delete<any>(`${this.baseUrl}api/auth/logout/${this.getRefreshToken()}`).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError((error) => {
        return of(false);
      }),
    );
  }

  public isLoggedIn() {
    return !!this.getJwtToken();
  }

  public refreshToken() {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.http
        .post<any>(`${this.baseUrl}api/auth/refresh/${this.getRefreshToken()}`, null)
        .pipe(
          tap((tokens) => {
            this.storeJwtToken(tokens.auth_token);
            this.storeSessionTokens(tokens.auth_token);
            this.isRefreshing = false;
          }),
        );
    }
  }

  public getJwtToken() {
    const login_data_string: string = this.getLoginData();
    if (login_data_string) {
      const login_data: LoginData = JSON.parse(login_data_string);
      if (login_data) {
        this.loggedUser = login_data.userName;
        this.loggedUserRole = login_data.role;
        return login_data.authToken;
      }
    }

    return undefined;
  }

  public getLoginData(): string | null {
    if (this.isRememberMe()) {
      return localStorage.getItem('login_data');
    }

    return sessionStorage.getItem('login_data');
  }

  private doLoginUser(tokens: LoginData, remember) {
    this.loggedUser = tokens.userName;
    this.loggedUserRole = tokens.role;
    this.storeRememberMe(remember);

    if (remember) {
      this.storeTokens(tokens);
    } else {
      this.storeSessionTokens(tokens);
    }

    this.jwtToken = tokens.authToken;
    this._authNavStatusSource.next(true);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.loggedUserRole = null;
    this.removeTokens();
    this._authNavStatusSource.next(false);
  }

  private getRefreshToken() {
    const login_data_string: string = this.getLoginData();
    if (login_data_string) {
      const login_data: LoginData = JSON.parse(login_data_string);
      if (login_data) return login_data.refreshToken;
    }
    return null;
  }

  private storeJwtToken(jwt: string) {
    const login_data_string: string = this.getLoginData();
    if (login_data_string) {
      const login_data: LoginData = JSON.parse(login_data_string);
      login_data.authToken = jwt;
      this.storeTokens(login_data);
      this.storeSessionTokens(login_data);
    }
  }

  private storeRememberMe(remember: boolean): void {
    if (remember) {
      localStorage.setItem('remember', '1');
    }
  }

  private isRememberMe(): boolean {
    return Boolean(localStorage.getItem('remember')) || false;
  }

  private storeTokens(data: LoginData) {
    localStorage.setItem('login_data', JSON.stringify(data));
  }

  private storeSessionTokens(data: LoginData) {
    sessionStorage.setItem('login_data', JSON.stringify(data));
  }

  private removeTokens(): void {
    localStorage.removeItem('login_data');
    localStorage.removeItem('remember');
    sessionStorage.removeItem('login_data');
  }
}
