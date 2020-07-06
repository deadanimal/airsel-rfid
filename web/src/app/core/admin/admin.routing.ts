import { Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AssetComponent } from './asset/asset.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementComponent } from './management/management.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ErrorComponent } from './error/error.component';
import { UtilityUserComponent } from './utility-user/utility-user.component';
import { UtilityAuditTrailComponent } from './utility-audit-trail/utility-audit-trail.component';
import { InventoryInboundComponent } from './inventory-inbound/inventory-inbound.component';
import { InventoryOutbondComponent } from './inventory-outbond/inventory-outbond.component';
import { InventoryStockComponent } from './inventory-stock/inventory-stock.component';
import { InventoryStoreKeeperComponent } from './inventory-store-keeper/inventory-store-keeper.component';
import { InventoryStoreCodesComponent } from './inventory-store-codes/inventory-store-codes.component';
import { UtilityUserPrivilegesComponent } from './utility-user-privileges/utility-user-privileges.component';
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'big-data',
                loadChildren: './big-data/big-data.module#BigDataModule'
            },
            {
                path: 'asset-management',
                loadChildren: './asset-management/asset-management.module#AssetManagementModule'
            },
            {
                path: 'calendar',
                component: CalendarComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'inventory-dashboard',
                component: InventoryDashboardComponent
            },
            {
                path: 'error',
                component: ErrorComponent
            },
            {
                path: 'inventory',
                children: [
                    {
                        path: 'stock-count',
                        component: InventoryStockComponent
                    },
                    {
                        path: 'inbound',
                        component: InventoryInboundComponent
                    },
                    {
                        path: 'outbound',
                        component: InventoryOutbondComponent
                    },
                    {
                        path: 'store-keeper',
                        component: InventoryStoreKeeperComponent
                    },
                    {
                        path: 'store-codes',
                        component: InventoryStoreCodesComponent
                    }
                ]
            },
            {
                path: 'management',
                component: ManagementComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'report',
                component: ReportComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'utility',
                children: [
                    {
                        path: 'audit-trail',
                        component: UtilityAuditTrailComponent
                    },
                    {
                        path: 'user',
                        component: UtilityUserComponent
                    },
                    {
                        path: 'user-privileges',
                        component: UtilityUserPrivilegesComponent
                    }
                ]
            }
        ]
    }
]