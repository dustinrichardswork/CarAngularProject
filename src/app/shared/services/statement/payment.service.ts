// Service for processing server-side calls, related to

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "./../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { PaymentListItem } from "../../models/statement/payment-list-item.model";
import { TransferListItem } from "../../models/statement/transfer-list-item.model";
import { PaymentHistoryListItem } from "../../models/statement/payment-history-list-item.model";


@Injectable()
export class PaymentService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  getPayments(statementUid: string, pageNum: number): Observable<ListPageWrapper<PaymentListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<ListPageWrapper<PaymentListItem>>(this.baseUrl + "api/statement/" + statementUid + "/payment/page/" + pageNum, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getPaymentHistory(statementUid: string, pageNum: number): Observable<ListPageWrapper<PaymentHistoryListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<ListPageWrapper<PaymentHistoryListItem>>(this.baseUrl + "api/statement/" + statementUid + "/payment/history/page/" + pageNum, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getTransfers(statementUid: string, pageNum: number): Observable<ListPageWrapper<TransferListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<ListPageWrapper<TransferListItem>>(this.baseUrl + "api/statement/" + statementUid + "/transfer/page/" + pageNum, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  deletePayment(statementUid: string, uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show("Deleting Payment");
    return this.http.delete(this.baseUrl + "api/statement/" + statementUid + "/payment/" + uID, options)
      .pipe(map(res => {
        this.spinnerService.hide();
        return res;
      }),
        catchError(err => {
          this.spinnerService.hide();
          return this.handleError(err);
        }));
  }

  addFranchiseeVendorInvoice(statementUid: string, paymentUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show("Adding Invoice");
    return this.http.put(this.baseUrl + "api/statement/" + statementUid + "/payment/create-invoice/" + paymentUid, options)
      .pipe(map(res => {
        this.spinnerService.hide();
        return res;
      }),
        catchError(err => {
          this.spinnerService.hide();
          return this.handleError(err);
        }));
  }

  retryFranchiseeVendorInvoice(statementUid: string, paymentUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show("Retrying Invoice");
    return this.http.put(this.baseUrl + "api/statement/" + statementUid + "/payment/retry-invoice/" + paymentUid, options)
      .pipe(map(res => {
        this.spinnerService.hide();
        return res;
      }),
        catchError(err => {
          this.spinnerService.hide();
          return this.handleError(err);
        }));
  }
}
