import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import {
  AlertController,
  LoadingController,
  MenuController,
} from "@ionic/angular";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { format } from "date-fns";
import { IonicSelectableComponent } from "ionic-selectable";

import { ApprovalProfileService } from "src/app/shared/services/approval-profile/approval-profile.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkRequestsService } from "src/app/shared/services/work-requests/work-requests.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { AssetLocatioSyncService } from "src/app/shared/services/asset-location-sync/asset-location-sync.service";
import { PlannerService } from "src/app/shared/services/planner/planner.service";
import { WorkClassService } from "src/app/shared/services/work-class/work-class.service";
import { WorkCategoryService } from "src/app/shared/services/work-categories/work-categories.service";
import { OwningorganisationsService } from "src/app/shared/services/owning-organisations/owning-organisations.service";

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
  plannerSelected: string = "";
  process: string;
  approvalProfileData: any;
  assetLocatioSyncData: any;
  plannerData: any;
  workClassData: any;
  workCategoryData: any;
  owningOrganisationData: any;
  filterDataCapital = [
    {
      value: "INSTALLATION TESTING AND COM",
      description: "INSTALLATION TESTING AND COMMISSIONING",
    },
    { value: "UPGRADE", description: "REDESIGN" },
  ];
  filterDataPlanned = [
    {
      value: "CORRECTIVE MAINTENANCE",
      description: "CORRECTIVE MAINTENANCE",
    },
    { value: "FLEET COMPLIANCE", description: "COMPLIANCE" },
    {
      value: "INSTALLATION TESTING AND COM",
      description: "INSTALLATION TESTING AND COMMISSIONING",
    },
    { value: "PREVENTIVE MAINTENANCE", description: "PREVENTIVE MAINTENANCE" },
    { value: "PREDICTIVE MAINTENANCE", description: "PREDICTIVE MAINTENANCE" },
    { value: "RETIRE", description: "DISPOSAL" },
    { value: "UPGRADE", description: "REDESIGN" },
  ];
  filterDataUnplanned = [
    {
      value: "CORRECTIVE MAINTENANCE",
      description: "CORRECTIVE MAINTENANCE",
    },
    { value: "PREVENTIVE MAINTENANCE", description: "PREVENTIVE MAINTENANCE" },
    { value: "PREDICTIVE MAINTENANCE", description: "PREDICTIVE MAINTENANCE" },
    { value: "RETIRE", description: "DISPOSAL" },
    { value: "UPGRADE", description: "REDESIGN" },
  ];
  workCategoryDataqwe = [];

  //  Username: fadhillah
  //  pw: 415F@dhill@h

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public loadingController: LoadingController,
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
    private approvalProfileService: ApprovalProfileService,
    private assetsService: AssetsService,
    private assetLocatioSyncService: AssetLocatioSyncService,
    private workClassService: WorkClassService,
    private workCategoryService: WorkCategoryService,
    private owningorganisationsService: OwningorganisationsService
  ) {
    this.workrequestFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      description: new FormControl(""),
      long_description: new FormControl(""),
      required_by_date: new FormControl(""),
      approval_profile: new FormControl(""),
      badge_no: new FormControl(""),
      bo: new FormControl("W1-WorkRequest"),
      creation_datetime: new FormControl(""),
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
      location: new FormControl(""),
      asset_id: new FormControl(""),
      asset_description: new FormControl(""),
      status: new FormControl(""),
      int10_type: new FormControl(""),
      work_request_id: new FormControl(""),
      work_request_status: new FormControl(""),
      record_by: new FormControl(this.authService.userID),
      modified_by: new FormControl(this.authService.userID)
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        // to get process from work request list
        this.process = this.router.getCurrentNavigation().extras.state.process;

        let workrequest =
          this.router.getCurrentNavigation().extras.state.workrequest;
        let badge_no = this.router.getCurrentNavigation().extras.state.badge_no;

        // to find asset detail if user pick badge number to find detail
        if (badge_no) {
          this.assetsService.filter("badge_no=" + badge_no).subscribe(
            (res) => {
              if (res.length > 0) {
                // to get node_id from table assets_assetlocationsync
                this.getAssetLocationSync(
                  res[0].node_id,
                  res[0].bo,
                  res[0].attached_to_asset_id
                );

                this.workrequestFormGroup.patchValue({
                  asset_description: res[0].description,
                  asset_id: res[0].asset_id,
                  badge_no: res[0].badge_no,
                  owning_access_group: res[0].owning_access_group,
                });
              } else {
                this.presentAlert(
                  "Error",
                  "Badge number not found, Please enter correct badge number."
                );
                this.clickBack();
              }
            },
            (err) => {
              console.error("err", err);
              this.clickBack();
            }
          );
        } else {
          // to find asset detail when user want to view work request's detail
          if (workrequest) {
            this.workrequestFormGroup.patchValue({
              ...workrequest,
            });

            this.assetsService
              .filter("badge_no=" + this.workrequestFormGroup.value.badge_no)
              .subscribe((res) => {
                if (res.length > 0) {
                  // to get node_id from table assets_assetlocationsync
                  this.getAssetLocationSync(
                    workrequest.node_id,
                    workrequest.bo,
                    ""
                  );

                  this.workrequestFormGroup.patchValue({
                    asset_description: res[0].description,
                    asset_id: res[0].asset_id,
                    badge_no: res[0].badge_no,
                    owning_access_group: res[0].owning_access_group,
                  });
                }
              });

            let filterPlanner = "planner=" + this.workrequestFormGroup.value.planner
            this.plannerService.filter(filterPlanner).subscribe(
              (res) => {
                console.log("plannerService", res)
                this.workrequestFormGroup.patchValue({
                  planner: res[0].description
                });

              }, (err) => {
                console.log("err", err)
              }
            )
          }
        }
      }
    });

    this.userService.getOne(this.authService.userID).subscribe(
      (res) => {
        this.workrequestFormGroup.patchValue({
          creation_user: res.first_name,
          requestor: res.first_name,
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.getApprovalProfileList();
    this.getPlannerList();
    this.getWorkClassList();
    this.getWorkCategoryList();
    this.getOwningOrganisationList();
    this.menu.enable(false, "menuNotification");
  }

  onChangeWorkClass(data) {
    if (data == "CAPITAL") {
      console.log("capp");
      this.workCategoryDataqwe = this.filterDataCapital;
    } else if (data == "PLANNED") {
      console.log("plann");
      this.workCategoryDataqwe = this.filterDataPlanned;
    } else {
      console.log("unpla");
      this.workCategoryDataqwe = this.filterDataUnplanned;
    }
  }

  getAssetLocationSync(node_id, bo, attached_to_asset_id) {
    // if asset "bo" = "W1-TrackedGeneralComponent" or "W1-IOSvcGeneralComponent", take the "attached_to_asset_id" and search at "asset_id", take the "node_id" of the "attached_to_asset_id"
    // else, take the "node_id" based on "asset_id"

    if (
      bo == "W1-TrackedGeneralComponent" ||
      bo == "W1-IOSvcGeneralComponent"
    ) {
      // take the attached_to_asset_id if not empty
      if (attached_to_asset_id != "") {
        this.assetsService.filter("asset_id=" + attached_to_asset_id).subscribe(
          (resAsset) => {
            // console.log("res assetsService = ", res);

            if (resAsset.length > 0) {
              this.workrequestFormGroup.patchValue({
                node_id: resAsset[0].node_id,
              });

              this.assetLocatioSyncService
                .filter("node_id=" + resAsset[0].node_id)
                .subscribe(
                  (resAssetLocationSync) => {
                    if (resAssetLocationSync.length > 0) {
                      this.workrequestFormGroup.patchValue({
                        location: resAssetLocationSync[0].description,
                      });
                    } else {
                      this.presentAlert("Info", "Asset location is not found");
                      this.clickBack();
                    }
                  },
                  (err) => {
                    console.error("err assetLocatioSyncService", err);
                    this.presentAlert(
                      "Error",
                      "Sorry, there is a technical problem going on."
                    );
                    this.clickBack();
                  }
                );
            } else {
              this.presentAlert("Info", "No asset found for this component");
              this.clickBack();
            }
          },
          (err) => {
            console.log("err assetsService = ", err);
            this.presentAlert(
              "Error",
              "Sorry, there is a technical problem going on."
            );
            this.clickBack();
          }
        );
      } else {
        this.presentAlert(
          "Info",
          "Work request can't be done for this component"
        );
        this.clickBack();
      }
    } else {
      // do this if bo not [W1-TrackedGeneralComponent, W1-IOSvcGeneralComponent]
      this.workrequestFormGroup.patchValue({
        node_id: node_id,
      });

      this.assetLocatioSyncService.filter("node_id=" + node_id).subscribe(
        (resAssetLocationSync) => {
          if (resAssetLocationSync.length > 0) {
            this.workrequestFormGroup.patchValue({
              location: resAssetLocationSync[0].description,
            });
          } else {
            this.presentAlert("Info", "Asset location is not found");
            this.clickBack();
          }
        },
        (err) => {
          console.error("err assetLocatioSyncService", err);
          this.presentAlert(
            "Error",
            "Sorry, there is a technical problem going on."
          );
          this.clickBack();
        }
      );
    }
  }

  getApprovalProfileList() {
    this.approvalProfileService.get().subscribe(
      (res) => {
        // console.log("approvalProfileService = ", res);
        this.approvalProfileData = res;
      },
      (err) => {
        console.log("err approvalProfileService = ", err);
      }
    );
  }

  getPlannerList() {
    this.plannerService.filter("status=ACTIVE").subscribe(
      (res) => {
        // console.log("plannerService = ", res);
        this.plannerData = res;
      },
      (err) => {
        console.log("err plannerService = ", err);
      }
    );
  }

  getWorkClassList() {
    this.workClassService.get().subscribe(
      (res) => {
        // console.log("WorkClassService = ", res);
        this.workClassData = res;
      },
      (err) => {
        console.log("err WorkClassService = ", err);
      }
    );
  }

  getWorkCategoryList() {
    this.workCategoryService.get().subscribe(
      (res) => {
        // console.log("workCategoryService = ", res);
        this.workCategoryData = res;
      },
      (err) => {
        console.log("err workCategoryService = ", err);
      }
    );
  }

  getOwningOrganisationList() {
    this.owningorganisationsService.get().subscribe(
      (res) => {
        // console.log("owningorganisationsService = ", res);
        this.owningOrganisationData = res;
      },
      (err) => {
        console.log("err owningorganisationsService = ", err);
      }
    );
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

  onChangePlanner(event: { component: IonicSelectableComponent; value: any }) {
    this.plannerSelected = event.value.planner;
  }

  submit() {
    this.workrequestFormGroup.patchValue({
      // creation_user: this.authService.userID,
      required_by_date: format(
        new Date(this.workrequestFormGroup.value.required_by_date),
        "yyyy-MM-dd"
      ),
      planner: this.plannerSelected,
    });

    console.log("workrequestFormGroup = ", this.workrequestFormGroup.value);

    this.loadingController
      .create({
        message: "Please wait for a while...",
      })
      .then((loading) => {
        loading.present();
        this.workrequestService.post(this.workrequestFormGroup.value).subscribe(
          (res) => {
            // console.log("res", res);
            loading.dismiss();
            this.alertWorkRequest(
              "Work Request",
              // "Your work request have successfully submitted into the system. Thank you.",
              "Your work request has been successfully created. Please submit for approval",
              true
            );
          },
          (err) => {
            console.error("err", err);
            loading.dismiss();
            this.alertWorkRequest("Error", err.error.error_details, false);
          }
        );
      });
  }

  async alertWorkRequest(header, message, success) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            if (success) this.clickBack();
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
