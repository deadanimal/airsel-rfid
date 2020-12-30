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

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  // Stepper
  isLinear = false;
  isDisableRipple = true;

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
  // onFileChange(event) {
  //   this.fileUploaded = event.target.files[0];
  //   this.readExcel();
  // }

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

  focusSearch;

  regions = [];
  organisations = [];
  assetprimarycategory = [
    { value: "ACTR", name: "Actuator" },
    { value: "AV", name: "Air Valve" },
    { value: "MTRSR", name: "Motor-Slip Ring" },
    { value: "PES", name: "Pump-End Suction" },
    { value: "RSVR", name: "Reservoir" },
    { value: "NA", name: "Not Available" },
  ];
  assetowningdepartment = [
    { value: "CBS", name: "Customer Billing Sevices" },
    { value: "DB", name: "Distribution" },
    { value: "ESD", name: "Engineering Services-Distribution" },
    { value: "FLT", name: "Fleet" },
    { value: "LND", name: "Land" },
    { value: "NRW", name: "NRW"},
    { value: "PN", name: "Production Northern"},
    { value: "PS", name: "Production Southern"},
    { value: "SCD", name: "SCADA"},
    { value: "WQ", name: "Water Quality"},
    { value: "NA", name: "Not Available" },
  ];
  mainoperationregister = [
    { value: "CBS", name: "Customer Billing Services" },
    { value: "DB", name: "Distribution" },
    { value: "GA", name: "General Admin" },
    { value: "PRD", name: "Production" },
    { value: "SCD", name: "SCADA" },
    { value: "WQ", name: "Water Quality"},
    { value: "FLT", name: "Fleet"},
    { value: "NA", name: "Not Available" },
  ];
  region = [
    { value: "KS", name: "Kuala Selangor" },
    { value: "KUL", name: "Kuala Lumpur" },
    { value: "HL", name: "Hulu Langat" },
    { value: "SB", name: "Sabak Bernam" },
    { value: "PTG", name: "Petaling" },
    { value: "KLT", name: "Kuala Langat"},
    { value: "HS", name: "Hulu Selangor"},
    { value: "SP", name: "Sepang"},
    { value: "GBK", name: "Gombak"},
    { value: "KLG", name: "Klang"},
    { value: "NRTH", name: "North"},
    { value: "STH", name: "South"},
    { value: "HQ", name: "Headquarters"},
    { value: "NA", name: "Not Available" },
  ];
  operation = [
    { value: "ND", name: "NRW - District Metering Zone" },
    { value: "NT", name: "NRW - Transmission Network" },
    { value: "NW", name: "NRW - Water Balancing Area" },
    { value: "PH", name: "Pump House" },
    { value: "RS", name: "Reservoir" },
    { value: "VD", name: "Valve - Distribution Main" },
    { value: "VT", name: "Valve - Trunk Main" },
    { value: "WT", name: "Water Treatment Plant" },
    { value: "WL", name: "WQ Laboratory Services" },
    { value: "WO", name: "WQ - Online Analyzer" },
    { value: "WR", name: "WQ - River Monitoring Station" },
    { value: "WS", name: "WQ Sampling Station" },
    { value: "NA", name: "Not Available" },
  ];
  parentlocation = [
    { value: "AS", name: "Aeration System" },
    { value: "BR", name: "Balancing Reservoir" },
    { value: "BD", name: "Buildings" },
    { value: "CD", name: "Chemical Dosing" },
    { value: "CS", name: "Coagulation System" },
    { value: "DT", name: "Draw of Tower" },
    { value: "ES", name: "Earthing System" },
    { value: "EP", name: "Electrical Panel" },
    { value: "ES", name: "Electrical System" },
    { value: "FS", name: "Filtration Process" },
    { value: "FC", name: "Flocculation" },
    { value: "OR", name: "Off River Storage Reservoir" },
    { value: "RW", name: "Raw Water Process" },
    { value: "SP", name: "Sedimentation Process" },
    { value: "SS", name: "Solar System" },
    { value: "ST", name: "Sludge Treament Process" },
    { value: "SW", name: "Settled Water Process" },
    { value: "TI", name: "Tangki Imbang 3MG" },
    { value: "TO", name: "Tangki Imbangan 4MG (OLD)" },
    { value: "TN", name: "Tangki Imbangan 4MG (NEW)" },
    { value: "TS", name: "Telemetry System" },
    { value: "TP", name: "Treatment Process" },
    { value: "TW", name: "Treated Water Process" },
    { value: "WA", name: "Water Analysis" },
    { value: "NA", name: "Not Available" },
  ];
  // hierarchylevel1s = [
  //   { value: "CB", name: "Customer Billing Services" },
  //   { value: "DB", name: "Distribution" },
  //   { value: "FL", name: "Fleet" },
  //   { value: "GA", name: "General Admin" },
  //   { value: "PD", name: "Production" },
  //   { value: "SD", name: "SCADA" },
  //   { value: "WQ", name: "Water Quality" },
  //   { value: "NA", name: "Not Available" },
  // ];
  // hierarchylevel3s = [
  //   { value: "ND", name: "NRW - District Metering Zone" },
  //   { value: "NT", name: "NRW - Transmission Network" },
  //   { value: "NW", name: "NRW - Water Balancing Area" },
  //   { value: "PH", name: "Pump House" },
  //   { value: "RS", name: "Reservoir" },
  //   { value: "VD", name: "Valve - Distribution Main" },
  //   { value: "VT", name: "Valve - Trunk Main" },
  //   { value: "WT", name: "Water Treatment Plant" },
  //   { value: "WL", name: "WQ Laboratory Services" },
  //   { value: "WO", name: "WQ - Online Analyzer" },
  //   { value: "WR", name: "WQ - River Monitoring Station" },
  //   { value: "WS", name: "WQ Sampling Station" },
  //   { value: "NA", name: "Not Available" },
  // ];
  // hierarchylevel4s = [
  //   { value: "NR", name: "NRW" },
  //   { value: "PH", name: "Pump House" },
  //   { value: "RS", name: "Reservoir" },
  //   { value: "TP", name: "Treatment Plant Name" },
  //   { value: "NA", name: "Not Available" },
  // ];
  // hierarchylevel5s = [
  //   { value: "AS", name: "Aeration System" },
  //   { value: "BR", name: "Balancing Reservoir" },
  //   { value: "BD", name: "Buildings" },
  //   { value: "CD", name: "Chemical Dosing" },
  //   { value: "CS", name: "Coagulation System" },
  //   { value: "DT", name: "Draw of Tower" },
  //   { value: "ES", name: "Earthing System" },
  //   { value: "EP", name: "Electrical Panel" },
  //   { value: "ES", name: "Electrical System" },
  //   { value: "FS", name: "Filtration Process" },
  //   { value: "FC", name: "Flocculation" },
  //   { value: "OR", name: "Off River Storage Reservoir" },
  //   { value: "RW", name: "Raw Water Process" },
  //   { value: "SP", name: "Sedimentation Process" },
  //   { value: "SS", name: "Solar System" },
  //   { value: "ST", name: "Sludge Treament Process" },
  //   { value: "SW", name: "Settled Water Process" },
  //   { value: "TI", name: "Tangki Imbang 3MG" },
  //   { value: "TO", name: "Tangki Imbangan 4MG (OLD)" },
  //   { value: "TN", name: "Tangki Imbangan 4MG (NEW)" },
  //   { value: "TS", name: "Telemetry System" },
  //   { value: "TP", name: "Treatment Process" },
  //   { value: "TW", name: "Treated Water Process" },
  //   { value: "WA", name: "Water Analysis" },
  //   { value: "NA", name: "Not Available" },
  // ];
  // hierarchylevel6s = [
  //   { value: "AP", name: "Actiflo Process" },
  //   { value: "AC", name: "Activated Carbon Process" },
  //   { value: "AS", name: "Aeration System" },
  //   { value: "ES", name: "Alum Process" },
  //   { value: "BP", name: "Backwash Process" },
  //   { value: "BR", name: "Balancing Reservoir" },
  //   { value: "BO", name: "Boat House" },
  //   { value: "BU", name: "Buildings" },
  //   { value: "CD", name: "Chemical Dosing" },
  //   { value: "CM", name: "Chemical Process" },
  //   { value: "CP", name: "Chlorination Process" },
  //   { value: "CO", name: "Coagulation Process" },
  //   { value: "CR", name: "Chemical Room" },
  //   { value: "CC", name: "Control Centre" },
  //   { value: "CR", name: "Control Room" },
  //   { value: "DP", name: "Data Process" },
  //   { value: "DS", name: "Distrafication" },
  //   { value: "DO", name: "Draw Off Process" },
  //   { value: "ES", name: "Earthing System" },
  //   { value: "EL", name: "Electrical System" },
  //   { value: "FS", name: "Facilities System" },
  //   { value: "FP", name: "Filtration Process" },
  //   { value: "FW", name: "Filtered Water Sampling" },
  //   { value: "FO", name: "Flocculation Process" },
  //   { value: "FL", name: "Fluoride Process" },
  //   { value: "LB", name: "Laboratory" },
  //   { value: "LP", name: "Lime Process" },
  //   { value: "OA", name: "Online Analyzer" },
  //   { value: "PR", name: "Polymer (Residual) Dosing" },
  //   { value: "PA", name: "Poly Aluminium Chloride Process" },
  //   { value: "PP", name: "Polymer Process" },
  //   { value: "PS", name: "Power Supply" },
  //   { value: "RM", name: "Rapid Mixing" },
  //   { value: "RE", name: "Residual Emergency Lagoon" },
  //   { value: "RT", name: "Residual Thickened Pumping Station" },
  //   { value: "RI", name: "Raw Water Intake System" },
  //   { value: "RS", name: "Raw Water Pumping System" },
  //   { value: "RP", name: "Raw Water Process" },
  //   { value: "RE", name: "Raw Water Pipeline" },
  //   { value: "RV", name: "Reservoir" },
  //   { value: "SS", name: "SCADA System" },
  //   { value: "SD", name: "Sedimentation Process" },
  //   { value: "SL", name: "Settled Water Process" },
  //   { value: "SS", name: "Settled Water Sampling" },
  //   { value: "SW", name: "Settled Water Pumping System" },
  //   { value: "SB", name: "Sludge Balancing" },
  //   { value: "ST", name: "Sludge Treament Process" },
  //   { value: "SQ", name: "Solid Liquid Separation" },
  //   { value: "SA", name: "Solar System" },
  //   { value: "SI", name: "Sodium Alumino Silicate Process" },
  //   { value: "SO", name: "Soda Ash Process" },
  //   { value: "TA", name: "Tangki Sedit SYABAS" },
  //   { value: "TE", name: "Telemetry System" },
  //   { value: "TP", name: "Treated Water Process" },
  //   { value: "TS", name: "Treated Water Sampling" },
  //   { value: "TL", name: "Treated Water Pipeline" },
  //   { value: "TW", name: "Treated Water Pumping System" },
  //   { value: "TT", name: "Treatment Process" },
  //   { value: "WA", name: "Water Analysis" },
  //   { value: "WO", name: "Workshop" },
  //   { value: "WT", name: "Water Transfer" },
  //   { value: "WP", name: "Wash Water Process" },
  //   { value: "WR", name: "Wash Water Recovery" },
  //   { value: "WS", name: "Wash Water System" },
  //   { value: "NA", name: "Not Available" },
  // ];
  typeassets = [];
  categories = [];
  identities = [];
  primarycategories = [];
  groupsubcategory1s = [];
  groupsubcategory2s = [];
  ratings = [
    { value: "1", name: "1 - Very Good" },
    { value: "2", name: "2 - Good" },
    { value: "3", name: "3 - Average" },
    { value: "4", name: "4 - Popover" },
    { value: "5", name: "5 - Replace" },
  ];
  statuses = [{ value: "NA", name: "Not Available" }];
  measuringtypes = [
    { value: "FM", name: "Flow Meter Readings" },
    { value: "TP", name: "Temperature" },
    { value: "OT", name: "Other" },
  ];

  is_show1 = {
    parent_location: false, //
    loca_desc: false, //
    building: false, //
    addr_line1: false,  //
    addr_line2: false, //
    addr_line3: false, //
    city: false, //
    state: false, //
    postal_code: false, //
    country: false, //
    tag_no: false, //
    service_area: false, //
    maintenance_planner: false, //
    loca_main_contact: false, //
    loca_mainte_manager: false, //
    gis_esri_id: false, //
    latitude: false, //
    longitude: false, //
    asset_criticallity: false, //
    cost_center: false
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

  // Forms
  fileuploadFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // thirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;
  // fifthFormGroup: FormGroup;
  // sixthFormGroup: FormGroup;
  // seventhFormGroup: FormGroup;
  validation_messages = [];

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
    this.getAssets();
    this.getRegisteredData()

    this.firstFormGroup = this.formBuilder.group({
      asset_primary_category : ["", Validators.required],
      asset_identity : ["", Validators.required],
      sub_category_1 : ["", Validators.required],
      sub_category_2 : ["", Validators.required],
      asset_or_component_type : ["", Validators.required],
      handed_over_asset_or_procured : ["", Validators.required],
      class_category : ["", Validators.required],
      asset_owning_department : ["", Validators.required],
      main_operation : ["", Validators.required],
      region : ["", Validators.required],
      operation : ["", Validators.required],
      parent_location : ["",Validators.required],
      process_function : ["",Validators.required],
      sub_process_system : ["",Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      bottom_water_level: ["", Validators.required],
      brand: ["", Validators.required],
      capacity_size: ["", Validators.required],
      closing_torque: ["", Validators.required],
      communication_protocol: ["", Validators.required],
      coverage_range: ["", Validators.required],
      dimension: ["", Validators.required],
      environmental_performance: ["", Validators.required],
      flow_rate: ["", Validators.required],
      frequency: ["", Validators.required],
      horse_power: ["", Validators.required],
      hysteresis: ["", Validators.required],
      infrastructure_status: ["", Validators.required],
      infrastructure_status_reason: ["", Validators.required],
      inlet_diameter: ["", Validators.required],
      installation: ["", Validators.required],
      insulation: ["", Validators.required],
      legal_name: ["", Validators.required],
      manufacturer: ["", Validators.required],
      manufacturer_year: ["", Validators.required],
      manufacture_part_number: ["", Validators.required],
      material_type: ["", Validators.required],
      model: ["", Validators.required],
      motor_current: ["", Validators.required],
      no_of_channel: ["", Validators.required],
      no_of_phases: ["", Validators.required],
      no_of_stage: ["", Validators.required],
      opening_torque: ["", Validators.required],
      outlet_diameter: ["", Validators.required],
      power_supply_type: ["", Validators.required],
      pump_head: ["", Validators.required],
      revolutions_per_minute: ["", Validators.required],
      source_from: ["", Validators.required],
      staging_height: ["", Validators.required],
      supply_location: ["", Validators.required],
      temperature: ["", Validators.required],
      top_water_level: ["", Validators.required],
      type: ["", Validators.required],
      valve_diameter: ["", Validators.required],
      valve_pressure_rating: ["", Validators.required],
      vehicle_chassis_number: ["", Validators.required],
      vehicle_engine_capacity: ["", Validators.required],
      vehicle_engine_number: ["", Validators.required],
      vehicle_insurance_vendor: ["", Validators.required],
      vehicle_model: ["", Validators.required],
      vehicle_insurance_auto_windscreen_insured: ["", Validators.required],
      vehicle_insurance_cover_note_number: ["", Validators.required],
      vehicle_insurance_date_period_from: ["", Validators.required],
      vehicle_insurance_date_period_to: ["", Validators.required],
      vehicle_insurance_no_claim_discount: ["", Validators.required],
      vehicle_insurance_policy_type: ["", Validators.required],
      vehicle_insurance_sum_insured: ["", Validators.required],
      vehicle_insurance_total_premium: ["", Validators.required],
      vehicle_puspakom_date_inspection: ["", Validators.required],
      vehicle_owner_status: ["", Validators.required],
      vehicle_register_date: ["", Validators.required],
      vehicle_roadtax_rate: ["", Validators.required],
      vehicle_puspakom_expired_date: ["", Validators.required],
      vehicle_spad_permit_date_period_to: ["", Validators.required],
      vehicle_roadtax_renew_date: ["", Validators.required],
      vehicle_roadtax_expired_date: ["", Validators.required],
      vehicle_spad_no_license_operator: ["", Validators.required],
      vehicle_spad_permit_date_period_from: ["", Validators.required],
      vehicle_seating_capacity: ["", Validators.required],
      vehicle_registration_owner: ["", Validators.required],
      voltage: ["", Validators.required],
    });
    this.fileuploadFormGroup = this.formBuilder.group({
      excelFile: ["", Validators.required],
    })
  }

  getAssets() {
    // this.rows = assets;
    // this.temp = this.rows.map((prop, key) => {
    //   return {
    //     ...prop,
    //     // id: key,
    //     no: key,
    //   };
    // });

    this.assetsService.get().subscribe((assets) => {
      if (assets) {
        this.rows = assets;
        this.temp = this.rows.map((prop, key) => {
          return {
            ...prop,
            // id: key,
            no: key,
          };
        });
      }
    });
  }

  ngOnInit() {
    this.regionsService.get().subscribe(
      (res) => {
        if (res) this.regions = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );

    this.organisationsService.get().subscribe(
      (res) => {
        if (res) this.organisations = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );

    this.assetTypesService.get().subscribe(
      (res) => {
        if (res) {
          this.primarycategories = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("at") !== -1)
              return true;
            return false;
          });

          this.typeassets = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("ac") !== -1)
              return true;
            return false;
          });

          this.categories = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("ag") !== -1)
              return true;
            return false;
          });
        }
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );

    this.assetGroupsService.get().subscribe(
      (res) => {
        if (res) {
          this.identities = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("ai") !== -1)
              return true;
            return false;
          });

          this.groupsubcategory1s = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("s1") !== -1)
              return true;
            return false;
          });

          this.groupsubcategory2s = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("s2") !== -1)
              return true;
            return false;
          });
        }
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );

    // let currentSingleFile = undefined;
    // // single dropzone file - accepts only images
    // new Dropzone(document.getElementsByClassName("dropzone-single")[0], {
    //   url: "/",
    //   thumbnailWidth: null,
    //   thumbnailHeight: null,
    //   previewsContainer: document.getElementsByClassName(
    //     "dz-preview-single"
    //   )[0],
    //   previewTemplate: document.getElementsByClassName("dz-preview-single")[0]
    //     .innerHTML,
    //   maxFiles: 1,
    //   acceptedFiles: "image/*",
    //   init: function () {
    //     this.on("addedfile", function (file) {
    //       if (currentSingleFile) {
    //         this.removeFile(currentSingleFile);
    //       }
    //       currentSingleFile = file;
    //     });
    //   },
    // });
    // document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
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

  openModalEdit(modalNotification: TemplateRef<any>, row) {
    this.firstFormGroup.patchValue({
      ...row,
    });
    this.secondFormGroup.patchValue({
      ...row,
    });
    // this.thirdFormGroup.patchValue({
    //   ...row,
    // });
    // this.fourthFormGroup.patchValue({
    //   ...row,
    // });
    // this.fifthFormGroup.patchValue({
    //   ...row,
    // });
    // this.sixthFormGroup.patchValue({
    //   ...row,
    // });
    // this.seventhFormGroup.patchValue({
    //   ...row,
    // });

    this.modalEditAsset = this.modalService.show(
      modalNotification,
      this.modalConfig
    );
  }

  register() {
    let postAssets = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      // ...this.thirdFormGroup.value,
      // ...this.fourthFormGroup.value,
      // ...this.fifthFormGroup.value,
      // ...this.sixthFormGroup.value,
      // ...this.seventhFormGroup.value,
      created_by: this.authService.userID
    };

    this.assetsService.post(postAssets).subscribe(
      (res) => {
        if (res) {
          console.log("res", res);
          this.toastr.openToastr(
            "Your asset have successfully registered.",
            "Register Asset"
          );
          console.log('Berjaya')
          this.modalRegisterAsset.hide();
          this.getAssets();
        }
      },
      (err) => {
        console.log('err=',err)
        //Failed
        console.error("err", err);
        this.validation_messages = err.error;
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  update() {
    let editAssets = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      // ...this.thirdFormGroup.value,
      // ...this.fourthFormGroup.value,
      // ...this.fifthFormGroup.value,
      // ...this.sixthFormGroup.value,
      // ...this.seventhFormGroup.value,
      created_by: this.authService.userID
    };

    this.assetsService.update(this.firstFormGroup.value.id, editAssets).subscribe(
      (res) => {
        if (res) {
          console.log("res", res);
          this.toastr.openToastr(
            "Your asset have successfully updated.",
            "Register Asset"
          );
          this.modalEditAsset.hide();
          this.getAssets();
        }
      },
      (err) => {
        console.error("err", err);
        this.validation_messages = err.error;
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }

  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
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

  getCategory(value: string) {
    let result = this.categories.find((obj) => {
      return obj.id === value;
    });
    return result.name;
  }

  getAssetType(value: string) {
    let result = this.typeassets.find((obj) => {
      return obj.id === value;
    });
    return result.name;
  }

  tabChecker(path: string) {
    if (path == 'account') {
      this.firstTab = true;
      this.secondTab = false;
      this.thirdTab = false;
    }
    else if (path == 'transaction') {
      this.firstTab = false;
      this.secondTab = true;
      this.thirdTab = false;
    }
    else if (path == 'order') {
      this.firstTab = false;
      this.secondTab = false;
      this.thirdTab = true;
    }
    else {
      this.firstTab = true;
      this.secondTab = false;
      this.thirdTab = false;
    }
  }

  showTable() {
    let counter = 0
    for (let x in this.is_show1) {
      if (this.is_show1[x]) {
        counter++
      }
    }

    if (counter < 6) {
      this.tableShow1 = true
    }
    else {
      console.log('bluek')
    }
  }

  // readExcel() {
  //   let readFile = new FileReader();
  //   console.log('readFile = ', readFile)
  //   readFile.onload = (e) => {
  //     this.storeData = readFile.result;
  //     console.log('storeData = ', this.storeData)
  //     var data = new Uint8Array(this.storeData);
  //     var arr = new Array();
  //     for (var i = 0; i != data.length; ++i) {
  //       arr[i] = String.fromCharCode(data[i]);
  //     }
  //     console.log('arr = ', arr)
  //     var bstr = arr.join("");
  //     // console.log('bstr = ', bstr);
  //     var workbook = XLSX.read(bstr, { type: "binary" });
  //     var first_sheet_name = workbook.SheetNames[0];
  //     this.worksheet = workbook.Sheets[first_sheet_name];
  //   }
  //   readFile.readAsArrayBuffer(this.fileUploaded);

  //   this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
  //   this.jsonData = JSON.stringify(this.jsonData);
  //   const excelData: Blob = new Blob([this.jsonData], { type: "application/json" });
  //   console.log('excelData = ', excelData);
  // }

  onFileChange(event: any) {
    // /* wire up file reader */
    // const target: DataTransfer = <DataTransfer>(event.target);
    // if (target.files.length !== 1) {
    //   throw new Error('Cannot use multiple files');
    // }
    // const reader: FileReader = new FileReader();
    // reader.readAsBinaryString(target.files[0]);
    // reader.onload = (e: any) => {
    //   /* create workbook */
    //   const binarystr: string = e.target.result;
    //   console.log('binarystr = ', binarystr)
    //   const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
    //   console.log('wb = ', wb)

    //   /* selected the first sheet */
    //   const wsname: string = wb.SheetNames[1];
    //   console.log('wsname = ', wsname)
    //   const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    //   console.log('ws = ', ws)

    //   /* save data */
    //   const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
    //   console.log(data); // Data will be logged in array format containing objects
    // };

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

  // onFileChange(event) {
  //   console.log('onFileChange');
  //   console.log(event)
  //   let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     // if (!_.includes(af, file.type)) {
  //     //   alert('Only EXCEL Docs Allowed!');
  //     // } else {
  //     this.fileuploadFormGroup = file.name;
  //     // this.fileUploadForm.get('myfile').setValue(file);
  //     this.fileuploadFormGroup.get("excelFile").setValue(file);
  //     // }
  //     // this.fileuploadFormGroup.get("excelFile").setValue(file);
  //     // this.fileuploadFormGroup.get("name").setValue(file.name);
  //   }
  // }

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

    this.assetsRegistrationService.get().subscribe(
      (res) => {
        console.log("res all data", res);
        this.tableTemp1 = res
      },
      error => {
        console.error("err", error);
      }
    )
  }
}
