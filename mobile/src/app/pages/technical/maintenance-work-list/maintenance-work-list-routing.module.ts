import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceWorkListPage } from './maintenance-work-list.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceWorkListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceWorkListPageRoutingModule {}
