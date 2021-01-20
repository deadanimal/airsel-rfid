import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  MenuController,
  ModalController,
} from "@ionic/angular";

import { WorkRequestPage } from "../work-request/work-request.page";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkRequestsService } from "src/app/shared/services/work-requests/work-requests.service";

@Component({
  selector: "app-work-request-list",
  templateUrl: "./work-request-list.page.html",
  styleUrls: ["./work-request-list.page.scss"],
})
export class WorkRequestListPage implements OnInit {
  // List
  workrequests = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private workrequestService: WorkRequestsService
  ) {}

  getWorkRequest() {
    this.workrequestService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.workrequests = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ionViewDidEnter() {
    this.getWorkRequest();
  }

  ngOnInit() {}

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  async clickNew() {
    // const modal = await this.modalController.create({
    //   component: WorkRequestPage,
    // });
    // modal.onDidDismiss().then((data) => {
    //   if (data.data) this.workrequests.push(data.data);
    // });
    // return await modal.present();

    // this.router.navigate(["/technical/work-request"]);

    const actionSheet = await this.actionSheetController.create({
      header: "Choose method",
      buttons: [
        {
          text: "RFID",
          icon: "scan",
          handler: () => {
            console.log("RFID clicked");
          },
        },
        {
          text: "QR Code",
          icon: "qr-code",
          handler: () => {
            console.log("QR Code clicked");
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
              this.router.navigate(
                ["/technical/work-request"],
                navigationExtras
              );
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

  async clickEdit(workrequest) {
    let navigationExtras: NavigationExtras = {
      state: {
        workrequest,
        process: "view",
      },
    };

    this.router.navigate(["/technical/work-request"], navigationExtras);
  }

  clickRemove(index: number) {
    this.workrequests.splice(index, 1);
  }
}
