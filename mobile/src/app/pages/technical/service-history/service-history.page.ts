import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  AlertController,
  MenuController,
  ModalController,
  NavParams,
} from "@ionic/angular";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkActivitiesService } from "src/app/shared/services/work-activities/work-activities.service";

@Component({
  selector: "app-service-history",
  templateUrl: "./service-history.page.html",
  styleUrls: ["./service-history.page.scss"],
})
export class ServiceHistoryPage implements OnInit {
  // Forms
  servicehistoryFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    public navParams: NavParams,
    private router: Router,
    public notificationService: NotificationsService,
    private workactivityService: WorkActivitiesService
  ) {
    this.servicehistoryFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      type: new FormControl(""),
      // DOWNTIME
      service_history_type_dt: new FormControl(""),
      effective_date_time_dt: new FormControl(""),
      comments_dt: new FormControl(""),
      start_date_time: new FormControl(""),
      end_date_time: new FormControl(""),
      downtime_reason: new FormControl(""),
      // FAILURE
      service_history_type_f: new FormControl(""),
      effective_date_time_f: new FormControl(""),
      comments_f: new FormControl(""),
      failure_type: new FormControl(""),
      failure_mode: new FormControl(""),
      failure_repair: new FormControl(""),
      failure_component: new FormControl(""),
      failure_root_cause: new FormControl(""),
      // PREVENTIVE MAINTENANCE
      service_history_type_pm: new FormControl(""),
      effective_date_time_pm: new FormControl(""),
      comments_pm: new FormControl(""),
      asset_type: new FormControl(""),
      answer_1: new FormControl(""),
      answer_2: new FormControl(""),
      answer_3: new FormControl(""),
    });

    console.log("servicehistory", this.navParams.get("servicehistory"));
    if (this.navParams.get("servicehistory")) {
      if (this.navParams.get("servicehistory").service_history_type_dt) {
        this.servicehistoryFormGroup.patchValue({
          ...this.navParams.get("servicehistory"),
          type: this.navParams.get("servicehistory").service_history_type_dt
        });
      }
      else if (this.navParams.get("servicehistory").service_history_type_f) {
        this.servicehistoryFormGroup.patchValue({
          ...this.navParams.get("servicehistory"),
          type: this.navParams.get("servicehistory").service_history_type_f
        });
      }
      else if (this.navParams.get("servicehistory").service_history_type_pm) {
        this.servicehistoryFormGroup.patchValue({
          ...this.navParams.get("servicehistory"),
          type: this.navParams.get("servicehistory").service_history_type_pm
        });
      }
    }
  }

  ngOnInit() {}

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  clickSaveServiceHistory() {
    // this.modalController.dismiss(this.servicehistoryFormGroup.value);

    if (this.servicehistoryFormGroup.value.type == "DOWNTIME") {
      this.servicehistoryFormGroup.patchValue({
        service_history_type_dt: this.servicehistoryFormGroup.value.type,
      });
    } else if (this.servicehistoryFormGroup.value.type == "FAILURE") {
      this.servicehistoryFormGroup.patchValue({
        service_history_type_f: this.servicehistoryFormGroup.value.type,
      });
    } else if (this.servicehistoryFormGroup.value.type == "PREVENTIVE MAINTENANCE") {
      this.servicehistoryFormGroup.patchValue({
        service_history_type_pm: this.servicehistoryFormGroup.value.type,
      });
    }

    this.workactivityService
      .update(
        this.servicehistoryFormGroup.value.id,
        this.servicehistoryFormGroup.value
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          this.alertServiceHistory(
            "Success",
            "Your service history have successfully added."
          );
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  clickBack() {
    this.modalController.dismiss();
  }

  async alertServiceHistory(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.modalController.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }
}
