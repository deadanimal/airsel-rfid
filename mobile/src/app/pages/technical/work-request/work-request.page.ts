import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { format } from "date-fns";

import { AssetRegistrationsService } from "src/app/shared/services/asset-registrations/asset-registrations.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkRequestsService } from "src/app/shared/services/work-requests/work-requests.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { AssetLocatioSyncService } from 'src/app/shared/services/asset-location-sync/asset-location-sync.service';
import { PlannerService } from 'src/app/shared/services/planner/planner.service';
import { WorkClassService } from 'src/app/shared/services/work-class/work-class.service';
import { WorkCategoryService } from 'src/app/shared/services/work-categories/work-categories.service';
import { OwningorganisationsService } from 'src/app/shared/services/owning-organisations/owning-organisations.service';
import { WamsService } from "src/app/shared/services/wams/wams.service";

@Component({
  selector: "app-work-request",
  templateUrl: "./work-request.page.html",
  styleUrls: ["./work-request.page.scss"],
})
export class WorkRequestPage implements OnInit {
  // FormGroup
  workrequestFormGroup: FormGroup;

  // Data
  capturedSnapURL: string;
  segmentModal = "first";
  process: string;
  workrequestData: any
  assetLocatioSyncData: any
  plannerData: any
  workClassData: any
  workCategoryData: any
  owningOrganisationData: any
  filterDataCapital = [
    { value: "INSTALLATION TESTING AND COMMISSIONING" },
    { value: "REDESIGN" }
  ]
  filterDataPlanned = [{ value: "CORRECTIVE MAINTENANCE" }, { value: "FLEET COMPLIANCE" }, { value: "INSTALLATION TESTING AND COMMISSIONING" }, { value: "PREVENTIVE MAINTENANCE" }, { value: "PREDICTIVE MAINTENANCE" }]
  filterDataUnplanned = [{ value: "DISPOSAL" }, { value: "REDESIGN" }]
  work_class_ngmodel = '0'
  workCategoryDataqwe = []

