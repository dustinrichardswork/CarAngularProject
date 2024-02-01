// Resolver service for ReservationListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { RatesService } from './rates.service';
import { RatesListItem } from 'app/shared/models/rates/rates-list-item.model';
import { RateListModel } from 'app/shared/models/rates/rates-item-detail.model';

@Injectable()
export class RatesListResolverService implements Resolve<ListPageWrapper<RateListModel>> {

  constructor(private ratesService: RatesService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<RateListModel> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`remember`);

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`remember`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/rates/page/${settings.page}`])
      return;
    }
   
    this.spinnerService.show();
    return this.ratesService.getRates(+page,).pipe(catchError(error => {
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
