import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from '../../angular-material.module';
import { ServicesModule } from '../../shared/services/services.module';
// import { ReservationListFilterComponent } from './reservation-list-filter/reservation-list-filter.component';
// import { ReservationListComponent } from './reservation-list/reservation-list.component';
// import { ReservationsRoutingModule } from './reservations-routing.module';
import { FinancialRoutingModule } from './financial-routing.module';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { CurrencyListFilterComponent } from './currency-list-filter/currency-list-filter.component';
import { TaxDetailComponent } from './tax-detail/tax-detail.component';
import { TaxListFilterComponent } from './tax-list-filter/tax-list-filter.component';
import { TaxListComponent } from './tax-list/tax-list.component';
import { CurrencyHistoryListFilterComponent } from './currency-history-list-filter/currency-history-list-filter.component';
import { CurrencyHistoryListComponent } from './currency-history-list/currency-history-list.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountryListFilterComponent } from './country-list-filter/country-list-filter.component';
import { GroupsListFilterComponent } from './groups-list-filter/groups-list-filter.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsDetailComponent } from './groups-detail/groups-detail.component';
import { RentalStationsComponent } from './rental-stations/rental-stations.component';
import { RentalStationsListFilterComponent } from './rental-stations-list-filter/rental-stations-list-filter.component';
import { RentalStationsDetailComponent } from './rental-stations-detail/rental-stations-detail.component';
import { LocationListComponent } from './locations-list/locations-list.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationListSearchComponent } from './location-list-search/location-list-search.component';

@NgModule({
  imports: [
    CommonModule,
    FinancialRoutingModule,
    NgbDatepickerModule, ServicesModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  declarations: [
    // ReservationListComponent, 
    // ReservationListFilterComponent,
    CurrencyListComponent,
    CurrencyDetailComponent,
    CurrencyListFilterComponent,
    TaxDetailComponent,
    TaxListFilterComponent,
    TaxListComponent,
    CurrencyHistoryListFilterComponent,
    CurrencyHistoryListComponent,
    CountryListComponent,
    CountryDetailComponent,
    CountryListFilterComponent,
    GroupsListFilterComponent,
    GroupsListComponent,
    GroupsDetailComponent,
    RentalStationsComponent,
    RentalStationsListFilterComponent,
    RentalStationsDetailComponent,
    LocationListComponent,
    LocationDetailsComponent,
    LocationListSearchComponent,
  ]
})
export class FinancialModule { }
