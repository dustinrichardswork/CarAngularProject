// Resolver service for LocationListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';

import { LocationService } from './location.service';
import { LocationListItem } from '../../models/franchisee/location-list-item.model';


@Injectable({providedIn:'root'})
export class LocationListResolverService implements Resolve<ListPageWrapper<LocationListItem>> {

  constructor(private locationService: LocationService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): ListPageWrapper<LocationListItem> | Observable<any> | Observable<never> {
    let page = '1';
    const settings = this.listSettings.get(`/financial/locations`);
    const searchText = (route.queryParams['searchText']) ? route.queryParams['searchText'] : null;
    const searchCountry = (route.queryParams['searchCountry']) ? route.queryParams['searchCountry'] : null;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/financial/locations`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/financial/locations/page/${settings.page}`]);
      return;
    }

    this.spinnerService.show();
    return this.locationService.getLocations(+page, searchText, searchCountry).pipe(
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
      })
    );
  }
}
