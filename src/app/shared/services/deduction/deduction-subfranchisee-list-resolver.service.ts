import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {ListPageWrapper} from "@app-shared/common/list-page-wrapper.model";
import {DeductionListItem} from "@app-shared/models/deduction/deduction-list-item.model";
import {DeductionService} from "@app-shared/services/deduction/deduction.service";
import {SpinnerOverlayService} from "@app-shared/services/spinner-overlay.service";
import {ListSettingsService} from "@app-shared/services/list-settings.service";
import {EMPTY, Observable, of} from "rxjs";
import {catchError, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeductionSubfranchiseeListResolverService implements Resolve<ListPageWrapper<DeductionListItem>> {

  constructor(private deductionService: DeductionService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<DeductionListItem> | Observable<any> | Observable<never> {
    let page = "1";
    let subfranchiseeUid = route.params.subFranchiseeUid;
    const settings = this.listSettings.get(`/franchisees/subfranchisee/${subfranchiseeUid}/deductions/page`);

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/franchisees/subfranchisee/${subfranchiseeUid}/deductions`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/franchisees/subfranchisee/${subfranchiseeUid}/deductions/page/${settings.page}`]);
      return;
    }

    this.spinnerService.show();
    return this.deductionService.getSubfranchiseeDeductions(subfranchiseeUid, +page).pipe(catchError(error => {
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
