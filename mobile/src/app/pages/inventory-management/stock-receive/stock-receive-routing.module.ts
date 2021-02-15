import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockReceivePage } from './stock-receive.page';

const routes: Routes = [
  {
    path: '',
    component: StockReceivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockReceivePageRoutingModule {}
