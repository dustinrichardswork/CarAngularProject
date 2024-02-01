// Service for processing server-side calls, related to BrokerInvoiceViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from "@angular/core";
import {BaseService} from '@app-shared/common/base.service';
import {ListPageWrapper} from '@app-shared/common/list-page-wrapper.model';
import {BrokerInvoiceListItem} from '@app-shared/models/broker/broker-invoice-list-item.model';
import {BrokerInvoiceViewModel} from '@app-shared/models/broker/broker-invoice-view-model.model';
import {EMPTY, Observable} from "rxjs";
import {catchError} from "rxjs/internal/operators/catchError";
import {map} from "rxjs/internal/operators/map";
import {SpinnerOverlayService} from '../spinner-overlay.service';
import {RentalAgreementListItem} from "@app-shared/models/statement/rental-agreement-list-item.model";


@Injectable()
export class BrokerInvoiceService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  getBrokerInvoice(uID: string, brokerUid?: string,): Observable<BrokerInvoiceViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<BrokerInvoiceViewModel>(`${this.baseUrl}api/Broker/${brokerUid}/BrokerInvoice/${uID}`, options)
      .pipe(map(res => {
          //this.fixTypes(res);
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  getBrokerInvoices(brokerId: string,
                    pageNum: number,
                    searchInvoiceNumber: string = null,
                    searchStatus: number = null,
                    searchDateFrom = null,
                    searchDateTo = null): Observable<ListPageWrapper<BrokerInvoiceListItem>> {
    if (!brokerId) {
      return EMPTY;
    }
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    var baseUrl = `${this.baseUrl}api/Broker/${brokerId}/BrokerInvoice/page/${pageNum}` + "?";

    if (searchInvoiceNumber) baseUrl += "searchInvoiceNumber=" + searchInvoiceNumber + "&"
    if (searchStatus) baseUrl += "searchStatus=" + searchStatus + "&"
    if (searchDateFrom) baseUrl += "searchDateFrom=" + searchDateFrom + "&"
    if (searchDateTo) baseUrl += "searchDateTo=" + searchDateTo

    return this.http.get<ListPageWrapper<BrokerInvoiceListItem>>(baseUrl, options)
      .pipe(map(res => {
          //this.fixListTypes(res);
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  findBrokerInvoices(brokerId: string, name: string): Observable<any> {
    if (!brokerId) {
      return EMPTY;
    }
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<Array<BrokerInvoiceListItem>>(`${this.baseUrl}api/Broker/${brokerId}/BrokerInvoice/numbers?query=${encodeURI(name)}`, options)
      .pipe(map(res => {
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  createInvoice(brokerId: string, fromDate = undefined, tillDate = undefined) {
    if (!brokerId) {
      return EMPTY;
    }

    const headers = this.prepareHeaders();
    const options = { headers: headers };

    let url = `${this.baseUrl}api/Broker/${brokerId}/BrokerInvoice?`
    url += fromDate ? `fromDate=${encodeURI(fromDate)}&` : "";
    url += tillDate ? `tillDate=${encodeURI(tillDate)}` : "";

    return this.http.post(url, options)
      .pipe(catchError(err => this.handleError(err)));
  }

  downloadInvoiceExcel(brokerUID: string, invoiceUID: string) {
    return this.http
      .get(`${this.baseUrl}api/broker/${brokerUID}/brokerinvoice/${invoiceUID}/excel`, {responseType: 'blob'})
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  getBrokerInvoicesRentalAgreements(brokerId: string, invoiceUid: string, pageNum: number): Observable<ListPageWrapper<RentalAgreementListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<ListPageWrapper<RentalAgreementListItem>>(`${this.baseUrl}api/Broker/${brokerId}/BrokerInvoice/${invoiceUid}/RentalAgreement/page/${pageNum}`, options)
      .pipe(map(res => {
          //this.fixListTypes(res);
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  markAsSent(brokerId: string, invoiceUid: string) {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get(`${this.baseUrl}api/Broker/${brokerId}/BrokerInvoice/${invoiceUid}/mark-as-sent`, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  sendInvoice(brokerId: string, invoiceUid: string) {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get(`${this.baseUrl}api/Broker/${brokerId}/BrokerInvoice/${invoiceUid}/send-invoice`, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  recalculateInvoice(brokerId: string, invoiceUid: string) {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get(`${this.baseUrl}api/Broker/${brokerId}/BrokerInvoice/${invoiceUid}/recalculate`, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  uploadInvoice(brokerId: string, invoiceUid: string, file: File) {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    options.headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.patch(`${this.baseUrl}api/Broker/${brokerId}/BrokerInvoice/${invoiceUid}/upload-invoice`, formData, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  //private fixTypes(item: BrokerInvoiceViewModel) {
  //  if (item) {
  //    item.dueDate = DateConverters.extractDate(item.dueDate);

  //  }
  //}

  //private fixListTypes(list: ListPageWrapper<BrokerInvoiceListItem>) {
  //  if (list.items) {
  //    list.items.forEach(item => {
  //      item.dueDate = DateConverters.extractDate(item.dueDate);

  //    });
  //  }
  //}
}
