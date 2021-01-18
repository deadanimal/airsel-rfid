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

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: 'app-processed',
  templateUrl: './processed.component.html',
  styleUrls: ['./processed.component.scss']
})
export class ProcessedComponent implements OnInit {
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
  }
  tableShow1 = false

  // Datatable
  entries: number = 10;
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
    // public spinner: NgxSpinnerService,
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

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      // console.log('wb = ', wb);
      const wsname: string = wb.SheetNames[1];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      // console.log('ws = ', ws);
      this.dataFromExcelFile = (XLSX.utils.sheet_to_json(ws, { raw: false }));
      // console.log('this.data = ', this.dataFromExcelFile);
      // let x = this.data.slice(1);
      // console.log('x = ', x);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  closeModal() {
    this.modal.hide();
  }

  submitFileExcel() {
    let assetregserv = this.assetsRegistrationService
    let toBeSubmitedData: any
    let no = 0
    this.dataFromExcelFile.forEach(function (loopval, index) {

      const formData = new FormData();
      // formData.asset_owning_department = loopval.asset_owning_department
      formData.append('asset_owning_department', loopval.asset_owning_department);
      formData.append('main_operation', loopval.main_operation)
      formData.append('region', loopval.region)
      formData.append('operation', loopval.operation)
      formData.append('parent_location', loopval.parent_location)
      formData.append('process_function', loopval.process_function)
      formData.append('sub_process_system', loopval.sub_process_system)
      formData.append('asset_or_component_type', loopval.asset_or_component_type)
      formData.append('asset_class_asset_category', loopval.asset_class_asset_category)
      formData.append('handed_over_asset_or_procured', loopval.handed_over_asset_or_procured)
      formData.append('asset_primary_category', loopval.asset_primary_category)
      formData.append('asset_identity', loopval.asset_identity)
      formData.append('location_description', loopval.location_description)
      formData.append('building', loopval.building)
      formData.append('address_line_1', loopval.address_line_1)
      formData.append('address_line_2', loopval.address_line_2)
      formData.append('address_line_3', loopval.address_line_3)
      formData.append('city', loopval.city)
      formData.append('state', loopval.state)
      formData.append('postal_code', loopval.postal_code)
      formData.append('country', loopval.country)
      formData.append('tag_number', loopval.tag_number)
      formData.append('service_area', loopval.service_area)
      formData.append('location_main_contact', loopval.location_main_contact)
      formData.append('location_asset_maintenance_manager', loopval.location_asset_maintenance_manager)
      formData.append('maintenance_planner', loopval.maintenance_planner)
      formData.append('gis_esri_id', loopval.gis_esri_id)
      formData.append('latitude', loopval.latitude)
      formData.append('longitude', loopval.longitude)
      formData.append('asset_critically', loopval.asset_criticality)
      formData.append('cost_center', loopval.cost_center)
      formData.append('sub_category_1', loopval.sub_category_1)
      formData.append('sub_category_2', loopval.sub_category_2)
      formData.append('brand', loopval.brand)
      formData.append('model_number', loopval.model_number)
      formData.append('size_capacity_1', loopval.size_capacity_1)
      formData.append('size_capacity_1_unit_measurement', loopval.size_capacity_1_unit_measurement)
      formData.append('size_capacity_2', loopval.size_capacity_2)
      formData.append('size_capacity_2_unit_measurement', loopval.size_capacity_2_unit_measurement)
      formData.append('size_capacity_3', loopval.size_capacity_3)
      formData.append('size_capacity_3_unit_measurement', loopval.size_capacity_3_unit_measurement)
      formData.append('parent_asset_plate_number', loopval.parent_asset_plate_number)
      formData.append('asset_plate_number', loopval.asset_plate_number)
      formData.append('detailed_description ', loopval.detailed_description)
      formData.append('serial_number', loopval.serial_number)
      formData.append('asset_tag_number', loopval.asset_tag_number)
      formData.append('purchase_date_installed_handed_over_date', loopval.purchase_date_installed_handed_over_date)
      formData.append('condition_rating', loopval.condition_rating)
      formData.append('asset_status', loopval.asset_status)
      formData.append('maintenance_specification', loopval.maintenance_specification)
      formData.append('measurement_type', loopval.measurement_type)
      formData.append('warranty', loopval.warranty)
      formData.append('actual_warranty_period', loopval.actual_warranty_period)
      formData.append('warranty_vendor_name', loopval.warranty_vendor_name)
      formData.append('bottom_water_level', loopval.bottom_water_level)
      formData.append('closing_torque', loopval.closing_torque)
      formData.append('dimention', loopval.dimention)
      formData.append('frequency', loopval.frequency)
      formData.append('infrastructure_status', loopval.infrastructure_status)
      formData.append('installation', loopval.installation)
      formData.append('manufacturer', loopval.manufacturer)
      formData.append('material_type', loopval.material_type)
      formData.append('no_of_channel', loopval.no_of_channel)
      formData.append('opening_torque', loopval.opening_torque)
      formData.append('pump_head', loopval.pump_head)
      formData.append('staging_height', loopval.staging_height)
      formData.append('top_water_level', loopval.top_water_level)
      formData.append('valve_pressure_rating', loopval.valve_pressure_rating)
      formData.append('vehicle_engine_number', loopval.vehicle_engine_number)
      formData.append('vehicle_insurance_auto_windscreen_insured', loopval.vehicle_insurance_auto_windscreen_insured)
      formData.append('vehicle_insurance_date_period_to', loopval.vehicle_insurance_date_period_to)
      formData.append('vehicle_insurance_sum_insured', loopval.vehicle_insurance_sum_insured)
      formData.append('vehicle_owner_status', loopval.vehicle_owner_status)
      formData.append('vehicle_puspakom_expired_date', loopval.vehicle_puspakom_expired_date)
      formData.append('vehicle_roadtax_expired_date', loopval.vehicle_roadtax_expired_date)
      formData.append('vehicle_seating_capacity', loopval.vehicle_seating_capacity)
      formData.append('communication_protocol', loopval.communication_protocol)
      formData.append('environmental_performance', loopval.environmental_performance)
      formData.append('horse_power', loopval.horse_power)
      formData.append('infrastructure_status_reason', loopval.infrastructure_status_reason)
      formData.append('insulation', loopval.insulation)
      formData.append('manufacturer_year', loopval.manufacturer_year)
      formData.append('model', loopval.model)
      formData.append('no_of_phases', loopval.no_of_phases)
      formData.append('outlet_diameter', loopval.outlet_diameter)
      formData.append('revolutions_per_minute', loopval.revolutions_per_minute)
      formData.append('supply_location', loopval.supply_location)
      formData.append('type', loopval.type)
      formData.append('vehicle_chasis_number', loopval.vehicle_chassis_number)
      formData.append('vehicle_insurance_vendor', loopval.vehicle_insurance_vendor)
      formData.append('vehicle_insurance_cover_note_number', loopval.vehicle_insurance_cover_note_number)
      formData.append('vehicle_insurance_no_claim_discount', loopval.vehicle_insurance_no_claim_discount)
      formData.append('vehicle_insurance_total_premium', loopval.vehicle_insurance_total_premium)
      formData.append('vehicle_register_date', loopval.vehicle_register_date)
      formData.append('vehicle_spad_permit_date_period_to', loopval.vehicle_spad_permit_date_period_to)
      formData.append('vehicle_spad_no_license_operator', loopval.vehicle_spad_no_license_operator)
      formData.append('vehicle_registration_owner', loopval.vehicle_registration_owner)
      formData.append('capacity_size', loopval.capacity_size)
      formData.append('coverage_range', loopval.coverage_range)
      formData.append('flow_rate', loopval.flow_rate)
      formData.append('hysteresis', loopval.hysteresis)
      formData.append('inlet_diameter', loopval.inlet_diameter)
      formData.append('legal_name', loopval.legal_name)
      formData.append('manufacture_part_number', loopval.manufacture_part_number)
      formData.append('motor_current', loopval.motor_current)
      formData.append('no_of_stage', loopval.no_of_stage)
      formData.append('power_supply_type', loopval.power_supply_type)
      formData.append('source_from', loopval.source_from)
      formData.append('temperature', loopval.temperature)
      formData.append('valve_diameter', loopval.valve_diameter)
      formData.append('vehicle_engine_capacity', loopval.vehicle_engine_capacity)
      formData.append('vehicle_model', loopval.vehicle_model)
      formData.append('vehicle_insurance_date_period_from', loopval.vehicle_insurance_date_period_from)
      formData.append('vehicle_insurance_policy_type', loopval.vehicle_insurance_policy_type)
      formData.append('vehicle_puspakom_date_inspection', loopval.vehicle_puspakom_date_inspection)
      formData.append('vehicle_roadtax_rate', loopval.vehicle_roadtax_rate)
      formData.append('vehicle_roadtax_renew_date', loopval.vehicle_roadtax_renew_date)
      formData.append('vehicle_spad_permit_date_period_from', loopval.vehicle_spad_permit_date_period_from)
      formData.append('voltage', loopval.voltage)
      // console.log('loopval.main_operation = ', loopval.main_operation)
      // console.log('formData = ', formData);
      // dalam foreach
      assetregserv.post(formData).subscribe(
        (res) => {
          console.log("res = ", res);
        },
        error => {
          console.error("err", error);
        }
      )

    })

    swal
      .fire({
        title: "Success",
        text: "The submission has successfully recorded",
        type: "success",
      }).then((result) => {
        this.getRegisteredData()
      });
    this.closeModal()
  }

  getRegisteredData() {
    let tempData = []
    this.assetsRegistrationService.getProcessedList().subscribe(
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
    this.tableTemp1.forEach(function (itemVal) {

      if (itemVal['isTick'] == true) {
        // const updateformData = new FormData();
        let updateformData: any
        // updateformData.append('status', 'PR');
        updateformData = {
          status: task
        }
        console.log('updateformData = ', updateformData)
        assetregser.update(itemVal['id'], updateformData).subscribe(
          (res) => {
            console.log("res = ", res);
            resData = res
          },
          error => {
            console.error("err", error);
          }
        )
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
