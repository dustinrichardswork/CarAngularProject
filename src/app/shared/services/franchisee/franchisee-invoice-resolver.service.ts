// Resolver service for FranchiseeInvoiceViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { FranchiseeInvoiceService } from './franchisee-invoice.service';
import { FranchiseeInvoiceViewModel } from '../../models/franchisee/franchisee-invoice-view-model.model';

@Injectable()
export class FranchiseeInvoiceResolverService implements Resolve<FranchiseeInvoiceViewModel> {

  constructor(
    private franchiseeInvoiceService: FranchiseeInvoiceService,
    private spinnerService: SpinnerOverlayService
  ) { }

  resolve(route: ActivatedRouteSnapshot): FranchiseeInvoiceViewModel | Observable<FranchiseeInvoiceViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      let franchiseeUid = route.params.franchiseeUid;
      this.spinnerService.show();
      return this.franchiseeInvoiceService.getFranchiseeInvoice(route.params['uid'], franchiseeUid).pipe(catchError(() => {
        this.spinnerService.hide();
        return EMPTY;
      }),
        mergeMap(something => {
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
      return this.franchiseeInvoiceService.createFranchiseeInvoice();
    }
  }
}
