// Service for processing server-side calls, related to UserProfileViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '@app-shared/common/base.service';
import { ListPageWrapper } from '@app-shared/common/list-page-wrapper.model';
import { PasswordViewModel } from '@app-shared/models/password-view-model.model';
import { UserProfileListItem } from '@app-shared/models/user-profile-list-item.model';
import { UserProfileViewModel } from '@app-shared/models/user-profile-view-model.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { RecoverPasswordViewModel } from '../../models/recover-password-view-model.model';

@Injectable()
export class UserProfileService extends BaseService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private spinnerService: SpinnerOverlayService,
  ) {
    super();
    this.baseUrl = baseUrl;
  }

  createUserProfile(): UserProfileViewModel {
    return new UserProfileViewModel();
  }

  getUserProfile(uID: string): Observable<UserProfileViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<UserProfileViewModel>(`${this.baseUrl}api/userprofile/${uID}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  getCurrentUserProfile(): Observable<UserProfileViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http
      .get<UserProfileViewModel>(this.baseUrl + 'api/userprofile/current', options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  saveUserProfile(item: UserProfileViewModel): Observable<UserProfileViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    const s = JSON.stringify(item);
    return this.http.post<UserProfileViewModel>(this.baseUrl + 'api/userprofile/', s, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  updatePassword(item: PasswordViewModel): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    const s = JSON.stringify(item);
    return this.http.post<any>(this.baseUrl + 'api/userprofile/update-password/', s, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  getUserProfiles(pageNum: number, searchText?: string): Observable<ListPageWrapper<UserProfileListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    const query = (searchText) ? "?searchText=" + encodeURI(searchText) : "";

    return this.http.get<ListPageWrapper<UserProfileListItem>>(`${this.baseUrl}api/userprofile/page/` + pageNum + query, options)
      .pipe(map(res => {
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  deleteUserProfile(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show('Deleting UserProfile');
    return this.http.delete(this.baseUrl + 'api/userprofile/' + uID, options).pipe(
      map((res) => {
        this.spinnerService.hide();
        return res;
      }),
      catchError((err) => {
        this.spinnerService.hide();
        return this.handleError(err);
      }),
    );
  }

  deactivateUser(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show('Deactivate User');
    return this.http.put(this.baseUrl + 'api/userprofile/' + uID + '/deactivate', options).pipe(
      map((res) => {
        this.spinnerService.hide();
        return res;
      }),
      catchError((err) => {
        this.spinnerService.hide();
        return this.handleError(err);
      }),
    );
  }

  activateUser(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    this.spinnerService.show('Activate User');
    return this.http.put(this.baseUrl + 'api/userprofile/' + uID + '/activate', options)
      .pipe(map(res => {
          this.spinnerService.hide();
          return res;
        }),
        catchError(err => {
          this.spinnerService.hide();
          return this.handleError(err);
        }));
  }

  requestPasswordRecovery(email: string, userName: string, firstName: string, lastName: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const s = JSON.stringify({
      email: email,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      captchaCode: "q",
      captchaUID: "2e4cdd5c-ab90-48df-a612-71ee03d446b3"
    });

    return this.http
      .post<any>(this.baseUrl + 'api/userprofile/request-password-recovery', s, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  recoverPassword(data: RecoverPasswordViewModel): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .post<any>(this.baseUrl + 'api/userprofile/recover-password', data, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  inviteUser(data: any): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.post<any>(this.baseUrl + 'api/userprofile/invite-user', data, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  verifyInviteToken(token: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const data = { token: token };

    return this.http
      .post<any>(this.baseUrl + 'api/userprofile/verify-invite-token', data, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  verifyPasswordResetToken(token: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const data = { token: token };

    return this.http
      .post<any>(this.baseUrl + 'api/userprofile/verify-password-reset-token', data, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  getUserProfileByToken(token: string): Observable<UserProfileViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http
      .get<UserProfileViewModel>(this.baseUrl + 'api/userprofile/by-token/' + token, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  acceptInvite(data: any): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http
      .post<UserProfileViewModel>(this.baseUrl + 'api/userprofile/accept-invitation', data, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  resendInvitation(userId: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http
      .get<UserProfileViewModel>(
        this.baseUrl + 'api/userprofile/' + userId + '/resend-invitation',
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  acceptTermsOfService(token: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const data = { token: token };

    return this.http
      .post<UserProfileViewModel>(
        this.baseUrl + 'api/userprofile/accept-terms-of-service',
        data,
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  findUserByPattern(pattern: string) {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<UserProfileListItem[]>(
        `${this.baseUrl}api/userprofile/find?pattern=${encodeURI(pattern)}`,
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }
}
