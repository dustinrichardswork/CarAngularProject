// Resolver service for RentalcarsFranchiseeConfigItemViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { RentalcarsFranchiseeConfigService } from './rentalcars-franchisee-config.service';
import { RentalcarsFranchiseeConfigItemViewModel } from '../../models/special-case-1/rentalcars-franchisee-config-item-view-model.model';

@Injectable()
export class RentalcarsFranchiseeConfigResolverService implements Resolve<RentalcarsFranchiseeConfigItemViewModel> {

  constructor(private rentalcarsFranchiseeConfigService: RentalcarsFranchiseeConfigService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): RentalcarsFranchiseeConfigItemViewModel | Observable<RentalcarsFranchiseeConfigItemViewModel> | Observable<never> {
    this.spinnerService.show();
    return this.rentalcarsFranchiseeConfigService.getRentalcarsFranchiseeConfigItem(route.params['uid']).pipe(catchError(() => {
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
}
