import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterWarehouseTransferPage } from './inter-warehouse-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: InterWarehouseTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterWarehouseTransferPageRoutingModule {}
