import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToReviewPage } from './to-review.page';

const routes: Routes = [
  {
    path: '',
    component: ToReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToReviewPageRoutingModule {}
