import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SpinnerOverlayService} from "@app-shared/services/spinner-overlay.service";
import {BaseService} from "@app-shared/common/base.service";
import {map} from "rxjs/internal/operators/map";
import {catchError} from "rxjs/internal/operators/catchError";
import {PaymentOverviewViewModel} from "@app-shared/models/payment-overview/payment-overview-view-model.model";
import {Observable} from "rxjs";
import {CustomPaymentViewModel} from "@app-shared/models/payment-overview/custom-payment-view-model.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentOverviewService extends BaseService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private spinnerService: SpinnerOverlayService
  ) {
    super();
    this.baseUrl = baseUrl;
  }

  getPaymentOverviewYears() {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    this.spinnerService.show();
    return this.http.get(`${this.baseUrl}api/PaymentOverview/years`, options).pipe(
      map(res => {
        this.spinnerService.hide();
        return res;
      }),
      catchError(err => this.handleError(err)));
  }

  getPaymentOverviewBySpecificYear(year): Observable<PaymentOverviewViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    this.spinnerService.show();
    return this.http.get<PaymentOverviewViewModel>(`${this.baseUrl}api/PaymentOverview/${year}`, options).pipe(
      map(res => {
        this.spinnerService.hide();
        return res;
      }),
      catchError(err => this.handleError(err)));
  }

  getPaymentOverviewMonthList(year): Observable<number[]> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    this.spinnerService.show();
    return this.http.get<number[]>(`${this.baseUrl}api/PaymentOverview/${year}/month-list`, options).pipe(
      map(res => {
        this.spinnerService.hide();
        return res;
      }),
      catchError(err => this.handleError(err)));
  }

  addNewPaymentOverview(franchiseeUid: string, item: CustomPaymentViewModel): Observable<CustomPaymentViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    this.spinnerService.show();
    return this.http.post<CustomPaymentViewModel>(`${this.baseUrl}api/PaymentOverview/franchisee/${franchiseeUid}`, item, options).pipe(
      map(res => {
        this.spinnerService.hide();
        return res;
      }),
      catchError(err => this.handleError(err)));
  }

  markAsPaid(franchiseeUID: string, year: number, month: number): Observable<PaymentOverviewViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    this.spinnerService.show();
    return this.http.post<PaymentOverviewViewModel>(`${this.baseUrl}api/PaymentOverview/franchisee/${franchiseeUID}/${year}/${month}`, null, options).pipe(
      map(res => {
        this.spinnerService.hide();
        return res;
      }),
      catchError(err => this.handleError(err)));
  }

  getPaymentsOverviewByFranchisees(year): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    this.spinnerService.show();
    return this.http.get<any>(`${this.baseUrl}api/PaymentOverview/${year}/group-by-franchisee/`, options).pipe(
      map(res => {
        this.spinnerService.hide();
        return res;
      }),
      catchError(err => this.handleError(err))
    )
  }

  protected handleError(error: any) {
    this.spinnerService.hide();
    return super.handleError(error);
  }

}
