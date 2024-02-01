// Service for processing server-side calls, related to 

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { map } from "rxjs/internal/operators/map";
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ReservationListItem } from '../../models/reservation/reservation-list-item.model';
import { SpinnerOverlayService } from "../spinner-overlay.service";
import { DateConverters } from '../system/date-converters.helper';
import { TaxViewModel } from 'app/shared/models/financial/tax-view.model';
import * as taxData from '../../../../assets/json/tax.json';

@Injectable()
export class TaxService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  createTax(): TaxViewModel {
    return new TaxViewModel();
  }

  getTaxes(pageNum: number) {
    var baseUrl = this.baseUrl + "api/reservation/page/" + pageNum + "?";

    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get('/assets/json/currency.json');

    return this.http.get<ListPageWrapper<ReservationListItem>>(baseUrl, options)
      .pipe(map(res => {
         return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getTax(uid): any {
    return of(taxData['items'][0]);
  }

  saveCurrency(item: TaxViewModel) {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    const s = JSON.stringify(item);
    return of(item);
    return this.http.post<TaxViewModel>(this.baseUrl + 'api/franchisee/', s, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }
}
