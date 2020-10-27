import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { MenuController, ModalController } from "@ionic/angular";

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

    this.router.navigate(["/technical/work-request"]);
  }

  async clickEdit(workrequest) {
    console.log(workrequest);
    // const modal = await this.modalController.create({
    //   component: WorkRequestPage,
    //   componentProps: { workrequest: workrequest }
    // });
    // return await modal.present();
    let navigationExtras: NavigationExtras = {
      state: {
        workrequest,
      },
    };

    this.router.navigate(["/technical/work-request"], navigationExtras);
  }

  clickRemove(index: number) {
    this.workrequests.splice(index, 1);
  }
}
