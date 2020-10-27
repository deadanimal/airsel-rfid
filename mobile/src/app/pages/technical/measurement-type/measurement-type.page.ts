import { DatePipe, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import {
  AlertController,
  MenuController,
  ModalController,
  NavParams,
} from "@ionic/angular";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { OperationalReadingsService } from "src/app/shared/services/operational-readings/operational-readings.service";

@Component({
  selector: "app-measurement-type",
  templateUrl: "./measurement-type.page.html",
  styleUrls: ["./measurement-type.page.scss"],
  providers: [DatePipe],
})
export class MeasurementTypePage implements OnInit {
  // Forms
  measurementtypeFormGroup: FormGroup;
  myDate = new Date();

  constructor(
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public location: Location,
    public menu: MenuController,
    public modalController: ModalController,
    public navParams: NavParams,
    public notificationService: NotificationsService,
    private operationalreadingService: OperationalReadingsService
  ) {
    this.measurementtypeFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      asset_id: new FormControl(""),
      badge_number: new FormControl(""),
      measurement_type: new FormControl("", Validators.required),
      reading_date: new FormControl(
        new Date().toISOString(),
        Validators.required
      ),
      reading_time: new FormControl(
        new Date().toISOString(),
        Validators.required
      ),
      current_value: new FormControl("", Validators.required),
      initial_value: new FormControl("", Validators.required),
      owning_organization: new FormControl("", Validators.required),
      date: new FormControl(""),
      status: new FormControl(""),
    });

    if (this.navParams.get("measurementtype")) {
      this.measurementtypeFormGroup.patchValue({
        ...this.navParams.get("measurementtype"),
      });
    }
    if (this.navParams.get("asset")) {
      this.measurementtypeFormGroup.patchValue({
        ...this.navParams.get("asset"),
      });
    }
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

  save() {
    // this.measurementtypeFormGroup.patchValue({
    //   status: "Pending for Approval",
    // });
    // this.operationalreadingService
    //   .update(
    //     this.measurementtypeFormGroup.value.id,
    //     this.measurementtypeFormGroup.value
    //   )
    //   .subscribe(
    //     (res) => {
    //       console.log("res", res);
          this.alertMeasurementType(
            "Measurement Type",
            "Your measurement type have successfully submitted into the system. Thank you."
          );
      //   },
      //   (err) => {
      //     console.error("err", err);
      //   }
      // );
  }

  async alertMeasurementType(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.modalController.dismiss(this.measurementtypeFormGroup.value);
          },
        },
      ],
    });

    await alert.present();
  }

  clickDismiss() {
    this.modalController.dismiss();
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }
}
