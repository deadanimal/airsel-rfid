declare var broadcaster: any;

import { Component, NgZone, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  MenuController,
  ModalController, LoadingController
} from "@ionic/angular";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { ServiceHistoryPage } from "../service-history/service-history.page";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkActivitiesService } from "src/app/shared/services/work-activities/work-activities.service";
import { WorkOrderActivityCompletionAssLocAssListService } from 'src/app/shared/services/work-order-activity-completion-AssLocAssList/work-order-activity-completion-AssLocAssList.service';
import { WorkOrderActivityCompletionService } from 'src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service';
import { WamsService } from "src/app/shared/services/wams/wams.service";
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { AssetLocatioSyncService } from 'src/app/shared/services/asset-location-sync/asset-location-sync.service';

@Component({
  selector: "app-work-activity",
  templateUrl: "./work-activity.page.html",
  styleUrls: ["./work-activity.page.scss"],
})
export class WorkActivityPage implements OnInit {
  // List
  servicehistories = [];

  // scanner
  private logs = new Array<string>();
  public scanValue: any;
  bBarcode: boolean = false;
  bRfid: boolean = false;

  // Data
  workactivity: any;
  workactivityData: any = [];

  // Form
  workactivityFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private workactivityService: WorkActivitiesService,
    private workOrderActivityCompletionAssLocAssListService: WorkOrderActivityCompletionAssLocAssListService,
    private workOrderActivityCompletionService: WorkOrderActivityCompletionService,
    public loadingController: LoadingController,
    private ngZone: NgZone,
    private assetsService: AssetsService,
    private wamsService: WamsService,
    private assetLocatioSyncService: AssetLocatioSyncService
  ) {
    this.workactivityFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      bo_status: new FormControl(""),
      activity_id: new FormControl(""),
      asset_id: new FormControl(""),
      asset_type: new FormControl(""),
      badge_number: new FormControl(""),
      serial_number: new FormControl(""),
      detailed_description: new FormControl(""),
      work_category: new FormControl(""),
      required_by_date: new FormControl(""),
      parent_location: new FormControl(""),
      node_id: new FormControl(""),
      asset_loc_sync: new FormControl(""),
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.workactivity = this.router.getCurrentNavigation().extras.state.work_activity;

        console.log("this.workactivity = ", this.workactivity)

        let node_id_1 = "node_id=" + this.workactivity.node_id_1
        this.assetLocatioSyncService.filter(node_id_1).subscribe(
          (resAls) => {
            this.workactivity.asset_loc_sync = resAls[0]['description']
            this.workactivityFormGroup.patchValue({
              ...this.workactivity,
            });

          }, (errAls) => {

          }
        )


        // console.log("this.workactivity = ", this.workactivity['asset_location_asset_list']);
        // let getWOrkActivityData = this.workactivity['asset_location_asset_list']
        this.getWOrkActivityData(this.workactivity['asset_location_asset_list'])
        // this.workactivity['asset_location_asset_list'].forEach(element => {
        //   console.log('element', element);
        // });
      }
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
    this.menu.enable(false, "menuNotification");
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigate(["/technical/maintenance-work-list"]);
          },
        },
      ],
    });

    await alert.present();
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  async close() {
    this.workactivityFormGroup.patchValue({
      bo_status: "Completed",
    });
    this.workactivityService
      .update(
        this.workactivityFormGroup.value.id,
        this.workactivityFormGroup.value
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          this.alertWorkActivity(
            "Work Activity",
            "Your work activity have successfully closed in the the system. Thank you."
          );
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  async alertWorkActivity(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigate(["/technical/maintenance-work-list"]);
          },
        },
      ],
    });

    await alert.present();
  }

  clickBack() {
    this.router.navigate(["/technical/maintenance-work-list"]);
  }

  async clickAddServiceHistory() {
    const modal = await this.modalController.create({
      component: ServiceHistoryPage,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) this.servicehistories.push(data.data);
    });
    return await modal.present();
  }

  async clickEdit(servicehistory) {
    const modal = await this.modalController.create({
      component: ServiceHistoryPage,
      componentProps: { servicehistory: servicehistory },
    });
    return await modal.present();
  }

  // async clickViewAsset(asset) {
  //   // let navigationExtras: NavigationExtras = {
  //   //   state: {
  //   //     asset,
  //   //   },
  //   // };
  //   // this.router.navigate(["/technical/work-activity-asset"], navigationExtras);

  //   const actionSheet = await this.actionSheetController.create({
  //     header: "Choose method",
  //     buttons: [
  //       {
  //         text: "RFID",
  //         icon: "scan",
  //         handler: () => {
  //           console.log("RFID clicked");
  //         },
  //       },
  //       {
  //         text: "QR Code",
  //         icon: "qr-code",
  //         handler: () => {
  //           console.log("QR Code clicked");
  //         },
  //       },
  //       {
  //         text: "Badge No.",
  //         icon: "search",
  //         handler: () => {
  //           console.log("Badge No. clicked");
  //           this.searchBadgeNo(asset);
  //         },
  //       },
  //       {
  //         text: "Cancel",
  //         role: "cancel",
  //         icon: "close",
  //         handler: () => {
  //           console.log("Cancel clicked");
  //         },
  //       },
  //     ],
  //   });
  //   await actionSheet.present();
  // }

  clickRemove(index: number) {
    this.servicehistories.splice(index, 1);
  }


  getWOrkActivityData(getdata) {
    let woacalalsh = []
    getdata.forEach((element) => {
      let woacalsl = element.toString();
      console.log(woacalsl)
      this.workOrderActivityCompletionAssLocAssListService.getOne(woacalsl).subscribe(
        (Res) => {
          this.workactivityData.push(Res)
          console.log()
        },
        (Err) => {
          console.error("err", Err);
        }
      );

      setTimeout(() => {
        this.workactivityData.forEach(element => {
          let asset_id = "asset_id=" + element.asset_id
          this.assetsService.filter(asset_id).subscribe(
            (res) => {
              element.badge_number = res[0].badge_no
              element.description = res[0].description
            }, (errAs) => {

            }
          )
          let nodeid = "node_id=" + element.node_id
          this.assetLocatioSyncService.filter(nodeid).subscribe(
            (resALALSH) => {
              console.log("resALALSH --=-= ", resALALSH)
              element.location_descr = resALALSH[0].description
            }, () => {

            }
          )
        });
      }, 2000);
    });
  }

  getCurrentDateTime() {
    let selectedDate = new Date();
    let year = selectedDate.getFullYear();
    let month =
      selectedDate.getMonth() + 1 < 10
        ? "0" + (selectedDate.getMonth() + 1)
        : selectedDate.getMonth() + 1;
    let day =
      selectedDate.getDate() < 10
        ? "0" + selectedDate.getDate()
        : selectedDate.getDate();
    let formatDate = year + "-" + month + "-" + day;

    let hour =
      selectedDate.getHours() < 10
        ? "0" + selectedDate.getHours()
        : selectedDate.getHours();
    let minute =
      selectedDate.getMinutes() < 10
        ? "0" + selectedDate.getMinutes()
        : selectedDate.getMinutes();
    let second =
      selectedDate.getSeconds() < 10
        ? "0" + selectedDate.getSeconds()
        : selectedDate.getSeconds();
    let formatTime = hour + ":" + minute + ":" + second;

    return formatDate + "T" + formatTime + "Z";
  }

  submit() {
    let woacassLocAssLisFormData = {
      status: 'InProgress',
      completiondatetime: this.getCurrentDateTime(),
      submitted_datetime: this.getCurrentDateTime(),
    }

    console.log("modified_date", woacassLocAssLisFormData)

    this.workOrderActivityCompletionService
      .update(
        this.workactivity.id,
        woacassLocAssLisFormData
      )
      .subscribe(
        (res) => {
          console.log("res = ", res)

          this.presentAlert(
            "Success",
            "Successfully update data."
          );
        }, (err) => {

        }
      )

  }

  async searchBadgeNo(asset) {
    const alert = await this.alertController.create({
      header: "Badge No.",
      message: "Enter a badge number to search the asset",
      inputs: [
        {
          name: "badge_no",
          type: "text",
          value: asset.badge_number,
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
                  asset,
                },
              };
              console.log("navigationExtras 0000 = ", navigationExtras)
              this.router.navigate(
                ["/technical/work-activity-asset"],
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

  async clickViewAsset(asset) {
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
            this.searchBadgeNo(asset);
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

  // rfid scan
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
              this.wamsService.getAssetBadgeNo(data.badge_no).subscribe(
                (resBsdgeNo) => { },
                (errBadgeNo) => { }
              );

              this.router.navigate(
                ["/technical/work-activity-asset"],
                navigationExtras
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

  // qr code
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
          this.router.navigate(
            ["/technical/work-activity-asset"],
            navigationExtras
          );
        } else {
          this.presentAlert("Error", "Data not valid in database");
        }
      });
  }

}
