import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalProfilePage } from './approval-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovalProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalProfilePageRoutingModule {}
