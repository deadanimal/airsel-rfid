import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetRegistrationPage } from './asset-registration.page';

const routes: Routes = [
  {
    path: '',
    component: AssetRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetRegistrationPageRoutingModule {}
