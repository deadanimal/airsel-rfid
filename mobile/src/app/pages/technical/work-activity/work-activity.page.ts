import { Component, OnInit } from "@angular/core";
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
  ModalController,
} from "@ionic/angular";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { ServiceHistoryPage } from "../service-history/service-history.page";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkActivitiesService } from "src/app/shared/services/work-activities/work-activities.service";

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
    public actionSheetController: ActionSheetController,
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
          ...this.workactivity,
        });
      }
    });
  }

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
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
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     asset,
    //   },
    // };
    // this.router.navigate(["/technical/work-activity-asset"], navigationExtras);

    const actionSheet = await this.actionSheetController.create({
      header: "Choose method",
      buttons: [
        {
          text: "RFID",
          icon: "scan",
          handler: () => {
            console.log("RFID clicked");
          },
        },
        {
          text: "QR Code",
          icon: "qr-code",
          handler: () => {
            console.log("QR Code clicked");
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

  clickRemove(index: number) {
    this.servicehistories.splice(index, 1);
  }
}
