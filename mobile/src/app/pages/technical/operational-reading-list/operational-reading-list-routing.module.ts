import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperationalReadingListPage } from './operational-reading-list.page';

const routes: Routes = [
  {
    path: '',
    component: OperationalReadingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationalReadingListPageRoutingModule {}
