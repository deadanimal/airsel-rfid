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
        path: "asset-detail",
        loadChildren: () =>
          import("./asset-detail/asset-detail.module").then(
            (m) => m.AssetDetailPageModule
          ),
      },
      {
        path: "asset-detail-list",
        loadChildren: () =>
          import("./asset-detail-list/asset-detail-list.module").then(
            (m) => m.AssetDetailListPageModule
          ),
      },
      {
        path: "asset-registration",
        loadChildren: () =>
          import("./asset-registration/asset-registration.module").then(
            (m) => m.AssetRegistrationPageModule
          ),
      },
      {
        path: "work-activity",
        loadChildren: () =>
          import("./work-activity/work-activity.module").then(
            (m) => m.WorkActivityPageModule
          ),
      },
      {
        path: "work-activity-asset",
        loadChildren: () =>
          import("./work-activity-asset/work-activity-asset.module").then(
            (m) => m.WorkActivityAssetPageModule
          ),
      },
      {
        path: "service-history",
        loadChildren: () =>
          import("./service-history/service-history.module").then(
            (m) => m.ServiceHistoryPageModule
          ),
      },
      {
        path: "work-request-list",
        loadChildren: () =>
          import("./work-request-list/work-request-list.module").then(
            (m) => m.WorkRequestListPageModule
          ),
      },
      {
        path: "operational-reading",
        loadChildren: () =>
          import("./operational-reading/operational-reading.module").then(
            (m) => m.OperationalReadingPageModule
          ),
      },
      {
        path: "operational-reading-list",
        loadChildren: () =>
          import(
            "./operational-reading-list/operational-reading-list.module"
          ).then((m) => m.OperationalReadingListPageModule),
      },
      {
        path: "measurement-type",
        loadChildren: () =>
          import("./measurement-type/measurement-type.module").then(
            (m) => m.MeasurementTypePageModule
          ),
      },
      {
        path: "asset-registration-list",
        loadChildren: () =>
          import(
            "./asset-registration-list/asset-registration-list.module"
          ).then((m) => m.AssetRegistrationListPageModule),
      },
      {
        path: "qr-scanner",
        component: QrScannerComponent,
      },
    ],
  },
];
