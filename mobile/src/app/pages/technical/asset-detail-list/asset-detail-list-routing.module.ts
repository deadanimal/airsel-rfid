import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetDetailListPage } from './asset-detail-list.page';

const routes: Routes = [
  {
    path: '',
    component: AssetDetailListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetDetailListPageRoutingModule {}
