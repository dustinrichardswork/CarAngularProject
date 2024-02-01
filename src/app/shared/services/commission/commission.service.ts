// Service for processing server-side calls, related to CommissionViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";
import { SpinnerOverlayService } from "../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { CommissionViewModel } from '../../models/commission/commission-view-model.model';
import { CommissionListItem } from '../../models/commission/commission-list-item.model';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { CommissionType } from "../../models/enums";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import { DateConverters } from '../system/date-converters.helper';


@Injectable()
export class CommissionService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService, private simpleCalendar: NgbCalendar) {
    super();
    this.baseUrl = baseUrl;
  }

  createCommission(): CommissionViewModel {
    return new CommissionViewModel();
  }

  getCommission(franchiseeUid: string, uID: string): Observable<CommissionViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<CommissionViewModel>(this.baseUrl + "api/franchisee/" + franchiseeUid + "/commission/" + uID, options)
      .pipe(map(res => {
        this.fixTypes(res);
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  saveCommission(franchiseeUid: string, item: CommissionViewModel): Observable<CommissionViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const s = JSON.stringify(item);
    return this.http.post<CommissionViewModel>(this.baseUrl + "api/franchisee/" + franchiseeUid + "/commission/", s, options)
      .pipe(map(res => {
        this.fixTypes(res);
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  cloneCommission(franchiseeUid: string, uID: string): Observable<CommissionViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<CommissionViewModel>(this.baseUrl + "api/franchisee/" + franchiseeUid + "/commission/clone/" + uID, null, options)
      .pipe(map(res => {
        this.fixTypes(res);
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getCommissions(franchseeUid: string, pageNum: number): Observable<ListPageWrapper<CommissionListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<ListPageWrapper<CommissionListItem>>(this.baseUrl + "api/franchisee/" + franchseeUid + "/commission/page/" + pageNum, options)
      .pipe(map(res => {
        this.fixListTypes(res);
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  deleteCommission(franchiseeUid: string, uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show("Deleting Commission");
    return this.http.delete(this.baseUrl + "api/franchisee/" + franchiseeUid + "/commission/" + uID, options)
      .pipe(map(res => {
        this.spinnerService.hide();
        return res;
      }),
        catchError(err => {
          this.spinnerService.hide();
          return this.handleError(err);
        }));
  }
  playCommissionStatus(franchiseeUid: string,uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show('Activating Commission Status');
    return this.http.put(this.baseUrl + "api/franchisee/" + franchiseeUid + "/commission/" + uID +"/start", options).pipe(
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
  pauseCommissionStatus(franchiseeUid: string, uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show('Pausing Commission Status');
    return this.http.put(this.baseUrl + "api/franchisee/" + franchiseeUid + "/commission/" + uID + "/pause", options).pipe(
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

  private fixTypes(item: CommissionViewModel) {
    if (item) {
      item.startDate = DateConverters.extractDate(item.startDate);
      item.endDate = DateConverters.extractDate(item.endDate);
    }
  }


  private fixListTypes(list: ListPageWrapper<CommissionListItem>) {
    if (list.items) {
      list.items.forEach(item => {
        item.startDate = DateConverters.extractDate(item.startDate);
        item.endDate = DateConverters.extractDate(item.endDate);
      });
    }
  }

}
