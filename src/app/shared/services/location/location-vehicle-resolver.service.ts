// Resolver service for LocationViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LocationVehiclesViewModel } from 'app/shared/models/location/location-vehicles-view-model.model';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { LocationService } from './location.service';

@Injectable()
export class LocationVehicleResolverService implements Resolve<LocationVehiclesViewModel> {

  constructor(private locationService: LocationService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): LocationVehiclesViewModel | Observable<LocationVehiclesViewModel> | Observable<never> {
    if (route.params['uid']) {
      this.spinnerService.show();
      return this.locationService.getLocationVehicles(route.params['uid']).pipe(catchError(() => {
        this.spinnerService.hide();
        return EMPTY;
      }), mergeMap(something => {
        if (something) {
          this.spinnerService.hide();
          return of(something);
        } else {
          this.spinnerService.hide();
          return EMPTY;
        }
      })
      );
    }
    else {
      return EMPTY;
    }
  }
}
