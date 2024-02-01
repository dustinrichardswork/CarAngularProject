// Resolver service for FranchiseeListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { ListPageWrapper } from '@app-shared/common/list-page-wrapper.model';
import { FranchiseeListItem } from '@app-shared/models/franchisee-list-item.model';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { ListSettingsService } from '../list-settings.service';
import { FranchiseeService } from './franchisee.service';

@Injectable()
export class FranchiseeListResolverService implements Resolve<ListPageWrapper<FranchiseeListItem>> {
  constructor(
    private franchiseeService: FranchiseeService,
    private router: Router,
    private spinnerService: SpinnerOverlayService,
    private listSettings: ListSettingsService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): ListPageWrapper<FranchiseeListItem> | Observable<any> | Observable<never> {
    let page = '1';
    const settings = this.listSettings.get(`/franchisees`);
    const searchText = (route.queryParams['searchText']) ? route.queryParams['searchText'] : null;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/franchisees`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/franchisees/page/${settings.page}`]);
      return;
    }

    this.spinnerService.show();
    return this.franchiseeService.getFranchisees(+page, searchText).pipe(
      catchError((error) => {
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
