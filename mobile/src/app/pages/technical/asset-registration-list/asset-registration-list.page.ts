import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { MenuController, ModalController } from "@ionic/angular";

import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { AssetRegistrationsService } from 'src/app/shared/services/asset-registrations/asset-registrations.service';

@Component({
  selector: "app-asset-registration-list",
  templateUrl: "./asset-registration-list.page.html",
  styleUrls: ["./asset-registration-list.page.scss"],
})
export class AssetRegistrationListPage implements OnInit {
  // List
  assetregistrations = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public menu: MenuController,
    public modalController: ModalController,
    private assetService: AssetsService,
    public notificationService: NotificationsService,
    private assetRegistrationsService: AssetRegistrationsService
  ) { }

  getAsset() {
    this.assetRegistrationsService.get().subscribe(
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
    this.getAsset();
  }

  ngOnInit() { }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  async clickNew() {
    this.router.navigate(["/technical/asset-registration"]);
  }

  async clickEdit(assetregistration) {
    let navigationExtras: NavigationExtras = {
      state: {
        assetregistration: assetregistration,
      },
    };

    this.router.navigate(["/technical/asset-registration"], navigationExtras);
  }

  clickRemove(index: number) {
    this.assetregistrations.splice(index, 1);
  }
}
