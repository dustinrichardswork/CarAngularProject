// Resolver service for BrokerInvoiceListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import {BrokerInvoiceService} from './broker-invoice.service';
import { ListPageWrapper } from '@app-shared/common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { BrokerInvoiceListItem } from '@app-shared/models/broker/broker-invoice-list-item.model';

@Injectable()
export class BrokerInvoiceListResolverService implements Resolve<ListPageWrapper<BrokerInvoiceListItem>> {

  constructor(private brokerInvoiceService: BrokerInvoiceService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<BrokerInvoiceListItem> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`/invoices`);
    const brokerUid = route.params.brokerUid;
    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/broker/${brokerUid}/invoice`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/broker/${brokerUid}/invoice/page/${settings.page}`]);
      return;
    }

    this.spinnerService.show();
    return this.brokerInvoiceService.getBrokerInvoices(brokerUid, +page).pipe(catchError(error => {
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
