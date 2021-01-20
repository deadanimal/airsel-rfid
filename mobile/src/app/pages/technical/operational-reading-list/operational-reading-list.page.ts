import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  MenuController,
  ModalController,
} from "@ionic/angular";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { OperationalReadingsService } from "src/app/shared/services/operational-readings/operational-readings.service";

@Component({
  selector: "app-operational-reading-list",
  templateUrl: "./operational-reading-list.page.html",
  styleUrls: ["./operational-reading-list.page.scss"],
})
export class OperationalReadingListPage implements OnInit {
  // List
  operationalreadings = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private operationalreadingService: OperationalReadingsService
  ) {}

  getOperationalReading() {
    this.operationalreadingService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.operationalreadings = res;
        // this.groupByAssetID(res);
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  groupByAssetID(res) {
    let group = res.reduce((r, a) => {
      r[a.asset_id] = [...(r[a.asset_id] || []), a];
      return r;
    }, {});
    this.operationalreadings = group;
  }

  ionViewDidEnter() {
    this.getOperationalReading();
  }

  ngOnInit() {}

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  async clickNew() {
    // this.router.navigate(["/technical/operational-reading"]);

    const actionSheet = await this.actionSheetController.create({
      header: "Choose method",
      buttons: [
        {
          text: "RFID",
          icon: "scan",
          handler: () => {
            console.log("RFID clicked");
          },
        },
        {
          text: "QR Code",
          icon: "qr-code",
          handler: () => {
            console.log("QR Code clicked");
          },
        },
        {
          text: "Badge No.",
          icon: "search",
          handler: () => {
            console.log("Badge No. clicked");
            this.searchBadgeNo();
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          icon: "close",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async searchBadgeNo() {
    const alert = await this.alertController.create({
      header: "Badge No.",
      message: "Enter a badge number to search the asset",
      inputs: [
        {
          name: "badge_no",
          type: "text",
          placeholder: "",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Search",
          handler: (data) => {
            if (data.badge_no) {
              let navigationExtras: NavigationExtras = {
                state: {
                  badge_no: data.badge_no,
                },
              };
              this.router.navigate(
                ["/technical/operational-reading"],
                navigationExtras
              );
            } else {
              this.presentAlert(
                "Error",
                "Please enter badge number to find asset detail"
              );
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async clickEdit(operationalreading) {
    let navigationExtras: NavigationExtras = {
      state: {
        operationalreading,
        process: "view",
      },
    };

    this.router.navigate(["/technical/operational-reading"], navigationExtras);
  }

  clickRemove(index: number) {
    this.operationalreadings.splice(index, 1);
  }
}
