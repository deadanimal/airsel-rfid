import { Routes } from "@angular/router";
import { QrScannerComponent } from "./qr-scanner/qr-scanner.component";

export const TechnicalRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "tabs",
        loadChildren: () =>
          import("./tabs/tabs.module").then((m) => m.TabsPageModule),
      },
      {
        path: "work-order",
        loadChildren: () =>
          import("./work-order/work-order.module").then(
            (m) => m.WorkOrderPageModule
          ),
      },
      {
        path: "form-first",
        loadChildren: () =>
          import("./form-first/form-first.module").then(
            (m) => m.FormFirstPageModule
          ),
      },
      {
        path: "work-request",
        loadChildren: () =>
          import("./work-request/work-request.module").then(
            (m) => m.WorkRequestPageModule
          ),
      },
      {
        path: "asset-location",
        loadChildren: () =>
          import("./asset-location/asset-location.module").then(
            (m) => m.AssetLocationPageModule
          ),
      },
      {
        path: "submit",
        loadChildren: () =>
          import("./submit/submit.module").then((m) => m.SubmitPageModule),
      },
      {
        path: "maintenance-work-list",
        loadChildren: () =>
          import("./maintenance-work-list/maintenance-work-list.module").then(
            (m) => m.MaintenanceWorkListPageModule
          ),
      },
      {
        path: "maintenance-work-detail",
        loadChildren: () =>
          import(
            "./maintenance-work-detail/maintenance-work-detail.module"
          ).then((m) => m.MaintenanceWorkDetailPageModule),
      },
      {
        path: "qr-scanner",
        component: QrScannerComponent,
      },
    ],
  },
];
