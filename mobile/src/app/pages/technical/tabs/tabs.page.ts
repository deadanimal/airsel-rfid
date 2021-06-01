// declare var broadcaster: any;

import { Component, OnInit, NgZone } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ActionSheetController, AlertController } from "@ionic/angular";
import { AssetsService } from 'src/app/shared/services/assets/assets.service';

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.page.html",
  styleUrls: ["./tabs.page.scss"],
})
export class TabsPage implements OnInit {
  private logs = new Array<string>();
  public scanValue: any;
  bBarcode: boolean = false;
  bRfid: boolean = false;

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private ngZone: NgZone,
    private router: Router,
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

  onRegister2DBarcodeListener() {
    console.log("[register onRegister2DBarcodeListener] ");
    const ev = "com.scanner.broadcast";
    var isGlobal = true;

    var listener = (event) => {
      console.log(JSON.stringify(event));

      if (event.SCAN_STATE == "success") {
        this.ngZone.run(() => {
          if (this.bBarcode) {
            this.updateQrbarcode(event.data);
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

    var listener = (event) => {
      console.log(JSON.stringify(event));

      if (event.SCAN_STATE == "success") {
        this.ngZone.run(() => {
          if (this.bRfid) {
            this.updateRfid(event.data);
          }
        });
      }
    };
    // broadcaster.addEventListener(ev, isGlobal, listener);
  }

  async scan() {
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
              this.router.navigate(["/technical/tabs/tab2"], navigationExtras);
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

  // updateRfid(data) {
  //   this.ngZone.run(() => {
  //     this.scanValue = data;
  //     alert(this.scanValue);
  //   });
  // }

  // rfid scan
  updateRfid(data) {
    console.log("sini 4")
    this.ngZone.run(() => {
      this.scanValue = data;
      // alert(this.scanValue);
      console.log("sini 5 scanned data = ", this.scanValue);

      this.assetsService.filter("hex_code=" + this.scanValue).subscribe(
        (res) => {
          console.log("res assetlsService = ", res)

          if (res[0].badge_no != '') {
            let navigationExtras: NavigationExtras = {
              state: {
                badge_no: res[0].badge_no,
              },
            };
            console.log("navigationExtras = ", navigationExtras)
            this.router.navigate(["/technical/tabs/tab2"], navigationExtras);
            // this.router.navigate(
            //   ["/technical/work-request"],
            //   navigationExtras
            // );
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

  // qr code
  updateQrbarcode(data) {
    console.log("updateQrbarcode")
    this.ngZone.run(() => {
      this.scanValue = data // "SLUV-0009495";
      // alert(this.scanValue);
      console.log("updateQrbarcode = ", this.scanValue);

      if (this.scanValue != '') {
        let navigationExtras: NavigationExtras = {
          state: {
            badge_no: this.scanValue,
          },
        };
        this.router.navigate(["/technical/tabs/tab2"], navigationExtras);
        // this.router.navigate(
        //   ["/technical/work-request"],
        //   navigationExtras
        // );
      } else {
        this.presentAlert(
          "Error",
          "Data not valid in database"
        );
      }

    });
  }
}
