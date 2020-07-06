import { Routes } from "@angular/router";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { TableauComponent } from "./tableau/tableau.component";
import { AnalyticsWaComponent } from "./analytics-wa/analytics-wa.component";
import { AnalyticsTarComponent } from "./analytics-tar/analytics-tar.component";
import { AnalyticsAcsComponent } from "./analytics-acs/analytics-acs.component";
import { AnalyticsTamComponent } from "./analytics-tam/analytics-tam.component";

export const BigDataRoutes: Routes = [
  {
    path: "",
    children: [
      // {
      //     path: 'analytics',
      //     component: AnalyticsComponent
      // },
      {
        path: "tableau",
        component: TableauComponent,
      },
      {
        path: "",
        children: [
          {
            path: "work-activity",
            component: AnalyticsWaComponent,
          },
          {
            path: "total-asset-registered",
            component: AnalyticsTarComponent,
          },
          {
            path: "asset-condition-score",
            component: AnalyticsAcsComponent,
          },
          {
            path: "total-asset-maintenance",
            component: AnalyticsTamComponent,
          },
        ],
      },
    ],
  },
];
