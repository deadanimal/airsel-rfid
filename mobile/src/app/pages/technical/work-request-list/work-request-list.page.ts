import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  MenuController,
  ModalController,
} from "@ionic/angular";

import { WorkRequestPage } from "../work-request/work-request.page";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkRequestsService } from "src/app/shared/services/work-requests/work-requests.service";
import { AssetsService } from "src/app/shared/services/assets/assets.service";

@Component({
  selector: "app-work-request-list",
  templateUrl: "./work-request-list.page.html",
  styleUrls: ["./work-request-list.page.scss"],
})
export class WorkRequestListPage implements OnInit {
  // List
  workrequests = [];

  // data
  private logs = new Array<string>();
  public scanValue: any;
  bBarcode: boolean = false;
  bRfid: boolean = false;
  badge_number = "";

  constructor(
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private workrequestService: WorkRequestsService,
    private assetService: AssetsService
  ) {}

  private L(...args: any[]) {
    let v = args.join(" ");
    console.log(v);
    this.ngZone.run(() => {
      this.logs.push(v);
    });
  }

  ngOnInit() {
    // broadcaster._debug = true;
    // this.onRegister2DBarcodeListener();
    // this.onRegisterRFIDListener();
  }

  getWorkRequest() {
    this.workrequestService.get().subscribe(
      (res) => {
        // console.log("workrequest = ", res);
        this.addGetBadgeNumber(res);
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  addGetBadgeNumber(workReqData) {
    this.workrequests = [];
    workReqData.forEach((element) => {
      if (element.asset_id != "")
        this.assetService.filter("asset_id=" + element.asset_id).subscribe(
          (res) => {
            // console.log("res assetsService = ", res);
            if (res.length > 0) element.badge_no = res[0].badge_no;
          },
          (err) => {
            // console.log("err assetsService = ", err);
          }
        );
      this.workrequests.push(element);
    });
  }

  ionViewDidEnter() {
    this.getWorkRequest();
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  async clickNew() {
    // const modal = await this.modalController.create({
    //   component: WorkRequestPage,
    // });
    // modal.onDidDismiss().then((data) => {
    //   if (data.data) this.workrequests.push(data.data);
    // });
    // return await modal.present();

    // this.router.navigate(["/technical/work-request"]);

    const actionSheet = await this.actionSheetController.create({
      header: "Choose method",
      buttons: [
        {
          text: "RFID",
          icon: "scan",
          handler: () => {
            console.log("RFID clicked");
            this.bBarcode = false;
            this.bRfid = true;
          },
        },
        {
          text: "QR Code",
          icon: "qr-code",
          handler: () => {
            console.log("QR Code clicked");
            this.bBarcode = true;
            this.bRfid = false;
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
      message: "Enter a badge number to search asset",
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
            console.log("data.badge_no = ", data.badge_no);
            if (data.badge_no) {
              let navigationExtras: NavigationExtras = {
                state: {
                  badge_no: data.badge_no,
                },
              };
              this.router.navigate(
                ["/technical/work-request"],
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

  async clickEdit(workrequest) {
    let navigationExtras: NavigationExtras = {
      state: {
        workrequest,
        process: "view",
      },
    };

    this.router.navigate(["/technical/work-request"], navigationExtras);
  }

  // updateData(data) {
  //   this.ngZone.run(() => {
  //     this.scanValue = data;
  //     alert(this.scanValue);

  //     this.assetsService.filter("hex_code=" + this.scanValue).subscribe(
  //       (res) => {
  //         console.log("res assetlsService = ", res)

  //         if (res[0].badge_no) {
  //           let navigationExtras: NavigationExtras = {
  //             state: {
  //               badge_no: res[0].badge_no,
  //             },
  //           };
  //           this.router.navigate(
  //             ["/technical/work-request"],
  //             navigationExtras
  //           );
  //         } else {
  //           this.presentAlert(
  //             "Error",
  //             "Please enter badge number to find asset detail"
  //           );
  //         }
  //       },
  //       (err) => {
  //         console.log("err assetlsService = ", err)
  //       }
  //     )

  //   });
  // }

  // updateData2(data) {
  //   this.ngZone.run(() => {
  //     this.scanValue = data;
  //     alert(this.scanValue);
  //     if (this.scanValue.badge_no) {
  //       let navigationExtras: NavigationExtras = {
  //         state: {
  //           badge_no: this.scanValue.badge_no,
  //         },
  //       };
  //       this.router.navigate(
  //         ["/technical/work-request"],
  //         navigationExtras
  //       );
  //     } else {
  //       this.presentAlert(
  //         "Error",
  //         "Please enter badge number to find asset detail"
  //       );
  //     }

  //   });
  // }

  clickRemove(index: number) {
    this.workrequests.splice(index, 1);
  }

  // onRegister2DBarcodeListener() {
  //   console.log("[register onRegister2DBarcodeListener] ");
  //   const ev = "com.scanner.broadcast";
  //   var isGlobal = true;

  //   var listener = (event) => {
  //     console.log(JSON.stringify(event));

  //     if (event.SCAN_STATE == "success") {
  //       this.ngZone.run(() => {
  //         if (this.bBarcode) {
  //           this.updateData2(event.data);
  //         }
  //       });
  //     }
  //   };
  //   // broadcaster.addEventListener(ev, isGlobal, listener);
  // }

  // onRegisterRFIDListener() {
  //   console.log("[register onRegisterRFIDListener] ");
  //   const ev = "android.intent.action.scanner.RFID";
  //   var isGlobal = true;

  //   var listener = (event) => {
  //     console.log(JSON.stringify(event));

  //     if (event.SCAN_STATE == "success") {
  //       this.ngZone.run(() => {
  //         if (this.bRfid) {
  //           this.updateData(event.data);
  //         }
  //       });
  //     }
  //   };
  //   // broadcaster.addEventListener(ev, isGlobal, listener);
  // }
}
