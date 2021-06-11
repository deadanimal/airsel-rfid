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
// import { AssetLocationAssLisSerHisService } from 'src/app/shared/services/asset-location-assLisSerHis/asset-location-assLisSerHis.service';
import { ServiceHistoryQuestionService } from 'src/app/shared/services/service-history-question/service-history-question.service';
import { WorkOrderActivityCompletionAssLocAssListService } from 'src/app/shared/services/work-order-activity-completion-AssLocAssList/work-order-activity-completion-AssLocAssList.service';
import { AssetLocationAssetListServiceHistoriesService } from 'src/app/shared/services/asset-location-asset-list-service-histories/asset-location-asset-list-service-histories.service';
import { string } from '@amcharts/amcharts4/core';

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
  workOrderActivityCompletionAssLocAssLisData: any = []
  workOrderActivityCompletionAssLocAssLisDataAll: any = []
  workOrderActivityCompletionAssLocAssLisDataReq = []
  buttonStatusArr = []
  buttonStatus: boolean

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
    private assetsService: AssetsService,
    private serviceHistoryQuestionService: ServiceHistoryQuestionService,
    private workOrderActivityCompletionAssLocAssListService: WorkOrderActivityCompletionAssLocAssListService,
    private assetLocationAssetListServiceHistoriesService: AssetLocationAssetListServiceHistoriesService
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
        this.getAllData()
      }
    });
  }

  getAllData() {
    this.workactivityasset = this.router.getCurrentNavigation().extras.state.asset;

    console.log("this.workactivityasset = ", this.workactivityasset)

    this.workactivityassetFormGroup.patchValue({
      id: this.workactivityasset.id,
      bo_status: this.workactivityasset.bo_status,
      asset_id: this.workactivityasset.asset_id,
    });

    // console.log("workactivityasset == ", this.workactivityasset);
    // let servHist = this.workactivityasset.service_histories
    this.buttonStatusArr == []
    // this.buttonStatus = ''
    this.workactivityasset.service_histories.forEach(element => {
      // this.buttonStatus : Boolean
      let bstat = ''
      this.assetLocationAssetListServiceHistoriesService.getOne(element).subscribe(
        (res) => {
          console.log("serviceHistoryQuestionService", res)
          this.workOrderActivityCompletionAssLocAssLisDataAll.push(res)
          if (res.svc_hist_type_req_fl == "W1YS") {
            this.workOrderActivityCompletionAssLocAssLisDataReq.push(res.service_history_type)
          }
          bstat = 'no'
          if (res.service_history_type == "FAILURE") {
            if (res.failure_type != '' && res.failure_mode != '' && res.failure_repair && res.failure_component != '' && res.comments != '') {
              this.workOrderActivityCompletionAssLocAssLisData.push(res)
              bstat = 'yes'
            }
          } else if (res.service_history_type == "DOWNTIME") {
            if (res.start_date_time != '' && res.start_date_time != '' && res.end_date_time != '' && res.downtime_reason != '' && res.comments != '') {
              this.workOrderActivityCompletionAssLocAssLisData.push(res)
              bstat = 'yes'
            } else {

            }
          } else {
            if (res.comments != '' && res.question != []) {
              this.workOrderActivityCompletionAssLocAssLisData.push(res)
              bstat = 'yes'
            }
          }
          this.buttonStatusArr.push(bstat)
          console.log("this.buttonStatusArr = ", this.buttonStatusArr)
          if (this.buttonStatusArr.indexOf('no') == -1) {
            this.buttonStatus = false
          } else {
            this.buttonStatus = true
          }

        }, (err) => {
          console.log(err)
        }
      )
    });

    // if (this.router.getCurrentNavigation().extras.state.badge_no) {
    let badge_no = this.router.getCurrentNavigation().extras.state
      .badge_no;
    // console.log("badge_no = ", badge_no)
    // if (badge_no == this.workactivityasset.badge_number) {

    this.assetsService
      .filter("badge_no=" + badge_no)
      .subscribe(
        (res) => {
          // console.log("res qweqwe", res)
          this.workactivityassetFormGroup.patchValue({
            asset_type: res[0].asset_type,
            badge_number: badge_no,
            // serial_number: res[0].serial_number,
            detailed_description: res[0].description,
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

  // getWorkOrderActivityComp(){
  //   workactivityasset
  // }

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
    console.log("this.workactivityasset = ", this.workactivityasset)
    console.log("this.workOrderActivityCompletionAssLocAssLisData = ", this.workOrderActivityCompletionAssLocAssLisData)

    let woacassLocAssLisFormData = {
      modified_date: this.getCurrentDateTime(),
    }
    let check = []
    this.workOrderActivityCompletionAssLocAssLisDataAll.forEach(element => {
      console.log("element-----", element)
      // if (element.svc_hist_type_req_fl == 'W1YS') {
      //   check.push(element)
      // }
      if (element.svc_hist_type_req_fl == 'W1YS') {
        if (element.service_history_type == "FAILURE") {
          if (element.failure_type != '' && element.failure_mode != '' && element.failure_repair && element.failure_component != '' && element.comments != '') {
            check.push(element)
            console.log('FAILURE')
          }
        } else if (element.service_history_type == "DOWNTIME") {
          if (element.start_date_time != '' && element.start_date_time != '' && element.end_date_time != '' && element.downtime_reason != '' && element.comments != '') {
            check.push(element)
            console.log('DOWNTIME')
          }
        } else {
          if (element.comments != '' && element.question != []) {
            check.push(element)
            console.log('else')
          }
        }
      }

    });
    console.log("workOrderActivityCompletionAssLocAssLisDataReq==", this.workOrderActivityCompletionAssLocAssLisDataReq.length)
    console.log("check==", check.length)

    console.log("modified_date", woacassLocAssLisFormData)
    if (check.length == this.workOrderActivityCompletionAssLocAssLisDataReq.length) {
      this.workOrderActivityCompletionAssLocAssListService
        .update(
          this.workactivityasset.id,
          woacassLocAssLisFormData
        )
        .subscribe(
          (res) => {
            console.log("workOrderActivityCompletionAssLocAssListService res", res);
            this.alertWorkActivityAsset(
              "Work Activity",
              "Your work activity have successfully submitted into the system. Thank you."
            );
          },
          (err) => {
            console.error("err", err);
          }
        );
    } else {
      this.alertWarning('Warning', 'Please answer all required service history')
    }
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

  getAllData2() {
    this.workOrderActivityCompletionAssLocAssLisData = []
    this.workOrderActivityCompletionAssLocAssLisDataAll = []
    this.workOrderActivityCompletionAssLocAssLisDataReq = []
    let bstat = ''
    this.buttonStatusArr == []
    // this.buttonStatus = ''
    let buttonArray = []
    let buttonArrayReq = []

    console.log("workactivityasset+++", this.workactivityasset)
    this.workOrderActivityCompletionAssLocAssListService.getOne(this.workactivityasset.id).subscribe(
      (resWoacalal) => {
        console.log("resWoacalal ===", resWoacalal)
        resWoacalal.service_histories.forEach(element => {
          console.log("element++++++++", element)
          this.assetLocationAssetListServiceHistoriesService.getOne(element).subscribe(
            (res) => {

              console.log("serviceHistoryQuestionService", res)
              this.workOrderActivityCompletionAssLocAssLisDataAll.push(res)

              if (res.svc_hist_type_req_fl == "W1YS") {
                buttonArrayReq.push(res.service_history_type)
              }

              if (res.service_history_type == "FAILURE") {
                if (res.failure_type != '' && res.failure_mode != '' && res.failure_repair && res.failure_component != '' && res.comments != '') {
                  this.workOrderActivityCompletionAssLocAssLisData.push(res)
                  buttonArray.push(res.service_history_type)
                }
              } else if (res.service_history_type == "DOWNTIME") {
                if (res.start_date_time != '' && res.start_date_time != '' && res.end_date_time != '' && res.downtime_reason != '' && res.comments != '') {
                  this.workOrderActivityCompletionAssLocAssLisData.push(res)
                  buttonArray.push(res.service_history_type)
                } else {

                }
              } else {
                if (res.comments != '' && res.question != []) {
                  this.workOrderActivityCompletionAssLocAssLisData.push(res)
                  buttonArray.push(res.service_history_type)
                }
              }


            }, (err) => {
              console.log(err)
            }
          )

        })
        setTimeout(() => {

          let check = []
          let stat = ''
          console.log("buttonArray", buttonArray)
          console.log("this.workOrderActivityCompletionAssLocAssLisDataReq", buttonArrayReq)
          buttonArrayReq.forEach(elemButt => {
            console.log("elemButt", elemButt)
            if (buttonArray.indexOf(elemButt) == -1) {
              check.push('yes')
            } else {
              check.push('no')
            }

          })

          console.log("check", check)
          if (check.indexOf('no') == -1) {
            console.log('no')
            this.buttonStatus = false
          } else {
            console.log('yes')
            this.buttonStatus = true
          }

        }, 1000);
      }, () => {

      }
    )

  }

  async clickAddServiceHistory(servicehistory) {
    const modal = await this.modalController.create({
      component: ServiceHistoryPage,
      componentProps: { servicehistory: servicehistory },
    });
    modal.onDidDismiss().then((data) => {

      this.getAllData2()

      // if (data) this.servicehistories.push(data.data);
      // console.log("this.servicehistories = ", this.servicehistories)
      // this.workactivityService.getOne(this.workactivityasset.id).subscribe(
      //   (res) => {
      //     console.log("res", res);
      //     this.workactivityasset = res;
      //     this.workactivityassetFormGroup.patchValue({
      //       ...res,
      //     });
      //   },
      //   (err) => {
      //     console.error("err", err);
      //   }
      // );
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

    return formatDate + "T" + formatTime + "Z";
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
