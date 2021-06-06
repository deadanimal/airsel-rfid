declare var broadcaster: any;

import { Component, NgZone, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  MenuController,
  ModalController,
} from "@ionic/angular";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { OperationalReadingsService } from "src/app/shared/services/operational-readings/operational-readings.service";
import { AssetRegistrationsService } from "src/app/shared/services/asset-registrations/asset-registrations.service";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { WamsService } from "src/app/shared/services/wams/wams.service";

import { Subscription } from "rxjs";

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

  private subscription: Subscription;

  constructor(
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private assetregistrationService: AssetRegistrationsService,
    private operationalreadingService: OperationalReadingsService,
    private assetsService: AssetsService,
    private wamsService: WamsService
  ) { }

  private L(...args: any[]) {
    let v = args.join(" ");
    console.log(v);
    this.ngZone.run(() => {
      this.logs.push(v);
    });
  }

  ngOnInit() {
    console.log("ngOnInit OperationalReadingListPage");

    broadcaster._debug = true;
    // this.onRegister2DBarcodeListener();
    // this.onRegisterRFIDListener();
  }

  ngOnDestroy() {
    console.log("ngOnDestroy OperationalReadingListPage");
  }

  presentAlert(header: string, message: string) {
    this.alertController
      .create({
        header,
        message,
        buttons: ["OK"],
      })
      .then((loading) => {
        loading.present();
      });
  }

  onRegister2DBarcodeListener() {
    this.loadingController
      .create({
        message: "Please scan the QR code...",
      })
      .then((loading) => {
        loading.present();

        console.log("[register onRegister2DBarcodeListener] ");
        const ev = "com.scanner.broadcast";
        var isGlobal = true;

        var listener = (event) => {
          console.log(JSON.stringify(event));

          if (event.SCAN_STATE == "success") {
            this.ngZone.run(() => {
              console.log("this.bBarcode = ", this.bBarcode);
              if (this.bBarcode) {
                loading.dismiss();
                broadcaster.removeEventListener(ev, listener);
                this.updateQrbarcode(event.data);
              }
            });
          }
        };

        broadcaster.addEventListener(ev, isGlobal, listener);
      });
  }

  onRegisterRFIDListener() {
    this.loadingController
      .create({
        message: "Please scan the RFID tag...",
      })
      .then((loading) => {
        loading.present();

        console.log("[register onRegisterRFIDListener] ");
        const ev = "android.intent.action.scanner.RFID";
        var isGlobal = true;

        var listener = (event) => {
          console.log(JSON.stringify(event));

          if (event.SCAN_STATE == "success") {
            this.ngZone.run(() => {
              console.log("this.bRfid = ", this.bRfid);
              if (this.bRfid) {
                loading.dismiss();
                broadcaster.removeEventListener(ev, listener);
                this.updateRfid(event.data);
              }
            });
          }
        };

        broadcaster.addEventListener(ev, isGlobal, listener);
      });
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
    console.log("ionViewDidEnter OperationalReadingListPage");

    this.getOperationalReading();
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave OperationalReadingListPage");

    // console.log("broadcaster", broadcaster);
    // if (!this.subscription || this.subscription.closed) return;
    // this.subscription.unsubscribe();
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  async clickNew() {
    this.bRfid = false;
    this.bBarcode = false;

    const actionSheet = await this.actionSheetController.create({
      header: "Choose method",
      buttons: [
        {
          text: "RFID",
          icon: "scan",
          handler: () => {
            this.bRfid = true;
            this.bBarcode = false;
            console.log("OPL RFID clicked");
            this.onRegisterRFIDListener();
          },
        },
        {
          text: "QR Code",
          icon: "qr-code",
          handler: () => {
            this.bRfid = false;
            this.bBarcode = true;
            console.log("OPL QR Code clicked");
            this.onRegister2DBarcodeListener();
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

              /// get data from wams
              this.wamsService.getAssetBadgeNo(data.badge_no).subscribe(
                (resBsdgeNo) => { },
                (errBadgeNo) => { }
              );

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

  updateRfid(data) {
    if (this.bRfid)
      this.ngZone.run(() => {
        this.scanValue = data;

        this.assetsService.filter("hex_code=" + this.scanValue).subscribe(
          (res) => {
            if (res.length > 0) {
              let navigationExtras: NavigationExtras = {
                state: {
                  badge_no: res[0].badge_no,
                },
              };

              /// get data from wams
              this.wamsService.getAssetBadgeNo(res[0].badge_no).subscribe(
                (resBsdgeNo) => { },
                (errBadgeNo) => { },
                () => {
                  this.router.navigate(
                    ["/technical/operational-reading"],
                    navigationExtras
                  );
                }
              );
            } else {
              this.presentAlert("Error", "Data not valid in database");
            }
          },
          (err) => {
            console.log("err assetlsService = ", err);
          }
        );
      });
  }

  updateQrbarcode(data) {
    if (this.bBarcode)
      this.ngZone.run(() => {
        this.scanValue = data;

        if (this.scanValue != "") {
          let navigationExtras: NavigationExtras = {
            state: {
              badge_no: this.scanValue,
            },
          };

          /// get data from wams
          this.wamsService.getAssetBadgeNo(this.scanValue).subscribe(
            (resBsdgeNo) => { },
            (errBadgeNo) => { },
            () => {
              this.router.navigate(
                ["/technical/operational-reading"],
                navigationExtras
              );
            }
          );
        } else {
          this.presentAlert("Error", "Data not valid in database");
        }
      });
  }
}
