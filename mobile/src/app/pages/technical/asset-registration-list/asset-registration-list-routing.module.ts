import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetRegistrationListPage } from './asset-registration-list.page';

const routes: Routes = [
  {
    path: '',
    component: AssetRegistrationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetRegistrationListPageRoutingModule {}
