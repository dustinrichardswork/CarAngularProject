import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from '@app-shared/common/base.service';
import { ListPageWrapper } from '@app-shared/common/list-page-wrapper.model';
import { SubFranchiseeListItem } from '@app-shared/models/sub-franchisee-list-item.model';
import { SubFranchiseeViewModel } from '@app-shared/models/sub-franchisee-view-model.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { LocationListItem } from '../../models/location-list-item.model';

@Injectable()
export class SubFranchiseeService extends BaseService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private spinnerService: SpinnerOverlayService,
  ) {
    super();
    this.baseUrl = baseUrl;
  }

  getSubFranchisee(franchiseeUid: string, uID: string): Observable<SubFranchiseeViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<SubFranchiseeViewModel>(
        this.baseUrl + 'api/franchisee/' + franchiseeUid + '/subfranchisee/' + uID,
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  getSubFranchiseeLight(uID: string): Observable<SubFranchiseeViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<SubFranchiseeViewModel>(
        this.baseUrl + 'api/subfranchisee/' + uID,
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  saveSubFranchisee(
    franchiseeUid: string,
    item: SubFranchiseeViewModel,
  ): Observable<SubFranchiseeViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const s = JSON.stringify(item);
    return this.http
      .post<SubFranchiseeViewModel>(
        this.baseUrl + 'api/franchisee/' + franchiseeUid + '/subfranchisee/',
        s,
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  getSubFranchisees(
    franchiseeUid: string,
    pageNum: number,
    searchText?: string
  ): Observable<ListPageWrapper<SubFranchiseeListItem>> {
    if (!franchiseeUid) {
      return EMPTY;
    }
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const query = (searchText) ? "?searchText=" + encodeURI(searchText) : "";

    return this.http
      .get<ListPageWrapper<SubFranchiseeListItem>>(
        `${this.baseUrl}api/franchisee/${franchiseeUid}/subfranchisee/page/${pageNum}/${query}`,
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  findSubfranchisees(parentUid: string, name: string): Observable<Array<SubFranchiseeListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<Array<SubFranchiseeListItem>>(
        this.baseUrl +
          `api/franchisee/${parentUid}/subfranchisee/find?namePattern=${encodeURI(name)}`,
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  createSubFranchisee(franchiseeUid): SubFranchiseeViewModel {
    const franchiseeViewModel = new SubFranchiseeViewModel();
    franchiseeViewModel.parentUID = franchiseeUid;
    return franchiseeViewModel;
  }

  getSubFranchiseeLocations(subFranchiseeUid: string): Observable<Array<LocationListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<Array<LocationListItem>>(`${this.baseUrl}api/subfranchisee/${subFranchiseeUid}/locations`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)));
  }

  deleteLocationFromSubfranchisee(subFranchiseeUid: string, locationUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.delete(`${this.baseUrl}api/subfranchisee/${subFranchiseeUid}/locations/${locationUid}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)));
  }

  addSubfranchiseeToLocation(subFranchiseeUid: string, locationUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.put(`${this.baseUrl}api/subfranchisee/${subFranchiseeUid}/locations/${locationUid}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)));
  }

  deleteSubFranchisee(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show('Deleting Sub-franchisee');
    return this.http.delete(this.baseUrl + 'api/subfranchisee/' + uID, options).pipe(
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
}
