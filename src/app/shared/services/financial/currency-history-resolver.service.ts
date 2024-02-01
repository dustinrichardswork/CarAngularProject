// Resolver service for FranchiseeViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { CurrencyService } from './currency.service';
import { CurrencyViewModel } from 'app/shared/models/financial/currency-view.model';
import { CurrencyHistoryListItem } from 'app/shared/models/financial/currency-history-list-item.model';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';

@Injectable()
export class CurrencyHistoryResolverService implements Resolve<ListPageWrapper<CurrencyHistoryListItem>> {
  constructor(
    private currencyService: CurrencyService,
    private spinnerService: SpinnerOverlayService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): ListPageWrapper<CurrencyHistoryListItem> | Observable<any> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.currencyService.getCurrencyHistory(route.params['uid']).pipe(
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
    }
  }
}
