import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  AlertController,
  MenuController,
  ModalController,
} from "@ionic/angular";
import { InventoryInfoPage } from "../inventory-info/inventory-info.page";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkActivitiesService } from "src/app/shared/services/work-activities/work-activities.service";

@Component({
  selector: "app-maintenance-work-detail",
  templateUrl: "./maintenance-work-detail.page.html",
  styleUrls: ["./maintenance-work-detail.page.scss"],
})
export class MaintenanceWorkDetailPage implements OnInit {
  // type: string = "pending";
  category: number = 99;
  startdatePending: any;
  enddatePending: any;
  categorys = [
    {
      value: 99,
      name: "All",
    },
    {
      value: "New",
      name: "New",
    },
    {
      value: "InProgress",
      name: "InProgress",
    },
    {
      value: "BackLog",
      name: "BackLog",
    },
  ];
  items: any[];
  type = "";
  status = "";
  image = "";
  name = "";
  maintenance_work: any;

  // List
  pendings = [];
  completeds = [];
  workactivities = [];
  workactivitiesData: any[];

  // FormGroup
  workactivityFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    public notificationService: NotificationsService,
    private workactivityService: WorkActivitiesService
  ) {
    this.workactivityFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      bo_status: new FormControl(""),
      asset_id: new FormControl(""),
      asset_type: new FormControl(""),
      badge_number: new FormControl(""),
      serial_number: new FormControl(""),
      detailed_description: new FormControl(""),
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.type = this.router.getCurrentNavigation().extras.state.type;
        this.status = this.router.getCurrentNavigation().extras.state.status;
        this.workactivities = this.router.getCurrentNavigation().extras.state.work_activity;
        console.log("this.workactivities = ", this.workactivities)
        this.image = '../../../../assets/technical/' + this.router.getCurrentNavigation().extras.state.image;
        this.name = this.router.getCurrentNavigation().extras.state.name;

        this.pendings = this.maintenance_work.filter((data) => {

          if (data.bo_status.toString().indexOf("New") !== -1) return true;
          this.workactivitiesData.push(data)
          if (data.bo_status.toString().indexOf("InProgress") !== -1)
            return true;
          if (data.bo_status.toString().indexOf("BackLog") !== -1) return true;


          return false;
        });

        this.completeds = this.maintenance_work.filter((data) => {
          if (data.bo_status.toString().indexOf("Completed") !== -1)
            return true;
          return false;
        });

        // filter status based on BO_STATUS_CD from WAMS
        this.pendings = this.maintenance_work.filter((data) => {
          if (data.BO_STATUS_CD.toString().toLowerCase().indexOf("nw") !== -1)
            return true;
          if (data.BO_STATUS_CD.toString().toLowerCase().indexOf("ip") !== -1)
            return true;
          if (data.BO_STATUS_CD.toString().toLowerCase().indexOf("bl") !== -1)
            return true;
          return false;
        });

        this.completeds = this.maintenance_work.filter((data) => {
          if (data.BO_STATUS_CD.toString().toLowerCase().indexOf("active") !== -1)
            return true;
          return false;
        });
      }
    });
  }

  ngOnInit() {
    this.menu.enable(false, "menuNotification");

    this.items = this.pendings;
  }

  initializeItems(): void {
    this.pendings = this.items;
  }

  categorySelect() {
    this.initializeItems();

    this.pendings = this.pendings.filter((pending) => {
      if (this.category === 99) return true;
      else return pending.bo_status === this.category;
    });
  }

  dateSelectPending() {
    this.initializeItems();

    console.log("startdatePending", this.startdatePending);
    console.log("enddatePending", this.enddatePending);

    // this.pendings = this.pendings.filter((pending) => {
    //   if (this.startdatePending && this.enddatePending) {
    //     if (
    //       pending.created_at.getDate() >= this.startdatePending.getDate() &&
    //       pending.created_at.getDate() <= this.enddatePending.getDate()
    //     )
    //       return pending;
    //   }
    // });
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

  async openInfo() {
    const myModal = await this.modalController.create({
      component: InventoryInfoPage,
      cssClass: "my-custom-modal-css",
    });
    return await myModal.present();
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

  homePage(path: string) {
    this.router.navigate([path]);
  }

  clickWorkActivity(work_activity) {
    if (work_activity.bo_status == "New") {
      this.workactivityFormGroup.patchValue({
        ...work_activity,
        bo_status: "InProgress",
      });
      this.workactivityService
        .update(work_activity.id, this.workactivityFormGroup.value)
        .subscribe(
          (res) => {
            console.log("res", res);
          },
          (err) => {
            console.error("err", err);
          }
        );

      work_activity.status = "InProgress";
    }
    let navigationExtras: NavigationExtras = {
      state: {
        work_activity: work_activity,
      },
    };
    console.log("navigationExtras = ", navigationExtras)
    // this.router.navigate(['/technical/work-order'], navigationExtras);
    // this.router.navigate(["/technical/qr-scanner"], navigationExtras);
    this.router.navigate(["/technical/work-activity"], navigationExtras);
  }

  pendingColor(status: string) {
    if (status == "New") return "success";
    if (status == "InProgress") return "warning";
    if (status == "BackLog") return "danger";
  }

  clickBack() {
    this.router.navigate(["/technical/maintenance-work-list"]);
  }
}
