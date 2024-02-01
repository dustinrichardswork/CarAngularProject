// Resolver service for ReservationListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { GroupService } from './group.service';
import { GroupListItem } from 'app/shared/models/financial/group-list-item.model';

@Injectable()
export class GroupListResolverService implements Resolve<ListPageWrapper<GroupListItem>> {

  constructor(private _groupService: GroupService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<GroupListItem> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`/reservations`);

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/reservations`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/reservations/page/${settings.page}`])
      return;
    }
   
    this.spinnerService.show();
    return this._groupService.getGroups(+page,).pipe(catchError(error => {
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
