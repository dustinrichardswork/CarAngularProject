// Resolver service for BrokerViewModel
// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { BrokerViewModel } from '@app-shared/models/broker-view-model.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { BrokerService } from './broker.service';

@Injectable()
export class BrokerResolverService implements Resolve<BrokerViewModel> {
  constructor(
    private brokerService: BrokerService,
    private spinnerService: SpinnerOverlayService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): BrokerViewModel | Observable<BrokerViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.brokerService.getBroker(route.params['uid']).pipe(
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
      return this.brokerService.createBroker();
    }
  }
}
