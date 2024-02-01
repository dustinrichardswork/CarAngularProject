import {Injectable} from '@angular/core';
import {SpinnerOverlayService} from "@app-shared/services/spinner-overlay.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable, of} from "rxjs";
import {catchError, mergeMap} from "rxjs/operators";
import {BrokerTemplateFieldsService} from "@app-shared/services/broker/broker-template-fields.service";
import {FieldMetadataListItem} from "@app-shared/models/codebook/field-metadata-list-item.model";
import {ListPageWrapper} from "@app-shared/common/list-page-wrapper.model";

@Injectable({
  providedIn: 'root'
})
export class BrokerTemplateFieldsResolverService implements Resolve<ListPageWrapper<FieldMetadataListItem>> {

  constructor(
    private brokerTemplateService: BrokerTemplateFieldsService,
    private spinnerService: SpinnerOverlayService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<FieldMetadataListItem> | Observable<any> | Observable<never> {

    this.spinnerService.show();
    return this.brokerTemplateService.getTemplateFields().pipe(catchError(error => {
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
