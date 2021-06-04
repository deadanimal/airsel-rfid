import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  AlertController,
  MenuController,
  ModalController,
  NavParams,
} from "@ionic/angular";

import { element } from 'protractor';
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkActivitiesService } from "src/app/shared/services/work-activities/work-activities.service";
import { AssetTypesService } from 'src/app/shared/services/asset-types/asset-types.service';
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { AssetServiceHistoryService } from 'src/app/shared/services/asset-service-history/asset-service-history.service';
import { ServiceHistoryService } from 'src/app/shared/services/service-history/service-history.service';
import { ServiceHistoriesQuestionService } from 'src/app/shared/services/service-histories-question/service-histories-question.service';
import { ServiceHistoryQuestionService } from 'src/app/shared/services/service-history-question/service-history-question.service';
import { QuestionValidValueService } from 'src/app/shared/services/questions-value-valid/questions-value-valid.service';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { AssetLocationAssetListServiceHistoriesService } from 'src/app/shared/services/asset-location-asset-list-service-histories/asset-location-asset-list-service-histories.service';


@Component({
  selector: "app-service-history",
  templateUrl: "./service-history.page.html",
  styleUrls: ["./service-history.page.scss"],
})
export class ServiceHistoryPage implements OnInit {
  // Forms
  servicehistoryFormGroup: FormGroup;

  // dropdown data
  ServiceHistoryList: any = []

  // question and answer data
  questionAndAnswerData: any = []
  questionAndAnswerDiv = '0'
  qnaPostData = [];

  updateformData = [];

  // serHisQueFormData: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public menu: MenuController,
    public modalController: ModalController,
    public navParams: NavParams,
    private router: Router,
    public notificationService: NotificationsService,
    private workactivityService: WorkActivitiesService,
    private assetTypesService: AssetTypesService,
    private assetsService: AssetsService,
    private assetServiceHistoryService: AssetServiceHistoryService,
    private serviceHistoryService: ServiceHistoryService,
    private serviceHistoryQuestionService: ServiceHistoryQuestionService,
    private questionValidValueService: QuestionValidValueService,
    private serviceHistoriesQuestionService: ServiceHistoriesQuestionService,
    private assetLocationAssetListServiceHistoriesService: AssetLocationAssetListServiceHistoriesService
  ) {
    // console.log("servicehistory == ", this.navParams.get("servicehistory"));

    let servHist = this.navParams.get("servicehistory")
    console.log("servHist qqqqqq = ", servHist)

    this.assetsService
      .filter("asset_id=" + servHist.asset_id)
      .subscribe(
        (assServres) => {
          console.log("assetsService res", assServres)
          // console.log("assetsService res", res[0]['asset_type'])
          // console.log("assetsService res", res[0].asset_type)
          this.assetTypesService
            .filter("asset_type_code=" + assServres[0]['asset_type'])
            .subscribe(
              (assTypeServres) => {
                console.log("assetTypesService res", assTypeServres)
                let asset_service_history_id = assTypeServres[0]['asset_service_history']

                // looping Asset Service history id
                asset_service_history_id.forEach((assSerHisId) => {
                  // console.log("assSerHisId = ", assSerHisId)

                  // get asset service history
                  this.assetServiceHistoryService.getOne(assSerHisId)
                    .subscribe(
                      (assServHistres) => {
                        console.log("assetServiceHistoryService res =", assServHistres)
                        // console.log("assServHistres asset_service_history =", assServHistres['asset_service_history'])

                        // get service history data
                        this.serviceHistoryService.filter('service_hist_type=' + assServHistres['asset_service_history'])
                          .subscribe(
                            (ServHistres) => {

                              console.log("serviceHistoryService res =", ServHistres);
                              // console.log("ServHistres =", assServHistres[0]['service_hist_desc']);
                              this.ServiceHistoryList.push(ServHistres[0])

                            },
                            (err) => {
                              console.error("err", err);
                            }
                          );

                      },
                      (err) => {
                        console.error("err", err);
                      }
                    );
                });

              },
              (err) => {
                console.error("err", err);
              }
            );
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  ngOnInit() { }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  clickBack() {
    this.modalController.dismiss();
  }

  async alertServiceHistory(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.modalController.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }

  onChangeServiceHistory(event) {

    this.updateformData = []

    console.log("event = ", event)

    this.questionAndAnswerDiv = '1'
    let jsonSerHisId = {
      service_history_id: event
    }

    console.log("event = ", jsonSerHisId)

    this.questionAndAnswerData = []
    // get list of question
    this.serviceHistoryQuestionService.getQna(jsonSerHisId).subscribe(
      (serHisQueRes) => {
        console.log("res = ", serHisQueRes)

        // this.questionAndAnswerData.push(serHisQueRes)
        console.log("this.questionAndAnswerData", this.questionAndAnswerData)
        serHisQueRes.forEach(element => {
          this.questionAndAnswerData.push(element)

          // console.log("element res = ", element)
          // console.log("element res = ", element['question'])
          // console.log("element res = ", element['question']['question_desc'])
        })


      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  // safeDataToArray(value, row) {
  //   console.log(value)
  //   console.log(row)

  //   // updateformData2: any = []
  //   let formData = new FormData();

  //   this.updateformData['question_id'] = row.id
  //   this.updateformData['question_cd'] = row.question_cd
  //   this.updateformData['question_desc'] = row.question_desc
  //   this.updateformData['question_seq'] = row.question_seq
  //   this.updateformData['answer_id'] = value

  //   console.log("updateformData =", this.updateformData)
  //   let row_id = row.id
  //   formData[row_id] = this.updateformData
  //   // this.updateformData[row_id] = formData
  //   // this.updateformData2.push(this.updateformData)
  //   console.log("this.updateformData2 =", formData)

  //   // // let priceListMap: any = []
  //   // let priceListMap: { [id: string]: any; } = {};
  //   // priceListMap.push({ 'question_id': row.id },
  //   //   { 'question_cd': row.question_cd },
  //   //   { 'question_desc': row.question_desc },
  //   //   { 'question_seq': row.question_seq },
  //   //   { 'answer_id': value })

  //   // // priceListMap.set(1, updateformData);
  //   // console.log("priceListMap", priceListMap)
  //   // updateformData = null;

  // }

  safeDataToArray(value, row) {
    console.log("row", row);
    console.log("value", value);

    let obj = {
      // ...row,
      question_id: row.question.id,
      question_cd: row.question.question_cd,
      question_desc: row.question.question_desc,
      question_seq: row.question.question_seq,
      valid_value: row.answer,
      answer_id: value,
      // answer_id: value,
      // answer_id: value
    }
    this.updateformData.push(obj);

    console.log("qnaPostData", this.updateformData);
  }

  // clickSaveServiceHistory() {
  //   // this.modalController.dismiss(this.servicehistoryFormGroup.value);

  //   if (this.servicehistoryFormGroup.value.type == "DOWNTIME") {
  //     this.servicehistoryFormGroup.patchValue({
  //       service_history_type_dt: this.servicehistoryFormGroup.value.type,
  //     });
  //   } else if (this.servicehistoryFormGroup.value.type == "FAILURE") {
  //     this.servicehistoryFormGroup.patchValue({
  //       service_history_type_f: this.servicehistoryFormGroup.value.type,
  //     });
  //   } else if (this.servicehistoryFormGroup.value.type == "PREVENTIVE MAINTENANCE") {
  //     this.servicehistoryFormGroup.patchValue({
  //       service_history_type_pm: this.servicehistoryFormGroup.value.type,
  //     });
  //   }

  //   this.workactivityService
  //     .update(
  //       this.servicehistoryFormGroup.value.id,
  //       this.servicehistoryFormGroup.value
  //     )
  //     .subscribe(
  //       (res) => {
  //         console.log("res", res);
  //         this.alertServiceHistory(
  //           "Success",
  //           "Your service history have successfully added."
  //         );
  //       },
  //       (err) => {
  //         console.error("err", err);
  //       }
  //     );
  // }

  clickSaveServiceHistory() {

    let servHistQues = [];

    const serHisQueDataFormData = new FormGroup({
      seq: new FormControl(),
      code: new FormControl(),
      short_text: new FormControl(),
      text: new FormControl(),
      style: new FormControl(),
      response_radio: new FormControl(),
      valid_value: new FormControl(),
    });

    console.log(serHisQueDataFormData.value);

    // this.updateformData.forEach(element1 => {
    for (let x = 0; x <= this.updateformData.length; x++) {

      console.log("this.updateformData[x] = ", this.updateformData[0])

      // let validvalue: any = []
      let styleDiv = ''
      let questionvalueData: string[]
      let questionvalue = [];
      let validvalue = [];
      let responseRadio = ''

      console.log("element1['valid_value'] = ", this.updateformData[x]['valid_value'].length)
      // this.updateformData[x]['valid_value'].forEach(element2 => {
      let valid_value_data = this.updateformData[x]['valid_value']

      for (let i = 0; i <= valid_value_data.length; i++) {
        console.log("valid_value res = ", valid_value_data[i])
        if (valid_value_data[i].answer_cd == this.updateformData[x].answer_id) {
          styleDiv = valid_value_data[i].style
          responseRadio = valid_value_data[i].answer_cd
        }

        let validValueFormData = new FormData();
        validValueFormData.append('seq_valid', valid_value_data[i].answer_seq)
        validValueFormData.append('code_valid', valid_value_data[i].answer_cd)
        validValueFormData.append('short_text_valid', valid_value_data[i].answer_desc)
        validValueFormData.append('text_valid', valid_value_data[i].answer_text)

        console.log("validValueFormData = ", validValueFormData)

        this.questionValidValueService.post(validValueFormData).subscribe(
          (queValValRes) => {

            console.log("res queValValRes = ", queValValRes)

            let obj2 = [queValValRes.id]
            // validvalue.push(this.updateformData[x].id);

            // questionvalue.push(obj2);
            // validvalue[i] = queValValRes.id
            console.log("validvalue array = ", obj2)

            validvalue.push(queValValRes.id)
            console.log("questionvalue qweqwe res = ", validvalue)

            console.log("before i == valid_value_data.length = ", i, " -- ", valid_value_data.length)
            if (i == (valid_value_data.length - 1)) {
              console.log("afetr i == valid_value_data.length = ", i, " -- ", valid_value_data.length)

              let serHisQueDataFormData = {
                seq: this.updateformData[x].question_seq,
                code: this.updateformData[x].question_cd,
                short_text: this.updateformData[x].question_desc,
                text: this.updateformData[x].question_desc,
                style: styleDiv,
                response_radio: responseRadio,
                valid_value: validvalue
              }

              // this.serviceHistoriesQuestionService.post(serHisQueDataFormData.value).subscribe(
              this.serviceHistoriesQuestionService.post(serHisQueDataFormData).subscribe(
                (serHisQueRes) => {

                  console.log("res serHisQueRes = ", serHisQueRes)
                  servHistQues.push(serHisQueRes.id);

                },
                (err) => {
                  console.error("err", err);
                },
                () => {

                  console.log("before x == this.updateformData.length = ", x, " -- ", this.updateformData.length)
                  if (x == (this.updateformData.length - 1)) {
                    console.log("before x == this.updateformData.length = ", x, " -- ", this.updateformData.length)

                    let assLocAssLisSerHisData = {
                      service_history_type: this.updateformData[x].question_seq,
                      effective_datetime: this.updateformData[x].question_seq,
                      start_date_time: this.updateformData[x].question_seq,
                      end_date_time: this.updateformData[x].question_seq,
                      comments: this.updateformData[x].question_seq,
                      failure_type: this.updateformData[x].question_seq,
                      failure_mode: this.updateformData[x].question_seq,
                      failure_repair: this.updateformData[x].question_seq,
                      failure_component: this.updateformData[x].question_seq,
                      failure_root_cause: this.updateformData[x].question_seq,
                      svc_hist_type_req_fl: this.updateformData[x].question_seq,
                      downtime_reason: this.updateformData[x].question_seq,
                      question: this.updateformData[x].question_seq
                    }

                    console.log(assLocAssLisSerHisData)

                    this.assetLocationAssetListServiceHistoriesService.post(assLocAssLisSerHisData).subscribe(
                      (alslshRes) => {
                        console.log("alslshRes", alslshRes)
                      }, (alslshErr) => {
                        console.log("alslshErr", alslshErr)
                      }, () => {
                      }
                    )
                    console.log("here 111111111111")

                  }

                }
              );
            }

          },
          (err) => {
            console.error("err", err);
          },
          () => {
          }
        );

      }

    }

    // setTimeout(function () {
    //   console.log("servHistQues arrid = ", servHistQues)
    // }, 4000);

  }
}
