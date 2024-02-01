// Service for processing server-side calls, related to StatementViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "./../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { StatementViewModel } from '../../models/statement/statement-view-model.model';
import { StatementListItem } from '../../models/statement/statement-list-item.model';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';


@Injectable()
export class StatementService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  createStatement(): StatementViewModel {
    return new StatementViewModel();
  }

  getStatement(uID: string): Observable<StatementViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<StatementViewModel>(this.baseUrl + "api/statement/" + uID, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  saveStatement(item: StatementViewModel): Observable<StatementViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const s = JSON.stringify(item);
    return this.http.post<StatementViewModel>(this.baseUrl + "api/statement/", s, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getStatements(franchiseeUid: string, pageNum: number): Observable<ListPageWrapper<StatementListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<ListPageWrapper<StatementListItem>>(this.baseUrl + "api/franchisee/" + franchiseeUid + "/statement/page/" + pageNum, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getSubfranchiseeStatements(subFranchiseeUid: string, pageNum: number): Observable<ListPageWrapper<StatementListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<ListPageWrapper<StatementListItem>>(this.baseUrl + "api/subfranchisee/" + subFranchiseeUid + "/statement/page/" + pageNum, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getSubfranchiseeStatement(uID: string): Observable<StatementViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<StatementViewModel>(this.baseUrl + "api/subfranchisee/statement/" + uID, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  publishStatement(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.patch(this.baseUrl + `api/statement/${uID}/publish`, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  publishSubfranchiseeStatement(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.patch(this.baseUrl + `api/subfranchisee/statement/${uID}/publish`, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  createFranchiseeInvoice(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.patch(this.baseUrl + `api/statement/${uID}/create-invoice`, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  calculateStatement(franchiseeUid: string, statementUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.patch(this.baseUrl + "api/franchisee/" + franchiseeUid + "/statement/" + statementUid + "/calculate", options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  //deleteStatement(uID: string): Observable<any> {
  //  const headers = this.prepareHeaders();
  //  const options = { headers: headers };
  //  this.spinnerService.show("Deleting Statement");
  //  return this.http.delete(this.baseUrl + "api/statement/" + uID, options)
  //    .pipe(map(res => {
  //      this.spinnerService.hide();
  //      return res;
  //    }),
  //      catchError(err => {
  //        this.spinnerService.hide();
  //        return this.handleError(err);
  //      }));
  //}
}
