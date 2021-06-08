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
import { WorkOrderActivityCompletionAssLocAssListService } from 'src/app/shared/services/work-order-activity-completion-AssLocAssList/work-order-activity-completion-AssLocAssList.service';
import { WorkOrderActivityCompletionService } from 'src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service';

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
    private workOrderActivityCompletionService: WorkOrderActivityCompletionService
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

        console.log("this.workactivity = ", this.workactivity)

        this.workactivityFormGroup.patchValue({
          ...this.workactivity,
        });
        // console.log("this.workactivity = ", this.workactivity['asset_location_asset_list']);
        // let getWOrkActivityData = this.workactivity['asset_location_asset_list']
        this.getWOrkActivityData(this.workactivity['asset_location_asset_list'])
        // this.workactivity['asset_location_asset_list'].forEach(element => {
        //   console.log('element', element);
        // });
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

  clickRemove(index: number) {
    this.servicehistories.splice(index, 1);
  }

  getWOrkActivityData(getdata) {

    getdata.forEach((element) => {
      let woacalsl = element.toString();
      console.log(woacalsl)
      this.workOrderActivityCompletionAssLocAssListService.getOne(woacalsl).subscribe(
        (Res) => {
          this.workactivityData.push(Res)
        },
        (Err) => {
          console.error("err", Err);
        }
      );
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
}
