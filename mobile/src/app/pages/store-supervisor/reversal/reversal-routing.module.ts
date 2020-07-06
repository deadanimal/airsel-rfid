import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReversalPage } from './reversal.page';

const routes: Routes = [
  {
    path: '',
    component: ReversalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReversalPageRoutingModule {}
