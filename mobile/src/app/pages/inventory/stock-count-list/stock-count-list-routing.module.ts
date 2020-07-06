import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockCountListPage } from './stock-count-list.page';

const routes: Routes = [
  {
    path: '',
    component: StockCountListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockCountListPageRoutingModule {}
