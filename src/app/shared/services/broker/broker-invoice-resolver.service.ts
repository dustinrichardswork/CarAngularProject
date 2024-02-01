// Resolver service for BrokerInvoiceViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import {BrokerInvoiceService} from './broker-invoice.service';
import { BrokerInvoiceViewModel } from '@app-shared/models/broker/broker-invoice-view-model.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';


@Injectable()
export class BrokerInvoiceResolverService implements Resolve<BrokerInvoiceViewModel> {

  constructor(private brokerInvoiceService: BrokerInvoiceService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): BrokerInvoiceViewModel | Observable<BrokerInvoiceViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      let brokerUid = route.params.brokerUid;
      this.spinnerService.show();
      return this.brokerInvoiceService.getBrokerInvoice(route.params['uid'], brokerUid).pipe(catchError(() => {
        this.spinnerService.hide();
        return EMPTY;
      }), mergeMap(something => {
          if (something) {
            this.spinnerService.hide();
            return of(something);
        } else {
            this.spinnerService.hide();
          return EMPTY;
        }
      })
      );
    }
    else {
      return EMPTY;
    }
  }
}
