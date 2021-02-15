import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubinventoryTransferPage } from './subinventory-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: SubinventoryTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubinventoryTransferPageRoutingModule {}
