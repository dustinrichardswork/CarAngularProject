import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from '../../angular-material.module';
import { ServicesModule } from '../../shared/services/services.module';
// import { ReservationListFilterComponent } from './reservation-list-filter/reservation-list-filter.component';
// import { ReservationListComponent } from './reservation-list/reservation-list.component';
// import { ReservationsRoutingModule } from './reservations-routing.module';
import { RatesRoutingModule } from './rates-routing.module';
import { RatesListComponent } from './rates-list/rates-list.component';
import { RatesListFilterComponent } from './rates-list-filter/rates-list-filter.component';
import { RatesDetailComponent } from './rates-detail/rates-detail.component';
import { RatesRentalStationsComponent } from './rates-rental-stations/rates-rental-stations.component';
import { RatesReservationsListComponent } from './rates-reservations-list/rates-reservations-list.component';
import { RatesClientAssociatedComponent } from './rates-client-associated/rates-client-associated.component';
import { RatesDetailExcessComponent } from './rates-detail-excess/rates-detail-excess.component';
import { RatesExtrasComponent } from './rates-extras/rates-extras.component';
import { RatesExcessDetailsComponent } from './rates-excess-details/rates-excess-details.component';
import { RatesSeasonDetailsComponent } from './rates-season-details/rates-season-details.component';
import { RatesRootComponent } from './rates-root/rates-root.component';
import { RatesExtraDetailComponent } from './rates-extra-detail/rates-extra-detail.component';
import { RatesSeasonsListComponent } from './rates-seasons-list/rates-seasons-list.component';
import { RatesValuesListComponent } from './rates-values-list/rates-values-list.component';
import { RatesExtrasListFilterComponent } from './rates-extras-list-filter/rates-extras-list-filter.component';
import { RatesExtrasSearchListComponent } from './rates-extras-search-list/rates-extras-search-list.component';
import { RatesExtrasDefinitionsListComponent } from './rates-extras-definitions-list/rates-extras-definitions-list.component';
import { RatesGroupDetailComponent } from './rates-group-detail/rates-group-detail.component';
import { RatesGeneralComponent } from './rates-general/rates-general.component';
import { RatesGeneralSippCodeListComponent } from './rates-general/rates-general-sipp-code-list/rates-general-sipp-code-list.component';
import { RatesGeneralMileageDayBreaksComponent } from './rates-general/rates-general-mileage-day-breaks/rates-general-mileage-day-breaks.component';
import { RatesGeneralExtrasComponent } from './rates-general/rates-general-extras/rates-general-extras.component';
import { RatesGeneralExcessComponent } from './rates-general/rates-general-excess/rates-general-excess.component';
import { RatesGeneralPromoComponent } from './rates-general/rates-general-promo/rates-general-promo.component';
import { AllotmentsComponent } from './allotments/allotments.component';
import { AllotmentDayItemComponent } from './allotments/allotment-day-item/allotment-day-item.component';
import { RatesIncludedLocationsComponent } from './rates-included-locations/rates-included-locations.component';
import { RatesBrokersComponent } from './rates-brokers/rates-brokers.component';
import { OperationsOnewayComponent } from './operations-oneway/operations-oneway.component';
import { AgGridModule } from 'ag-grid-angular';
import { EditableGridModule } from 'app/shared/components/editable-grid/editable-grid.module';
import { RatesInfoInputComponent } from './rates-info-input/rates-info-input.component';
import { RatesGeneralFilterComponent } from './rates-general-filter/rates-general-filter.component';
// import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  imports: [
    CommonModule,
    RatesRoutingModule,
    NgbDatepickerModule, 
    ServicesModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    EditableGridModule,
    TextMaskModule
  ],
  declarations: [
    RatesListComponent,
    RatesListFilterComponent,
    RatesDetailComponent,
    RatesRentalStationsComponent,
    RatesReservationsListComponent,
    RatesClientAssociatedComponent,
    RatesDetailExcessComponent,
    RatesExtrasComponent,
    RatesExcessDetailsComponent,
    RatesSeasonDetailsComponent,
    RatesRootComponent,
    RatesExtraDetailComponent,
    RatesSeasonsListComponent,
    RatesValuesListComponent,
    RatesExtrasListFilterComponent,
    RatesExtrasSearchListComponent,
    RatesExtrasDefinitionsListComponent,
    RatesGroupDetailComponent,
    RatesGeneralComponent,
    RatesGeneralSippCodeListComponent,
    RatesGeneralMileageDayBreaksComponent,
    RatesGeneralExtrasComponent,
    RatesGeneralExcessComponent,
    RatesGeneralPromoComponent,
    AllotmentsComponent,
    AllotmentDayItemComponent,
    RatesIncludedLocationsComponent,
    RatesBrokersComponent,
    OperationsOnewayComponent,
    RatesInfoInputComponent,
    RatesGeneralFilterComponent,
  ],
  exports: [
    EditableGridModule
  ]
})
export class RatesModule { }
