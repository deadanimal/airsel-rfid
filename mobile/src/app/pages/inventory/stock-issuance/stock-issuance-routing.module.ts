import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockIssuancePage } from './stock-issuance.page';

const routes: Routes = [
  {
    path: '',
    component: StockIssuancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockIssuancePageRoutingModule {}
