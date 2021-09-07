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
import { WorkOrderActivityCompletionService } from 'src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service';
import { element } from 'protractor';

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
    private workactivityemployeeService: WorkActivityEmployeeService,
    private workOrderActivityCompletionService: WorkOrderActivityCompletionService
  ) {
    console.log("this.authService>>", this.authService)
    console.log("this.authService.userID", this.authService.userID)
    this.userService.getOne(this.authService.userID).subscribe(
      (res) => {
        console.log("authService res", res)
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  userid = ''
  ionViewDidEnter() {
    this.userid = this.authService.userID
    console.log("this.authService.userID ionViewDidEnter", this.authService.userID)
    console.log("ionViewDidEnter HomePage");

    let woacArr: any[]

    // setInterval(() => {

    // this.workOrderActivityCompletionService.get().subscribe(
    let objUser = {
      userid: this.authService.userID
    }
    this.workOrderActivityCompletionService.asc_ordered_list(objUser).subscribe((res) => {
      console.log("res", res);

      woacArr = res;
      woacArr.forEach(element => {

        // console.log("currentDate", this.getCurrentDateTime())
        // console.log("required_by_dt", element.required_by_dt)

        if (element.required_by_dt < this.getCurrentDateTime()) {

          if (element['status'] != 'Completed' || element['status'] != 'BackLog') {
            let obj = {
              status: 'BackLog'
            }
            // console.log("backlog")

            element.status = 'BackLog'
            this.workactivities.push(element)
            // this.workactivities.push(element)

            this.workOrderActivityCompletionService.update(element['id'], obj).subscribe(
              (resUp) => {
                // console.log("resUp", resUp)
              }, (errUp) => {
                // console.log("errUp", errUp)
              }
            )
          } else {

            console.log("completed")
            this.workactivities.push(element)

          }
        } else {
          console.log("New")
          this.workactivities.push(element)
        }
      })
    },
      (err) => {
        console.error("err", err);
      }
    );

    // }, 10000);

    this.workactivityemployeeService
      .get_dashboard_status_statistic({
        employee_id: this.authService.userID,
      })
      .subscribe((res) => {
        this.workorderactivitycompletionstatus = res;
      });
  }

  getCurrentDateTime() {
    let selectedDate = new Date();
    let year = selectedDate.getFullYear();
    let month =
      selectedDate.getMonth() + 1 < 10
        ? "0" + (selectedDate.getMonth() + 1)
        : selectedDate.getMonth() + 1;
    let day =
      selectedDate.getDate() < 10
        ? "0" + selectedDate.getDate()
        : selectedDate.getDate();
    let formatDate = year + "-" + month + "-" + day;

    let hour =
      selectedDate.getHours() < 10
        ? "0" + selectedDate.getHours()
        : selectedDate.getHours();
    let minute =
      selectedDate.getMinutes() < 10
        ? "0" + selectedDate.getMinutes()
        : selectedDate.getMinutes();
    let second =
      selectedDate.getSeconds() < 10
        ? "0" + selectedDate.getSeconds()
        : selectedDate.getSeconds();
    let formatTime = hour + ":" + minute + ":" + second;

    // return formatDate + "T" + formatTime + "Z";
    return formatDate;
  }

  ngOnInit() {

    console.log("this.authService.userID ngOnInit", this.authService.userID)
    let objUser = {
      userid: this.authService.userID
    }
    this.getWorkActivities(objUser)

    setInterval(() => {
      this.getWorkActivities(objUser)
    }, 10000);

  }

  initializeItems() { }

  async notesAlert() {
    const alert = await this.alertController.create({
      header: "Notes",
      message:
        "Your submission is rejected due to wrong asset information. Please resubmit again. Thank you.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  workOrderActComp: any = []
  getWorkActivities(objUser) {
    let array: any = []
    let userId = this.authService.userID
    console.log("userId >>>>>>>>>", userId)
    this.workOrderActivityCompletionService.asc_ordered_list(objUser).subscribe(
      (res) => {
        console.log("workOrderActivityCompletionService_res", res);
        res.forEach(function (data) {
          if (data.field_2 == userId || data.field_2 == '') {
            array.push(data)
          } else {
            console.log('tak sama user id')
          }
        })
        this.workOrderActComp = array
        //this.workOrderActComp = res
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request is completed");
      }
    );

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
          handler: () => { },
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

  calculateStatus(array, status) {
    // console.log("calculateStatus array>>>", array)
    // console.log("temparray=====", array)
    // console.log("status=====", status)
    // let count = 0;
    // for (let i = 0; i < this.workactivities.length; i++) {
    //   if (this.workactivities[i].bo_status === status) count++;
    // }
    // return count;

    // Overall status
    // if (this.workorderactivitycompletionstatus) {
    //   if (this.workorderactivitycompletionstatus.queryset_overall.length > 0) {
    //     let result =
    //       this.workorderactivitycompletionstatus.queryset_overall.find(
    //         (obj) => {
    //           return obj.status == status;
    //         }
    //       );
    //     if (result) {
    //       return result.total_status ? result.total_status : 0;
    //     } else return 0;
    //   } else return 0;
    // } else return 0;


    if (array.length > 0) {
      let tempArray = array.filter(function (data) {
        if (
          data.status
            .toLowerCase()
            .indexOf(status.toLowerCase()) !== -1
        )
          return true;
        return false;
      });
      return tempArray.length > 0 ? tempArray.length : 0;
    } else {
      return 0;
    }
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

  async alertWarning(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['ok'],
    });

    await alert.present();
  }
}
