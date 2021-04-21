// declare var broadcaster: any;

import { Component, NgZone, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  MenuController,
  ModalController,
} from "@ionic/angular";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { OperationalReadingsService } from "src/app/shared/services/operational-readings/operational-readings.service";
import { AssetRegistrationsService } from "src/app/shared/services/asset-registrations/asset-registrations.service";
import { AssetsService } from 'src/app/shared/services/assets/assets.service';

@Component({
  selector: "app-operational-reading-list",
  templateUrl: "./operational-reading-list.page.html",
  styleUrls: ["./operational-reading-list.page.scss"],
})
export class OperationalReadingListPage implements OnInit {
  // List
  operationalreadings = [];

  // data 
  private logs = new Array<string>();
  public scanValue: any;
  badge_no: any;
  hex_code: any;
  bBarcode: boolean = false;
  bRfid: boolean = false;

  constructor(
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private assetregistrationService: AssetRegistrationsService,
    private operationalreadingService: OperationalReadingsService,
    private assetsService: AssetsService
  ) { }

  private L(...args: any[]) {
    let v = args.join(" ");
    console.log(v);
    this.ngZone.run(() => {
      this.logs.push(v);
    });
  }

  ngOnInit() {
    // broadcaster._debug = true;
    this.onRegister2DBarcodeListener();
    this.onRegisterRFIDListener();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  onRegister2DBarcodeListener() {
    console.log("[register onRegister2DBarcodeListener] ");
    const ev = "com.scanner.broadcast";
    var isGlobal = true;

    var listener = (event) => {
      console.log(JSON.stringify(event));

      if (event.SCAN_STATE == "success") {
        this.ngZone.run(() => {
          console.log("this.bBarcode = ", this.bBarcode)
          if (this.bBarcode) {
            this.updateData2(event.data);
          }
        });
      }
    };
    // broadcaster.addEventListener(ev, isGlobal, listener);
  }

  onRegisterRFIDListener() {
    console.log("[register onRegisterRFIDListener] ");
    const ev = "android.intent.action.scanner.RFID";
    var isGlobal = true;
    console.log("this.bRfid 1 = ", this.bRfid)

    var listener = (event) => {
      console.log("sini 1")
      console.log(JSON.stringify(event));

      if (event.SCAN_STATE == "success") {
        console.log("sini 2")
        this.ngZone.run(() => {
          console.log("this.bRfid = ", this.bRfid)
          if (this.bRfid) {
            console.log("sini 3")
            this.updateData(event.data);
          }
        });
      }
    };
    // broadcaster.addEventListener(ev, isGlobal, listener);
  }

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
            this.bRfid = true
            this.bBarcode = false
            console.log("OPL RFID clicked");
            this.onRegisterRFIDListener()
          },
        },
        {
          text: "QR Code",
          icon: "qr-code",
          handler: () => {
            this.bRfid = true
            this.bBarcode = false
            console.log("OPL QR Code clicked");
            this.onRegister2DBarcodeListener()
          },
        },
        {
          text: "Badge No.",
          icon: "search",
          handler: () => {
            console.log("OPL Badge No. clicked");
            this.searchBadgeNo();
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          icon: "close",
          handler: () => {
            console.log("OPL Cancel clicked");
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

  updateData(data) {
    console.log("sini 4")
    this.ngZone.run(() => {
      this.scanValue = data;
      console.log("sini 5 scanned data = ", this.scanValue);

      this.assetsService.filter("hex_code=" + this.scanValue).subscribe(
        (res) => {
          console.log("res assetlsService = ", res)

          if (res[0].badge_no == '') {
            let navigationExtras: NavigationExtras = {
              state: {
                badge_no: res[0].badge_no,
              },
            };
            console.log("navigationExtras = ", navigationExtras)
            this.router.navigate(
              ["/technical/work-request"],
              navigationExtras
            );
          } else {
            this.presentAlert(
              "Error",
              "Data not valid in database"
            );
          }

        },
        (err) => {
          console.log("err assetlsService = ", err)
        }
      )

    });
  }

  updateData2(data) {
    console.log("updateData2")
    this.ngZone.run(() => {
      this.scanValue = "SLUV-0009495" // data;
      console.log("updateData2 = ", this.scanValue);

      if (this.scanValue.badge_no == '') {
        let navigationExtras: NavigationExtras = {
          state: {
            badge_no: this.scanValue.badge_no,
          },
        };
        this.router.navigate(
          ["/technical/work-request"],
          navigationExtras
        );
      } else {
        this.presentAlert(
          "Error",
          "Data not valid in database"
        );
      }

    });
  }
}
