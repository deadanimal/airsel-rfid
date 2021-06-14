import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  MenuController,
  ModalController,
} from "@ionic/angular";
import { InventoryInfoPage } from "../inventory-info/inventory-info.page";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { WorkActivitiesService } from "src/app/shared/services/work-activities/work-activities.service";
import { WorkActivityEmployeeService } from "src/app/shared/services/work-activity-employee/work-activity-employee.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  providers: [DatePipe],
})
export class HomePage implements OnInit {
  workactivities = [];
  workorderactivitycompletionstatus: any;

  constructor(
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    private router: Router,
    private authService: AuthService,
    public notificationService: NotificationsService,
    private userService: UsersService,
    private workactivityService: WorkActivitiesService,
    private workactivityemployeeService: WorkActivityEmployeeService
  ) {
    this.userService.getOne(this.authService.userID).subscribe(
      (res) => {
        // if (res) console.log("res", res);
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter HomePage");

    this.workactivityService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.workactivities = res;
      },
      (err) => {
        console.error("err", err);
      }
    );

    this.workactivityemployeeService
      .get_dashboard_status_statistic({
        employee_id: this.authService.userID,
      })
      .subscribe((res) => {
        this.workorderactivitycompletionstatus = res;
      });
  }

  ngOnInit() {}

  initializeItems() {}

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

  calculateStatus(status: string) {
    // let count = 0;
    // for (let i = 0; i < this.workactivities.length; i++) {
    //   if (this.workactivities[i].bo_status === status) count++;
    // }
    // return count;

    // Overall status
    if (this.workorderactivitycompletionstatus) {
      if (this.workorderactivitycompletionstatus.queryset_overall.length > 0) {
        let result =
          this.workorderactivitycompletionstatus.queryset_overall.find(
            (obj) => {
              return obj.status == status;
            }
          );
        if (result) {
          return result.total_status ? result.total_status : 0;
        } else return 0;
      } else return 0;
    } else return 0;
  }

  calculateToday(status: string) {
    // let count = 0;
    // for (let i = 0; i < this.workactivities.length; i++) {
    //   if (this.workactivities[i].bo_status === status) {
    //     let received_date = this.datePipe.transform(
    //       this.workactivities[i].record_date,
    //       "yyyy-MM-dd"
    //     );
    //     let to_date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    //     if (received_date === to_date) count++;
    //   }
    // }
    // return count;

    // Today status
    if (this.workorderactivitycompletionstatus) {
      if (this.workorderactivitycompletionstatus.queryset_today.length > 0) {
        let result = this.workorderactivitycompletionstatus.queryset_today.find(
          (obj) => {
            return obj.status == status;
          }
        );
        if (result) {
          return result.total_status ? result.total_status : 0;
        } else return 0;
      } else return 0;
    } else return 0;
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }
}
