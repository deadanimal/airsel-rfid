import { Routes } from '@angular/router';
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component';
import { StockCountComponent } from './stock-count/stock-count.component';
import { StockReceiveReturnComponent } from './stock-receive-return/stock-receive-return.component';
import { IssuanceReversalComponent } from './issuance-reversal/issuance-reversal.component';
import { InterwarehouseTransferComponent } from './interwarehouse-transfer/interwarehouse-transfer.component';
import { DisposalComponent } from './disposal/disposal.component';

export const InventoryManagementRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'inventory-dashboard',
                component: InventoryDashboardComponent
            },
            {
                path: 'inventory',
                children: [
                    {
                        path: 'stock-count',
                        component: StockCountComponent
                    },
                    {
                        path: 'stock-receive-return',
                        component: StockReceiveReturnComponent
                    },
                    {
                        path: 'issuance-reversal',
                        component: IssuanceReversalComponent
                    },
                    {
                        path: 'interwarehouse-transfer',
                        component: InterwarehouseTransferComponent
                    },
                    {
                        path: 'disposal',
                        component: DisposalComponent
                    }
                ]
            },
        ]
    }
]