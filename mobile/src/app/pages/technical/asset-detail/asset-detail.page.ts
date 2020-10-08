import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { AssetGroupsService } from "src/app/shared/services/asset-groups/asset-groups.service";
import { AssetTypesService } from "src/app/shared/services/asset-types/asset-types.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";
import { RegionsService } from "src/app/shared/services/regions/regions.service";
import { OperationalReadingsService } from "src/app/shared/services/operational-readings/operational-readings.service";

@Component({
  selector: "app-asset-detail",
  templateUrl: "./asset-detail.page.html",
  styleUrls: ["./asset-detail.page.scss"],
  providers: [DatePipe],
})
export class AssetDetailPage implements OnInit {
  // Forms
  assetdetailFormGroup: FormGroup;
  operationalreadingFormGroup: FormGroup;

  // Arrays
  operationalreadingArray = [];

  // Stepper
  isLinear = false;
  isDisableRipple = true;

  regions = [];
  organisations = [];
  departments = [
    { value: "CB", name: "Customer Billing Services" },
    { value: "DB", name: "Distribution" },
    { value: "ED", name: "Engineering Services - Distribution" },
    { value: "FL", name: "Fleet" },
    { value: "LN", name: "Land" },
    { value: "NR", name: "NRW" },
    { value: "PN", name: "Production Northern" },
    { value: "PS", name: "Production Southern" },
    { value: "SD", name: "SCADA" },
    { value: "WQ", name: "Water Quality" },
    { value: "NA", name: "Not Available" },
  ];
  hierarchylevel1s = [
    { value: "CB", name: "Customer Billing Services" },
    { value: "DB", name: "Distribution" },
    { value: "FL", name: "Fleet" },
    { value: "GA", name: "General Admin" },
    { value: "PD", name: "Production" },
    { value: "SD", name: "SCADA" },
    { value: "WQ", name: "Water Quality" },
    { value: "NA", name: "Not Available" },
  ];
  hierarchylevel3s = [
    { value: "ND", name: "NRW - District Metering Zone" },
    { value: "NT", name: "NRW - Transmission Network" },
    { value: "NW", name: "NRW - Water Balancing Area" },
    { value: "PH", name: "Pump House" },
    { value: "RS", name: "Reservoir" },
    { value: "VD", name: "Valve - Distribution Main" },
    { value: "VT", name: "Valve - Trunk Main" },
    { value: "WT", name: "Water Treatment Plant" },
    { value: "WL", name: "WQ Laboratory Services" },
    { value: "WO", name: "WQ - Online Analyzer" },
    { value: "WR", name: "WQ - River Monitoring Station" },
    { value: "WS", name: "WQ Sampling Station" },
    { value: "NA", name: "Not Available" },
  ];
  hierarchylevel4s = [
    { value: "NR", name: "NRW" },
    { value: "PH", name: "Pump House" },
    { value: "RS", name: "Reservoir" },
    { value: "TP", name: "Treatment Plant Name" },
    { value: "NA", name: "Not Available" },
  ];
  hierarchylevel5s = [
    { value: "AS", name: "Aeration System" },
    { value: "BR", name: "Balancing Reservoir" },
    { value: "BD", name: "Buildings" },
    { value: "CD", name: "Chemical Dosing" },
    { value: "CS", name: "Coagulation System" },
    { value: "DT", name: "Draw of Tower" },
    { value: "ES", name: "Earthing System" },
    { value: "EP", name: "Electrical Panel" },
    { value: "ES", name: "Electrical System" },
    { value: "FS", name: "Filtration Process" },
    { value: "FC", name: "Flocculation" },
    { value: "OR", name: "Off River Storage Reservoir" },
    { value: "RW", name: "Raw Water Process" },
    { value: "SP", name: "Sedimentation Process" },
    { value: "SS", name: "Solar System" },
    { value: "ST", name: "Sludge Treament Process" },
    { value: "SW", name: "Settled Water Process" },
    { value: "TI", name: "Tangki Imbang 3MG" },
    { value: "TO", name: "Tangki Imbangan 4MG (OLD)" },
    { value: "TN", name: "Tangki Imbangan 4MG (NEW)" },
    { value: "TS", name: "Telemetry System" },
    { value: "TP", name: "Treatment Process" },
    { value: "TW", name: "Treated Water Process" },
    { value: "WA", name: "Water Analysis" },
    { value: "NA", name: "Not Available" },
  ];
  hierarchylevel6s = [
    { value: "AP", name: "Actiflo Process" },
    { value: "AC", name: "Activated Carbon Process" },
    { value: "AS", name: "Aeration System" },
    { value: "ES", name: "Alum Process" },
    { value: "BP", name: "Backwash Process" },
    { value: "BR", name: "Balancing Reservoir" },
    { value: "BO", name: "Boat House" },
    { value: "BU", name: "Buildings" },
    { value: "CD", name: "Chemical Dosing" },
    { value: "CM", name: "Chemical Process" },
    { value: "CP", name: "Chlorination Process" },
    { value: "CO", name: "Coagulation Process" },
    { value: "CR", name: "Chemical Room" },
    { value: "CC", name: "Control Centre" },
    { value: "CR", name: "Control Room" },
    { value: "DP", name: "Data Process" },
    { value: "DS", name: "Distrafication" },
    { value: "DO", name: "Draw Off Process" },
    { value: "ES", name: "Earthing System" },
    { value: "EL", name: "Electrical System" },
    { value: "FS", name: "Facilities System" },
    { value: "FP", name: "Filtration Process" },
    { value: "FW", name: "Filtered Water Sampling" },
    { value: "FO", name: "Flocculation Process" },
    { value: "FL", name: "Fluoride Process" },
    { value: "LB", name: "Laboratory" },
    { value: "LP", name: "Lime Process" },
    { value: "OA", name: "Online Analyzer" },
    { value: "PR", name: "Polymer (Residual) Dosing" },
    { value: "PA", name: "Poly Aluminium Chloride Process" },
    { value: "PP", name: "Polymer Process" },
    { value: "PS", name: "Power Supply" },
    { value: "RM", name: "Rapid Mixing" },
    { value: "RE", name: "Residual Emergency Lagoon" },
    { value: "RT", name: "Residual Thickened Pumping Station" },
    { value: "RI", name: "Raw Water Intake System" },
    { value: "RS", name: "Raw Water Pumping System" },
    { value: "RP", name: "Raw Water Process" },
    { value: "RE", name: "Raw Water Pipeline" },
    { value: "RV", name: "Reservoir" },
    { value: "SS", name: "SCADA System" },
    { value: "SD", name: "Sedimentation Process" },
    { value: "SL", name: "Settled Water Process" },
    { value: "SS", name: "Settled Water Sampling" },
    { value: "SW", name: "Settled Water Pumping System" },
    { value: "SB", name: "Sludge Balancing" },
    { value: "ST", name: "Sludge Treament Process" },
    { value: "SQ", name: "Solid Liquid Separation" },
    { value: "SA", name: "Solar System" },
    { value: "SI", name: "Sodium Alumino Silicate Process" },
    { value: "SO", name: "Soda Ash Process" },
    { value: "TA", name: "Tangki Sedit SYABAS" },
    { value: "TE", name: "Telemetry System" },
    { value: "TP", name: "Treated Water Process" },
    { value: "TS", name: "Treated Water Sampling" },
    { value: "TL", name: "Treated Water Pipeline" },
    { value: "TW", name: "Treated Water Pumping System" },
    { value: "TT", name: "Treatment Process" },
    { value: "WA", name: "Water Analysis" },
    { value: "WO", name: "Workshop" },
    { value: "WT", name: "Water Transfer" },
    { value: "WP", name: "Wash Water Process" },
    { value: "WR", name: "Wash Water Recovery" },
    { value: "WS", name: "Wash Water System" },
    { value: "NA", name: "Not Available" },
  ];
  typeassets = [];
  categories = [];
  identities = [];
  primarycategories = [];
  groupsubcategory1s = [];
  groupsubcategory2s = [];
  ratings = [
    { value: "1", name: "1 - Very Good" },
    { value: "2", name: "2 - Good" },
    { value: "3", name: "3 - Average" },
    { value: "4", name: "4 - Popover" },
    { value: "5", name: "5 - Replace" },
  ];
  statuses = [
    { value: "NA", name: "Not Available" },
    { value: "PA", name: "Pending for Approval" },
  ];
  measuringtypes = [
    { value: "FM", name: "Flow Meter Readings" },
    { value: "TP", name: "Temperature" },
    { value: "OT", name: "Other" },
  ];

