import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'asset-detail',
    loadChildren: () => import('../asset-detail/asset-detail.module').then( m => m.AssetDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
