import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperationalReadingPage } from './operational-reading.page';

const routes: Routes = [
  {
    path: '',
    component: OperationalReadingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationalReadingPageRoutingModule {}
