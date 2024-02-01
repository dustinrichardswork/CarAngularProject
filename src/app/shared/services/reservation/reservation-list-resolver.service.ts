// Resolver service for ReservationListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { urlToApiDateFormat } from '../../functions/utilities';
import { ReservationListItem } from '../../models/reservation/reservation-list-item.model';
import { ListSettingsService } from '../list-settings.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { ReservationService } from './reservation.service';

@Injectable()
export class ReservationListResolverService implements Resolve<ListPageWrapper<ReservationListItem>> {

  constructor(private reservationService: ReservationService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<ReservationListItem> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`/reservations`);

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/reservations`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/reservations/page/${settings.page}`])
      return;
    }
   
    this.spinnerService.show();
    return this.reservationService.getReservations(+page,
      route.queryParams["searchNumber"],
      route.queryParams["franchiseeName"],
      route.queryParams["subFranchiseeName"],
      route.queryParams["locationName"],
      route.queryParams["brokerName"],
      route.queryParams["status"],
      urlToApiDateFormat(route.queryParams["openingDateFrom"]),
      urlToApiDateFormat(route.queryParams["openingDateTo"]),
      urlToApiDateFormat(route.queryParams["closeDateFrom"]),
      urlToApiDateFormat(route.queryParams["closeDateTo"]),
      urlToApiDateFormat(route.queryParams["reservationDateFrom"]),
      urlToApiDateFormat(route.queryParams["reservationDateTo"])).pipe(catchError(error => {
      this.spinnerService.hide();
      return EMPTY;
    }), mergeMap(something => {
      this.spinnerService.hide();
      if (something) {
        return of(something);
      } else {
        return EMPTY;
      }
    })
    );
  }
}
