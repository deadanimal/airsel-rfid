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
    private assetLocatioSyncService: AssetLocatioSyncService
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
          let badge_no = this.router.getCurrentNavigation().extras.state
            .badge_no;
          this.assetsService
            .filter("badge_no=" + badge_no)
            .subscribe((res) => {

              console.log("res qweqweewwq", res);
              this.MeasurementTypeData = res[0].measurement_types
              this.getAssetLocationSync(res[0].node_id)
              this.getAssetExtended(res[0].id)
              this.operationalreadingFormGroup.patchValue({
                asset_description: res[0].description,
                badge_number: res[0].badge_no,
                asset_id: res[0].asset_id,
              });
            });
        } else {
          this.assetsService
            .filter("asset_id=" + this.OpreationalReading.asset_id)
            .subscribe((res) => {
              console.log("asset qweqwe = ", res)
              this.MeasurementTypeData = res[0].measurement_types
              this.getAssetLocationSync(res[0].node_id)
              this.getAssetExtended(res[0].id)
            });
        }
      }
    });
  }

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
  }

  getAssetLocationSync(node_id) {
    // setInterval(() => {
    console.log("test node_id => ", node_id)
    this.assetLocatioSyncService.filter("node_id=" + node_id).subscribe(
      (res) => {
        console.log("res assetlsService = ", res)

        this.operationalreadingFormGroup.patchValue({
          location: res[0].description,
          // node_id: res[0].node_id,
          // description: "NA",
          // long_description: res[0].detailed_description
        })
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
