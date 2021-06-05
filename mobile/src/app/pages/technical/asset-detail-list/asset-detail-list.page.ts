import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { MenuController } from "@ionic/angular";

import { AssetRegistrationsService } from "src/app/shared/services/asset-registrations/asset-registrations.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { AssetsService } from 'src/app/shared/services/assets/assets.service';

@Component({
  selector: "app-asset-detail-list",
  templateUrl: "./asset-detail-list.page.html",
  styleUrls: ["./asset-detail-list.page.scss"],
})
export class AssetDetailListPage implements OnInit {
  // List
  assetregistrations = [];

  constructor(
    public menu: MenuController,
    public notificationService: NotificationsService,
    private assetregistrationService: AssetRegistrationsService,
    private route: ActivatedRoute,
    private router: Router,
    private assetsService: AssetsService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.getAsset(this.router.getCurrentNavigation().extras.state.badge_no);
      }
    });
  }

  getAsset(badge_no: string) {
    this.assetsService.filter("badge_no=" + badge_no).subscribe(
      (res) => {
        console.log("res", res);
        this.assetregistrations = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter AssetDetailListPage");
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave AssetDetailListPage")
  }

  ngOnInit() {
    console.log("ngOnInit AssetDetailListPage");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy AssetDetailListPage");
  }

  clickEdit(assetregistration) {
    let navigationExtras: NavigationExtras = {
      state: {
        asset_detail: assetregistration,
      },
    };

    this.router.navigate(["/technical/asset-detail"], navigationExtras);
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }
}
