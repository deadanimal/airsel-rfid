import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then(m => m.ForgotPageModule)
  },
  {
    path: 'technical',
    loadChildren: () => import('./pages/technical/technical.module').then(m => m.TechnicalModule)
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
    path: 'inventory-management',
    loadChildren: () => import('./pages/inventory-management/inventory-management.module').then(m => m.InventoryManagementModule)
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
    loadChildren: () => import('./pages/technical/maintenance-work-list/maintenance-work-list.module').then(m => m.MaintenanceWorkListPageModule)
  },
  {
    path: 'maintenance-work-detail',
    loadChildren: () => import('./pages/technical/maintenance-work-detail/maintenance-work-detail.module').then(m => m.MaintenanceWorkDetailPageModule)
  },
  {
    path: 'work-activity',
    loadChildren: () => import('./pages/technical/work-activity/work-activity.module').then(m => m.WorkActivityPageModule)
  },
  {
    path: 'service-history',
    loadChildren: () => import('./pages/technical/service-history/service-history.module').then(m => m.ServiceHistoryPageModule)
  },
  {
    path: 'work-request-list',
    loadChildren: () => import('./pages/technical/work-request-list/work-request-list.module').then(m => m.WorkRequestListPageModule)
  },
  {
    path: 'operational-reading-list',
    loadChildren: () => import('./pages/technical/operational-reading-list/operational-reading-list.module').then(m => m.OperationalReadingListPageModule)
  },
  {
    path: 'operational-reading',
    loadChildren: () => import('./pages/technical/operational-reading/operational-reading.module').then(m => m.OperationalReadingPageModule)
  },
  {
    path: 'measurement-type',
    loadChildren: () => import('./pages/technical/measurement-type/measurement-type.module').then(m => m.MeasurementTypePageModule)
  },
  {
    path: 'asset-registration-list',
    loadChildren: () => import('./pages/technical/asset-registration-list/asset-registration-list.module').then(m => m.AssetRegistrationListPageModule)
  },
  {
    path: 'asset-detail',
    loadChildren: () => import('./pages/technical/asset-detail/asset-detail.module').then(m => m.AssetDetailPageModule)
  },
  {
    path: 'work-activity-asset',
    loadChildren: () => import('./pages/technical/work-activity-asset/work-activity-asset.module').then(m => m.WorkActivityAssetPageModule)
  },
  {
    path: 'asset-detail-list',
    loadChildren: () => import('./pages/technical/asset-detail-list/asset-detail-list.module').then(m => m.AssetDetailListPageModule)
  },
  {
    path: 'match',
    loadChildren: () => import('./pages/technical/match/match.module').then(m => m.MatchPageModule)
  },
  {
    path: 'stock-count',
    loadChildren: () => import('./pages/inventory-management/stock-count/stock-count.module').then(m => m.StockCountPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/inventory-management/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'action',
    loadChildren: () => import('./pages/inventory-management/action/action.module').then(m => m.ActionPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/inventory-management/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'stock-receive',
    loadChildren: () => import('./pages/inventory-management/stock-receive/stock-receive.module').then(m => m.StockReceivePageModule)
  },
  {
    path: 'stock-issuance',
    loadChildren: () => import('./pages/inventory-management/stock-issuance/stock-issuance.module').then(m => m.StockIssuancePageModule)
  },
  {
    path: 'interwarehouse-transfer',
    loadChildren: () => import('./pages/inventory-management/interwarehouse-transfer/interwarehouse-transfer.module').then( m => m.InterwarehouseTransferPageModule)
  },
  {
    path: 'stock-disposal',
    loadChildren: () => import('./pages/inventory-management/stock-disposal/stock-disposal.module').then( m => m.StockDisposalPageModule)
  },
  {
    path: 'subinventory-transfer',
    loadChildren: () => import('./pages/inventory-management/subinventory-transfer/subinventory-transfer.module').then( m => m.SubinventoryTransferPageModule)
  },
  {
    path: 'approval-profile',
    loadChildren: () => import('./pages/technical/approval-profile/approval-profile.module').then( m => m.ApprovalProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
