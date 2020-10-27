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
import { WorkActivitiesService } from 'src/app/shared/services/work-activities/work-activities.service';

@Component({
  selector: "app-work-activity",
  templateUrl: "./work-activity.page.html",
  styleUrls: ["./work-activity.page.scss"],
})
export class WorkActivityPage implements OnInit {
  // List
  servicehistories = [];

  // Data
  workactivity: any;

  // Form
  workactivityFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private workactivityService: WorkActivitiesService
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
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.workactivity = this.router.getCurrentNavigation().extras.state.work_activity;
        this.workactivityFormGroup.patchValue({
          ...this.workactivity
        });
      }
    });
  }

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
  }

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: "/technical/work-activity",
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

  async clickViewAsset(asset) {
    let navigationExtras: NavigationExtras = {
      state: {
        asset,
      },
    };
    this.router.navigate(["/technical/work-activity-asset"], navigationExtras);
  }

  clickRemove(index: number) {
    this.servicehistories.splice(index, 1);
  }
}
