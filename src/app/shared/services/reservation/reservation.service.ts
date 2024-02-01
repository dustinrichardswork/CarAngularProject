// Service for processing server-side calls, related to 

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { map } from "rxjs/internal/operators/map";
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ReservationListItem } from '../../models/reservation/reservation-list-item.model';
import { SpinnerOverlayService } from "../spinner-overlay.service";
import { DateConverters } from '../system/date-converters.helper';

@Injectable()
export class ReservationService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  getReservations(pageNum: number,
    searchNumber: string = null,
    franchiseeName: string = null,
    subFranchiseeName: string = null,
    locationName: string = null,
    brokerName: string = null,
    status: string = null,
    openingDateFrom = null,
    openingDateTo = null,
    closeDateFrom = null,
    closeDateTo = null,
    reservationDateFrom = null,
    reservationDateTo = null): Observable<ListPageWrapper<ReservationListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    var baseUrl = this.baseUrl + "api/reservation/page/" + pageNum + "?";

    if (searchNumber) baseUrl += "searchNumber=" + searchNumber + "&";
    if (franchiseeName) baseUrl += "franchiseeName=" + franchiseeName + "&";
    if (subFranchiseeName) baseUrl += "subFranchiseeName=" + subFranchiseeName + "&";
    if (locationName) baseUrl += "locationName=" + locationName + "&";
    if (brokerName) baseUrl += "brokerName=" + brokerName + "&";
    if (openingDateFrom) baseUrl += "openingDateFrom=" + openingDateFrom + "&";
    if (openingDateTo) baseUrl += "openingDateTo=" + openingDateTo + "&";
    if (closeDateFrom) baseUrl += "closeDateFrom=" + closeDateFrom + "&";
    if (closeDateTo) baseUrl += "closeDateTo=" + closeDateTo + "&";
    if (reservationDateFrom) baseUrl += "reservationDateFrom=" + reservationDateFrom + "&";
    if (reservationDateTo) baseUrl += "reservationDateTo=" + reservationDateTo + "&";
    if (status && status !== '-1') {
      let statuses = status.split('_');

      for (var i of statuses) {
        baseUrl += "status=" + i + "&";
      }
    }

    return this.http.get<ListPageWrapper<ReservationListItem>>(baseUrl, options)
      .pipe(map(res => {
        this.fixListTypes(res); return res;
      }),
        catchError(err => this.handleError(err)));
  }

  private fixListTypes(list: ListPageWrapper<ReservationListItem>) {
    if (list.items) {
      list.items.forEach(item => {
        item.reservationDate = DateConverters.extractDate(item.reservationDate);
      });
    }
  }

  downloadReservationsCsv(query: any) {
    console.log(query);

    var baseUrl = this.baseUrl + "api/reservation/export?";

    if (query["searchNumber"]) baseUrl += "searchNumber=" + query["searchNumber"] + "&"
    if (query["franchiseeName"]) baseUrl += "franchiseeName=" + query["franchiseeName"] + "&"
    if (query["subFranchiseeName"]) baseUrl += "subFranchiseeName=" + query["subFranchiseeName"] + "&"
    if (query["locationName"]) baseUrl += "locationName=" + query["locationName"] + "&"
    if (query["brokerName"]) baseUrl += "brokerName=" + query["brokerName"] + "&"
    if (query["status"] || query["status"] == 0) baseUrl += "status=" + query["status"] + "&"
    if (query["openingDateFrom"]) baseUrl += "openingDateFrom=" + query["openingDateFrom"] + "&"
    if (query["openingDateTo"]) baseUrl += "openingDateTo=" + query["openingDateTo"] + "&"
    if (query["closeDateFrom"]) baseUrl += "closeDateFrom=" + query["closeDateFrom"] + "&"
    if (query["closeDateTo"]) baseUrl += "closeDateTo=" + query["closeDateTo"] + "&"
    if (query["reservationDateFrom"]) baseUrl += "reservationDateFrom=" + query["reservationDateFrom"] + "&"
    if (query["reservationDateTo"]) baseUrl += "reservationDateTo=" + query["reservationDateTo"]
    return this.http
      .get(baseUrl, { responseType: 'blob' })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }
}
