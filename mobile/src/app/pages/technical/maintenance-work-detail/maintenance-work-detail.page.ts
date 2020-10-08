import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  AlertController,
  MenuController,
  ModalController,
} from "@ionic/angular";
import { InventoryInfoPage } from "../inventory-info/inventory-info.page";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";

@Component({
  selector: "app-maintenance-work-detail",
  templateUrl: "./maintenance-work-detail.page.html",
  styleUrls: ["./maintenance-work-detail.page.scss"],
})
export class MaintenanceWorkDetailPage implements OnInit {
  type: string = "pending";
  role;
  category: number = 99;
  startdatePending: any;
  enddatePending: any;
  categorys = [
    {
      value: 99,
      name: "All",
    },
    {
      value: "NW",
      name: "New",
    },
    {
      value: "IP",
      name: "In Progress",
    },
    {
      value: "BL",
      name: "Backlog",
    },
  ];
  items: any[];
  data: any;
  maintenance_work: any;

  // lists
  pendings = [];
  completeds = [
    // {
    //   id: "WORKORDER-2020-00011",
    //   desc: "Services have been done at Petaling zone at......",
    // },
    // {
    //   id: "WORKORDER-2020-00009",
    //   desc: "Kuala Lumpur service have been completed at......",
    // },
    // {
    //   id: "WORKORDER-2020-00007",
    //   desc: "Sepang zone water disruption have been lifted off at......",
    // },
    // {
    //   id: "WORKORDER-2020-00006",
    //   desc: "Gombak zone have been completely run so far so good......",
    // },
    // {
    //   id: "WORKORDER-2020-00005",
    //   desc: "Hulu Langat area have back to normal......",
    // },
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
  workactivitytypes = [
    {
      value: "PM",
      display_name: "PREVENTIVE-MAINTENANCE",
    },
    {
      value: "PI",
      display_name: "PUMP-INSPECTION",
    },
    {
      value: "MI",
      display_name: "MOTOR-INSPECTION",
    },
    {
      value: "SP",
      display_name: "STARTER-PANEL-INSPECTION",
    },
  ];

  constructor(
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    public notificationService: NotificationsService,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.type;
        this.maintenance_work = this.router.getCurrentNavigation().extras.state.maintenance_work;

        this.pendings = this.maintenance_work.filter((data) => {
          if (data.status.toString().toLowerCase().indexOf("nw") !== -1)
            return true;
          if (data.status.toString().toLowerCase().indexOf("ip") !== -1)
            return true;
          if (data.status.toString().toLowerCase().indexOf("bl") !== -1)
            return true;
          return false;
        });
      }
    });
  }

  ngOnInit() {
    this.menu.enable(false, "menuNotification");

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

  dateSelectPending() {
    this.initializeItems();

    console.log("startdatePending", this.startdatePending);
    console.log("enddatePending", this.enddatePending);

    // this.pendings = this.pendings.filter((pending) => {
    //   if (this.startdatePending && this.enddatePending) {
    //     if (
    //       pending.created_at.getDate() >= this.startdatePending.getDate() &&
    //       pending.created_at.getDate() <= this.enddatePending.getDate()
    //     )
    //       return pending;
    //   }
    // });
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

  clickWorkActivity(work_order) {
    let navigationExtras: NavigationExtras = {
      state: {
        work_order,
      },
    };
    // this.router.navigate(['/technical/work-order'], navigationExtras);
    // this.router.navigate(["/technical/qr-scanner"], navigationExtras);
    this.router.navigate(["/technical/work-activity", navigationExtras]);
  }

  pendingColor(status: string) {
    if (status == "NW") return "success";
    if (status == "IP") return "warning";
    if (status == "BL") return "danger";
  }

  getWorkActivityType(value) {
    let result = this.workactivitytypes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
