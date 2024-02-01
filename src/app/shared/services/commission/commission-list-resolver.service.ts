// Resolver service for CommissionListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';

import {CommissionService} from './commission.service';
import { CommissionListItem } from '../../models/commission/commission-list-item.model';


@Injectable()
export class CommissionListResolverService implements Resolve<ListPageWrapper<CommissionListItem>> {

  constructor(private commissionService: CommissionService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<CommissionListItem> | Observable<any> | Observable<never> {
    let page = "1";
    let franchiseeUid = route.params.franchiseeUid;
    const settings = this.listSettings.get(`/franchisee/${franchiseeUid}/commissions`);

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/franchisee/${franchiseeUid}/commissions`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/franchisee/${franchiseeUid}/commissions/page/${settings.page}`])
      return;
    }

    this.spinnerService.show();
    return this.commissionService.getCommissions(franchiseeUid, + page).pipe(catchError(error => {
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
