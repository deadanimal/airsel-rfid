import { Routes } from "@angular/router";
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

export const InventoryRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "tabs",
        loadChildren: () =>
          import("./tabs/tabs.module").then((m) => m.TabsPageModule),
      },
      {
        path: "stock-receive",
        loadChildren: () => import("./stock-receive/stock-receive.module").then(m => m.StockReceivePageModule),
      },
      {
        path: "to-review",
        loadChildren: () => import("./to-review/to-review.module").then(m => m.ToReviewPageModule)
      },
      {
        path: "stock-issuance",
        loadChildren: () => import("./stock-issuance/stock-issuance.module").then(m => m.StockIssuancePageModule)
      },
      {
        path: "return",
        loadChildren: () => import("./return/return.module").then(m => m.ReturnPageModule)
      },
      {
        path: "dispose",
        loadChildren: () => import("./dispose/dispose.module").then(m => m.DisposePageModule)
      },
      {
        path: "stock-count",
        loadChildren: () => import("./stock-count/stock-count.module").then(m => m.StockCountPageModule)
      },
      {
        path: "stock-count-list",
        loadChildren: () => import("./stock-count-list/stock-count-list.module").then(m => m.StockCountListPageModule)
      },
      {
        path: "qr-scanner",
        component: QrScannerComponent
      }
    ],
  },
];
