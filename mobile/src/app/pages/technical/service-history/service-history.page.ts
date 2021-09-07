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
import { WorkOrderActivityCompletionAssLocAssListService } from 'src/app/shared/services/work-order-activity-completion-AssLocAssList/work-order-activity-completion-AssLocAssList.service';
import { FailureProfileModelService } from 'src/app/shared/services/failure-profile/failure-profile.service';

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
  ServiceHistoryListAll: any = []

  // question and answer data
  questionAndAnswerData: any = []
  questionAndAnswerDiv = '0'
  questionAndAnswerFailureDiv = '0'
  questionAndAnswerDowntimeDiv = '0'
  qnaPostData = [];
  servHist: any
  workOrderActComAssLocAssLis: any = []
  AssLocAssLisArrId = []
  assetTypeData = []
  updateformData = []
  servHistArr = []

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
    private assetLocationAssetListServiceHistoriesService: AssetLocationAssetListServiceHistoriesService,
    private workOrderActivityCompletionAssLocAssListService: WorkOrderActivityCompletionAssLocAssListService,
    private failureProfileModelService: FailureProfileModelService
  ) {
    // console.log("servicehistory == ", this.navParams.get("servicehistory"));

    this.servHist = this.navParams.get("servicehistory")
    this.servHistArr = this.navParams.get("servHistArr")
    console.log("this.servHist servHistArr = ", this.servHistArr)
    console.log("this.servHist servHist = ", this.servHist)
    this.getWorkOrderActComAssLocAssLis(this.servHist)
    this.assetsService
      .filter("asset_id=" + this.servHist.asset_id)
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
                this.assetTypeData.push(assTypeServres[0])
                let asset_service_history_id = assTypeServres[0]['asset_service_history']

                // looping Asset Service history id
                asset_service_history_id.forEach((assSerHisId) => {
                  // console.log("assSerHisId = ", assSerHisId)

                  // get asset service history
                  this.assetServiceHistoryService.getOne(assSerHisId)
                    .subscribe(
                      (assServHistres) => {
                        // console.log("assetServiceHistoryService res =", assServHistres)
                        console.log("assServHistres asset_service_history =", assServHistres.asset_service_history)

                        if (this.servHistArr.indexOf(assServHistres.asset_service_history) == -1) {
                          // get service history data
                          this.serviceHistoryService.filter('service_hist_type=' + assServHistres['asset_service_history'])
                            .subscribe(
                              (ServHistres) => {

                                console.log("serviceHistoryService res =", ServHistres);

                                // if (res['service_history_type'] == 'Failure') {

                                //   if (res.failure_type == '' && res.failure_mode == '' && res.failure_repair == '' && res.failure_component == '' && res.comments == '') {
                                //     this.serviceHistoryArray.push(res.service_history_type)
                                //   }
                                // } else if (res['service_history_type'] == 'Downtime') {

                                //   if (res.start_date_time == '' && res.end_date_time == '' && res.downtime_reason == '' && res.comments == '') {
                                //     this.serviceHistoryArray.push(res.service_history_type)
                                //   }
                                // } else {
                                //   if (res.question.length) {
                                //     this.serviceHistoryArray.push(res.service_history_type)
                                //   }
                                // }

                                // console.log("ServHistres =", assServHistres[0]['service_hist_desc']);
                                this.ServiceHistoryListAll.push(ServHistres[0])
                                // this.ServiceHistoryList.push(ServHistres[0])

                              },
                              (err) => {
                                console.error("err", err);
                              }
                            );
                        }

                      },
                      (err) => {
                        console.error("err", err);
                      }
                    );
                });
                setTimeout(() => {
                  console.log("ServiceHistoryListAll >>== ", this.ServiceHistoryListAll)
                  console.log("serviceHistoryArray >>== ", this.serviceHistoryArray)
                  this.ServiceHistoryListAll.forEach(eleSerHis => {
                    console.log("eleSerHis.service_hist_type ==", eleSerHis)
                    if (this.serviceHistoryArray.indexOf(eleSerHis.service_hist_desc) == -1) {
                      this.ServiceHistoryList.push(eleSerHis)
                      console.log("iferHis = ", eleSerHis)
                    } else {
                      console.log("else SerHis = ", eleSerHis)
                    }

                  });
                }, 2000);

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

  serviceHistoryArray = []
  listOfAllrequired = []
  getWorkOrderActComAssLocAssLis(workoacalal) {
    // console.log("workoacalalqwewqe", workoacalal)

    this.workOrderActivityCompletionAssLocAssListService
      .getOne(workoacalal.id)
      .subscribe(
        (woacalalres) => {
          console.log("woacalalres === ", woacalalres)
          this.workOrderActComAssLocAssLis = woacalalres
          woacalalres.service_histories.forEach(element => {
            this.assetLocationAssetListServiceHistoriesService.getOne(element).subscribe(
              (res) => {
                console.log("assetLocationAssetListServiceHistoriesService===", res)
                this.listOfAllrequired.push(res)
                // console.log("assetLocationAssetListServiceHistoriesService===", res['service_history_type'])

                if (res['service_history_type'] == 'Failure') {

                  if (res.failure_type == '' && res.failure_mode == '' && res.failure_repair == '' && res.failure_component == '' && res.comments == '') {
                    this.serviceHistoryArray.push(res.service_history_type)
                  }
                } else if (res['service_history_type'] == 'Downtime') {

                  if (res.start_date_time == '' && res.end_date_time == '' && res.downtime_reason == '' && res.comments == '') {
                    this.serviceHistoryArray.push(res.service_history_type)
                  }
                } else {
                  if (res.question.length > 0) {
                    this.serviceHistoryArray.push(res.service_history_type)
                  }
                }
                console.log(this.serviceHistoryArray)
              }, (err) => {

              }
            )
          });
          // console.log("woacalalres.service_histories =", woacalalres.service_histories)
        }, (woacalalerr) => {
          console.log("woacalalerr === ", woacalalerr)
        }
      )

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
    // await this.modalController.dismiss(onClosedData);
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

  failureTypeData = []
  failureModeData = []
  failureRepairData = []
  failureComponentData = []
  selectedAssetType = ''
  selectedServiceHistory = ''
  selectedServiceHistoryType = ''

  onChangeServiceHistory(event) {

    this.updateformData = []

    console.log("event = ", event)
    console.log("this.assetTypeData = ", this.assetTypeData)

    let jsonSerHisId = {
      service_history_id: event
    }
    let assetType = []
    this.ServiceHistoryList.forEach(element => {
      if (event == element.id) {
        console.log("ServiceHistoryList = ", element)
        assetType = element
      }
    });

    // console.log("assetType = ", assetType)
    // console.log("assetType = ", assetType['service_hist_desc'])
    this.selectedServiceHistory = assetType['service_hist_desc']
    this.selectedAssetType = assetType['category']
    this.selectedServiceHistoryType = assetType['service_hist_type']
    console.log(this.selectedAssetType, "---", this.selectedServiceHistory)
    this.questionAndAnswerData = []
    if (assetType['category'] == "Failure") {
      this.questionAndAnswerDowntimeDiv = '0'
      this.questionAndAnswerFailureDiv = '1'
      this.questionAndAnswerDiv = '0'
      // console.log("FAILURE")

      this.failureProfileModelService.filter("failure_profile=" + this.assetTypeData[0]['profile_failure']).subscribe(
        (res) => {

          res.forEach(element => {
            if (element.failure_comp != '') {
              this.failureComponentData.push(element)
            } else if (element.failure_repair != '') {
              this.failureRepairData.push(element)
            } else if (element.failure_mode != '') {
              this.failureModeData.push(element)
            } else if (element.failure_type != '') {
              this.failureTypeData.push(element)
              console.log("this.failureTypeData =", this.failureTypeData)
            }

          });

          console.log("failureProfileModelService = ", res)

        }, (err) => {
          console.log("err = ", err)
        }
      )
    } else if (assetType['category'] == "Downtime") {
      this.questionAndAnswerFailureDiv = '0'
      this.questionAndAnswerDowntimeDiv = '1'
      this.questionAndAnswerDiv = '0'
      console.log("DOWNTIME")
    } else {

      this.questionAndAnswerDiv = '1'
      this.questionAndAnswerDowntimeDiv = '0'
      this.questionAndAnswerFailureDiv = '0'
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

  failure_type = ''
  failure_mode = ''
  failure_component = ''
  failure_repair = ''
  failure_remark = ''
  downtime_start = ''
  downtime_end = ''
  downtime_reason = ''
  downtime_comment = ''

  saveFailureDontimeArray(value, field) {
    // this.updatefailureformData = []
    console.log("row = ", field);
    console.log("value = ", value);
    if (field == 'type') {
      this.failure_type = value
    } else if (field == 'mode') {
      this.failure_mode = value
    } else if (field == 'component') {
      this.failure_component = value
    } else if (field == 'repair') {
      this.failure_repair = value
    } else if (field == 'remark') {
      console.log("this.failure_remark = ", field)
      console.log("this.failure_remark = ", value)
      this.failure_remark = value
    } else if (field == 'start') {
      this.downtime_start = value
    } else if (field == 'end') {
      this.downtime_end = value
    } else if (field == 'reason') {
      this.downtime_reason = value
    } else if (field == 'comment') {
      this.downtime_comment = value
    }
  }

  clickSaveServiceHistory() {

    let servHist = [];
    let servHistQues = [];
    let woacalalData = []
    let alalshData = []
    let idToBeUpdate = ''

    // if (this.workOrderActComAssLocAssLis.service_histories.length > 0) {
    //   console.log("sana length = ", this.workOrderActComAssLocAssLis.service_histories.length)
    //   this.workOrderActComAssLocAssLis.service_histories
    //     .forEach(element => {
    //       // this.AssLocAssLisArrId
    //       woacalalData.push(element)
    //     });
    // } else {
    //   console.log("sini length = ", this.workOrderActComAssLocAssLis.service_histories.length)
    //   woacalalData = []
    // }

    if (this.listOfAllrequired.length > 0) {
      console.log("sana length = ", this.workOrderActComAssLocAssLis.service_histories.length)
      this.listOfAllrequired.forEach(element => {
        // this.AssLocAssLisArrId
        console.log("element==>>", element)

        // // set for question_id
        // servHistQues.push(element.id)

        // set for service_history_id
        woacalalData.push(element.id)

        console.log(this.selectedServiceHistoryType, "==", element.service_history_type)
        if (this.selectedServiceHistoryType == element.service_history_type) {
          console.log('ada cok----->>>>>>')

          // get ALALSH id to be update
          idToBeUpdate = element.id
        }
      });
    } else {
      console.log("sini length = ", this.workOrderActComAssLocAssLis.service_histories.length)
      woacalalData = []
    }
    console.log('idToBeUpdate>>>', idToBeUpdate)
    console.log('servHistQues>>>', servHistQues)

    if (this.selectedAssetType == 'Failure') {

      if (this.failure_type == '' && this.failure_mode == '' && this.failure_repair == '' && this.failure_component == '' && this.failure_remark == '') {

        this.alertWarning('Warning', 'Please answer all question.')
      } else {

        let assLocAssLisSerHisData = {
          service_history_type: this.selectedServiceHistory,
          failure_type: this.failure_type,
          failure_mode: this.failure_mode,
          failure_repair: this.failure_repair,
          failure_component: this.failure_component,
          comments: this.failure_remark
        }

        console.log("assLocAssLisSerHisData = ", assLocAssLisSerHisData)

        if (idToBeUpdate == '') {
          this.assetLocationAssetListServiceHistoriesService.post(assLocAssLisSerHisData).subscribe(
            (res) => {
              console.log("updatefailureformData = ", res)

              woacalalData.push(res.id)

              let woacassLocAssLisFormData = {
                service_histories: woacalalData
              }

              this.workOrderActivityCompletionAssLocAssListService.update(this.servHist.id, woacassLocAssLisFormData).subscribe(
                (woacalalRes) => {
                  console.log("woacalalRes =", woacalalRes)
                  this.alertWorkActivityAsset('Work Activity', 'SuccessFully Save Data.')
                }, (woacalalErr) => {
                  console.log(woacalalErr)
                }
              )
            }, (err) => {
              console.log(err)
            }
          )
        } else {
          this.assetLocationAssetListServiceHistoriesService.update(idToBeUpdate, assLocAssLisSerHisData).subscribe(
            (res) => {
              console.log("updatefailureformData = ", res)

              // woacalalData.push(res.id)

              // let woacassLocAssLisFormData = {
              //   service_histories: woacalalData
              // }

              // this.workOrderActivityCompletionAssLocAssListService.update(this.servHist.id, woacassLocAssLisFormData).subscribe(
              //   (woacalalRes) => {
              //     console.log("woacalalRes =", woacalalRes)
              this.alertWorkActivityAsset('Work Activity', 'SuccessFully Save Data.')
              //   }, (woacalalErr) => {
              //     console.log(woacalalErr)
              //   }
              // )
            }, (err) => {
              console.log(err)
            }
          )
        }
      }
    } else if (this.selectedAssetType == 'Downtime') {

      if (this.downtime_start == '' && this.downtime_end == '' && this.downtime_reason == '' && this.downtime_comment == '') {
        this.alertWarning('Warning', 'Please answer all question.')
      } else {
        let assLocAssLisSerHisData = {
          service_history_type: this.selectedServiceHistory,
          start_date_time: this.downtime_start,
          end_date_time: this.downtime_end,
          downtime_reason: this.downtime_reason,
          comments: this.downtime_comment
        }

        console.log("assLocAssLisSerHisData = ", assLocAssLisSerHisData)

        if (idToBeUpdate == '') {
          console.log("this is a new data ", idToBeUpdate)
          this.assetLocationAssetListServiceHistoriesService.post(assLocAssLisSerHisData).subscribe(
            (res) => {
              console.log("updatefailureformData = ", res)

              woacalalData.push(res.id)

              let woacassLocAssLisFormData = {
                service_histories: woacalalData
              }

              this.workOrderActivityCompletionAssLocAssListService.update(this.servHist.id, woacassLocAssLisFormData).subscribe(
                (woacalalRes) => {
                  console.log("woacalalRes =", woacalalRes)
                  this.alertWorkActivityAsset('Work Activity', 'SuccessFully Save Data.')
                }, (woacalalErr) => {
                  console.log(woacalalErr)
                }
              )
            }, (err) => {
              console.log(err)
            }
          )
        } else {
          console.log("this is a existing data ", idToBeUpdate)
          this.assetLocationAssetListServiceHistoriesService.update(idToBeUpdate, assLocAssLisSerHisData).subscribe(
            (res) => {
              console.log("updatefailureformData = ", res)

              // woacalalData.push(res.id)

              // let woacassLocAssLisFormData = {
              //   service_histories: woacalalData
              // }

              // this.workOrderActivityCompletionAssLocAssListService.update(this.servHist.id, woacassLocAssLisFormData).subscribe(
              //   (woacalalRes) => {
              //     console.log("woacalalRes =", woacalalRes)
              this.alertWorkActivityAsset('Work Activity', 'SuccessFully Save Data.')
              //   }, (woacalalErr) => {
              //     console.log(woacalalErr)
              //   }
              // )
            }, (err) => {
              console.log(err)
            }
          )
        }
      }
    } else {
      console.log("1trytest", this.questionAndAnswerData.length)
      console.log("2trytest", this.updateformData.length)
      if (this.questionAndAnswerData.length != this.updateformData.length) {
        this.alertWarning('Warning', 'Please answer all question.')
      } else {
        // this.updateformData.forEach(element1 => {
        for (let x = 0; x < this.updateformData.length; x++) {

          console.log("xxxxxx = ", x)
          console.log("this.updateformData[x] = ", this.updateformData[x])
          console.log("element1['valid_value'] = ", this.updateformData[x]['valid_value'].length)

          // let validvalue: any = []
          let styleDiv = ''
          let questionvalueData: string[]
          let questionvalue = [];
          let validvalue = [];
          let responseRadio = ''

          // this.updateformData[x]['valid_value'].forEach(element2 => {
          let valid_value_data = this.updateformData[x]['valid_value']

          for (let i = 0; i < valid_value_data.length; i++) {
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

                  console.log("serHisQueDataFormData =", serHisQueDataFormData)

                  this.serviceHistoriesQuestionService.post(serHisQueDataFormData).subscribe(
                    (serHisQueRes) => {

                      console.log("res serHisQueRes = ", serHisQueRes)
                      servHistQues.push(serHisQueRes.id);
                      console.log("servHistQues arr = ", servHistQues)

                      console.log("before x == this.updateformData.length = ", x, " -- ", (this.updateformData.length - 1))
                      if (x == (this.updateformData.length - 1)) {
                        console.log("servHistQues arr final = ", servHistQues)
                        console.log("after x == this.updateformData.length = ", x, " -- ", (this.updateformData.length - 1))

                        let assLocAssLisSerHisData = {
                          comments: this.updateformData[x].question_seq,
                          service_history_type: this.selectedServiceHistory,
                          // failure_type: this.updateformData[x].question_seq,
                          // failure_mode: this.updateformData[x].question_seq,
                          // failure_repair: this.updateformData[x].question_seq,
                          // failure_component: this.updateformData[x].question_seq,
                          // failure_root_cause: this.updateformData[x].question_seq,
                          // svc_hist_type_req_fl: this.updateformData[x].question_seq,
                          // downtime_reason: this.updateformData[x].question_seq,
                          question: servHistQues
                        }
                        console.log("assLocAssLisSerHisData>><<<<><", assLocAssLisSerHisData)
                        if (idToBeUpdate == '') {
                          console.log(assLocAssLisSerHisData)
                          this.assetLocationAssetListServiceHistoriesService.post(assLocAssLisSerHisData).subscribe(
                            (alslshRes) => {
                              console.log("alslshRes", alslshRes)
                              console.log("alslshRes", alslshRes.id)

                              woacalalData.push(alslshRes.id)

                              // let woacassLocAssLisDataFormData = new FormData();
                              // woacassLocAssLisDataFormData.append('service_histories',woacalalData)
                              let woacassLocAssLisFormData = {
                                service_histories: woacalalData
                              }

                              this.workOrderActivityCompletionAssLocAssListService.update(this.servHist.id, woacassLocAssLisFormData).subscribe(
                                (woacalalRes) => {
                                  console.log("woacalalRes =", woacalalRes)
                                  this.alertWorkActivityAsset('Work Activity', 'Your service history has been successfully updated.')
                                  // this.presentAlertConfirm()
                                }, (woacalalErr) => {
                                  console.log(woacalalErr)
                                }
                              )

                            }, (alslshErr) => {
                              console.log("alslshErr", alslshErr)
                            }, () => {
                            }
                          )
                        } else {
                          console.log(assLocAssLisSerHisData)
                          this.assetLocationAssetListServiceHistoriesService.update(idToBeUpdate, assLocAssLisSerHisData).subscribe(
                            (alslshRes) => {
                              console.log("alslshRes", alslshRes)

                              // console.log("siniiiiii length = ", this.workOrderActComAssLocAssLis)
                              // if (this.workOrderActComAssLocAssLis.service_histories.length > 0) {
                              //   console.log("sana length = ", this.workOrderActComAssLocAssLis.service_histories.length)
                              //   this.workOrderActComAssLocAssLis.service_histories
                              //     .forEach(element => {
                              //       // this.AssLocAssLisArrId
                              //       woacalalData.push(element)
                              //     });
                              // } else {
                              //   console.log("sini length = ", this.workOrderActComAssLocAssLis.service_histories.length)
                              //   woacalalData = []
                              // }

                              // woacalalData.push(alslshRes.id)

                              // let woacassLocAssLisDataFormData = new FormData();
                              // woacassLocAssLisDataFormData.append('service_histories',woacalalData)
                              // let woacassLocAssLisFormData = {
                              //   service_histories: woacalalData
                              // }

                              // this.workOrderActivityCompletionAssLocAssListService.update(this.servHist.id, woacassLocAssLisFormData).subscribe(
                              //   (woacalalRes) => {
                              //     console.log("woacalalRes =", woacalalRes)
                              this.alertWorkActivityAsset('Work Activity', 'SuccessFully Save Data.')
                              //     // this.presentAlertConfirm()
                              //   }, (woacalalErr) => {
                              //     console.log(woacalalErr)
                              //   }
                              // )

                            }, (alslshErr) => {
                              console.log("alslshErr", alslshErr)
                            }, () => {
                            }
                          )
                        }
                        // console.log("here 111111111111")

                      }

                    },
                    (err) => {
                      console.error("err", err);
                    },
                    () => {

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
      }
    }

    // setTimeout(function () {
    //   console.log("servHistQues arrid = ", servHistQues)
    // }, 4000);

  }

  async alertWarning(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['ok'],
    });

    await alert.present();
  }

  async alertWorkActivityAsset(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            // this.router.navigate(["/technical/maintenance-work-list"]);
            // this.router.navigate(["/technical/work-activity-asset"]);
            this.modalController.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are sure want to complete the service history?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.clickSaveServiceHistory()
            console.log('Confirm Okay');
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }
}
