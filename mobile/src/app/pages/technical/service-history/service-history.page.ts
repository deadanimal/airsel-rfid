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
    private serviceHistoriesQuestionService: ServiceHistoriesQuestionService,
    private serviceHistoryQuestionService: ServiceHistoryQuestionService,
    private questionValidValueService: QuestionValidValueService
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
                // console.log("assetTypesService res", assTypeServres)
                let asset_service_history_id = assTypeServres[0]['asset_service_history']

                // looping Asset Service history id
                asset_service_history_id.forEach((assSerHisId) => {
                  // console.log("assSerHisId = ", assSerHisId)

                  // get asset service history
                  this.assetServiceHistoryService.getOne(assSerHisId)
                    .subscribe(
                      (assServHistres) => {
                        // console.log("assServHistres =", assServHistres)
                        // console.log("assServHistres asset_service_history =", assServHistres['asset_service_history'])

                        // get service history data
                        this.serviceHistoryService.filter('service_hist_type=' + assServHistres['asset_service_history'])
                          .subscribe(
                            (assServHistres) => {

                              // console.log("assServHistres =", assServHistres);
                              // console.log("assServHistres =", assServHistres[0]['service_hist_desc']);
                              this.ServiceHistoryList.push(assServHistres[0])

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

    // if (this.navParams.get("servicehistory")) {
    //   if (this.navParams.get("servicehistory").service_history_type_dt) {
    //     this.servicehistoryFormGroup.patchValue({
    //       ...this.navParams.get("servicehistory"),
    //       type: this.navParams.get("servicehistory").service_history_type_dt
    //     });
    //   }
    //   else if (this.navParams.get("servicehistory").service_history_type_f) {
    //     this.servicehistoryFormGroup.patchValue({
    //       ...this.navParams.get("servicehistory"),
    //       type: this.navParams.get("servicehistory").service_history_type_f
    //     });
    //   }
    //   else if (this.navParams.get("servicehistory").service_history_type_pm) {
    //     this.servicehistoryFormGroup.patchValue({
    //       ...this.navParams.get("servicehistory"),
    //       type: this.navParams.get("servicehistory").service_history_type_pm
    //     });
    //   }
    // }
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

    let questionvalue = [];

    this.updateformData.forEach(element1 => {

      console.log("element", element1)
      let validvalue = [];
      let styleDiv = ''

      element1['valid_value'].forEach(element2 => {

        // console.log("res = ", element2)
        if (element2.answer_cd == element1.answer_id) {
          styleDiv = element2.style
        }

        let validValueFormData = new FormData();
        validValueFormData['seq_valid'] = element1.question_id
        validValueFormData['code_valid'] = element1.question_id
        validValueFormData['short_text_valid'] = element1.question_id
        validValueFormData['text_valid'] = element1.question_id

        console.log("validValueFormData = ", validValueFormData)

        this.questionValidValueService.post(validValueFormData).subscribe(
          (serHisQueRes) => {
            console.log("res serHisQueRes = ", serHisQueRes)

            validvalue.push(serHisQueRes.id);

          },
          (err) => {
            console.error("err", err);
          }
        );

      });

      //////////
      console.log("validvalue = ", validvalue)
      console.log("element1 ,", element1)
      console.log("element2 ,", element2)

      let serHisQueFormData = new FormData();
      serHisQueFormData['seq'] = element1.question_seq
      serHisQueFormData['code'] = element1.question_cd
      serHisQueFormData['short_text'] = element1.question_cd
      serHisQueFormData['text'] = element1.question_desc
      serHisQueFormData['style'] = styleDiv
      serHisQueFormData['respone'] = element1.question_desc
      serHisQueFormData['response_check_box'] = element1.question_desc
      serHisQueFormData['response_radio'] = element1.question_desc
      // serHisQueFormData['responseDate'] = element1.responseDate
      // serHisQueFormData['response_datetime'] = element1.response_datetime
      serHisQueFormData['valid_value'] = validvalue

      console.log("serHisQueFormData = ", serHisQueFormData)

      // this.questionValidValueService
      //   .update(
      //     this.servicehistoryFormGroup.value
      //   )
      //   .subscribe(
      //     (res) => {
      //       console.log("res", res);
      //       this.alertServiceHistory(
      //         "Success",
      //         "Your service history have successfully added."
      //       );
      //     },
      //     (err) => {
      //       console.error("err", err);
      //     }
      //   );

    });

  }
}
