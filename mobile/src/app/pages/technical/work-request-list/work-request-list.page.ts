declare var broadcaster: any;

import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  MenuController,
  ModalController,
} from "@ionic/angular";

import { ApprovalProfilePage } from "../approval-profile/approval-profile.page";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkRequestsService } from "src/app/shared/services/work-requests/work-requests.service";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { WamsService } from "src/app/shared/services/wams/wams.service";
import { AuthService } from 'src/app/shared/services/auth/auth.service';

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
    public loadingController: LoadingController,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private workrequestService: WorkRequestsService,
    private assetService: AssetsService,
    private wamsService: WamsService,
    private authService: AuthService
  ) { }

  private L(...args: any[]) {
    let v = args.join(" ");
    console.log(v);
    this.ngZone.run(() => {
      this.logs.push(v);
    });
  }

  ngOnInit() {
    broadcaster._debug = true;
    // this.onRegister2DBarcodeListener();
    // this.onRegisterRFIDListener();
    this.getWorkRequest()
  }

  getWorkRequest() {
    console.log("this.authService.userID", this.authService.userID)
    let objUser = {
      userid: this.authService.userID
    }
    console.log("objUser >>>>>>>>>> ", objUser)
    this.workrequestService.desc_order_list(objUser).subscribe(
      (res) => {
        console.log("workrequest res = ", res);
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
    this.bBarcode = false;
    this.bRfid = false;

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
            console.log("WR RFID clicked");
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
            console.log("WR QR CODE clicked");
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
            if (data.badge_no) {
              this.loadingController
                .create({
                  message: "Please wait...",
                })
                .then((loading) => {
                  loading.present();

                  this.assetService
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
                            ["/technical/work-request"],
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

                                if (res.results) {
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

  async clickApprove(workrequest) {
    const modal = await this.modalController.create({
      component: ApprovalProfilePage,
    });

    modal.onDidDismiss().then((modelData) => {
      if (modelData.data != "") {
        this.loadingController
          .create({
            message: "Please wait for a while...",
          })
          .then((loading) => {
            loading.present();
            this.submitApprovalProfile(workrequest, modelData.data, loading);
          });
      }
    });

    return await modal.present();
  }

  submitApprovalProfile(workrequest, data, loading) {
    let obj = {
      id: workrequest.id,
      work_request_id: workrequest.work_request_id,
      approval_profile: data,
    };

    this.workrequestService.submit_approval_profile(obj).subscribe(
      (res) => {
        if (res) {
          this.presentAlert(
            "Success",
            // "Your work request have successfully approved."
            // "Work request successfully submitted for approval."
            "Your work request has been successfully submitted for approval"
          );
        }
        loading.dismiss();
      },
      (err) => {
        console.error("err", err);
        this.presentAlert("Error", err.error.error_details);
        loading.dismiss();
      },
      () => {
        this.getWorkRequest();
      }
    );
  }

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

              this.assetService.filter("hex_code=" + this.scanValue).subscribe(
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
                      ["/technical/work-request"],
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

              this.assetService.filter("badge_no=" + this.scanValue).subscribe(
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
                      ["/technical/work-request"],
                      navigationExtras
                    );
                  }
                  // else, find the asset in the wams to pump into PIPE's asset table
                  else {
                    // get data from wams
                    this.wamsService.getAssetBadgeNo(this.scanValue).subscribe(
                      (res) => {
                        loading.dismiss();

                        if (res.results) {
                          let navigationExtras: NavigationExtras = {
                            state: {
                              badge_no: this.scanValue,
                            },
                          };

                          this.router.navigate(
                            ["/technical/work-request"],
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

  clickRemove(index: number) {
    this.workrequests.splice(index, 1);
  }

  onRegister2DBarcodeListener() {
    this.loadingController
      .create({
        message: "Please scan the QR code...",
        backdropDismiss:true,
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
        backdropDismiss:true,
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
}
