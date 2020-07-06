import { Routes } from "@angular/router";
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

export const OperatorRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "tabs",
        loadChildren: () =>
          import("./tabs/tabs.module").then((m) => m.TabsPageModule),
      },
      {
        path: "asset-location",
        loadChildren: () =>
          import("./asset-location/asset-location.module").then((m) => m.AssetLocationPageModule),
      },
      {
        path: "work-request",
        loadChildren: () =>
          import("./work-request/work-request.module").then((m) => m.WorkRequestPageModule),
      },
      {
        path: "submit",
        loadChildren: () =>
          import("./submit/submit.module").then((m) => m.SubmitPageModule),
      },
      {
        path: "qr-scanner",
        component: QrScannerComponent
      }
    ],
  },
];
