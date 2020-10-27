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

import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkRequestsService } from "src/app/shared/services/work-requests/work-requests.service";
import { UsersService } from "src/app/shared/services/users/users.service";

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

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public menu: MenuController,
    private assetService: AssetsService,
    private authService: AuthService,
    public notificationService: NotificationsService,
    private workrequestService: WorkRequestsService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    // private barcodeScanner: BarcodeScanner
    private camera: Camera
  ) {
    this.workrequestFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      description: new FormControl(""),
      long_description: new FormControl(""),
      required_by_date: new FormControl(""),
      bo_status: new FormControl("CREATED"),
      // creation_date_time: new FormControl(""),
      creation_user: new FormControl(""),
      down_time_start: new FormControl(""),
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
      // attachment: new FormControl(""),
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        let workrequest = this.router.getCurrentNavigation().extras.state
          .workrequest;
        this.workrequestFormGroup.patchValue({
          ...workrequest,
        });

        if (this.router.getCurrentNavigation().extras.state.qrcode) {
          let qrcode = this.router.getCurrentNavigation().extras.state.qrcode;
          this.assetService.filter("badge_number=" + qrcode).subscribe(
            (res) => {
              // console.log("res", res);
              this.workrequestFormGroup.patchValue({
                asset_id: res[0].wams_asset_id,
                node_id: res[0].level_4,
                description: res[0].asset_description,
                long_description: res[0].name
              })
            },
            (err) => {
              console.error("err", err);
            }
          );
        }
      } else {
        this.userService.getOne(this.authService.userID).subscribe(
          (res) => {
            // console.log("res", res);
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
    this.menu.enable(false, "menuNotification");
    this.scanQrCode();
  }

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: "/technical/work-request",
      },
    };
    this.router.navigate(["/technical/qr-scanner"], navigationExtras);

    // this.barcodeScanner
    //   .scan()
    //   .then(barcodeData => {
    //     console.log("Barcode data", barcodeData);
    //   })
    //   .catch(err => {
    //     console.log("Error", err);
    //   });
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
}
