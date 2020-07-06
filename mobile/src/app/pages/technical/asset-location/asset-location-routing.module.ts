import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetLocationPage } from './asset-location.page';

const routes: Routes = [
  {
    path: '',
    component: AssetLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetLocationPageRoutingModule {}
