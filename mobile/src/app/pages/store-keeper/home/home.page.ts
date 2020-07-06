import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ListItemPage } from '../list-item/list-item.page';

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  type: string = "toreceive";
  items: any[];
  toreceives = [
    {
      purchaseOrder: "364576",
      dateDelivery: "20 Apr 2020",
    },
    {
      purchaseOrder: "645783",
      dateDelivery: "19 Apr 2020",
    },
    {
      purchaseOrder: "546735",
      dateDelivery: "17 Apr 2020",
    },
    {
      purchaseOrder: "763245",
      dateDelivery: "14 Apr 2020",
    },
    {
      purchaseOrder: "154678",
      dateDelivery: "11 Apr 2020",
    },
  ];

  constructor(
    public alertController: AlertController,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  async openList() {
    const modal = await this.modalController.create({
      component: ListItemPage
    });
    return await modal.present();
  }
}