  //  Username: fadhillah
  //  pw: 415F@dhill@h

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public menu: MenuController,
    private plannerService: PlannerService,
    private authService: AuthService,
    public notificationService: NotificationsService,
    private workrequestService: WorkRequestsService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    // private barcodeScanner: BarcodeScanner
    private camera: Camera,
    private assetsService: AssetsService,
    private assetLocatioSyncService: AssetLocatioSyncService,
    private WorkClassService: WorkClassService,
    private workCategoryService: WorkCategoryService,
    private owningorganisationsService: OwningorganisationsService,
    private wamsService: WamsService
  ) {
    this.workrequestFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      description: new FormControl(""),
      long_description: new FormControl(""),
      required_by_date: new FormControl(""),
      bo: new FormControl(""),
      bo_status: new FormControl("CREATED"),
      creation_user: new FormControl(""),
      downtime_start: new FormControl(""),
      planner: new FormControl(""),
      work_class: new FormControl(""),
      work_category: new FormControl(""),
      work_priority: new FormControl(""),
      requestor: new FormControl(""),
      owning_access_group: new FormControl(""),
      first_name: new FormControl(""),
      last_name: new FormControl(""),
      primary_phone: new FormControl(""),
      mobile_phone: new FormControl(""),
      home_phone: new FormControl(""),
      node_id: new FormControl(""),
      asset_id: new FormControl(""),
      asset_description: new FormControl(""),
      status: new FormControl("new work request"),
      location: new FormControl(""),
      approval_profile: new FormControl("")
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        // To get process from work request list
        this.process = this.router.getCurrentNavigation().extras.state.process;

        let workrequest = this.router.getCurrentNavigation().extras.state
          .workrequest;
        this.workrequestFormGroup.patchValue({
          ...workrequest,
        });
        console.log("qweqwe", workrequest)
        if (this.router.getCurrentNavigation().extras.state.badge_no) {
          console.log("test test qqqq")
          let badge_no = this.router.getCurrentNavigation().extras.state.badge_no;
          // let current_node_id = this.router.getCurrentNavigation().extras.state.node_id;
          console.log("badge_no = ", badge_no)
          this.assetsService.filter("badge_no=" + badge_no).subscribe(
            (res) => {
              console.log("qwe 123123123", res.length);
              if (res.length > 0) {
                this.getAssetLocationSync(res[0].node_id)
                this.workrequestData = res
                console.log("workrequestData = ", this.workrequestData[0])
                this.workrequestFormGroup.patchValue({
                  asset_description: res[0].description,
                  asset_id: res[0].asset_id,
                  // description: "NA",
                  // long_description: res[0].detailed_description
                })
              } else {
                this.presentAlert(
                  "Error",
                  "Badge number not found, Please enter correct badge number."
                );
                this.router.navigate(
                  ["/technical/work-request-list"]
                );
              }
            },
            (err) => {
              console.error("err", err);
              this.router.navigate(
                ["/technical/work-request-list"]
              );
            }
          );
        } else {
          console.log('asdasd 456456456 ', workrequest.node_id)
          this.getAssetLocationSync(workrequest.node_id)
        }

      } else {
        console.log("test testt wwww = ", this.router.getCurrentNavigation().extras.state)
        this.userService.getOne(this.authService.userID).subscribe(
          (res) => {
            console.log('zxczxc 678678678 ')
            // this.getAssetLocationSync(res[0].node_id)
            console.log("res test test = ", res);
            this.workrequestFormGroup.patchValue({
              creation_user: res.first_name + " " + res.last_name,
              requestor: res.first_name + " " + res.last_name,
            });
          },
          (err) => {
            console.error("err", err);
          }
        );
      }
    });
  }

  ngOnInit() {
    this.getPlannerList()
    this.getWorkClassList()
    this.getWorkCategoryList()
    this.getOwningOrganisationList()
    this.menu.enable(false, "menuNotification");
  }

  onChangeWorkClass(data) {
    console.log("checkWorkClass =", data, "=")
    if (data == "CAPITAL") {
      console.log("capp")
      this.workCategoryDataqwe = this.filterDataCapital
    } else if (data == "PLANNED") {
      console.log("plann")
      this.workCategoryDataqwe = this.filterDataPlanned
    } else {
      console.log("unpla")
      this.workCategoryDataqwe = this.filterDataUnplanned
    }
  }

  getAssetLocationSync(node_id) {
    // setInterval(() => {
    console.log("test node_id => ", node_id)
    this.assetLocatioSyncService.filter("node_id=" + node_id).subscribe(
      (res) => {
        console.log("res assetlsService = ", res)

        this.workrequestFormGroup.patchValue({
          location: res[0].description,
          // node_id: res[0].node_id,
          // description: "NA",
          // long_description: res[0].detailed_description
        })
      },
      (err) => {
        console.log("err assetlsService = ", err)
      }
    )
    // }, 10000);
  }

  getPlannerList() {
    this.plannerService.get().subscribe(
      (res) => {
        console.log("plannerService = ", res)
        this.plannerData = res
      },
      (err) => {
        console.log("err plannerService = ", err)
      }
    )
  }

  getWorkClassList() {
    this.WorkClassService.get().subscribe(
      (res) => {
        console.log("WorkClassService = ", res)
        this.workClassData = res
      },
      (err) => {
        console.log("err WorkClassService = ", err)
      }
    )
  }

  getWorkCategoryList() {
    this.workCategoryService.get().subscribe(
      (res) => {
        console.log("workCategoryService = ", res)
        this.workCategoryData = res
      },
      (err) => {
        console.log("err workCategoryService = ", err)
      }
    )
  }

  getOwningOrganisationList() {
    this.owningorganisationsService.get().subscribe(
      (res) => {
        console.log("owningorganisationsService = ", res)
        this.owningOrganisationData = res
      },
      (err) => {
        console.log("err owningorganisationsService = ", err)
      }
    )
  }

  takeCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.capturedSnapURL = base64Image;
      },
      (err) => {
        // Handle error
        console.error(err);
      }
    );
  }

  async submit() {
    console.log("workrequestFormGroup = ", this.workrequestFormGroup)
    this.workrequestFormGroup.patchValue({
      // creation_user: this.authService.userID,
      required_by_date: format(
        new Date(this.workrequestFormGroup.value.required_by_date),
        "yyyy-MM-dd"
      ),
    });

    this.workrequestService.post(this.workrequestFormGroup.value).subscribe(
      (res) => {
        // console.log("res", res);
        this.alertWorkRequest(
          "Work Request",
          "Your work request have successfully submitted into the system. Thank you."
        );
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  async alertWorkRequest(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.clickBack();
          },
        },
      ],
    });

    await alert.present();
  }

  clickBack() {
    this.router.navigate(["/technical/work-request-list"]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  changeSegment(segment: string) {
    this.segmentModal = segment;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
