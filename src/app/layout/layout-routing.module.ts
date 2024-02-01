import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'financial', loadChildren: () => import('./financial/financial.module').then(m => m.FinancialModule)
      },
      {
        path: 'rates', loadChildren: () => import('./rates/rates.module').then(m => m.RatesModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
