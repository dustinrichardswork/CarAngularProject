// Service for processing server-side calls, related to DeductionViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { map } from "rxjs/internal/operators/map";
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { DeductionListItem } from '../../models/deduction/deduction-list-item.model';
import { DeductionViewModel } from '../../models/deduction/deduction-view-model.model';
import { SpinnerOverlayService } from "../spinner-overlay.service";

@Injectable()
export class DeductionService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  createDeduction(): DeductionViewModel {
    return new DeductionViewModel();
  }

  getDeduction(franchiseeUid: string, uID: string): Observable<DeductionViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<DeductionViewModel>(this.baseUrl + "api/franchisee/" + franchiseeUid + "/deduction/" + uID, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  saveDeduction(franchiseeUid: string, item: DeductionViewModel): Observable<DeductionViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const s = JSON.stringify(item);
    return this.http.post<DeductionViewModel>(this.baseUrl + "api/franchisee/" + franchiseeUid + "/deduction/", s, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  cloneDeduction(franchiseeUid: string, uID: string): Observable<DeductionViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<DeductionViewModel>(this.baseUrl + "api/franchisee/" + franchiseeUid + "/deduction/clone/" + uID, null, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getDeductions(franchiseeUid: string, pageNum: number, searchText?: string): Observable<ListPageWrapper<DeductionListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const query = (searchText) ? "?searchText=" + encodeURI(searchText) : "";

    return this.http.get<ListPageWrapper<DeductionListItem>>(`${this.baseUrl}api/franchisee/${franchiseeUid}/deduction/page/${pageNum}/${query}`, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  deleteDeduction(franchiseeUid: string, uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show("Deleting Deduction");
    return this.http.delete(this.baseUrl + "api/franchisee/" + franchiseeUid + "/deduction/" + uID, options)
      .pipe(map(res => {
        this.spinnerService.hide();
        return res;
      }),
        catchError(err => {
          this.spinnerService.hide();
          return this.handleError(err);
        }));
  }

  addSubfranchiseeToDeduction(franchiseeId: string, deductionUid: string, subfranchiseeUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.put(`${this.baseUrl}api/franchisee/${franchiseeId}/deduction/${deductionUid}/subfranchisee/${subfranchiseeUid}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)));
  }

  deleteSubfranchiseeFromDeduction(franchiseeId: string, deductionUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.delete(`${this.baseUrl}api/franchisee/${franchiseeId}/deduction/${deductionUid}/subfranchisee`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)));
  }

  getSubfranchiseeDeductions(subfranchiseeId: string, pageNum: number): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<ListPageWrapper<DeductionListItem>>(this.baseUrl + "api/subfranchisee/" + subfranchiseeId + "/SubFranchiseeDeduction/page/" + pageNum, options)
      .pipe(map(res => {
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  getSubfranchiseeDeduction(subfranchiseeId: string, deductionUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<ListPageWrapper<DeductionListItem>>(this.baseUrl + "api/subfranchisee/" + subfranchiseeId + "/SubFranchiseeDeduction/" + deductionUid, options)
      .pipe(map(res => {
          return res;
        }),
        catchError(err => this.handleError(err)));
  }
}
