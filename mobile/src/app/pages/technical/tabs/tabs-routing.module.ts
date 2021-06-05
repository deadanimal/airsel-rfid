import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "tab1",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../home/home.module").then((m) => m.HomePageModule),
          },
        ],
      },
      // {
      //   path: "tab2",
      //   children: [
      //     {
      //       path: "",
      //       loadChildren: () =>
      //         import("../asset-detail-list/asset-detail-list.module").then(
      //           (m) => m.AssetDetailListPageModule
      //         ),
      //     },
      //   ],
      // },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../match/match.module").then((m) => m.MatchPageModule),
          },
        ],
      },
      {
        path: "tab4",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../profile/profile.module").then(
                (m) => m.ProfilePageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/tab1",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/tab1",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
