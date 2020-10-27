import { DatePipe, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import {
  AlertController,
  MenuController,
  ModalController,
} from "@ionic/angular";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { OperationalReadingsService } from "src/app/shared/services/operational-readings/operational-readings.service";

import { MeasurementTypePage } from "../measurement-type/measurement-type.page";

@Component({
  selector: "app-operational-reading",
  templateUrl: "./operational-reading.page.html",
  styleUrls: ["./operational-reading.page.scss"],
  providers: [DatePipe],
})
export class OperationalReadingPage implements OnInit {
  // Forms
  operationalreadingFormGroup: FormGroup;
  myDate = new Date();

  measurementtypes = [];

  constructor(
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public location: Location,
    public menu: MenuController,
    public modalController: ModalController,
    private assetService: AssetsService,
    public notificationService: NotificationsService,
    private operationalreadingService: OperationalReadingsService,
    private route: ActivatedRoute,
    private router: Router,
    // private barcodeScanner: BarcodeScanner,
    private camera: Camera
  ) {
    this.operationalreadingFormGroup = this.formBuilder.group({
      asset_id: new FormControl("", Validators.required),
      badge_number: new FormControl("", Validators.required),
      parent_location: new FormControl("", Validators.required),
      date: new FormControl(""),
      status: new FormControl("Operational Reading Updated"),
      reading_date_time: new FormControl(""),
      measurement_type: new FormControl(""),
      current_value: new FormControl(""),
      record_date: new FormControl(
        this.datePipe.transform(this.myDate, "yyyy-MM-dd")
      ),
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.qrcode) {
          let qrcode = this.router.getCurrentNavigation().extras.state.qrcode;
          this.assetService
            .filter("badge_numbera=" + qrcode)
            .subscribe((res) => {
              console.log("res", res);
              this.operationalreadingFormGroup.patchValue({
                asset_id: res[0].wams_asset_id,
                badge_number: res[0].badge_number,
                parent_location: res[0].level_4,
              });
            });
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
        link: "/technical/operational-reading",
      },
    };
    this.router.navigate(["/technical/qr-scanner"], navigationExtras);

    // this.barcodeScanner
    //   .scan({ prompt: "Place a QR code to scan inside the scan area" })
    //   .then((barcodeData) => {
    //     // alert("Barcode data: " + barcodeData.text);
    //     if (barcodeData.text == "MOTR-0000998") {
    //       this.operationalreadingFormGroup.patchValue({
    //         asset_id: "615771728178A6",
    //         badge_no: "MOTR-0000998",
    //         location: "BOOSTER IXORA PUMP HOUSE",
    //         date: this.datePipe.transform(this.myDate, "yyyy-MM-dd"),
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

  async submit() {
    this.operationalreadingService
      .post(this.operationalreadingFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
          this.alertOperationalReading(
            "Operational Reading",
            "Your operational reading have successfully submitted into the system. Thank you."
          );
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  async alertOperationalReading(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigate(["/technical/operational-reading-list"]);
          },
        },
      ],
    });

    await alert.present();
  }

  async clickAddMeasurementType() {
    const modal = await this.modalController.create({
      component: MeasurementTypePage,
      componentProps: { asset: this.operationalreadingFormGroup.value },
    });
    modal.onDidDismiss().then((value) => {
      this.operationalreadingFormGroup.patchValue({
        ...value.data,
        reading_date_time: new Date(value.data.reading_date).toISOString()
      });
    });
    return await modal.present();
  }

  clickBack() {
    this.router.navigate(["/technical/operational-reading-list"]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  async clickEdit(measurementtype) {
    const modal = await this.modalController.create({
      component: MeasurementTypePage,
      componentProps: { measurementtype: measurementtype },
    });
    return await modal.present();
  }

  clickRemove(index: number) {
    this.measurementtypes.splice(index, 1);
  }
}
