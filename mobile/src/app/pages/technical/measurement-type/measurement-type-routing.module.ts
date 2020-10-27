import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeasurementTypePage } from './measurement-type.page';

const routes: Routes = [
  {
    path: '',
    component: MeasurementTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeasurementTypePageRoutingModule {}
