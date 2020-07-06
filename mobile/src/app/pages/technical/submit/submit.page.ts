import { Component, OnInit } from "@angular/core";
import { AlertController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-submit",
  templateUrl: "./submit.page.html",
  styleUrls: ["./submit.page.scss"],
})
export class SubmitPage implements OnInit {
  assets = [
    {
      assetId: "123-XX",
      action: "Asset Registration",
      assetName: "Pump",
      assetLocation: "TAMAN DAHLIA PUMP HOUSE",
    },
    {
      assetId: "125-KP",
      action: "Asset Return",
      assetName: "Valve",
      assetLocation: "TAMAN DAHLIA PUMP HOUSE",
    },
    {
      assetId: "999-ZZ",
      action: "Retire",
      assetName: "Pump",
      assetLocation: "TAMAN DAHLIA PUMP HOUSE",
    },
  ];

  constructor(
    public alertController: AlertController,
    public menu: MenuController
  ) {}

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
  }

  async submitAlert() {
    const alert = await this.alertController.create({
      header: "Submit",
      message:
        "Your asset is successfully submitted into the system. Thank you.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async deleteAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Delete",
      message: "DO you want to delete this asset?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("no clicked");
          },
        },
        {
          text: "Yes",
          handler: () => {
            console.log("yes clicked");
          },
        },
      ],
    });

    await alert.present();
  }
}
