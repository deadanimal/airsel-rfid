import { Component, OnInit, NgZone } from "@angular/core";
import { AlertController, ModalController, ActionSheetController } from "@ionic/angular";
import { ListItemPage } from '../list-item/list-item.page';
import { NavigationExtras, Router } from "@angular/router";
import { InventoryGrnService } from 'src/app/shared/services/inventory-grn/inventory-grn.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";

@Component({
  selector: 'app-stock-receive',
  templateUrl: './stock-receive.page.html',
  styleUrls: ['./stock-receive.page.scss'],
})
export class StockReceivePage implements OnInit {
  type: string = "toreceive";
  category: string = "All";
  categorys = ["All", "CM", "PM"];
  items: any[];

  private logs = new Array<string>();
  public scanValue: any;
  bBarcode: boolean = false;
  bRfid: boolean = false;

  // Loading
  isLoading: boolean = false;

  // lists
  pendings = [
    {
      type: "CM",
      date: "14 February 2020",
      desc: "Maintenance need to do at Petaling zone near......",
      color: "success"
    },
    {
      type: "CM",
      date: "12 February 2020",
      desc: "There have a water leakage at Sepang zone that......",
      color: "warning"
    },
    {
      type: "PM",
      date: "13 February 2020",
      desc: "Need to replace components at Kuala Lumpur zone......",
      color: "danger"
    },
    {
      type: "PM",
      date: "11 February 2020",
      desc: "Gombak have a water disrupted at 10.00 am......",
      color: "danger"
    },
  ];
  completeds = [
    {
      id: "WORKORDER-2020-00011",
      desc: "Services have been done at Petaling zone at......",
    },
    {
      id: "WORKORDER-2020-00009",
      desc: "Kuala Lumpur service have been completed at......",
    },
    {
      id: "WORKORDER-2020-00007",
      desc: "Sepang zone water disruption have been lifted off at......",
    },
    {
      id: "WORKORDER-2020-00006",
      desc: "Gombak zone have been completely run so far so good......",
    },
    {
      id: "WORKORDER-2020-00005",
      desc: "Hulu Langat area have back to normal......",
    },
  ];
  approvals = [
    {
      dateOfSubmission: "2020-03-03",
      assetName: "SLUICE VALVE-SLUICE VALVE-GROUND-200-MM",
      quantity: "11",
      status: "approve",
    },
    {
      dateOfSubmission: "2020-03-02",
      assetName: "SLUICE VALVE-SCOUR VALVE-GROUND-150-MM",
      quantity: "7",
      status: "reject",
    },
    {
      dateOfSubmission: "2020-03-01",
      assetName: "MECHANICAL LEVEL INDICATOR-LEVEL INDICATOR-ABOVE GROUND",
      quantity: "5",
      status: "reject",
    },
    {
      dateOfSubmission: "2020-03-01",
      assetName: "MECHANICAL LEVEL INDICATOR-LEVEL INDICATOR-ABOVE GROUND",
      quantity: "5",
      status: "pending",
    },
    {
      dateOfSubmission: "2020-03-01",
      assetName: "MECHANICAL LEVEL INDICATOR-LEVEL INDICATOR-ABOVE GROUND",
      quantity: "5",
      status: "pending",
    },
  ];

  // Form
  stockReceiveForm: FormGroup;

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public modalController: ModalController,
    private ngZone: NgZone,
    private router: Router,
    private inventoryGrnService: InventoryGrnService,
    // private formBuilder: FormBuilder
  ) { }

  private L(...args: any[]) {
    let v = args.join(" ");
    console.log(v);
    this.ngZone.run(() => {
      this.logs.push(v);
    });
  }

  ngOnInit() {
    this.onRegister2DBarcodeListener();
    this.onRegisterRFIDListener();
    this.items = this.pendings;

    // this.stockReceiveForm = this.formBuilder.group({

    // username: new FormControl(
    //   // "hafez.azman@airselangor.com", /// technician 
    //   "testing", // inventory
    //   Validators.compose([
    //     Validators.required,
    //     // Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
    //     // Validators.email,
    //   ])
    // ),
    // password: new FormControl(
    //   // "airselrfid@2020",
    //   "PabloEscobar",
    //   Validators.compose([Validators.minLength(6), Validators.required])
    // ),
    // })
  }

  updateData(data) {
    console.log('data = ', data)
    this.ngZone.run(() => {
      this.scanValue = data;
      alert(this.scanValue);
    });

    // // start update data with service
    // this.isLoading = true;
    // this.inventoryGrnService.post(this.stockReceiveForm.value).subscribe(
    //   (res) => {
    //     // Success
    //     this.isLoading = false;
    //     console.log('res = ', res)
    //   },
    //   () => {
    //     // Failed
    //     this.isLoading = false;
    //   },
    //   () => {
    //     // After
    //     // this.toastr.openToastr("Welcome back");
    //     // this.navigateByRole(this.authService.userType);
    //   }
    // );
    // // end
  }

  onRegister2DBarcodeListener() {
    console.log("[register onRegister2DBarcodeListener] ");
    const ev = "com.scanner.broadcast";
    var isGlobal = true;

    var listener = (event) => {
      console.log(JSON.stringify(event));

      if (event.SCAN_STATE == "success") {
        this.ngZone.run(() => {
          if (this.bBarcode) {
            this.updateData(event.data);
          }
        });
      }
    };
    // broadcaster.addEventListener(ev, isGlobal, listener);
  }

  onRegisterRFIDListener() {
    console.log("[register onRegisterRFIDListener] ");
    const ev = "android.intent.action.scanner.RFID";
    var isGlobal = true;

    var listener = (event) => {
      console.log(JSON.stringify(event));

      if (event.SCAN_STATE == "success") {
        this.ngZone.run(() => {
          if (this.bRfid) {
            this.updateData(event.data);
          }
        });
      }
    };
    // broadcaster.addEventListener(ev, isGlobal, listener);
  }

  async scan() {
    const actionSheet = await this.actionSheetController.create({
      header: "Choose method",
      buttons: [
        {
          text: "RFID",
          icon: "scan",
          handler: () => {
            console.log("RFID clicked");
            this.bBarcode = false;
            this.bRfid = true;
          },
        },
        {
          text: "QR Code",
          icon: "qr-code",
          handler: () => {
            console.log("QR Code clicked");
            this.bBarcode = true;
            this.bRfid = false;
          },
        },
        {
          text: "Badge No.",
          icon: "search",
          handler: () => {
            console.log("Badge No. clicked");
            this.searchBadgeNo();
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

  async searchBadgeNo() {
    const alert = await this.alertController.create({
      header: "Badge No.",
      message: "Enter a badge number to search the asset",
      inputs: [
        {
          name: "badge_no",
          type: "text",
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
                },
              };
              this.router.navigate(["/technical/tabs/tab2"], navigationExtras);
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

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
