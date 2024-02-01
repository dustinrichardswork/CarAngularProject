// Resolver service for BrokerListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ListPageWrapper } from '@app-shared/common/list-page-wrapper.model';
import { BrokerListItem } from '@app-shared/models/broker-list-item.model';
import { ListSettingsService } from '../list-settings.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { BrokerService } from './broker.service';

@Injectable()
export class BrokerListResolverService implements Resolve<ListPageWrapper<BrokerListItem>> {
  constructor(
    private brokerService: BrokerService,
    private router: Router,
    private spinnerService: SpinnerOverlayService,
    private listSettings: ListSettingsService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): ListPageWrapper<BrokerListItem> | Observable<any> | Observable<never> {
    let page = '1';
    const settings = this.listSettings.get(`/brokers`);
    const searchText = (route.queryParams['searchText']) ? route.queryParams['searchText'] : null;
    const hideNoInvoices = (route.queryParams['hideNoInvoices']) ? route.queryParams['hideNoInvoices'] : false;
    const canHaveInvoices = (route.queryParams['canHaveInvoices']) ? route.queryParams['canHaveInvoices'] : true;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/brokers`, { page: page });
    } else if (settings && settings.page) {
      void this.router.navigate([`/brokers/page/${settings.page}`]);
      return;
    }

    this.spinnerService.show();
    return this.brokerService.getBrokers(+page, searchText, hideNoInvoices, canHaveInvoices).pipe(
      catchError(() => {
        this.spinnerService.hide();
        return EMPTY;
      }),
      mergeMap((something) => {
        this.spinnerService.hide();
        if (something) {
          return of(something);
        } else {
          return EMPTY;
        }
      }),
    );
  }
}
