import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkActivityAssetPage } from './work-activity-asset.page';

const routes: Routes = [
  {
    path: '',
    component: WorkActivityAssetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkActivityAssetPageRoutingModule {}
