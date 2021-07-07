import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import Dropzone from "dropzone";
import swal from "sweetalert2";
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from "ngx-spinner";

import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { AssetGroupsService } from "src/app/shared/services/asset-groups/asset-groups.service";
import { AssetTypesService } from "src/app/shared/services/asset-types/asset-types.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";
import { RegionsService } from "src/app/shared/services/regions/regions.service";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";
import { AssetsRegistrationService } from 'src/app/shared/services/assets-registration/assets-registration.service';
import { system } from '@amcharts/amcharts4/core';

import { AssetsBadgeNoService } from 'src/app/shared/services/assets-badge-no/assets-badge-no.service';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  // Tabs
  firstTab: boolean = true 
  secondTab: boolean = false
  thirdTab: boolean = false

  tempFileName = false;

  // escell data
  dataFromExcelFile = [];
  storeData: any;
  worksheet: any;
  fileUploaded: File;
  jsonData: any;
  badge_format_data: string = 'NA';

  data: [][]

  // Modal
  modal: BsModalRef;
  modalViewAsset: BsModalRef;
  modalRegisterAsset: BsModalRef;
  modalEditAsset: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-xl",
    ignoreBackdropClick: true,
  };
  modalConfigUpload = {
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    ignoreBackdropClick: true,
  };
  modalViewAssetConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    ignoreBackdropClick: true,
  };

  is_show1 = {
    parent_location: false, //
    location_description: true, //
    building: false, //
    address_line_1: false,  //
    address_line_2: false, //
    address_line_3: false, //
    city: false, //
    state: false, //
    postal_code: false, //
    country: false, //
    tag_number: false, //
    service_area: true, //
    maintenance_planner: false, //
    location_main_contact: false, //
    location_asset_maintenance_manager: false, //
    gis_esri_id: false, //
    latitude: false, //
    longitude: false, //
    asset_critically: false, //
    cost_center: false,
    // asset_owning_depart: true,
    sub_process_system: false,
    brand: false,
    size_capacity_1: false,
    size_capacity_2: false,
    size_capacity_3: false,
    maintenance_specification: false,
    asset_owning_department: true,
    asset_or_component_type: false,
    badge_no: false,
    size_capacity_1_unit_measurement: false,
    size_capacity_2_unit_measurement: false,
    size_capacity_3_unit_measurement: false,
    measurement_type: false,
    main_operation: false,
    asset_class_asset_category: false,
    internal_asset_identity: false,
    sub_category_1: false,
    parent_asset_plate_number: false,
    purchase_date_installed_handed_over_date: false,
    warranty: false,
    region: false,
    handed_over_asset_or_procured: false,
    asset_primary_category: false,
    sub_category_2: false,
    asset_plate_number: false,
    condition_rating: false,
    actual_warranty_period: false,
    operation: false,
    process_function: false,
    model_number: false,
    detailed_description: true,
    serial_number: false,
    asset_status: false,
    warranty_vendor_name: false,
    asset_tag_number: false,
    asset_identity: false,
    bottom_water_level: false,
    closing_torque: false,
    dimention: false,
    frequency: false,
    infrastructure_status: false,
    installation: false,
    manufacturer: false,
    material_type: false,
    no_of_channel: false,
    opening_torque: false,
    pump_head: false,
    staging_height: false,
    top_water_level: false,
    valve_pressure_rating: false,
    vehicle_engine_number: false,
    vehicle_insurance_auto_windscreen_insured: false,
    vehicle_insurance_sum_insured: false,
    vehicle_owner_status: false,
    vehicle_puspakom_expired_date: false,
    vehicle_roadtax_expired_date: false,
    vehicle_seating_capacity: false,
    communication_protocol: false,
    environmental_performance: false,
    horse_power: false,
    infrastructure_status_reason: false,
    insulation: false,
    manufacturer_year: false,
    model: false,
    no_of_phases: false,
    outlet_diameter: false,
    revolutions_per_minute: false,
    supply_location: false,
    type: false,
    vehicle_chasis_number: false,
    vehicle_insurance_vendor: false,
    vehicle_insurance_cover_note_number: false,
    vehicle_insurance_no_claim_discount: false,
    vehicle_insurance_total_premium: false,
    vehicle_register_date: false,
    vehicle_spad_permit_date_period_to: false,
    vehicle_spad_no_license_operator: false,
    vehicle_registration_owner: false,
    capacity_size: false,
    coverage_range: false,
    flow_rate: false,
    hysteresis: false,
    inlet_diameter: false,
    legal_name: false,
    manufacture_part_number: false,
    motor_current: false,
    no_of_stage: false,
    power_supply_type: false,
    source_from: false,
    temperature: false,
    valve_diameter: false,
    vehicle_engine_capacity: false,
    vehicle_model: false,
    vehicle_insurance_date_period_from: false,
    vehicle_insurance_policy_type: false,
    vehicle_puspakom_date_inspection: false,
    vehicle_roadtax_rate: false,
    vehicle_roadtax_renew_date: false,
    vehicle_spad_permit_date_period_from: false,
    voltage: false,
    vehicle_insurance_date_period_to: false
  }

  tableShow1 = false

  // Datatable
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [];
  SelectionType = SelectionType;
  tableTemp1 = [];
  tableTemp2 = [];
  tableTemp3 = [];

  constructor(
    public formBuilder: FormBuilder,
    public modalService: BsModalService,
    public assetsService: AssetsService,
    public assetGroupsService: AssetGroupsService,
    public assetTypesService: AssetTypesService,
    public authService: AuthService,
    public organisationsService: OrganisationsService,
    public regionsService: RegionsService,
    public toastr: NotifyService,
    public assetsRegistrationService: AssetsRegistrationService,
    public assetsBadgeNoService: AssetsBadgeNoService,
    public spinner: NgxSpinnerService
  ) {
    this.getRegisteredData()
  }


  ngOnInit() {
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toString().toLowerCase().indexOf(val.toString().toLowerCase()) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalNotification: TemplateRef<any>) {
    console.log("openModal");
    this.modal = this.modalService.show(modalNotification, this.modalConfig);
  }

  openModalUpload(modalNotification: TemplateRef<any>) {
    this.modal = this.modalService.show(modalNotification, this.modalConfigUpload);
  }

  openModalViewAsset(modalNotification: TemplateRef<any>) {
    this.modalViewAsset = this.modalService.show(
      modalNotification,
      this.modalViewAssetConfig
    );
  }

  openModalRegister(modalNotification: TemplateRef<any>) {
    this.modalRegisterAsset = this.modalService.show(
      modalNotification,
      this.modalConfig
    );
  }

  onSubmit() {
    swal.fire({
      title: "Success",
      text: "Your data successfully inserted into the system",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    });
  }

  showTable() {
    this.getRegisteredData();
    let counter = 0
    for (let x in this.is_show1) {
      if (this.is_show1[x]) {
        counter++
      }
    }
    console.log('counter = ', counter)
    if (counter > 2) {
      this.tableShow1 = true
    }
    else {
      console.log('bluek')
    }
  }

  closeModal() {
    this.modal.hide();
  }

  getRegisteredData() {
    let tempData = []
    this.assetsRegistrationService.getNewProcessedList().subscribe(
      (res) => {
        console.log("res all data", res);
        res.forEach(function (val) {
          console.log(val['status'])
          if (val['status']=="NP") {
            console.log("masuk sini");

            val['isTick'] = false
            tempData.push(val)
          }
        })
        console.log('tempData = ', tempData)
        this.tableTemp1 = tempData
      },
      error => {
        console.error("err", error);
      }
    )
  }

  onChange() {
    let counter = 0
    for (let x in this.is_show1) {
      if (this.is_show1[x]) {
        counter++
      }
    }

    if (counter < 1) {
      this.tableShow1 = false
    }
  }

  checkRow(selected) {
    let tempData = []
    console.log('test test tetst')
    this.tableTemp1.forEach(
      (item) => {
        // console.log(item['id'], ' == ', selected['id'])
        if (item['id'] == selected['id']) {
          console.log('isTick = ', item['isTick']);
          console.log('item b4 = ', item)
          item['isTick'] = item['isTick']
          console.log('item after = ', item)
          tempData.push(item)
        } else {
          tempData.push(item)
        }
      }
    )
    console.log('tempDataqweqe = ', tempData)
    this.tableTemp1 = tempData
  }

  confirm(task) {
    console.log("task", task);
    swal.fire({
      title: 'Are you sure?',
      text: 'To change the status.',
      type: 'warning',
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it',
      confirmButtonClass: 'btn btn-warning',
      cancelButtonText: 'Cancel',
      cancelButtonClass: 'btn btn-secondary'
    }).then((result) => {

      if (task=="PR") {
        this.changeStatusPR(task)
      } 
      else if (task=="RJ") {
        this.changeStatusRJ(task);
      }
    })
  }

  changeStatusRJ(task) {
    let resData: any
    let no = 0
    let assetregser = this.assetsRegistrationService
    this.tableTemp1.forEach(function (itemVal) {
      if (itemVal['isTick'] == true) {

        console.log('itemVal = ', itemVal.status)
        if (itemVal.status == 'NP') {
          let updateformData: any

          updateformData = {
            status: task
          }
          assetregser.update(itemVal['id'], updateformData).subscribe(
            (res) => {
              console.log("update status RJ", res);
            },
            error => {
              console.error("err", error);
            }
          )
        } else {
          no++
        }
      }
    })

    // if (no > 0) {
    //   swal.fire({
    //     title: 'Warning',
    //     text: 'The incomplete data cannot be save.',
    //     type: 'warning',
    //     buttonsStyling: false,
    //     confirmButtonText: 'Ok',
    //     confirmButtonClass: 'btn btn-warning'
    //   }).then((result) => {
    //     this.getRegisteredData()
    //   })
    // } else {
    //   swal.fire({
    //     title: 'Success',
    //     text: 'Successfully Change Status',
    //     type: 'success',
    //     buttonsStyling: false,
    //     confirmButtonText: 'Ok',
    //     confirmButtonClass: 'btn btn-success'
    //   }).then((result) => {
    //     this.getRegisteredData()
    //   })
    // }
    swal.fire({
        title: 'Success',
        text: 'Successfully Change Status',
        type: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Ok',
        confirmButtonClass: 'btn btn-success'
      }).then((result) => {
        this.getRegisteredData()
      })


  }
  changeStatusPR(task) {
    let finalNo: string;
    let updatedlatestNo: any;
    let updatedSkippedNo: any;
    let no = 0
    var badgeFormatData: string = "NA";
    let resData: any
    let assetregser = this.assetsRegistrationService
    let badgeFormatService = this.assetsBadgeNoService
    this.tableTemp1.forEach(function (itemVal) {
      if (itemVal['isTick'] == true) {
        let asspricat = itemVal.asset_primary_category
        let field = 'asset_primary_category=' + asspricat + '&status=AC'

        badgeFormatService.filter(field).subscribe(
          (res) => {
            // ISSUE here condition wrong
            if (res.length >= 1) {
              console.log("MATCH FOUND");

              // by latest no
              if (res[0].skipped_no[0] == 0 || res[0].skipped_no.length == 0) {
                let currentNo = +parseInt(res[0].latest_no) + 1;
                finalNo = String(currentNo);
                
                // Later need to enhance this badge generation
                badgeFormatData = res[0].short + "_000000" + finalNo;
                updatedlatestNo = {
                  latest_no: currentNo, 
                }

                badgeFormatService.update(res[0].id, updatedlatestNo).subscribe(
                  (res) => {
                    console.log("Updating Latest no", res);
                  },
                  (err) => {
                    console.log("Updating Latest no", res);
                  }
                )
              } 

              // by skipped no  
              else {
                let currentNo = res[0].skipped_no[0]
                console.log("CNO", currentNo);
                //badgeFormatData = res[0].short + "_" + currentNo.padStart(7, '0');
                badgeFormatData = res[0].short + "_000000" + currentNo;

                updatedSkippedNo = {
                  skipped_no: res[0].skipped_no.slice(1)
                }

                badgeFormatService.update(res[0].id, updatedSkippedNo).subscribe(
                  (res) => {
                    console.log("Updating Skipped no", res);
                  },
                  (err) => {
                    console.log("Updating Skipped no", res);
                  }
                )

              }

                            
              
            } else {
              console.log("MATCH NOT FOUND");
              badgeFormatData = 'NA'
            }
          },
          (err) => {
            console.log("err", err);
          }
        )
        setTimeout(function () {


          console.log('itemVal = ', itemVal.status)
          if (itemVal.status == 'NP') {
            let updateformData: any

            updateformData = {
              status: task,
              badge_no: badgeFormatData 
            }
            assetregser.update(itemVal['id'], updateformData).subscribe(
              (res) => {
                console.log("update status NP", res);
              },
              error => {
                console.error("err", error);
              }
            )
          } else {
            no++
          }
       }, 1000);
      }
    })
    swal.fire({
        title: 'Success',
        text: 'Successfully Change Status',
        type: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Ok',
        confirmButtonClass: 'btn btn-success'
      }).then((result) => {
        this.getRegisteredData()
      })


  }



  changeStatus(task) {
    let resData: any
    let badgeFormatdata
    // console.log('this.task = ', task)
    let no = 0
    let assetregser = this.assetsRegistrationService
    let badgeFormatService = this.assetsBadgeNoService
    this.tableTemp1.forEach(function (itemVal) {
      if (itemVal['isTick'] == true) {
        let asspricat = itemVal.asset_primary_category
        let field = 'asset_primary_category=' + asspricat + '&status=AC'
        // console.log('field = ', field)
        badgeFormatService.filter(field).subscribe(
          (res) => {
            // console.log('res qweqwe', res)
            badgeFormatdata = res[0]
            console.log("badgeFormatdata", badgeFormatdata);
            // console.log('badgeFormatdata asdasd = ', badgeFormatdata)
          }
        )

        setTimeout(function () {

          // () => {
          let updateformData: any
          let updateSkippedNo: any
          // updateformData.append('status', 'PR');
          // console.log('badgeFormatdata qweqwe = ', badgeFormatdata)

          //var skippedNo = badgeFormatdata.skipped_no
          var skippedNo = null;
          // console.log('skippedNo = ', skippedNo)
          let runNo = 1
          let firstSkippedNo: any
          let leftSkippedNo: any
          let currentNo = ''

          if (badgeFormatdata.skipped_no !== undefined) {
            if (badgeFormatdata.skipped_no.length > 0) {
              skippedNo.forEach(function (noTest) {

                if (runNo == 1) {
                // console.log('noTest if = ', noTest)
                  firstSkippedNo = noTest
                  // leftSkippedNo += '"0"'
                }
                // else {
                //   console.log('noTest else = ', noTest)
                //   // leftSkippedNo += '"' + noTest + '"'
                // }

                runNo++
              })

              skippedNo.forEach((element, index) => {
                if (element == firstSkippedNo) {
                  skippedNo.splice(index, 1)
                }
              });
              leftSkippedNo = skippedNo
              updateSkippedNo = {
                skipped_no: leftSkippedNo
              }

              badgeFormatService.update(badgeFormatdata.id, updateSkippedNo).subscribe(
                (res) => {
                },
                (err) => {
                }
              )
              currentNo = firstSkippedNo
            } else {
              firstSkippedNo = badgeFormatdata.latest_no

              currentNo = badgeFormatdata.latest_no

              updateSkippedNo = {
                latest_no: leftSkippedNo
              }

              badgeFormatService.update(badgeFormatdata.id, updateSkippedNo).subscribe(
                (res) => {
                },
                (err) => {
                }
              )
            }

            let badgeNo = badgeFormatdata.short + '_' + currentNo.padStart(7, '0')
            updateformData = {
              status: task,
              badge_no: badgeNo, 
            }

            // console.log('itemVal = ', itemVal)
            console.log('updateformData = ', updateformData)
            assetregser.update(itemVal['id'], updateformData).subscribe(
              (res) => {
                console.log("res = ", res);
                resData = res
                this.getRegisteredData()

              },
              error => {
                console.error("err", error);
              }
            )

            }

                    // }
        }, 100);
        setTimeout(function () {

          swal.fire({
            title: 'Success',
            text: 'Successfully Change Status',
            type: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Ok',
            confirmButtonClass: 'btn btn-success'
          }).then((result) => {
          })


        }, 1000);


      } else {
        console.log("should be here");
        setTimeout(function () {
          swal.fire({
            title: 'Failed',
            text: 'Fail to change status, please check your badge number.',
            type: 'warning',
            buttonsStyling: false,
            confirmButtonText: 'Ok',
            confirmButtonClass: 'btn btn-danger'
          }).then((result) => {
          })


        }, 1000);

      }
    })
    // if (resData.length > 0) {
      }
}
