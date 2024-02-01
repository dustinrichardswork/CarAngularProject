// Service for processing server-side calls, related to

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "./../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { RentalAgreementListItem } from "../../models/statement/rental-agreement-list-item.model";


@Injectable()
export class RentalAgreementService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }


  getRentalAgreements(statementUid: string, pageNum: number): Observable<ListPageWrapper<RentalAgreementListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<ListPageWrapper<RentalAgreementListItem>>(this.baseUrl + "api/Statement/" + statementUid + "/RentalAgreement/page/" + pageNum, options)
      .pipe(map(res => {
        //this.fixListTypes(res);
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  downloadStatementRentalAgreementsCsv(statementUID: string) {
    return this.http
      .get(`${this.baseUrl}api/statement/${statementUID}/rentalagreement/export`, { responseType: 'blob' })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  //private fixListTypes(list: ListPageWrapper<RentalAgreementListItem>) {
  //  if (list.items) {
  //    list.items.forEach(item => {
  //      item.endDate = DateConverters.extractDate(item.endDate);
  //      item.startDate = DateConverters.extractDate(item.startDate);

  //    });
  //  }
  //}
}
