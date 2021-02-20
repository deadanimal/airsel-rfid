import { Routes } from "@angular/router";
import { QrScannerComponent } from "./qr-scanner/qr-scanner.component";

export const InventoryManagementRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "tabs",
        loadChildren: () =>
          import("./tabs/tabs.module").then((m) => m.TabsPageModule),
      },
      {
        path: "home",
        loadChildren: () => import("./home/home.module").then(m => m.HomePageModule),
      },
      {
        path: "action",
        loadChildren: () => import("./action/action.module").then(m => m.ActionPageModule),
      },
      {
        path: "list-item",
        loadChildren: () => import("./list-item/list-item.module").then(m => m.ListItemPageModule),
      },
      {
        path: "stock-count",
        loadChildren: () => import("./stock-count/stock-count.module").then(m => m.StockCountPageModule),
      },
      {
        path: "stock-receive",
        loadChildren: () => import("./stock-receive/stock-receive.module").then(m => m.StockReceivePageModule),
      },
      {
        path: "stock-issuance",
        loadChildren: () => import("./stock-issuance/stock-issuance.module").then(m => m.StockIssuancePageModule),
      },
      {
        path: "interwarehouse-transfer",
        loadChildren: () => import("./interwarehouse-transfer/interwarehouse-transfer.module").then(m => m.InterwarehouseTransferPageModule),
      },
      {
        path: "stock-disposal",
        loadChildren: () => import("./stock-disposal/stock-disposal.module").then(m => m.StockDisposalPageModule),
      },
      {
        path: "subinventory-transfer",
        loadChildren: () => import("./subinventory-transfer/subinventory-transfer.module").then(m => m.SubinventoryTransferPageModule),
      },
      {
        path: "qr-scanner",
        component: QrScannerComponent,
      },
    ],
  },
];
