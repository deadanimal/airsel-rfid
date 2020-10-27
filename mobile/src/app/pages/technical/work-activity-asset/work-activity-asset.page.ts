import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  AlertController,
  MenuController,
  ModalController,
} from "@ionic/angular";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { ServiceHistoryPage } from "../service-history/service-history.page";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkActivitiesService } from "src/app/shared/services/work-activities/work-activities.service";

@Component({
  selector: "app-work-activity-asset",
  templateUrl: "./work-activity-asset.page.html",
  styleUrls: ["./work-activity-asset.page.scss"],
})
export class WorkActivityAssetPage implements OnInit {
  // List
  servicehistories = [];

  // Data
  workactivityasset: any;

  // Form
  workactivityassetFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private workactivityService: WorkActivitiesService // private barcodeScanner: BarcodeScanner
  ) {
    this.workactivityassetFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      bo_status: new FormControl(""),
      asset_id: new FormControl(""),
      asset_type: new FormControl(""),
      badge_number: new FormControl(""),
      serial_number: new FormControl(""),
      detailed_description: new FormControl(""),
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.workactivityasset = this.router.getCurrentNavigation().extras.state.asset;
        this.workactivityassetFormGroup.patchValue({
          id: this.workactivityasset.id,
          bo_status: this.workactivityasset.bo_status,
          asset_id: this.workactivityasset.asset_id,
        });

        if (this.router.getCurrentNavigation().extras.state.qrcode) {
          let qrcode = this.router.getCurrentNavigation().extras.state.qrcode;
          if (qrcode == this.workactivityasset.badge_number) {
            this.workactivityassetFormGroup.patchValue({
              asset_type: this.workactivityasset.asset_type,
              badge_number: qrcode,
              serial_number: this.workactivityasset.serial_number,
              detailed_description: this.workactivityasset.detailed_description,
            });
          } else
            this.alertErrorWorkActivityAsset(
              "Work Activity",
              "The QR code is not same with the asset. Please try again."
            );
        }
      }
    });
  }

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
    this.scanQrCode();
  }

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: "/technical/work-activity-asset",
        asset: this.workactivityasset,
      },
    };
    this.router.navigate(["/technical/qr-scanner"], navigationExtras);

    // this.barcodeScanner
    //   .scan({ prompt: "Place a QR code to scan inside the scan area" })
    //   .then((barcodeData) => {
    //     // alert("Barcode data: " + barcodeData.text);
    //     if (barcodeData.text == "MOTR-0000998") {
    //       this.workactivityFormGroup.patchValue({
    //         work_activity_no: "668463846381",
    //         work_activity_type: "Corrective Maintenance",
    //         required_by_date: new Date().toISOString(),
    //         parent_location: "BOOSTER IXORA PUMP HOUSE",
    //         badge_no: "615771728178A6",
    //       });
    //     } else {
    //       this.presentAlert("Error", "Sorry, asset not found.");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //   });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
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

  submit() {
    // this.workactivityassetFormGroup.patchValue({
    //   bo_status: "Completed",
    // });
    // this.workactivityService
    //   .update(
    //     this.workactivityassetFormGroup.value.id,
    //     this.workactivityassetFormGroup.value
    //   )
    //   .subscribe(
    //     (res) => {
    //       console.log("res", res);
    this.alertWorkActivityAsset(
      "Work Activity",
      "Your work activity have successfully submitted into the system. Thank you."
    );
    //   },
    //   (err) => {
    //     console.error("err", err);
    //   }
    // );
  }

  async alertWorkActivityAsset(header, message) {
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

  async alertErrorWorkActivityAsset(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }

  clickBack() {
    this.router.navigate(["/technical/maintenance-work-list"]);
  }

  async clickAddServiceHistory(servicehistory) {
    const modal = await this.modalController.create({
      component: ServiceHistoryPage,
      componentProps: { servicehistory: servicehistory },
    });
    modal.onDidDismiss().then((data) => {
      // if (data.data) this.servicehistories.push(data.data);
      this.workactivityService.getOne(this.workactivityasset.id).subscribe(
        (res) => {
          console.log("res", res);
          this.workactivityasset = res;
          this.workactivityassetFormGroup.patchValue({
            ...res
          });
        }, (err) => {
          console.error("err", err);
        }
      )
    });
    return await modal.present();
  }

  async clickEdit(servicehistory) {
    const modal = await this.modalController.create({
      component: ServiceHistoryPage,
      componentProps: { servicehistory: servicehistory },
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }

  clickRemove(index: number) {
    this.servicehistories.splice(index, 1);
  }
}