  // Forms
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  // validation_messages = [];

  myDate = new Date();

  constructor(
    public datePipe: DatePipe,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public menu: MenuController,
    public assetsService: AssetsService,
    public assetGroupsService: AssetGroupsService,
    public assetTypesService: AssetTypesService,
    public authService: AuthService,
    public notificationService: NotificationsService,
    public organisationsService: OrganisationsService,
    public regionsService: RegionsService,
    private route: ActivatedRoute,
    private router: Router // private barcodeScanner: BarcodeScanner
  ) {
    this.firstFormGroup = this.formBuilder.group({
      information: ["", Validators.required],
      asset_type: ["", Validators.required],
      detail_description: ["", Validators.required],
      status: ["", Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      badge_number: ["", Validators.required],
      serial_number: ["", Validators.required],
    });
    this.thirdFormGroup = this.formBuilder.group({
      location: ["", Validators.required],
    });
    this.fourthFormGroup = this.formBuilder.group({
      condition_rating: ["", Validators.required],
      confidence_rating: ["", Validators.required],
    });
    this.fifthFormGroup = this.formBuilder.group({
      owning_organization: ["", Validators.required],
    });
    this.sixthFormGroup = this.formBuilder.group({
      something: ["", Validators.required],
    });
    this.seventhFormGroup = this.formBuilder.group({
      warranty_term: ["", Validators.required],
    });
  }

  ngOnInit() {}

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: "/technical/tabs/tab2",
      },
    };
    this.router.navigate(["/technical/qr-scanner"], navigationExtras);

    // this.barcodeScanner
    //   .scan({ prompt: "Place a QR code to scan inside the scan area" })
    //   .then((barcodeData) => {
    //     // alert("Barcode data: " + barcodeData.text);
    //     if (barcodeData.text == "MOTR-0000998") {
    //       this.zeroFormGroup.patchValue({
    //         asset_id: "615771728178A6",
    //         badge_no: barcodeData.text,
    //       });
    //     } else {
    //       this.presentAlert("Error", "Sorry, asset not found.");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //   });
  }

  async save() {
    let postAssets = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      ...this.fourthFormGroup.value,
      ...this.fifthFormGroup.value,
      ...this.sixthFormGroup.value,
      ...this.seventhFormGroup.value,
      // created_by: this.authService.userID
    };

    /*this.assetsService.post(postAssets).subscribe(
      (res) => {
        if (res) {
          console.log("res", res);
          this.presentAlert(
            "Success",
            "Your asset successfully registered into the system."
          );
        }
      },
      (err) => {
        console.error("err", err);
        // this.validation_messages = err.error;
        this.presentAlert(
          "Error",
          "There are error occured on your form. Please check your form again."
        );
      },
      () => {
        console.log("Http request completed");
      }
    );*/

    const alert = await this.alertController.create({
      header: "Asset Detail",
      message:
        "Your asset detail have successfully submitted into the system. Thank you.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  cancel() {
    this.router.navigate(["/technical/tabs/tab1"]);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            if (header == "Success") this.homePage("/technical/tabs/tab1");
          },
        },
      ],
    });

    await alert.present();
  }

  // To add more OR submit operational reading of the asset
  async submit() {
    const alert = await this.alertController.create({
      header: "Add More",
      message:
        "Do you want to add more OR submit operational reading of the asset?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Add More",
          handler: () => {
            this.addOperationalReading();
          },
        },
        {
          text: "Submit",
          handler: () => {
            // will go to submit page with data(s)
            let navigationExtras: NavigationExtras = {
              state: {
                operational_reading: this.operationalreadingArray,
              },
            };
            this.router.navigate(["/technical/submit"], navigationExtras);
          },
        },
      ],
    });

    await alert.present();
  }

  addOperationalReading() {
    this.operationalreadingFormGroup.value.asset = this.assetdetailFormGroup.value.id;

    this.operationalreadingArray.push(this.operationalreadingFormGroup.value);
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }
}
