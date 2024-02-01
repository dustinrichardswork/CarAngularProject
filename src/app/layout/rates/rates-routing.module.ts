import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatesListResolverService } from 'app/shared/services/rates/rates-list-resolver.service';
import { RatesListComponent } from './rates-list/rates-list.component';
import { RatesDetailComponent } from './rates-detail/rates-detail.component';
import { RatesResolverService } from 'app/shared/services/rates/rates-resolver.service';
import { NamedRoutes } from 'app/shared/named-routes/named-route-declarations';
import { RatesDetailExcessComponent } from './rates-detail-excess/rates-detail-excess.component';
import { RatesExtrasComponent } from './rates-extras/rates-extras.component';
import { RatesDetailExcessResolverService } from 'app/shared/services/rates/rates-detail-excess-resolver.service';
import { RatesExcessDetailsComponent } from './rates-excess-details/rates-excess-details.component';
import { RatesSeasonDetailsComponent } from './rates-season-details/rates-season-details.component';
import { RatesExtraResolverService } from 'app/shared/services/rates/rates-extra-resolver.service';
import { RatesRootComponent } from './rates-root/rates-root.component';
import { RatesExtraDetailResolverService } from 'app/shared/services/rates/rates-extra-detail-resolver.service';
import { RatesExtraDetailComponent } from './rates-extra-detail/rates-extra-detail.component';
import { RatesExtrasDefinitionsListComponent } from './rates-extras-definitions-list/rates-extras-definitions-list.component';
import { RatesExtraDefinitionsResolverService } from 'app/shared/services/rates/rates-extra-definitions-resolver.service';
import { RatesGroupDetailComponent } from './rates-group-detail/rates-group-detail.component';
import { RatesGeneralComponent } from './rates-general/rates-general.component';
import { AllotmentsComponent } from './allotments/allotments.component';
import { OperationsOnewayComponent } from './operations-oneway/operations-oneway.component';
import { RatesService } from 'app/shared/services/rates/rates.service';

const routes: NamedRoutes = [
  {
    path: '', component: RatesRootComponent
  },
  {
    path: 'page', component: RatesListComponent, resolve: { rates: RatesListResolverService }
  },
  {
    path: 'page/:pageNum', component: RatesListComponent, resolve: { rates: RatesListResolverService }, runGuardsAndResolvers: 'always'
  },
  // {
  //   path: 'create', component: RatesListComponent, menuCode:'rate-create', resolve: { rates: RatesListResolverService }
  // },
  {
    path: 'create', component: RatesGeneralComponent, menuCode:'rate-create'
  },
  {
    path: 'group/new', component: RatesGroupDetailComponent
  },
  {
    path: 'allotments', component: AllotmentsComponent, menuCode: 'allotments',
  },
  {
    path: 'oneway', component: OperationsOnewayComponent, menuCode: 'oneway', runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  // {
  //   path: ':uid', component: RatesDetailComponent, resolve: { rate: RatesResolverService }, menuCode: 'rates-details'
  // },
  {
    path: ':uid', component: RatesGeneralComponent, menuCode: 'rates-details',
  },
  {
    path: ':uid/excess', component: RatesDetailExcessComponent, resolve: { list: RatesDetailExcessResolverService },
  },
  {
    path: ':uid/excess/details', component: RatesExcessDetailsComponent
  },
  {
    path: ':uid/session/details', component: RatesSeasonDetailsComponent
  },
  {
    path: 'extras/page', component: RatesExtrasComponent, resolve: { list: RatesExtraResolverService }, menuCode: 'extras'
  },
  {
    path: 'extras/:uid', component: RatesExtraDetailComponent, resolve: { detail: RatesExtraDetailResolverService },
  },
  {
    path: 'extras/:uid/definitions', component: RatesExtrasDefinitionsListComponent, resolve: { definitions: RatesExtraDefinitionsResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatesRoutingModule { }
