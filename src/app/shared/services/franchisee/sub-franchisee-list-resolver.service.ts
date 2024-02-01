// Resolver service for SubFranchiseeListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras,
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';

import { SubFranchiseeService } from './sub-franchisee.service';
import { SubFranchiseeListItem } from '../../models/sub-franchisee-list-item.model';

@Injectable()
export class SubFranchiseeListResolverService
  implements Resolve<ListPageWrapper<SubFranchiseeListItem>>
{
  constructor(
    private subFranchiseeService: SubFranchiseeService,
    private router: Router,
    private spinnerService: SpinnerOverlayService,
    private listSettings: ListSettingsService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): ListPageWrapper<SubFranchiseeListItem> | Observable<any> | Observable<never> {
    let page = '1';
    const settings = this.listSettings.get(`/subfranchisees`);
    const franchiseeUid = route.params.franchiseeUid;
    const searchText = (route.queryParams['searchText']) ? route.queryParams['searchText'] : null;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/franchisee/${franchiseeUid}/subfranchisee`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/franchisee/${franchiseeUid}/subfranchisee/page/${settings.page}`]);
      return;
    }

    this.spinnerService.show();
    return this.subFranchiseeService.getSubFranchisees(franchiseeUid, +page, searchText).pipe(
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
