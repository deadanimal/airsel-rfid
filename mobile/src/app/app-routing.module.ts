import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'technical',
    loadChildren: () => import('./pages/technical/technical.module').then( m => m.TechnicalModule)
  },
  {
    path: 'operator',
    loadChildren: () => import('./pages/operator/operator.module').then(m => m.OperatorModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryModule)
  },
  {
    path: 'store-keeper',
    loadChildren: () => import('./pages/store-keeper/store-keeper.module').then(m => m.StoreKeeperModule)
  },
  {
    path: 'store-supervisor',
    loadChildren: () => import('./pages/store-supervisor/store-supervisor.module').then(m => m.StoreSupervisorModule)
  },
  {
    path: 'maintenance-work-list',
    loadChildren: () => import('./pages/technical/maintenance-work-list/maintenance-work-list.module').then( m => m.MaintenanceWorkListPageModule)
  },
  {
    path: 'maintenance-work-detail',
    loadChildren: () => import('./pages/technical/maintenance-work-detail/maintenance-work-detail.module').then( m => m.MaintenanceWorkDetailPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
