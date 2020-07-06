import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
// import { WorkOrderPage } from '../work-order/work-order.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    // path: 'work-order',
    // loadChildren: () => import('../work-order/work-order.module').then( m => m.WorkOrderPageModule)
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
