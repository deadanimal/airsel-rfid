import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";

import { ApprovalProfileService } from "src/app/shared/services/approval-profile/approval-profile.service";

@Component({
  selector: "app-approval-profile",
  templateUrl: "./approval-profile.page.html",
  styleUrls: ["./approval-profile.page.scss"],
})
export class ApprovalProfilePage implements OnInit {
  // Data
  approvalprofiles = [];
  items = [];

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    private approvalprofileService: ApprovalProfileService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.approvalprofileService.get().subscribe(
      (res) => {
        this.approvalprofiles = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.initializeItems();
      }
    );
  }

  initializeItems() {
    this.items = this.approvalprofiles;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== "") {
      this.items = this.items.filter((item) => {
        return item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  closeModal(data) {
    if (data) {
      this.presentAlertConfirm(data);
    } else this.modalController.dismiss("");
  }

  async presentAlertConfirm(data) {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: `Do you want to choose this approval profile (${data.description})?`,
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            this.modalController.dismiss(data.approval_profile);
          },
        },
      ],
    });

    await alert.present();
  }
}
