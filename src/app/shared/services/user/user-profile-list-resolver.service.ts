// Resolver service for UserProfileListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {ListPageWrapper} from '../../common/list-page-wrapper.model';
import {UserProfileListItem} from '../../models/user-profile-list-item.model';
import {ListSettingsService} from '../list-settings.service';
import {SpinnerOverlayService} from '../spinner-overlay.service';
import {UserProfileService} from './user-profile.service';

@Injectable()
export class UserProfileListResolverService
  implements Resolve<ListPageWrapper<UserProfileListItem>>
{
  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private spinnerService: SpinnerOverlayService,
    private listSettings: ListSettingsService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): ListPageWrapper<UserProfileListItem> | Observable<any> | Observable<never> {
    let page = '1';
    const settings = this.listSettings.get(`/users`);
    const searchText = (route.queryParams['searchText']) ? route.queryParams['searchText'] : null;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/users`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/users/page/${settings.page}`]);
      return;
    }

    this.spinnerService.show();
    return this.userProfileService.getUserProfiles(+page, searchText).pipe(catchError(error => {
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
