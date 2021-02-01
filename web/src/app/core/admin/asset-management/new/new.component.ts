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
    parent_location: true, //
    location_description: true, //
    building: true, //
    address_line_1: true,  //
    address_line_2: true, //
    address_line_3: true, //
    city: true, //
    state: true, //
    postal_code: true, //
    country: true, //
    tag_number: true, //
    service_area: true, //
    maintenance_planner: true, //
    location_main_contact: true, //
    location_asset_maintenance_manager: true, //
    gis_esri_id: true, //
    latitude: true, //
    longitude: true, //
    asset_critically: true, //
    cost_center: true,
    // asset_owning_depart: true,
    sub_process_system: true,
    brand: true,
    size_capacity_1: true,
    size_capacity_2: true,
    size_capacity_3: true,
    maintenance_specification: true,
    asset_owning_department: true,
    asset_or_component_type: true,
    badge_no: true,
    size_capacity_1_unit_measurement: true,
    size_capacity_2_unit_measurement: true,
    size_capacity_3_unit_measurement: true,
    measurement_type: true,
    main_operation: true,
    asset_class_asset_category: true,
    internal_asset_identity: true,
    sub_category_1: true,
    parent_asset_plate_number: true,
    purchase_date_installed_handed_over_date: true,
    warranty: true,
    region: true,
    handed_over_asset_or_procured: true,
    asset_primary_category: true,
    sub_category_2: true,
    asset_plate_number: true,
    condition_rating: true,
    actual_warranty_period: true,
    operation: true,
    process_function: true,
    model_number: true,
    detailed_description: true,
    serial_number: true,
    asset_status: true,
    warranty_vendor_name: true,
    asset_tag_number: true,
    asset_identity: true,
    bottom_water_level: true,
    closing_torque: true,
    dimention: true,
    frequency: true,
    infrastructure_status: true,
    installation: true,
    manufacturer: true,
    material_type: true,
    no_of_channel: true,
    opening_torque: true,
    pump_head: true,
    staging_height: true,
    top_water_level: true,
    valve_pressure_rating: true,
    vehicle_engine_number: true,
    vehicle_insurance_auto_windscreen_insured: true,
    vehicle_insurance_sum_insured: true,
    vehicle_owner_status: true,
    vehicle_puspakom_expired_date: true,
    vehicle_roadtax_expired_date: true,
    vehicle_seating_capacity: true,
    communication_protocol: true,
    environmental_performance: true,
    horse_power: true,
    infrastructure_status_reason: true,
    insulation: true,
    manufacturer_year: true,
    model: true,
    no_of_phases: true,
    outlet_diameter: true,
    revolutions_per_minute: true,
    supply_location: true,
    type: true,
    vehicle_chasis_number: true,
    vehicle_insurance_vendor: true,
    vehicle_insurance_cover_note_number: true,
    vehicle_insurance_no_claim_discount: true,
    vehicle_insurance_total_premium: true,
    vehicle_register_date: true,
    vehicle_spad_permit_date_period_to: true,
    vehicle_spad_no_license_operator: true,
    vehicle_registration_owner: true,
    capacity_size: true,
    coverage_range: true,
    flow_rate: true,
    hysteresis: true,
    inlet_diameter: true,
    legal_name: true,
    manufacture_part_number: true,
    motor_current: true,
    no_of_stage: true,
    power_supply_type: true,
    source_from: true,
    temperature: true,
    valve_diameter: true,
    vehicle_engine_capacity: true,
    vehicle_model: true,
    vehicle_insurance_date_period_from: true,
    vehicle_insurance_policy_type: true,
    vehicle_puspakom_date_inspection: true,
    vehicle_roadtax_rate: true,
    vehicle_roadtax_renew_date: true,
    vehicle_spad_permit_date_period_from: true,
    voltage: true,
    vehicle_insurance_date_period_to: true
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
          val['isTick'] = false
          tempData.push(val)
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
      this.changeStatus(task)
    })
  }

  changeStatus(task) {
    let resData: any
    console.log('this.task = ', task)
    let no = 0
    let assetregser = this.assetsRegistrationService
    let badgeFormat = this.assetsBadgeNoService
    this.tableTemp1.forEach(function (itemVal) {

      if (itemVal['isTick'] == true) {
        let asspricat = itemVal.asset_primary_category
        console.log('asspricat = ', asspricat)
        let field = 'asset_primary_category=' + asspricat
        console.log('field = ', field)
        badgeFormat.filter(field).subscribe(
          (res) => {
            console.log('res', res[0])
          }
        )

        let updateformData: any
        // updateformData.append('status', 'PR');

        updateformData = {
          status: task
        }


        console.log('itemVal = ', itemVal)
        console.log('updateformData = ', updateformData)
        // assetregser.update(itemVal['id'], updateformData).subscribe(
        //   (res) => {
        //     console.log("res = ", res);
        //     resData = res
        //   },
        //   error => {
        //     console.error("err", error);
        //   }
        // )
      }
    })
    // if (resData.length > 0) {

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
    // }
  }
}
