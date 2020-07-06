import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { InventoryInfoPage } from "../inventory-info/inventory-info.page";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  type: string = "pending";
  role;
  category: string = "All";
  categorys = ["All", "New", "In Progress", "Pending"];
  items: any[];

  accordionIcon: string = "arrow-up-circle";
  showAccordion: boolean = true;

  // lists
  pendings = [
    {
      type: "CM",
      date: "14 February 2020",
      desc: "Maintenance need to do at Petaling zone near......",
      color: "success",
    },
    {
      type: "CM",
      date: "12 February 2020",
      desc: "There have a water leakage at Sepang zone that......",
      color: "warning",
    },
    {
      type: "PM",
      date: "13 February 2020",
      desc: "Need to replace components at Kuala Lumpur zone......",
      color: "danger",
    },
    {
      type: "PM",
      date: "11 February 2020",
      desc: "Gombak have a water disrupted at 10.00 am......",
      color: "danger",
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

  serviceHistorys = [
    {
      serviceid: "SERVICE-2020-00019",
      servicedate: "10 March 2020",
      servicedesc: "This service conducted at Petaling zone by 5 members......"
    },
    {
      serviceid: "SERVICE-2020-00018",
      servicedate: "7 March 2020",
      servicedesc: "They have an accident occured at Sepang region that......"
    },
    {
      serviceid: "SERVICE-2020-00017",
      servicedate: "5 March 2020",
      servicedesc: "Service at Kuala Lumpur have been done at......"
    },
    {
      serviceid: "SERVICE-2020-00016",
      servicedate: "3 March 2020",
      servicedesc: "Done service at Hulu Langat zone at......"
    },
    {
      serviceid: "SERVICE-2020-00015",
      servicedate: "1 March 2020",
      servicedesc: "Gombak service have done at complete at......"
    }
  ];

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
  };

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = this.pendings;
  }

  initializeItems(): void {
    this.pendings = this.items;
  }

  categorySelect() {
    this.initializeItems();

    this.pendings = this.pendings.filter((pending) => {
      if (this.category == "All") return true;
      else
        return (
          pending.type.toLowerCase().indexOf(this.category.toLowerCase()) > -1
        );
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

  openPage(route: string) {
    this.router.navigate([route]);
  }

  clickAccordion() {
    this.showAccordion = !this.showAccordion;
    if (this.showAccordion) this.accordionIcon = "arrow-up-circle";
    if (!this.showAccordion) this.accordionIcon = "arrow-down-circle";
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
