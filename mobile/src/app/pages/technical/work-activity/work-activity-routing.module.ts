import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkActivityPage } from './work-activity.page';

const routes: Routes = [
  {
    path: '',
    component: WorkActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkActivityPageRoutingModule {}
