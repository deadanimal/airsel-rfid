import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { MenuController, ModalController } from "@ionic/angular";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { OperationalReadingsService } from "src/app/shared/services/operational-readings/operational-readings.service";

@Component({
  selector: "app-operational-reading-list",
  templateUrl: "./operational-reading-list.page.html",
  styleUrls: ["./operational-reading-list.page.scss"],
})
export class OperationalReadingListPage implements OnInit {
  // List
  operationalreadings = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private operationalreadingService: OperationalReadingsService
  ) {}

  getOperationalReading() {
    this.operationalreadingService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.operationalreadings = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ionViewDidEnter() {
    this.getOperationalReading();
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
    this.router.navigate(["/technical/operational-reading"]);
  }

  async clickEdit(operationalreading) {
    let navigationExtras: NavigationExtras = {
      state: {
        operationalreading: operationalreading,
      },
    };

    this.router.navigate(["/technical/operational-reading"], navigationExtras);
  }

  clickRemove(index: number) {
    this.operationalreadings.splice(index, 1);
  }
}
