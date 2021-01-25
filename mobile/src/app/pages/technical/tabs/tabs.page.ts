// declare var broadcaster: any;

import { Component, OnInit, NgZone } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ActionSheetController, AlertController } from "@ionic/angular";

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
    private router: Router
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
    this.onRegister2DBarcodeListener();
    this.onRegisterRFIDListener();
  }

  updateData(data) {
    this.ngZone.run(() => {
      this.scanValue = data;
      alert(this.scanValue);
    });
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
            this.updateData(event.data);
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
            this.updateData(event.data);
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
}
