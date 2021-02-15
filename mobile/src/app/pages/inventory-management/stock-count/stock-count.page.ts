import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ListItemPage } from '../list-item/list-item.page';

@Component({
  selector: 'app-stock-count',
  templateUrl: './stock-count.page.html',
  styleUrls: ['./stock-count.page.scss'],
})
export class StockCountPage implements OnInit {
  type: string = "toreceive";
  category: string = "All";
  categorys = ["All", "CM", "PM"];
  items: any[];

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

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
  ) { }

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

  async openListItem() {
    const modal = await this.modalController.create({
      component: ListItemPage
    });
    return await modal.present();
  }
}
