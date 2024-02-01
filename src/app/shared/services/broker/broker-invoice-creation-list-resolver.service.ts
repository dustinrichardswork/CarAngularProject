import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import { BrokerInvoiceService } from './broker-invoice.service';
import { ListPageWrapper } from '@app-shared/common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { BrokerListItem } from '../../models/broker-list-item.model';
import { BrokerService } from './broker.service';
@Injectable()

export class BrokerInvoiceCreationListResolverService implements Resolve<ListPageWrapper<BrokerListItem>> {
  
  

  constructor(
    private brokerService: BrokerService,
    private router: Router,
    private spinnerService: SpinnerOverlayService,
    private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot): ListPageWrapper<BrokerListItem> | Observable<any> | Observable<never> {
    let page = '1';
    const settings = this.listSettings.get(`/brokers`);
   

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/brokers/creation-list`, { page: page });
    } else if (settings && settings.page) {
      void this.router.navigate([`/brokers/creation-list/page/${settings.page}`]);
      return;
    }

    this.spinnerService.show();
    return this.brokerService.getBrokersCreationList(+page).pipe(
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

