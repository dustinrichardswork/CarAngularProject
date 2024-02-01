// Service for processing server-side calls, related to FranchiseeInvoiceViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import {Injectable, Inject} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {map} from "rxjs/internal/operators/map";
import {catchError} from "rxjs/internal/operators/catchError";

import {SpinnerOverlayService} from "../spinner-overlay.service";
import {BaseService} from '../../common/base.service';
import {ListPageWrapper} from '../../common/list-page-wrapper.model';
import {FranchiseeInvoiceViewModel} from '../../models/franchisee/franchisee-invoice-view-model.model';
import {FranchiseeInvoiceListItem} from '../../models/franchisee/franchisee-invoice-list-item.model';
import {RentalAgreementListItem} from "@app-shared/models/statement/rental-agreement-list-item.model";

@Injectable()
export class FranchiseeInvoiceService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  createFranchiseeInvoice(): FranchiseeInvoiceViewModel {
    return new FranchiseeInvoiceViewModel();
  }

  getFranchiseeInvoice(uID: string, franchiseeUid): Observable<FranchiseeInvoiceViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<FranchiseeInvoiceViewModel>(this.baseUrl + "api/Franchisee/" + franchiseeUid + "/FranchiseeInvoice/" + uID, options)
      .pipe(map(res => {
          //this.fixTypes(res);
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  publishFranchiseeInvoiceToEconomic(franchiseeUid: string, uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.post<any>(this.baseUrl + "api/Franchisee/" + franchiseeUid + "/FranchiseeInvoice/" + uID + "/publish", options)
      .pipe(map(res => {
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  getFranchiseeInvoices(franchiseeUid: string,
                        pageNum: number,
                        searchInvoiceNumber: string = null,
                        searchStatus: number = null,
                        searchDateFrom = null,
                        searchDateTo = null): Observable<ListPageWrapper<FranchiseeInvoiceListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    var baseUrl = this.baseUrl + "api/Franchisee/" + franchiseeUid + "/FranchiseeInvoice/page/" + pageNum + "?" ;

    if (searchInvoiceNumber) baseUrl += "searchInvoiceNumber=" + searchInvoiceNumber + "&"
    if (searchStatus) baseUrl += "searchStatus=" + searchStatus + "&"
    if (searchDateFrom) baseUrl += "searchDateFrom=" + searchDateFrom + "&"
    if (searchDateTo) baseUrl += "searchDateTo=" + searchDateTo


    return this.http.get<ListPageWrapper<FranchiseeInvoiceListItem>>(baseUrl, options)
      .pipe(map(res => {
          //this.fixListTypes(res);
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  findFranchiseeInvoices(franchiseeUid: string, name: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<any>(this.baseUrl + "api/Franchisee/" + franchiseeUid + "/FranchiseeInvoice/numbers?query=" + encodeURI(name), options)
      .pipe(map(res => {
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  getFranchiseesInvoicesRentalAgreements(franchiseeUid: string, invoiceUid: string, pageNum: number): Observable<ListPageWrapper<RentalAgreementListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<ListPageWrapper<RentalAgreementListItem>>(`${this.baseUrl}api/Franchisee/${franchiseeUid}/FranchiseeInvoice/${invoiceUid}/RentalAgreement/page/${pageNum}`, options)
      .pipe(map(res => {
          //this.fixListTypes(res);
          return res;
        }),
        catchError(err => this.handleError(err)));
  }


  //private fixTypes(item: FranchiseeInvoiceViewModel) {
  //  if (item) {
  //    item.dueDate = DateConverters.extractDate(item.dueDate);

  //  }
  //}

  //private fixListTypes(list: ListPageWrapper<FranchiseeInvoiceListItem>) {
  //  if (list.items) {
  //    list.items.forEach(item => {
  //      item.dueDate = DateConverters.extractDate(item.dueDate);

  //    });
  //  }
  //}
}
