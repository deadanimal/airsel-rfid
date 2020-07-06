import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

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
    private router: Router
  ) {}

  ngOnInit() {}

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
}
