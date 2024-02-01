import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyListResolverService } from 'app/shared/services/financial/currency-list-resolver.service';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { CurrencyResolverService } from 'app/shared/services/financial/currency-resolver.service';
import { TaxListComponent } from './tax-list/tax-list.component';
import { TaxDetailComponent } from './tax-detail/tax-detail.component';
import { TaxListResolverService } from 'app/shared/services/financial/tax-list-resolver.service';
import { TaxResolverService } from 'app/shared/services/financial/tax-resolver.service';
import { CurrencyHistoryResolverService } from 'app/shared/services/financial/currency-history-resolver.service';
import { NamedRoutes } from 'app/shared/named-routes/named-route-declarations';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryListResolverService } from 'app/shared/services/financial/country-list-resolver.service';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountryResolverService } from 'app/shared/services/financial/country-resolver.service';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsDetailComponent } from './groups-detail/groups-detail.component';
import { GroupListResolverService } from 'app/shared/services/financial/group-list-resolver.service';
import { GroupResolverService } from 'app/shared/services/financial/group-resolver.service';
import { RentalStationsComponent } from './rental-stations/rental-stations.component';
import { RentalStationsListResolverService } from 'app/shared/services/financial/rental-stations-list-resolver.service';
import { RentalStationsDetailComponent } from './rental-stations-detail/rental-stations-detail.component';
import { RentalStationsResolverService } from 'app/shared/services/financial/rental-stations-resolver.service';
import { LocationListComponent } from './locations-list/locations-list.component';
import { LocationListResolverService } from '../../shared/services/location/location-list-resolver.service';
// import { LocationResolverService } from 'app/shared/services/location/location-resolver.service';
import { LocationDetailsComponent } from './location-details/location-details.component';

const routes: NamedRoutes = [
  {
    path: '', component: CurrencyListComponent, resolve: { currencies: CurrencyListResolverService }, menuCode: 'currency-list'
  },
  {
    path: 'currency/page/:pageNum', component: CurrencyListComponent, resolve: { currencies: CurrencyListResolverService },
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  {
    path: 'currency/page', component: CurrencyListComponent, resolve: { currencies: CurrencyListResolverService },
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  {
    path: 'currency/new', component: CurrencyDetailComponent, menuCode:'currency-create', resolve: { currency: CurrencyResolverService, history: CurrencyHistoryResolverService },
  },
  {
    path: 'currency/:uid', component: CurrencyDetailComponent, resolve: { currency: CurrencyResolverService, history: CurrencyHistoryResolverService }, menuCode: 'currency-details'
  },
  {
    path: 'locations/page', component: LocationListComponent, menuCode: 'locations-list', resolve: { datas: LocationListResolverService }
  },
  // {
  //   path: 'locations/create', component: LocationListComponent, menuCode: 'location-create', resolve: { datas: LocationListResolverService }
  // },
  {
    path: 'locations/page/:pageNum', component: LocationListComponent, runGuardsAndResolvers: 'always', resolve: { datas: LocationListResolverService }
  },
  {
    path: 'locations/create', component: LocationDetailsComponent, menuCode: 'location-create',
  },
  {
    path: 'locations/:uid', component: LocationDetailsComponent, menuCode: 'location-details',
  },
  // {
  //   path: 'tax/page/:pageNum', component: TaxListComponent, resolve: { taxes: TaxListResolverService },
  //   runGuardsAndResolvers: "paramsOrQueryParamsChange"
  // },
  // {
  //   path: 'tax/page', component: TaxListComponent, resolve: { taxes: TaxListResolverService },
  //   runGuardsAndResolvers: "paramsOrQueryParamsChange"
  // },
  // {
  //   path: 'tax/:uid', component: TaxDetailComponent, resolve: { tax: TaxResolverService }
  // },
  {
    path: 'countries/page', component: CountryListComponent, resolve: { countries: CountryListResolverService },
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  // {
  //   path: 'countries/create', component: CountryListComponent, menuCode: "country-create", resolve: { countries: CountryListResolverService },
  //   runGuardsAndResolvers: "paramsOrQueryParamsChange"
  // },
  {
    path: 'countries/create', component: CountryDetailComponent, resolve: { countries: CountryResolverService }, menuCode: 'country-create',
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  {
    path: 'countries/:uid', component: CountryDetailComponent, resolve: { countries: CountryResolverService }, menuCode: 'country-details',
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  {
    path: 'groups/page', component: GroupsListComponent, resolve: { groups: GroupListResolverService },
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  {
    path: 'groups/create', component: GroupsDetailComponent, menuCode: "group-create", resolve: { detail: GroupResolverService },
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  // {
  //   path: 'groups/create', component: GroupsListComponent, menuCode: "group-create", resolve: { groups: GroupListResolverService },
  //   runGuardsAndResolvers: "paramsOrQueryParamsChange"
  // },
  {
    path: 'groups/:uid', component: GroupsDetailComponent, resolve: { detail: GroupResolverService }, menuCode: 'group-details',
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  // {
  //   path: 'rental_stations/page', component: RentalStationsComponent, resolve: { list: RentalStationsListResolverService },
  //   runGuardsAndResolvers: "paramsOrQueryParamsChange"
  // },
  // {
  //   path: 'rental_stations/create', component: RentalStationsComponent, menuCode:"rental-station-create", resolve: { list: RentalStationsListResolverService },
  //   runGuardsAndResolvers: "paramsOrQueryParamsChange"
  // },
  // {
  //   path: 'rental_stations/new', component: RentalStationsDetailComponent, resolve: { list: RentalStationsResolverService }, menuCode: 'rental-stations-create',
  //   runGuardsAndResolvers: "paramsOrQueryParamsChange"
  // },
  // {
  //   path: 'rental_stations/:uid', component: RentalStationsDetailComponent, resolve: { list: RentalStationsResolverService }, menuCode: 'rental-stations-details',
  //   runGuardsAndResolvers: "paramsOrQueryParamsChange"
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }
