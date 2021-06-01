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
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { ServiceHistoryPage } from "../service-history/service-history.page";

import { AssetRegistrationsService } from "src/app/shared/services/asset-registrations/asset-registrations.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkActivitiesService } from "src/app/shared/services/work-activities/work-activities.service";
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { AssetLocationAssLisSerHisService } from 'src/app/shared/services/asset-location-assLisSerHis/asset-location-assLisSerHis.service';

@Component({
  selector: "app-work-activity-asset",
  templateUrl: "./work-activity-asset.page.html",
  styleUrls: ["./work-activity-asset.page.scss"],
})
export class WorkActivityAssetPage implements OnInit {
  // List
  servicehistories = [];

  // Data
  workactivityasset: any;

  // Form
  workactivityassetFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    public notificationService: NotificationsService,
    private assetregistrationService: AssetRegistrationsService,
    private workactivityService: WorkActivitiesService,
    // private barcodeScanner: BarcodeScanner
    private assetsService: AssetsService
  ) {
    this.workactivityassetFormGroup = this.formBuilder.group({
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
        this.workactivityasset = this.router.getCurrentNavigation().extras.state.asset;

        this.workactivityassetFormGroup.patchValue({
          id: this.workactivityasset.id,
          bo_status: this.workactivityasset.bo_status,
          asset_id: this.workactivityasset.asset_id,
        });

        console.log("test test test test test test");
        console.log(this.workactivityasset);
        let servHist = this.workactivityasset.service_histories

        servHist.forEach(element => {

        });

        // if (this.router.getCurrentNavigation().extras.state.badge_no) {
        let badge_no = this.router.getCurrentNavigation().extras.state
          .badge_no;
        console.log("badge_no = ", badge_no)
        // if (badge_no == this.workactivityasset.badge_number) {

        this.assetsService
          .filter("badge_no=" + badge_no)
          .subscribe(
            (res) => {
              console.log("res qweqwe", res)
              this.workactivityassetFormGroup.patchValue({
                // asset_type: res[0].asset_primary_category,
                badge_number: badge_no,
                // serial_number: res[0].serial_number,
                // detailed_description: res[0].detailed_description,
              });
            },
            (err) => {
              console.error("err", err);
            }
          );
        // } else {
        //   this.alertErrorWorkActivityAsset(
        //     "Work Activity",
        //     "The QR code is not same with the asset. Please try again."
        //   );
        // }
        // }
      }
    });
  }

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  submit() {
    // this.workactivityassetFormGroup.patchValue({
    //   bo_status: "Completed",
    // });
    // this.workactivityService
    //   .update(
    //     this.workactivityassetFormGroup.value.id,
    //     this.workactivityassetFormGroup.value
    //   )
    //   .subscribe(
    //     (res) => {
    //       console.log("res", res);
    this.alertWorkActivityAsset(
      "Work Activity",
      "Your work activity have successfully submitted into the system. Thank you."
    );
    //   },
    //   (err) => {
    //     console.error("err", err);
    //   }
    // );
  }

  async alertWorkActivityAsset(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigate(["/technical/maintenance-work-list"]);
          },
        },
      ],
    });

    await alert.present();
  }

  async alertErrorWorkActivityAsset(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => { },
        },
      ],
    });

    await alert.present();
  }

  clickBack() {
    this.router.navigate(["/technical/maintenance-work-list"]);
  }

  async clickAddServiceHistory(servicehistory) {
    const modal = await this.modalController.create({
      component: ServiceHistoryPage,
      componentProps: { servicehistory: servicehistory },
    });
    modal.onDidDismiss().then((data) => {
      if (data) this.servicehistories.push(data.data);
      console.log("this.servicehistories = ", this.servicehistories)
      this.workactivityService.getOne(this.workactivityasset.id).subscribe(
        (res) => {
          console.log("res", res);
          this.workactivityasset = res;
          this.workactivityassetFormGroup.patchValue({
            ...res,
          });
        },
        (err) => {
          console.error("err", err);
        }
      );
    });
    return await modal.present();
  }

  async clickEdit(servicehistory) {
    const modal = await this.modalController.create({
      component: ServiceHistoryPage,
      componentProps: { servicehistory: servicehistory },
    });
    modal.onDidDismiss().then((data) => { });
    return await modal.present();
  }

  clickRemove(index: number) {
    this.servicehistories.splice(index, 1);
  }
}
