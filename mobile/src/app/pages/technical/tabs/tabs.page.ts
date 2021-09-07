declare var broadcaster: any;

import { Component, OnInit, NgZone, ElementRef } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { WamsService } from "src/app/shared/services/wams/wams.service";

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
    public loadingController: LoadingController,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private router: Router,
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
    console.log("ngOnInit TabsPage");

    broadcaster._debug = true;
    // this.onRegister2DBarcodeListener();
    // this.onRegisterRFIDListener();
  }

  ngOnDestroy() {
    console.log("ngOnDestroy TabsPage");

    // this.elementRef.nativeElement.remove();
  }

  onRegister2DBarcodeListener() {
    this.loadingController
      .create({
        message: "Please scan the QR code...",
        backdropDismiss:true
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
        backdropDismiss:true
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

  async scan() {
    this.bRfid = false;
    this.bBarcode = false;

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
            this.onRegisterRFIDListener();
          },
        },
        {
          text: "QR Code",
          icon: "qr-code",
          handler: () => {
            console.log("QR Code clicked");
            this.bBarcode = true;
            this.bRfid = false;
            this.onRegister2DBarcodeListener();
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
              this.loadingController
                .create({
                  message: "Please wait...",
                })
                .then((loading) => {
                  loading.present();

                  this.assetsService
                    .filter("badge_no=" + data.badge_no)
                    .subscribe(
                      (res) => {
                        // if find, go to asset detail list
                        if (res.length > 0) {
                          loading.dismiss();
                          let navigationExtras: NavigationExtras = {
                            state: {
                              badge_no: res[0].badge_no,
                            },
                          };

                          this.router.navigate(
                            ["/technical/asset-detail-list"],
                            navigationExtras
                          );
                        }
                        // else, find the asset in the wams to pump into PIPE's asset table
                        else {
                          // get data from wams
                          this.wamsService
                            .getAssetBadgeNo(data.badge_no)
                            .subscribe(
                              (res) => {
                                loading.dismiss();

                                if (res.results.length > 0) {
                                  let navigationExtras: NavigationExtras = {
                                    state: {
                                      badge_no: data.badge_no,
                                    },
                                  };

                                  this.router.navigate(
                                    ["/technical/asset-detail-list"],
                                    navigationExtras
                                  );
                                } else {
                                  this.presentAlert(
                                    "Error",
                                    "Sorry, asset is not found in the database."
                                  );
                                }
                              },
                              (err) => {
                                console.error("err", err);
                                loading.dismiss();

                                this.presentAlert(
                                  "Error",
                                  "Sorry, there is a technical problem going on."
                                );
                              }
                            );
                        }
                      },
                      (err) => {
                        console.log("err assetlsService = ", err);
                        loading.dismiss();

                        this.presentAlert(
                          "Error",
                          "Sorry, there is a technical problem going on."
                        );
                      }
                    );
                });
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

  presentAlert(header: string, message: string) {
    this.alertController
      .create({
        header,
        message,
        buttons: ["OK"],
      })
      .then((alert) => {
        alert.present();
      });
  }

  // rfid scan
  updateRfid(data) {
    if (this.bRfid)
      this.ngZone.run(() => {
        this.scanValue = data;

        if (this.scanValue != "") {
          this.loadingController
            .create({
              message: "Please wait...",
            })
            .then((loading) => {
              loading.present(); 

              this.assetsService.filter("hex_code=" + this.scanValue).subscribe(
                (res) => {
                  loading.dismiss();
                  // if find, go to asset detail list
                  if (res.length > 0) {
                    let navigationExtras: NavigationExtras = {
                      state: {
                        badge_no: res[0].badge_no,
                      },
                    };

                    this.router.navigate(
                      ["/technical/asset-detail-list"],
                      navigationExtras
                    );
                  }
                  // else, suggest the user to use QR scanner OR search by badge number
                  else {
                    this.presentAlert(
                      "Error",
                      "The asset is not found in the database. Please try again by using QR scanner OR search by badge number."
                    );
                  }
                },
                (err) => {
                  console.log("err assetlsService = ", err);
                  loading.dismiss();

                  this.presentAlert(
                    "Error",
                    "Sorry, there is a technical problem going on."
                  );
                }
              );
            });
        } else {
          this.presentAlert("Error", "RFID is invalid. Please try again.");
        }
      });
  }

  // qr code
  updateQrbarcode(data) {
    if (this.bBarcode)
      this.ngZone.run(() => {
        this.scanValue = data;

        if (this.scanValue != "") {
          this.loadingController
            .create({
              message: "Please wait...",
            })
            .then((loading) => {
              loading.present();

              this.assetsService.filter("badge_no=" + this.scanValue).subscribe(
                (res) => {
                  // if find, go to asset detail list
                  if (res.length > 0) {
                    loading.dismiss();
                    let navigationExtras: NavigationExtras = {
                      state: {
                        badge_no: res[0].badge_no,
                      },
                    };

                    this.router.navigate(
                      ["/technical/asset-detail-list"],
                      navigationExtras
                    );
                  }
                  // else, find the asset in the wams to pump into PIPE's asset table
                  else {
                    // get data from wams
                    this.wamsService.getAssetBadgeNo(this.scanValue).subscribe(
                      (res) => {
                        loading.dismiss();

                        if (res.results.length > 0) {
                          let navigationExtras: NavigationExtras = {
                            state: {
                              badge_no: this.scanValue,
                            },
                          };

                          this.router.navigate(
                            ["/technical/asset-detail-list"],
                            navigationExtras
                          );
                        } else {
                          this.presentAlert(
                            "Error",
                            "Sorry, asset is not found in the database."
                          );
                        }
                      },
                      (err) => {
                        console.error("err", err);
                        loading.dismiss();

                        this.presentAlert(
                          "Error",
                          "Sorry, there is a technical problem going on."
                        );
                      }
                    );
                  }
                },
                (err) => {
                  console.log("err assetlsService = ", err);
                  loading.dismiss();

                  this.presentAlert(
                    "Error",
                    "Sorry, there is a technical problem going on."
                  );
                }
              );
            });
        } else {
          this.presentAlert("Error", "QR code is invalid. Please try again.");
        }
      });
  }
}
