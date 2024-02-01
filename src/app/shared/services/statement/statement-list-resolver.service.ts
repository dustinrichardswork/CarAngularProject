// Resolver service for StatementListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from './../spinner-overlay.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ListSettingsService } from './../list-settings.service';

import { StatementService } from './../statement/statement.service';
import { StatementListItem } from '../../models/statement/statement-list-item.model';


@Injectable()
export class StatementListResolverService implements Resolve<ListPageWrapper<StatementListItem>> {

  constructor(private statementService: StatementService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<StatementListItem> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`/statements`);
    let franchiseeUid = route.params.franchiseeUid;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/franchisee/${franchiseeUid}/statements`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/franchisee/${franchiseeUid}/statements/page/${settings.page}`]);
      return;
    }

    this.spinnerService.show();
    return this.statementService.getStatements(franchiseeUid, +page).pipe(catchError(error => {
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
