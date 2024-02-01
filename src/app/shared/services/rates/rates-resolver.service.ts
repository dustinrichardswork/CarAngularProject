// Resolver service for FranchiseeViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { RatesService } from './rates.service';
import { RatesViewModel } from 'app/shared/models/rates/rates-view.model';
import { ExtrasListModel } from 'app/shared/models/rates/estras-list-model';
import { RateDetailsModel } from 'app/shared/models/rates/rates-item-detail.model';

@Injectable()
export class RatesResolverService implements Resolve<RateDetailsModel> {
  constructor(
    private service: RatesService,
    private spinnerService: SpinnerOverlayService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): RateDetailsModel | Observable<RateDetailsModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.service.getRatesDetail(route.params['uid']).pipe(
        catchError(() => {
          this.spinnerService.hide();
          return EMPTY;
        }),
        mergeMap((something) => {
          if (something) {
            this.spinnerService.hide();
            return of(something);
          } else {
            this.spinnerService.hide();
            return EMPTY;
          }
        }),
      );
    } else {
      // return this.service.createCurrency();
    }
  }
}
