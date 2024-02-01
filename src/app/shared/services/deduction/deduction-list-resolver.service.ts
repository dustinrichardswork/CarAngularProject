// Resolver service for DeductionListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { DeductionListItem } from '../../models/deduction/deduction-list-item.model';
import { ListSettingsService } from '../list-settings.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { DeductionService } from './deduction.service';

@Injectable()
export class DeductionListResolverService implements Resolve<ListPageWrapper<DeductionListItem>> {

  constructor(private deductionService: DeductionService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<DeductionListItem> | Observable<any> | Observable<never> {
    let page = "1";
    let franchiseeUid = route.params.franchiseeUid;
    const settings = this.listSettings.get(`/franchisee/${franchiseeUid}/deductions`);
    const searchText = (route.queryParams['searchText']) ? route.queryParams['searchText'] : null;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/franchisee/${franchiseeUid}/deductions`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/franchisee/${franchiseeUid}/deductions/page/${settings.page}`]);
      return;
    }

    this.spinnerService.show();
    return this.deductionService.getDeductions(franchiseeUid, +page, searchText).pipe(catchError(error => {
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
