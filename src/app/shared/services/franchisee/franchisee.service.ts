// Service for processing server-side calls, related to FranchiseeViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseService} from '@app-shared/common/base.service';
import {ListPageWrapper} from '@app-shared/common/list-page-wrapper.model';
import {FranchiseeLightViewModel} from '@app-shared/models/franchisee-light-view-model.model';
import {FranchiseeShortListItem} from '@app-shared/models/franchisee-short-list-item.model';
import {FranchiseeListItem} from '@app-shared/models/franchisee-list-item.model';
import {FranchiseeViewModel} from '@app-shared/models/franchisee-view-model.model';
import {SpinnerOverlayService} from '../spinner-overlay.service';
import {LocationListItem} from '../../models/location-list-item.model';
import {SubFranchiseeListItem} from '../../models/sub-franchisee-list-item.model';
// import { PaymentHistory } from '../../models/franchisee/payment-history.model';
import { UserFranchiseeMetadata } from '../../models/franchisee/user-franchisee-metadata';

@Injectable()
export class FranchiseeService extends BaseService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private spinnerService: SpinnerOverlayService,
  ) {
    super();
    this.baseUrl = baseUrl;
  }

  createFranchisee(): FranchiseeViewModel {
    return new FranchiseeViewModel();
  }

  getFranchisee(uID: string): Observable<FranchiseeViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<FranchiseeViewModel>(this.baseUrl + 'api/franchisee/' + uID, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  getFranchiseeLight(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<FranchiseeViewModel>(this.baseUrl + 'api/franchisee/' + uID, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  getMyFranchiseId(): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get(this.baseUrl + 'api/franchisee/my-franchisee-id', options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  getMyFranchiseId2(): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get(this.baseUrl + 'api/franchisee/my-franchisee-id2', options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  getUserFranchiseeMetadata(): Observable<UserFranchiseeMetadata> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<UserFranchiseeMetadata>(this.baseUrl + 'api/franchisee/user-franchise-meta', options)
      .pipe(catchError((err) => this.handleError(err)));
  }

  saveFranchisee(item: FranchiseeViewModel): Observable<FranchiseeViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    const s = JSON.stringify(item);
    return this.http.post<FranchiseeViewModel>(this.baseUrl + 'api/franchisee/', s, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  getFranchisees(pageNum: number, searchText?: string): Observable<ListPageWrapper<FranchiseeListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    const query = (searchText) ? "?searchText=" + encodeURI(searchText) : "";

    return this.http
      .get<ListPageWrapper<FranchiseeListItem>>(
        `${this.baseUrl}api/franchisee/page/${pageNum}/${query}`,
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  findFranchisees(name: string, getAll: boolean = false): Observable<Array<FranchiseeShortListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    if (getAll === true) {
      return this.http.get<Array<FranchiseeShortListItem>>(this.baseUrl + `api/franchisee/find?namePattern=${encodeURI(name)}&getAll=true`, options)
        .pipe(map(res => {
          return res;
        }),
          catchError(err => this.handleError(err)));
    } else {
      return this.http.get<Array<FranchiseeShortListItem>>(this.baseUrl + `api/franchisee/find?namePattern=${encodeURI(name)}`, options)
        .pipe(map(res => {
          return res;
        }),
          catchError(err => this.handleError(err)));
    }
  }

  deleteFranchisee(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    this.spinnerService.show('Deleting Franchisee');
    return this.http.delete(this.baseUrl + 'api/franchisee/' + uID, options).pipe(
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

  getFranchiseeLocations(uId: string): Observable<Array<LocationListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<Array<LocationListItem>>(this.baseUrl + `api/franchisee/${uId}/locations`, options)
      .pipe(map(res => {
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  findSubFranchisees(franchiseeUid: string, locationUid: string, namePattern: string): Observable<Array<SubFranchiseeListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<Array<SubFranchiseeListItem>>(this.baseUrl + `api/franchisee/${franchiseeUid}/find-subfranchisees-for-location/${locationUid}?searchText=${encodeURI(namePattern)}`, options)
      .pipe(map(res => {
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  // getPaymentHistory(uid: string): Observable<PaymentHistory> {
  //   const headers = this.prepareHeaders();
  //   const options = { headers: headers };

  //   return this.http.get<PaymentHistory>(this.baseUrl + 'api/franchisee/' + uid + '/payments', options).pipe(
  //     map((res) => {
  //       return res;
  //     }),
  //     catchError((err) => this.handleError(err)),
  //   );
  // }
}
