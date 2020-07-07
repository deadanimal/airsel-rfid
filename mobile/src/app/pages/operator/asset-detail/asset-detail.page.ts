import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: "app-asset-detail",
  templateUrl: "./asset-detail.page.html",
  styleUrls: ["./asset-detail.page.scss"],
})
export class AssetDetailPage implements OnInit {
  action;

  // dropdowns
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
    centeredSlides: true,
  };

  assetDetail = {
    locationName: "",
    condition: "",
  };

  constructor(
    public alertController: AlertController,
    public menu: MenuController,
    // private barcodeScanner: BarcodeScanner,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.assetDetail.locationName = this.router.getCurrentNavigation().extras.state.locationName;
      }
    });
  }

  ngOnInit() {}

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: "/operator/tabs/tab2",
      },
    };
    this.router.navigate(["/operator/qr-scanner"], navigationExtras);

    // this.barcodeScanner
    //   .scan()
    //   .then(barcodeData => {
    //     console.log("Barcode data", barcodeData);
    //   })
    //   .catch(err => {
    //     console.log("Error", err);
    //   });
  }

  async clickLogout() {
    const alert = await this.alertController.create({
      header: "Logout",
      message: "Are you want to logout?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Yes, logout it!",
          handler: () => {
            this.router.navigate(["/"]);
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
}
