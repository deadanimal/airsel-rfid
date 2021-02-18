import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockDisposalPage } from './stock-disposal.page';

const routes: Routes = [
  {
    path: '',
    component: StockDisposalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockDisposalPageRoutingModule {}
