import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { InventoryInfoPage } from "../inventory-info/inventory-info.page";

@Component({
  selector: "app-maintenance-work-detail",
  templateUrl: "./maintenance-work-detail.page.html",
  styleUrls: ["./maintenance-work-detail.page.scss"],
})
export class MaintenanceWorkDetailPage implements OnInit {
  type: string = "pending";
  role;
  category: number = 99;
  categorys = [
    {
      value: 99,
      name: "All",
    },
    {
      value: 1,
      name: "New",
    },
    {
      value: 2,
      name: "In Progress",
    },
    {
      value: 3,
      name: "Backlog",
    },
  ];
  items: any[];
  data: any;

  // lists
  pendings = [
    {
      type: this.data,
      date: "14 February 2020",
      desc: "Maintenance need to do at Petaling zone near......",
      color: "success",
      status: 1,
    },
    {
      type: this.data,
      date: "12 February 2020",
      desc: "There have a water leakage at Sepang zone that......",
      color: "warning",
      status: 2,
    },
    {
      type: this.data,
      date: "13 February 2020",
      desc: "Need to replace components at Kuala Lumpur zone......",
      color: "danger",
      status: 3,
    },
    {
      type: this.data,
      date: "11 February 2020",
      desc: "Gombak have a water disrupted at 10.00 am......",
      color: "danger",
      status: 3,
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

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.type;
      }
    });
  }

  ngOnInit() {
    this.items = this.pendings;
  }

  initializeItems(): void {
    this.pendings = this.items;
  }

  categorySelect() {
    this.initializeItems();

    this.pendings = this.pendings.filter((pending) => {
      if (this.category === 99) return true;
      else return pending.status === this.category;
    });
  }

  async notesAlert() {
    const alert = await this.alertController.create({
      header: "Notes",
      message:
        "Your submission is rejected due to wrong asset information. Please resubmit again. Thank you.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async openInfo() {
    const myModal = await this.modalController.create({
      component: InventoryInfoPage,
      cssClass: "my-custom-modal-css",
    });
    return await myModal.present();
  }

  async clickLogout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }, {
          text: 'Yes, logout it!',
          handler: () => {
            this.router.navigate(['/']);
          }
        }
      ]
    });

    await alert.present();
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }
}
