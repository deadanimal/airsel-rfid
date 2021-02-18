import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterwarehouseTransferPage } from './interwarehouse-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: InterwarehouseTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterwarehouseTransferPageRoutingModule {}
