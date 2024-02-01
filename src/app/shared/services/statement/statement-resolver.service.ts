// Resolver service for StatementViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from './../spinner-overlay.service';
import { StatementService } from './statement.service';
import {StatementViewModel} from '../../models/statement/statement-view-model.model';


@Injectable()
export class StatementResolverService implements Resolve<StatementViewModel> {

  constructor(private statementService: StatementService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): StatementViewModel | Observable<StatementViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.statementService.getStatement(route.params['uid']).pipe(catchError(() => {
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
      return this.statementService.createStatement();
    }
  }
}
