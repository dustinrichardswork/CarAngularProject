// Resolver service for FranchiseeViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { RatesService } from './rates.service';
import { RatesExtraListItem } from 'app/shared/models/rates/rates-extra-list-item.model';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';
import { ExtrasListModel } from 'app/shared/models/rates/estras-list-model';

@Injectable()
export class RatesExtraResolverService implements Resolve<ListPageWrapper<ExtrasListModel>> {
  constructor(
    private service: RatesService,
    private spinnerService: SpinnerOverlayService,
    private listSettings: ListSettingsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<ExtrasListModel> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`/rates`);
    let uid = route.params['uid'];
    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/rates`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/rates/page/${settings.page}`])
      return;
    }
   
    this.spinnerService.show();
    return this.service.getExtras(+page).pipe(catchError(error => {
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
