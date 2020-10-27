import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { AlertController, MenuController, Platform } from "@ionic/angular";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { AssetTypesService } from "src/app/shared/services/asset-types/asset-types.service";
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { OperationalReadingsService } from "src/app/shared/services/operational-readings/operational-readings.service";

@Component({
  selector: "app-asset-detail",
  templateUrl: "./asset-detail.page.html",
  styleUrls: ["./asset-detail.page.scss"],
})
export class AssetDetailPage implements OnInit {
  // Forms
  assetdetailFormGroup: FormGroup;
  operationalreadingFormGroup: FormGroup;

  // Arrays
  operationalreadingArray = [];

  // Dropdowns
  assets = [
    "Booster Ixora Pump House - Motor",
    "Booster Ixora Pump House - Butterfly valve",
    "Booster Ixora Pump House - Check valve",
    "Booster Ixora Pump House - Pressure gauge",
    "Booster Ixora Pump House - Control panel",
  ];
  assetConditions = [
    {
      key: 1,
      value: "Very Good",
    },
    {
      key: 2,
      value: "Good",
    },
    {
      key: 3,
      value: "Average",
    },
    {
      key: 4,
      value: "Poover",
    },
    {
      key: 5,
      value: "Replace",
    },
  ];
  regions = [
    "Sepang",
    "Kuala Lumpur",
    "Petaling",
    "Gombak",
    "Hulu Langat",
    "Hulu Selangor",
    "Klang",
    "Kuala Selangor",
    "Kuala Langat",
    "Sabak Bernam",
  ];
  treatmentPlants = [
    "BOOSTER IXORA PUMP HOUSE",
    "TAMAN DAHLIA PUMP HOUSE",
    "TAMAN SEROJA PUMP HOUSE",
  ];
  assetActions = [
    "Asset Registration",
    "Retire",
    "Asset Return",
    "Stock Return",
    "Return to Vendor",
    "Stock Count",
  ];
  assettypes = [];

  // lists
  serviceHistorys = [
    {
      serviceid: "SERVICE-2020-00019",
      servicedate: "10 March 2020",
      servicedesc: "This service conducted at Petaling zone by 5 members......",
    },
    {
      serviceid: "SERVICE-2020-00018",
      servicedate: "7 March 2020",
      servicedesc: "They have an accident occured at Sepang region that......",
    },
    {
      serviceid: "SERVICE-2020-00017",
      servicedate: "5 March 2020",
      servicedesc: "Service at Kuala Lumpur have been done at......",
    },
    {
      serviceid: "SERVICE-2020-00016",
      servicedate: "3 March 2020",
      servicedesc: "Done service at Hulu Langat zone at......",
    },
    {
      serviceid: "SERVICE-2020-00015",
      servicedate: "1 March 2020",
      servicedesc: "Gombak service have done at complete at......",
    },
  ];

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    // centeredSlides: true
  };

  role;

  constructor(
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public menu: MenuController,
    public platform: Platform,
    // private barcodeScanner: BarcodeScanner,
    private route: ActivatedRoute,
    private router: Router,
    private assettypeService: AssetTypesService,
    public notificationService: NotificationsService,
    private operationalreadingService: OperationalReadingsService
  ) {
    this.assetdetailFormGroup = this.formBuilder.group({
      rfid_id: new FormControl(""),
      qrcode_id: new FormControl(""),
      id: new FormControl(""),
      primary_category: new FormControl(""),
      asset_name: new FormControl(""),
      maintenance_specification: new FormControl(""),
      rating: new FormControl(""),
      level_2: new FormControl(""),
      location: new FormControl(""),
      asset: new FormControl(""),
    });

    this.operationalreadingFormGroup = this.formBuilder.group({
      running_hours: new FormControl(""),
      pressure_reading: new FormControl(""),
      flow_rate: new FormControl(""),
      asset: new FormControl(""),
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        let state = this.router.getCurrentNavigation().extras.state;

        if (state.locationName) {
          this.assetdetailFormGroup.value.location = state.locationName;
        }

        if (state.qrcode) {
          this.assetdetailFormGroup.patchValue({
            qrcode_id: state.qrcode,
          });
          this.assetdetailFormGroup.value.id =
            "2d4aac7f-debe-4c32-b169-9e79de3c926d";
        }
      }
    });
  }

  ngOnInit() {
    this.assettypeService.get().subscribe(
      (res) => {
        this.assettypes = res.filter(function (data) {
          if (data.category.toString().toLowerCase().indexOf("at") !== -1)
            return true;
          return false;
        });
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request is completed");
      }
    );
  }

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: "/technical/tabs/tab2",
      },
    };
    this.router.navigate(["/technical/qr-scanner"], navigationExtras);

    // this.barcodeScanner
    //   .scan({ prompt: "Place a QR code to scan inside the scan area" })
    //   .then(barcodeData => {
    //     console.log("Barcode data", barcodeData);
    //   })
    //   .catch(err => {
    //     console.log("Error", err);
    //   });
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
