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

import { AssetRegistrationsService } from "src/app/shared/services/asset-registrations/asset-registrations.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { OperationalReadingsService } from "src/app/shared/services/operational-readings/operational-readings.service";
import { MeasurementTypePage } from "../measurement-type/measurement-type.page";
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { OwningorganisationsService } from 'src/app/shared/services/owning-organisations/owning-organisations.service';
import { AssetLocatioSyncService } from 'src/app/shared/services/asset-location-sync/asset-location-sync.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: "app-operational-reading",
  templateUrl: "./operational-reading.page.html",
  styleUrls: ["./operational-reading.page.scss"],
  providers: [DatePipe],
})
export class OperationalReadingPage implements OnInit {

  OwningOrganisationsList = []
  OpreationalReading: any
  MeasurementTypeData: any

  // Forms
  operationalreadingFormGroup: FormGroup;
  myDate = new Date();

  measurementtypes = [];
  process: string;
  showButton = 'yes'

  constructor(
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public location: Location,
    public menu: MenuController,
    public modalController: ModalController,
    private assetregistrationService: AssetRegistrationsService,
    public notificationService: NotificationsService,
    private operationalreadingService: OperationalReadingsService,
    private route: ActivatedRoute,
    private router: Router,
    // private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    private assetsService: AssetsService,
    private owningorganisationsService: OwningorganisationsService,
    private assetLocatioSyncService: AssetLocatioSyncService,
    private authService: AuthService
  ) {
    this.getOwningOrganisationsList()
    this.operationalreadingFormGroup = this.formBuilder.group({
      asset_id: new FormControl("", Validators.required),
      badge_number: new FormControl("", Validators.required),
      current_value: new FormControl(""),
      measurent_identifier: new FormControl(""),
      measurent_type: new FormControl(""),
      initial_value_flag: new FormControl(""),
      owning_organization: new FormControl(""),
      reading_datetime: new FormControl(""),
      submitted_datetime: new FormControl(""),
      created_date: new FormControl(""),
      modified_date: new FormControl(""),
      location: new FormControl(""),
      asset_description: new FormControl(""),
      record_by: new FormControl(this.authService.userID),
      modified_by: new FormControl(this.authService.userID)
      // record_date: new FormControl(
      //   this.datePipe.transform(this.myDate, "yyyy-MM-dd")
      // ),
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        // To get process from work request list
        this.process = this.router.getCurrentNavigation().extras.state.process;

        // To set value based on previous page
        this.OpreationalReading = this.router.getCurrentNavigation().extras.state.operationalreading
        console.log("OpreationalReading = ", this.OpreationalReading)
        this.operationalreadingFormGroup.patchValue({
          ...this.router.getCurrentNavigation().extras.state.operationalreading,
        });

        if (this.router.getCurrentNavigation().extras.state.badge_no) {
          this.showButton = 'yes'
          console.log("this.showButton", this.showButton)
          let badge_no = this.router.getCurrentNavigation().extras.state
            .badge_no;
          this.assetsService
            .filter("badge_no=" + badge_no)
            .subscribe((res) => {

              console.log("res qweqweewwq", res);
              if (res[0].measurement_types.length == 0) {
                console.log("measurement_types.length = ", res[0].measurement_types.length)
                // res[0].measurement_types
                let header = "Operational Reading"
                let body = "No Measurement Required From This Asset"
                this.emptyMeasuremntType(header, body)
              }
              this.MeasurementTypeData = res[0].measurement_types
              this.getAssetLocationSync(res[0].node_id)
              this.getAssetExtended(res[0].id)
              this.operationalreadingFormGroup.patchValue({
                asset_description: res[0].description,
                badge_number: res[0].badge_no,
                asset_id: res[0].asset_id,
                owning_organization: res[0].owning_access_group,
              });
            });
        } else {
          this.showButton = 'no'
          console.log("this.showButton", this.showButton)
          this.assetsService
            .filter("asset_id=" + this.OpreationalReading.asset_id)
            .subscribe((res) => {
              console.log("asset qweqwe = ", res)

              if (res[0].measurement_types.length == 0) {
                console.log("measurement_types.length = ", res[0].measurement_types.length)
                let header = "Operational Reading"
                let body = "No Measurement Required From This Asset"
                this.emptyMeasuremntType(header, body)
                // res[0].measurement_types
              }

              this.MeasurementTypeData = res[0].measurement_types
              this.operationalreadingFormGroup.patchValue({
                asset_description: res[0].description,
                measurent_type: this.OpreationalReading.measurent_type,
                reading_datetime: this.OpreationalReading['reading_datetime'],
                current_value: this.OpreationalReading['current_value'],
              });
              console.log("this.operationalreadingFormGroup", this.operationalreadingFormGroup)
              this.getAssetLocationSync(res[0].node_id)
              this.getAssetExtended(res[0].id)
            });
        }
      }
    });
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter OperationalReadingPage");
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave OperationalReadingPage")
  }

  ngOnInit() {
    console.log("ngOnInit OperationalReadingPage");

    this.menu.enable(false, "menuNotification");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy OperationalReadingPage");
  }

  getAssetLocationSync(node_id) {
    // setInterval(() => {
    console.log("test node_id => ", node_id)
    this.assetLocatioSyncService.filter("node_id=" + node_id).subscribe(
      (res) => {
        console.log("res assetlsService = ", res)

        if (res.length != 0) {
          this.operationalreadingFormGroup.patchValue({
            location: res[0].description,
            // node_id: res[0].node_id,
            // description: "NA",
            // long_description: res[0].detailed_description
          })
        }
      },
      (err) => {
        console.log("err assetlsService = ", err)
      }
    )
    // }, 10000);
  }

  getOwningOrganisationsList() {
    this.owningorganisationsService.get().subscribe(
      (res) => {
        console.log("owningorganisationsService = ", res)
        this.OwningOrganisationsList = res
      }
    )
  }

  getAssetExtended(assetid) {

    this.assetsService
      .getOneExtended(assetid)
      .subscribe((res) => {

        console.log("res measurementtypes = ", res.measurement_types);
        this.MeasurementTypeData = res.measurement_types
      });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }
  async emptyMeasuremntType(header, message) {
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

  async submit() {
    this.operationalreadingService
      .post(this.operationalreadingFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
          this.alertOperationalReading(
            "Operational Reading",
            // "Your operational reading have successfully submitted into the system. Thank you."
            "Your operational reading has been successfully updated into the system."
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
        reading_date_time: new Date(value.data.reading_date).toISOString(),
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
