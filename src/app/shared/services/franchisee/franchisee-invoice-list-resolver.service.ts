// Resolver service for FranchiseeInvoiceListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';

import { FranchiseeInvoiceService } from './franchisee-invoice.service';
import { FranchiseeInvoiceListItem } from '../../models/franchisee/franchisee-invoice-list-item.model';

@Injectable()
export class FranchiseeInvoiceListResolverService implements Resolve<ListPageWrapper<FranchiseeInvoiceListItem>> {

  constructor(private franchiseeInvoiceService: FranchiseeInvoiceService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<FranchiseeInvoiceListItem> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`/invoices`);
    let franchiseeUid = route.params.franchiseeUid;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/franchisee/${franchiseeUid}/invoices`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/franchisee/${franchiseeUid}/invoices/page/${settings.page}`])
      return;
    }

    this.spinnerService.show();
    return this.franchiseeInvoiceService.getFranchiseeInvoices(franchiseeUid, +page).pipe(catchError(error => {
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
