declare var broadcaster: any;

import { Component, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";
import { Platform } from '@ionic/angular';

import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";

@Component({
  selector: "app-match",
  templateUrl: "./match.page.html",
  styleUrls: ["./match.page.scss"],
})
export class MatchPage implements OnInit {
  private logs = new Array<string>();
  public scanValue: any;
  badge_no: any;
  hex_code: any;
  bBarcode: boolean = true;
  bRfid: boolean = false;

  constructor(
    public alertController: AlertController,
    public menu: MenuController,
    private ngZone: NgZone,
    private assetsService: AssetsService,
    public notificationService: NotificationsService,
    private router: Router,
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('removed back');
    });
  }

  private L(...args: any[]) {
    let v = args.join(" ");
    console.log(v);
    this.ngZone.run(() => {
      this.logs.push(v);
    });
  }

  ngOnInit() {
    broadcaster._debug = true;
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
            this.badge_no = event.data;
           
          }
        });
      }else{

      }
    };

    broadcaster.addEventListener(ev, isGlobal, listener);
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
            this.hex_code = event.data;
          }
        });
      }else{
      }
    };
    broadcaster.addEventListener(ev, isGlobal, listener);
  }

  match() {
    if (this.hex_code && this.badge_no) {
      this.hex_code = this.hex_code.trim();
      this.badge_no = this.badge_no.trim();
      let body = {
        hex_code: this.hex_code,
        badge_no: this.badge_no,
      };
      this.assetsService.patch_asset(body).subscribe(
        (res) => {
          console.log("res", res);
          this.hex_code = "";
          this.badge_no = "";
          this.presentAlert(
            "Success",
            "Your hex code have successfully updated in the database"
          );
        },
        (err) => {
          console.error("err", err);
          this.presentAlert( 
            "Error",
            "The badge number is not found in the database. Please try again"
          );
        }
      );
    } else {
      this.presentAlert(
        "Error",
        "Please scan both 2D barcode and RFID to get badge number and hex code"
      );
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  cancel() {
    this.router.navigate(["/technical/tabs/tab1"]);
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }
}
