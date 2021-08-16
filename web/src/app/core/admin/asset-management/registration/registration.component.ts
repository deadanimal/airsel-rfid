import { Component, OnInit, TemplateRef } from "@angular/core"; import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import Dropzone from "dropzone";
import swal from "sweetalert2";
import * as XLSX from 'xlsx';
// import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { AssetLocationSyncService } from "src/app/shared/services/asset-location-sync/asset-location-sync.service";
import { AssetsService } from "src/app/shared/services/assets/assets.service"; import { AssetGroupsService } from "src/app/shared/services/asset-groups/asset-groups.service";
import { AssetTypesService } from "src/app/shared/services/asset-types/asset-types.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";
import { RegionsService } from "src/app/shared/services/regions/regions.service";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";
import { AssetsRegistrationService } from 'src/app/shared/services/assets-registration/assets-registration.service';
import { AssetsLocationService } from 'src/app/shared/services/assets-location/assets-location.service';
import { AssetsAttributeService } from 'src/app/shared/services/assets-attribute/assets-attribute.service';
import { AssetAttributeColumnService } from 'src/app/shared/services/asset-attribute-column/asset-attribute-column.service';
import { AssetsBadgeNoService } from 'src/app/shared/services/assets-badge-no/assets-badge-no.service';
import { AssetAttributePredefineService } from "src/app/shared/services/asset-attribute-predefine/asset-attribute-predefine.service";
import { MaintenanceManagerService } from "src/app/shared/services/maintenance-manager/maintenance-manager.service";
import { CostCenterService } from "src/app/shared/services/cost-center/cost-center.service";
import { AssetMaintenanceSpecService } from "src/app/shared/services/asset-maintenance-spec/asset-maintenance-spec.service";
import { MeasurementTypesService } from "src/app/shared/services/measurement-types/measurement-types.service";
import { MaintenancePlannerService } from "src/app/shared/services/maintenance-planner/maintenance-planner.service";
import { ContactInformationService } from "src/app/shared/services/contact-information/contact-information.service";
// import { AssetTypesService } from "src/app/shared/services/asset-types/asset-types.service";
import { system } from '@amcharts/amcharts4/core';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { AssetLocationSync } from "src/app/shared/services/asset-location-sync/asset-location-sync";
import { Observable } from "rxjs";
import { MeasurementTypesModel } from "src/app/shared/services/measurement-types/measurement-types.model";
import { ContactInformationModel } from "src/app/shared/services/contact-information/contact-information.model";
// import { AssetsRegistrationModel } from "src/app/shared/services/assets-registration/assets-registration.model";

export class AssetsRegistrationModel {
  public created_by: string;
  public id: string;
  public asset_id: string;
  public node_id: string;
  public hex_code: string;
  public asset_identity: string;
  public parent_location: string;
  public location_description: string;
  public building: string;
  public address_line_1: string;
  public address_line_2: string;
  public address_line_3: string;
  public city: string;
  public state: string;
  public postal_code: string;
  public country: string;
  public tag_number: string;
  public service_area: string;
  public location_main_contact: string;
  public location_asset_maintenance_manager: string;
  public maintenance_planner: string;
  public gis_esri_id: string;
  public latitude: string;
  public longitude: string;
  public asset_criticality: string;
  public cost_center: string;
  public asset_owning_department: string;
  public main_operation: string;
  public region: string;
  public operation: string;
  public process_function: string;
  public sub_process_system: string;
  public asset_or_component_type: string;
  public asset_class_asset_category: string;
  public handed_over_asset_or_procured: string;
  public internal_asset_identity: string;
  public asset_primary_category: string;
  public sub_category_1: string;
  public sub_category_2: string;
  public brand: string;
  public model_number: string;
  public size_capacity_1: string;
  public size_capacity_1_unit_measurement: string;
  public size_capacity_2: string;
  public size_capacity_2_unit_measurement: string;
  public size_capacity_3: string;
  public size_capacity_3_unit_measurement: string;
  public parent_asset_plate_number: string;
  public asset_plate_number: string;
  public detailed_description: string;
  public serial_number: string;
  public asset_tag_number: string;
  public purchase_date_installed_handed_over_date: string;
  public condition_rating: string;
  public maintenance_specification: string;
  public measurement_type: string;
  public warranty: string;
  public actual_warranty_period: string;
  public warranty_vendor_name: string;
  // public manufacturer_year_name: string;
  public bottom_water_level: string;
  public closing_torque: string;
  public dimention: string;
  public frequency: string;
  public infrastructure_status: string;
  public installation: string;
  public manufacturer: string;
  public material_type: string;
  public no_of_channel: string;
  public opening_torque: string;
  public pump_head: string;
  public staging_height: string;
  public top_water_level: string;
  public valve_pressure_rating: string;
  public vehicle_engine_number: string;
  public vehicle_insurance_auto_windscreen_insured: string;
  public vehicle_insurance_date_period_to: string;
  public vehicle_insurance_sum_insured: string;
  public vehicle_owner_status: string;
  public vehicle_puspakom_expired_date: string;
  public vehicle_roadtax_expired_date: string;
  public vehicle_seating_capacity: string;
  public communication_protocol: string;
  public environmental_performance: string;
  public horse_power: string;
  public infrastructure_status_reason: string;
  public insulation: string;
  public manufacturer_year: string;
  public model: string;

  public no_of_phases: string;
  public outlet_diameter: string;
  public revolutions_per_minute: string;
  public supply_location: string;
  public type: string;
  public vehicle_chasis_number: string;
  public vehicle_insurance_vendor: string;
  public vehicle_insurance_cover_note_number: string;
  public vehicle_insurance_no_claim_discount: string;
  public vehicle_insurance_total_premium: string;
  public vehicle_register_date: string;
  public vehicle_spad_permit_date_period_to: string;
  public vehicle_spad_no_license_operator: string;
  public vehicle_registration_owner: string;
  public capacity_size: string;
  public coverage_range: string;
  public flow_rate: string;
  public hysteresis: string;
  public inlet_diameter: string;
  public legal_name: string;
  public manufacture_part_number: string;
  public motor_current: number;
  public no_of_stage: number;
  public power_supply_type: number;
  public source_from: number;
  public temperature: number;
  public valve_diameter: number;
  public vehicle_engine_capacity: string;
  public vehicle_model: string;
  public vehicle_insurance_date_period_from: string;
  public vehicle_insurance_policy_type: string;
  public vehicle_puspakom_date_inspection: string;
  public vehicle_roadtax_rate: string;
  public vehicle_roadtax_renew_date: string;
  public vehicle_spad_permit_date_period_from: string;
  public voltage: string;
  public asset_status: string;
  public status: string;
  public badge_no: string;

  public created_at: string;
  public modified_at: string;
  public new_parent_location: string;

  public bo: string;
  public bo_status: string;

}


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

  // table
  ColumnMode = ColumnMode;
  cuser: any;
  crole: any;


  // Stepper
  isLinear = false;
  isDisableRipple = true;

  // Tabs
  firstTab: boolean = true
  secondTab: boolean = false
  thirdTab: boolean = false

  tempFileName = false;
  resOnkeyData: any

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
  ModalAssetAttribute: BsModalRef;
  modalEditAsset: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-xl",
    ignoreBackdropClick: false,
  };
  modalConfigUpload = {
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    ignoreBackdropClick: false,
  };
  modalViewAssetConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    ignoreBackdropClick: true,
  };

  focusSearch;

  // Selection
  regions = [];
  organisations = [];

  assetowningdepartment = [
    { value: "CBD", name: "CUSTOMER BILLING SERVICES" },
    { value: "DISTRIBUTION", name: "DISTRIBUTION" },
    { value: "ES-D", name: "ENGINEERING SERVICES – DISTRIBUTION" },
    { value: "FLEET", name: "FLEET" },
    { value: "LAND", name: "LAND" },
    { value: "NRW", name: "NRW" },
    { value: "PD-N", name: "PRODUCTION NORTHERN" },
    { value: "PD-S", name: "PRODUCTION SOUTHERN" },
    { value: "SCADA", name: "SCADA" },
    { value: "WQ", name: "WATER QUALITY" },
    { value: "NA", name: "NOT AVAILABLE" },
  ];
  mainoperationregister = [
    { value: "CUSTOMER BILLING SERVICES", name: "CUSTOMER BILLING SERVICES" },
    { value: "DISTRIBUTION", name: "DISTRIBUTION" },
    { value: "GENERAL ADMIN", name: "GENERAL ADMIN" },
    { value: "PRODUCTION", name: "PRODUCTION" },
    { value: "SCADA", name: "SCADA" },
    { value: "WATER QUALITY", name: "WATER QUALITY" },
    { value: "FLEET", name: "FLEET" },
    { value: "NA", name: "NOT AVAILABLE" },
  ];
  region = [
    { value: "GOMBAK", name: "GOMBAK" },
    { value: "HEADQUARTERS", name: "HEADQUARTERS" },
    { value: "HULU-LANGAT", name: "HULU LANGAT" },
    { value: "HULU-SELANGOR", name: "HULU SELANGOR" },
    { value: "KLANG", name: "KLANG" },
    { value: "KUALA-LANGAT", name: "KUALA LANGAT" },
    { value: "KUALA-LUMPUR", name: "KUALA LUMPUR" },
    { value: "KUALA-SELANGOR", name: "KUALA SELANGOR" },
    { value: "NORTH", name: "NORTH" },
    { value: "PETALING", name: "PETALING" },
    { value: "SABAK-BERNAM", name: "SABAK BERNAM" },
    { value: "SEPANG", name: "SEPANG" },
    { value: "SOUTH", name: "SOUTH" },
  ];

  measurement_types = [
    { desc: 'Bar', value: 'bar' },
    { desc: 'Celsius', value: '°C' },
    { desc: 'Hour', value: 'hr' },
    { desc: 'Kilogram', value: 'kg' },
    { desc: 'Kilometer', value: 'km' },
    { desc: 'Kilowatt', value: 'kW' },
    { desc: 'Megapascal Pressure Unit', value: 'Mpa' },
    { desc: 'Meter', value: 'm' },
    { desc: 'Meter per second', value: 'm/s' },
    { desc: 'Milimetre', value: 'mm' },
    { desc: 'Millions of Gallons per Day', value: 'MGD' },
    { desc: 'Millions of liters per day ', value: 'MLD' },
    { desc: 'Miligram', value: 'mg' },
    { desc: 'Revolutions per minute', value: 'RPM' },
    { desc: 'Horsepower', value: 'hp' },
    { desc: 'Voltage', value: 'V' },
    { desc: 'Cubic meter', value: 'm³' },
    { desc: 'Cubic meter per hour', value: 'm³/hr' },
    { desc: 'Decibels woth reference to one milliwatt', value: 'dBm' },
    { desc: 'Liter per second', value: 'l/s' },
    { desc: 'Megametre per second', value: 'mm/s' },
    { desc: 'Millihenrys', value: 'mH' },
    { desc: 'Millivolts', value: 'mV' },
    { desc: 'pH', value: 'pH' },
    { desc: 'Percent', value: '%' },
    { desc: 'Watt', value: 'W' },
    { desc: 'Voltage direct current', value: 'VDC' },
    { desc: 'nanometers', value: 'nm' },
    { desc: 'Milliamperes', value: 'mA' },
    { desc: 'Pound per square inch', value: 'psi' },
  ]

  state = [
    { value: "JHR", name: "JOHOR" },
    { value: "KDH", name: "KEDAH" },
    { value: "KEL", name: "KELANTAN" },
    { value: "KUL", name: "KUALA LUMPUR" },
    { value: "LBN", name: "LABUAN" },
    { value: "MLK", name: "MALACCA" },
    { value: "NSN", name: "NEGERI SEMBILAN" },
    { value: "PHG", name: "PAHANG" },
    { value: "PJY", name: "PUTRAJAYA" },
    { value: "PLS", name: "PERLIS" },
    { value: "PNG", name: "PENANG" },
    { value: "PRK", name: "PERAK" },
    { value: "SBH", name: "SABAH" },
    { value: "SGR", name: "SELANGOR" },
    { value: "SWK", name: "SARAWAK" },
    { value: "TRG", name: "TERENGGANU" },
  ]
  operation = [
    { value: "NRW-DISTRICT METERING ZONE", name: "NRW-DISTRICT METERING ZONE" },
    { value: "NRW-TRANSMISSION NETWORK", name: "NRW-TRANSMISSION NETWORK" },
    { value: "NRW-WATER BALANCING AREA", name: "NRW-WATER BALANCING AREA" },
    { value: "PUMP HOUSE", name: "PUMP HOUSE" },
    { value: "RESERVOIR", name: "RESERVOIR" },
    { value: "VALVE-DISTRIBUTION MAIN", name: "VALVE-DISTRIBUTION MAIN" },
    { value: "VALVE-TRUNK MAIN", name: "VALVE-TRUNK MAIN" },
    { value: "WATER TREATMENT PLANT", name: "WATER TREATMENT PLANT" },
    { value: "WQ-ONLINE ANALYZER", name: "WQ-ONLINE ANALYZER" },
    { value: "WQ-RIVER MONITORING STATION", name: "WQ-RIVER MONITORING STATION" },
    { value: "WQ-SAMPLING STATION", name: "WQ-SAMPLING STATION" },
    { value: "WQ-LABORATORY SERVICES", name: "WQ-LABORATORY SERVICES" },
  ];



  processFunction = [
    { value: "BALANCING RESERVOIR", name: "BALANCING RESERVOIR" },
    { value: "BUILDINGS", name: "BUILDINGS" },
    { value: "CHEMICAL DOSING", name: "CHEMICAL DOSING" },
    { value: "ELECTRICAL SYSTEM", name: "ELECTRICAL SYSTEM" },
    { value: "FILTRATION PROCESS", name: "FILTRATION PROCESS" },
    { value: "FLOCCULATION PROCESS", name: "FLOCCULATION PROCESS" },
    { value: "RAW WATER PROCESS", name: "RAW WATER PROCESS" },
    { value: "SEDIMENTATION PROCESS", name: "SEDIMENTATION PROCESS" },
    { value: "SETTLED WATER PROCESS", name: "SETTLED WATER PROCESS" },
    { value: "TREATED WATER PROCESS", name: "TREATED WATER PROCESS" },
    { value: "AERATION SYSTEM", name: "AERATION SYSTEM" },
    { value: "EARTHING SYSTEM", name: "EARTHING SYSTEM" },
    { value: "SLUDGE TREATMENT PROCESS", name: "SLUDGE TREATMENT PROCESS" },
    { value: "SOLAR SYSTEM", name: "SOLAR SYSTEM" },
    { value: "TELEMETRY SYSTEM", name: "TELEMETRY SYSTEM" },
    { value: "COAGULATION PROCESS", name: "COAGULATION PROCESS" },
    { value: "TREATMENT PROCESS", name: "TREATMENT PROCESS" },
    { value: "ELECTRICAL PANEL", name: "ELECTRICAL PANEL" },
    { value: "WATER ANALYSIS", name: "WATER ANALYSIS" },
    { value: "BUILDING", name: "BUILDING" },
    { value: "OFF RIVER STORAGE RESERVOIR", name: "OFF RIVER STORAGE RESERVOIR" },
    { value: "DRAW OF TOWER", name: "DRAW OF TOWER" },
    { value: "TANGKI IMBANGAN 3MG", name: "TANGKI IMBANGAN 3MG" },
    { value: "TANGKI IMBANGAN 4MG(LAMA)", name: "TANGKI IMBANGAN 4MG(LAMA)" },
    { value: "TANGKI IMBANGAN 4MG(NEW)", name: "TANGKI IMBANGAN 4MG(NEW)" },
    { value: "NEW PROCESS/FUNCTION", name: "NEW PROCESS/FUNCTION" },
  ]

  subProcessSystem = [
    { value: "BALANCING RESERVOIR", name: "BALANCING RESERVOIR" },
    { value: "BUILDINGS", name: "BUILDINGS" },
    { value: "FACILITIES SYSTEM", name: "FACILITIES SYSTEM" },
    { value: "ALUM PROCESS", name: "ALUM PROCESS" },
    { value: "CHLORINATION PROCESS", name: "CHLORINATION PROCESS" },
    { value: "FLUORIDE PROCESS", name: "FLUORIDE PROCESS" },
    { value: "LIME PROCESS", name: "LIME PROCESS" },
    { value: "SODA ASH PROCESS", name: "SODA ASH PROCESS" },
    { value: "POWER SUPPLY", name: "POWER SUPPLY" },
    { value: "FILTRATION PROCESS", name: "FILTRATION PROCESS" },
    { value: "FLOCCULATION PROCESS", name: "FLOCCULATION PROCESS" },
    { value: "RAW WATER INTAKE SYSTEM", name: "RAW WATER INTAKE SYSTEM" },
    { value: "RAW WATER PROCESS", name: "RAW WATER PROCESS" },
    { value: "RAW WATER SAMPLING", name: "RAW WATER SAMPLING" },
    { value: "SEDIMENTATION PROCESS", name: "SEDIMENTATION PROCESS" },
    { value: "SETTLED WATER PROCESS", name: "SETTLED WATER PROCESS" },
    { value: "SETTLED WATER SAMPLING", name: "SETTLED WATER SAMPLING" },
    { value: "TREATED WATER PROCESS", name: "TREATED WATER PROCESS" },
    { value: "TREATED WATER SAMPLING", name: "TREATED WATER SAMPLING" },
    { value: "AERATION SYSTEM", name: "AERATION SYSTEM" },
    { value: "POLYMER PROCESS", name: "POLYMER PROCESS" },
    { value: "EARTHING SYSTEM", name: "EARTHING SYSTEM" },
    { value: "RAW WATER PUMPING SYSTEM", name: "RAW WATER PUMPING SYSTEM" },
    { value: "POLYMER (RESIDUAL) DOSING", name: "POLYMER (RESIDUAL) DOSING" },
    { value: "SLUDGE TREATMENT PROCESS", name: "SLUDGE TREATMENT PROCESS" },
    { value: "SOLID LIQUID SEPARATION", name: "SOLID LIQUID SEPARATION" },
    { value: "SOLAR SYSTEM", name: "SOLAR SYSTEM" },
    { value: "TELEMETRY SYSTEM", name: "TELEMETRY SYSTEM" },
    { value: "TREATED WATER PUMPING SYSTEM", name: "TREATED WATER PUMPING SYSTEM" },
    { value: "SCADA SYSTEM", name: "SCADA SYSTEM" },
    { value: "RAW WATER PIPELINE", name: "RAW WATER PIPELINE" },
    { value: "CHEMICAL ROOM", name: "CHEMICAL ROOM" },
    { value: "LABORATORY", name: "LABORATORY" },
    { value: "COAGULATION PROCESS", name: "COAGULATION PROCESS" },
    { value: "DATA PROCESS", name: "DATA PROCESS" },
    { value: "FILTERED WATER SAMPLING", name: "FILTERED WATER SAMPLING" },
    { value: "SETTLED WATER PUMPING SYSTEM", name: "SETTLED WATER PUMPING SYSTEM" },
    { value: "WATER ANALYSIS", name: "WATER ANALYSIS" },
    { value: "BOAT HOUSE", name: "BOAT HOUSE" },
    { value: "CONTROL ROOM", name: "CONTROL ROOM" },
    { value: "RESERVOIR", name: "RESERVOIR" },
    { value: "CHEMICAL PROCESS", name: "CHEMICAL PROCESS" },
    { value: "WATER TRANSFER", name: "WATER TRANSFER" },
    { value: "WORKSHOP", name: "WORKSHOP" },
    { value: "POLY ALUMINIUM CHLORIDE PROCESS", name: "POLY ALUMINIUM CHLORIDE PROCESS" },
    { value: "CONTROL CENTRE", name: "CONTROL CENTRE" },
    { value: "CHEMICAL DOSING", name: "CHEMICAL DOSING" },
    { value: "ACTIFLO PROCESS", name: "ACTIFLO PROCESS" },
    { value: "TANGKI SEDUT SYABAS", name: "TANGKI SEDUT SYABAS" },
    { value: "DISSOLVED AIR FLOATATION", name: "DISSOLVED AIR FLOATATION" },
    { value: "BACKWASH PROCESS", name: "BACKWASH PROCESS" },
    { value: "BUILDING", name: "BUILDING" },
    { value: "SODIUM ALUMINO SILICATE PROCESS", name: "SODIUM ALUMINO SILICATE PROCESS" },
    { value: "ELECTRICAL SYSTEM", name: "ELECTRICAL SYSTEM" },
    { value: "WASH WATER SYSTEM", name: "WASH WATER SYSTEM" },
    { value: "TREATED WATER PIPELINE", name: "TREATED WATER PIPELINE" },
    { value: "RESIDUAL EMERGENCY LAGOON", name: "RESIDUAL EMERGENCY LAGOON" },
    { value: "RESIDUAL THICKENED PUMPING STATION", name: "RESIDUAL THICKENED PUMPING STATION" },
    { value: "TREATMENT PROCESS", name: "TREATMENT PROCESS" },
    { value: "ACTIVATED CARBON PROCESS", name: "ACTIVATED CARBON PROCESS" },
    { value: "RAPID MIXING", name: "RAPID MIXING" },
    { value: "SLUDGE BALANCING", name: "SLUDGE BALANCING" },
    { value: "WASH WATER RECOVERY", name: "WASH WATER RECOVERY" },
    { value: "DISTRAFICATION", name: "DISTRAFICATION" },
    { value: "DRAW OFF PROCESS", name: "DRAW OFF PROCESS" },
    { value: "ONLINE ANALYZER", name: "ONLINE ANALYZER" },
    { value: "WASH WATER PROCESS", name: "WASH WATER PROCESS" },
    { value: "NEW PROCESS/FUNCTION", name: "NEW PROCESS/FUNCTION" },
  ]

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

  conditionRating = [
    { value: "1", name: "1  - Very Good" },
    { value: "2", name: "2 -  Good" },
    { value: "3", name: "3 -  Average" },
    { value: "4", name: "4 - Poor" },
    { value: "5", name: "5 - Replace" },
  ]

  warranty = [
    { value: "Available", name: "Yes" },
    { value: "Not Available", name: "No" },
  ]
  typeassets = [];
  categories = [];
  identities = [];
  assetprimary = [];
  assetprimaryshow = [];
  assetprimaryselector = [];

  assetprimaryselectorshow =
    [
      {
        // asset_type_id: "",
        brand: true,
        capacity_size: true,
        closing_torque: true,
        hysteresis: true,
        installation: true,
        manufacturer: true,
        manufacture_part_number: true,
        manufacturer_year: true,
        model: true,
        opening_torque: true,
        power_supply_type: true,
        revolutions_per_minute: true,
        type: true,
        material_type: true,
        valve_pressure_rating: true,
        horse_power: true,
        temperature: true,
        coverage_range: true,
        voltage: true,
        valve_diameter: true,
        top_water_level: true,
        inlet_diameter: true,
        bottom_water_level: true,
        outlet_diameter: true,
        staging_height: true,
        dimention: true,
        environmental_performance: true,
        no_of_channel: true,
        frequency: true,
        vehicle_chassis_number: true,
        vehicle_engine_capacity: true,
        vehicle_engine_number: true,
        vehicle_insurance_cover_note_number: true,
        vehicle_insurance_date_period_from: true,
        vehicle_insurance_no_claim_discount: true,
        vehicle_insurance_total_premium: true,
        vehicle_insurance_policy_type: true,
        vehicle_insurance_sum_insured: true,
        vehicle_insurance_date_period_to: true,
        vehicle_insurance_auto_windscreen_insured: true,
        vehicle_model: true,
        vehicle_owner_status: true,
        vehicle_puspakom_expired_date: true,
        vehicle_puspakom_date_inspection: true,
        vehicle_register_date: true,
        vehicle_registration_owner: true,
        vehicle_roadtax_rate: true,
        vehicle_roadtax_renew_date: true,
        vehicle_insurance_vendor: true,
        vehicle_seating_capacity: true,
        vehicle_spad_permit_date_period_from: true,
        vehicle_spad_no_license_operator: true,
        vehicle_spad_permit_date_period_to: true,
        motor_current: true,
        insulation: true,
        no_of_phases: true,
        communication_protocol: true,
        flow_rate: true,
        pump_head: true,
        no_of_stage: true,
        infrastructure_status_reason: true,
        infrastructure_status: true,
        legal_name: true,
        source_from: true,
        supply_location: true,
      }
    ];


  assetprimaryselectorshowdefault =
    [
      {
        // asset_type_id: "",
        brand: true,
        capacity_size: true,
        closing_torque: true,
        hysteresis: true,
        installation: true,
        manufacturer: true,
        manufacture_part_number: true,
        manufacturer_year: true,
        model: true,
        opening_torque: true,
        power_supply_type: true,
        revolutions_per_minute: true,
        type: true,
        material_type: true,
        valve_pressure_rating: true,
        horse_power: true,
        temperature: true,
        coverage_range: true,
        voltage: true,
        valve_diameter: true,
        top_water_level: true,
        inlet_diameter: true,
        bottom_water_level: true,
        outlet_diameter: true,
        staging_height: true,
        dimention: true,
        environmental_performance: true,
        no_of_channel: true,
        frequency: true,
        vehicle_chassis_number: true,
        vehicle_engine_capacity: true,
        vehicle_engine_number: true,
        vehicle_insurance_cover_note_number: true,
        vehicle_insurance_date_period_from: true,
        vehicle_insurance_no_claim_discount: true,
        vehicle_insurance_total_premium: true,
        vehicle_insurance_policy_type: true,
        vehicle_insurance_sum_insured: true,
        vehicle_insurance_date_period_to: true,
        vehicle_insurance_auto_windscreen_insured: true,
        vehicle_model: true,
        vehicle_owner_status: true,
        vehicle_puspakom_expired_date: true,
        vehicle_puspakom_date_inspection: true,
        vehicle_register_date: true,
        vehicle_registration_owner: true,
        vehicle_roadtax_rate: true,
        vehicle_roadtax_renew_date: true,
        vehicle_insurance_vendor: true,
        vehicle_seating_capacity: true,
        vehicle_spad_permit_date_period_from: true,
        vehicle_spad_no_license_operator: true,
        vehicle_spad_permit_date_period_to: true,
        motor_current: true,
        insulation: true,
        no_of_phases: true,
        communication_protocol: true,
        flow_rate: true,
        pump_head: true,
        no_of_stage: true,
        infrastructure_status_reason: true,
        infrastructure_status: true,
        legal_name: true,
        source_from: true,
        supply_location: true,
      }
    ];

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

  serviceArea = [
    { value: "GOMBAK", Name: "GOMBAK" },
    { value: "HEADQUARTERS", Name: "HEADQUARTERS" },
    { value: "HULU-LANGAT", Name: "HULU LANGAT" },
    { value: "HULU-SELANGOR", Name: "HULU SELANGOR" },
    { value: "KLANG", Name: "KLANG" },
    { value: "KUALA-LANGAT", Name: "KUALA LANGAT" },
    { value: "KUALA-LUMPUR", Name: "KUALA LUMPUR" },
    { value: "KUALA-SELANGOR", Name: "KUALA SELANGOR" },
    { value: "NORTH", Name: "NORTH" },
    { value: "PETALING", Name: "PETALING" },
    { value: "SABAK-BERNAM", Name: "SABAK BERNAM" },
    { value: "SEPANG", Name: "SEPANG" },
    { value: "SOUTH", Name: "SOUTH" },
  ]

  assetCriticality = [
    { value: "01", name: "01 Asset Failure Low Impact" },
    { value: "02", name: "02" },
    { value: "03", name: "03" },
    { value: "04", name: "04" },
    { value: "05", name: "05" },
    { value: "06", name: "06" },
    { value: "07", name: "07" },
    { value: "08", name: "08" },
    { value: "09", name: "09 Highest" },
  ]

  countryDefault = "Malaysia"

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
  SelectionType = SelectionType;

  // entries: number = 2;
  // selected: any[] = [];
  // temp = [];
  // activeRow: any;
  rows: any = [];
  // SelectionType = SelectionType;
  tableTemp1 = [];

  // Forms
  fileuploadFormGroup: FormGroup;
  assetAttributeGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  validation_messages = [];
  rowData: any

  // Asset Attribute Visibility
  assetattributecolumnapi = [];
  assetprimarycolumnselector = [];

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
    public assetsLocationService: AssetsLocationService,
    public assetsAttributeService: AssetsAttributeService,
    public assetsAttributeColumnService: AssetAttributeColumnService,
    public assetBadgeNoService: AssetsBadgeNoService,
    public assetLocationSyncService: AssetLocationSyncService,
    public assetAttributePredefineService: AssetAttributePredefineService,
    public maintenanceManagerService: MaintenanceManagerService,
    public maintenancePlannerService: MaintenancePlannerService,
    public assetMaintenanceSpecService: AssetMaintenanceSpecService,
    public measurementTypesService: MeasurementTypesService,
    public costCenterservice: CostCenterService,
    public contactInformationService: ContactInformationService,
    public userService: UsersService,
    private spinner: NgxSpinnerService
  ) {
    this.getAssets();

    this.firstFormGroup = this.formBuilder.group({
      // asset_primary_category: ["", validators.required],
      asset_primary_category: ["", Validators.compose([Validators.required])], //
      asset_identity: ["", Validators.compose([Validators.required])], //
      sub_category_1: ["",],
      sub_category_2: ["",],
      asset_or_component_type: ["",],
      handed_over_asset_or_procured: ["",],
      class_category: ["",],
      specification: ["",], //
      asset_owning_department: ["", Validators.compose([Validators.required])], //
      main_operation: ["", Validators.compose([Validators.required])], //
      region: ["", Validators.compose([Validators.required])], //
      operation: ["",],
      parent_location: ["",], //
      new_parent_location: ["",], //
      process_function: ["",],
      sub_process_system: ["",],
      location_description: ["",], //
      building: ["",],
      address_line_1: ["", Validators.compose([Validators.required])], //
      address_line_2: ["",],
      address_line_3: ["",],
      city: ["", Validators.compose([Validators.required])], //
      state: ["", Validators.compose([Validators.required])], //
      postal_code: ["", Validators.compose([Validators.required])], //
      country: ["", Validators.compose([Validators.required])], //
      tag_number: ["",],
      rfid_hex_code: ["",],
      service_area: ["", Validators.compose([Validators.required])], //
      location_main_contact: ["",],
      location_asset_maintenance_manager: ["",],
      maintenance_planner: ["", Validators.compose([Validators.required])], //
      gis_esri_id: ["",],
      latitude: ["", ], //
      longitude: ["", ], //
      asset_critically: ["", Validators.compose([Validators.required])], //
      cost_center: ["", Validators.compose([Validators.required])], //
      brand: ["",],
      model_number: ["",],
      size_capacity_1: ["",],
      size_capacity_2: ["",],
      size_capacity_3: ["",],
      size_capacity_1_unit_measurement: ["",],
      size_capacity_2_unit_measurement: ["",],
      size_capacity_3_unit_measurement: ["",],
      parent_asset_plate_number: ["",],
      asset_plate_number: ["",],
      detailed_description: ["",],
      serial_number: ["", Validators.compose([Validators.required])], //
      // asset_tag_number: ["",],
      purchase_date_installed_handed_over_date: ["", Validators.compose([Validators.required])], //
      condition_rating: ["", Validators.compose([Validators.required])], //
      status: ["",],
      maintenance_specification: ["",],
      measurement_type: ["",],
      warranty: ["", ], //
      actual_warranty_period: ["",],
      warranty_vendor_name: ["",],
      bo: ["",]
    });
    this.secondFormGroup = this.formBuilder.group({
      bottom_water_level: ["",],
      brand: ["",],
      capacity_size: ["",],
      closing_torque: ["",],
      communication_protocol: ["",],
      coverage_range: ["",],
      dimention: ["",],
      environmental_performance: ["",],
      flow_rate: ["",],
      frequency: ["",],
      horse_power: ["",],
      hysteresis: ["",],
      infrastructure_status: ["",],
      infrastructure_status_reason: ["",],
      inlet_diameter: ["",],
      installation: ["",],
      insulation: ["",],
      legal_name: ["",],
      manufacturer: ["",],
      manufacturer_year: ["",],
      manufacture_part_number: ["",],
      material_type: ["",],
      model: ["",],
      motor_current: ["",],
      no_of_channel: ["",],
      no_of_phases: ["",],
      no_of_stage: ["",],
      opening_torque: ["",],
      outlet_diameter: ["",],
      power_supply_type: ["",],
      pump_head: ["",],
      revolutions_per_minute: ["",],
      source_from: ["",],
      staging_height: ["",],
      supply_location: ["",],
      temperature: ["",],
      top_water_level: ["",],
      type: ["",],
      valve_diameter: ["",],
      valve_pressure_rating: ["",],
      vehicle_chassis_number: ["",],
      vehicle_engine_capacity: ["",],
      vehicle_engine_number: ["",],
      vehicle_insurance_vendor: ["",],
      vehicle_model: ["",],
      vehicle_insurance_auto_windscreen_insured: ["",],
      vehicle_insurance_cover_note_number: ["",],
      vehicle_insurance_date_period_from: ["",],
      vehicle_insurance_date_period_to: ["",],
      vehicle_insurance_no_claim_discount: ["",],
      vehicle_insurance_policy_type: ["",],
      vehicle_insurance_sum_insured: ["",],
      vehicle_insurance_total_premium: ["",],
      vehicle_puspakom_date_inspection: ["",],
      vehicle_owner_status: ["",],
      vehicle_register_date: ["",],
      vehicle_roadtax_rate: ["",],
      vehicle_puspakom_expired_date: ["",],
      vehicle_spad_permit_date_period_to: ["",],
      vehicle_roadtax_renew_date: ["",],
      vehicle_roadtax_expired_date: ["",],
      vehicle_spad_no_license_operator: ["",],
      vehicle_spad_permit_date_period_from: ["",],
      vehicle_seating_capacity: ["",],
      vehicle_registration_owner: ["",],
      voltage: ["",],
    });
    this.fileuploadFormGroup = this.formBuilder.group({
      excelFile: ["",],
    });
    this.assetAttributeGroup = this.formBuilder.group({
      asset_identity: [""],
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

    // get user 
    this.cuser = this.authService.decodedToken();

    this.userService.filter("username=" + this.cuser.username).subscribe(
      (res) => {
        console.log("REs", res);
        this.crole = res[0].user_type
      },
      (err) => {
        console.log("err", err);
      },
      () => {
        this.getRegisteredData();
      }
    );

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

    // this.organisationsService.get().subscribe(
    //   (res) => {
    //     if (res) this.organisations = res;
    //   },
    //   (err) => {
    //     console.error("err", err);
    //   },
    //   () => {
    //     console.log("Http request completed");
    //   }
    // );

    this.assetTypesService.get().subscribe(
      (res) => {
        if (res) {
          this.primarycategories = res.filter(function (data) {
            if (data.category !== undefined) {
              if (data.category.toString().toLowerCase().indexOf("at") !== -1)
                return true;
            } else {
              return false;
            }
          });

          this.typeassets = res.filter(function (data) {
            if (data.category !== undefined) {
              if (data.category.toString().toLowerCase().indexOf("ac") !== -1)
                return true;
            } else {
              return false;
            }

          });

          this.categories = res.filter(function (data) {
            if (data.category !== undefined) {
              if (data.category.toString().toLowerCase().indexOf("ag") !== -1)
                return true;
            } else {
              return false;
            }
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

    this.getAssetPrimaryCategory()

    this.getExistingParent()
    this.getAssetAttributePredefine()
    this.getMaintenanceManager()
    this.getMaintenancePlanner();
    this.getCostCenter();
    this.getMeasurementTypes()
    this.getContactInformation()
    // this.classCategory()

  }

  assetprimarycategory: any;

  getAssetPrimaryCategory() {
    this.assetTypesService.get().subscribe((response) => {
      console.log('assetprimarycategory', response);
      this.assetprimarycategory = response;
      console.log("AAA", this.assetprimarycategory)
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  test: any;
  getExistingParent() {
    this.assetLocationSyncService.customGet().subscribe((response) => {
      console.log('response from API is ', response);
      this.test = response;
      console.log("existing parent", this.test);
      // this.updateFilter();
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  maintenanceManager: any;
  getMaintenanceManager() {
    this.maintenanceManagerService.get().subscribe((response) => {
      console.log('response from API is ', response);
      this.maintenanceManager = response;
      console.log("maintenance manager", this.maintenanceManager);
      // this.updateFilter();
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  maintenancePlanner: any;
  getMaintenancePlanner() {
    this.maintenancePlannerService.get().subscribe((response) => {
      // console.log('response from API is ', response);
      this.maintenancePlanner = response;
      // console.log("maintenance planner", this.maintenancePlanner);
      // this.updateFilter();
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  manufacturer: any
  vehicleInsurancePolicyType: any
  vehicleInsuranceVendor: any
  vehicle_owner_status: any
  vehicle_registration_owner: any
  getAssetAttributePredefine() {

    let temp = [];

    this.assetAttributePredefineService.get().subscribe((response) => {
      console.log('response from API is ', response);
      temp = response;
      console.log("Asset attribute predefine", temp);

      this.manufacturer = temp.filter((value) => value.attribute_field_name.includes("manufacturer"));
      console.log("Manufacturer", this.manufacturer);

      this.vehicleInsurancePolicyType = temp.filter((value) => value.attribute_field_name.includes("vehicle_insurance_policy_type"));
      console.log("vehicle_insurance_policy_type", this.vehicleInsurancePolicyType);

      this.vehicleInsuranceVendor = temp.filter((value) => value.attribute_field_name.includes("vehicle_insurance_vendor"));
      console.log("vehicle Insurance Vendor", this.vehicleInsuranceVendor);

      this.vehicle_owner_status = temp.filter((value) => value.attribute_field_name.includes("vehicle_owner_status"));
      console.log("vehicle_owner_status", this.vehicle_owner_status);

      this.vehicle_registration_owner = temp.filter((value) => value.attribute_field_name.includes("vehicle_registration_owner"));
      console.log("vehicle_registration_owner", this.vehicle_registration_owner);
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  costCenter: any;
  getCostCenter() {
    this.costCenterservice.get().subscribe((response) => {
      console.log('response from API is ', response);
      this.costCenter = response;
      console.log("costCenter", this.costCenter);

    }, (error) => {
      console.log('Error is ', error)
    })
  }

  measurementTypes: any;
  getMeasurementTypes() {
    this.measurementTypesService.get().subscribe((response) => {
      console.log('response from API is ', response);
      this.measurementTypes = response;
      console.log("Measurement types", this.measurementTypes);
      // this.updateFilter();
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  contact_information: any;
  getContactInformation() {
    this.contactInformationService.get().subscribe((response) => {
      console.log('response from API is ', response);
      this.contact_information = response;
      console.log("contact_information", this.contact_information);
      // this.updateFilter();
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  maintenanceSpec: any;
  getMaintenanceSpec(assetPrimaryCategory) {

    let temp = [];

    // const assetPrimaryCategory = (<HTMLInputElement>document.getElementById("assetselector")).value

    this.assetMaintenanceSpecService.get().subscribe((response) => {
      console.log('response from API is ', response);
      temp = response;
      console.log("Asset Maintenance Spec", temp);
      console.log("Asset Primary", assetPrimaryCategory);
      this.maintenanceSpec = temp.filter((value) => value.asset_type_cd.includes(assetPrimaryCategory));
      console.log("Asset Maintenance Spec 2", this.maintenanceSpec);
      // this.updateFilter();
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  tableMaintenanceSpec: any;
  getTableMaintenanceSpec(assetPrimaryCategory) {

    let temp = [];

    // const assetPrimaryCategory = (<HTMLInputElement>document.getElementById("assetPrimary")).value

    this.assetMaintenanceSpecService.get().subscribe((response) => {
      console.log('response from API is ', response);
      temp = response;
      console.log("Asset Maintenance Spec", temp);
      console.log("Asset Primary", assetPrimaryCategory);
      this.tableMaintenanceSpec = temp.filter((value) => value.asset_type_cd.includes(assetPrimaryCategory));
      console.log("Asset Maintenance Spec 2", this.tableMaintenanceSpec);
      // this.updateFilter();
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  public warrantyStatus: boolean = false;
  checkWarrantyStatus() {
    const value = (<HTMLInputElement>document.getElementById("warranty")).value
    console.log("warranty", value)

    if (value == "available")
      this.warrantyStatus = true
  }

  public ShowProcessFunction: boolean = false
  process_Function: any
  toggleShowProcessFunction(event) {

    // const value = (<HTMLInputElement>document.getElementById("processFx")).value
    // console.log("prosess", value);
    if (this.process_Function == "NEW PROCESS/FUNCTION")
      this.ShowProcessFunction = true;
    else
      this.ShowProcessFunction = false;
  }

  public ShowSubProcessFunction: boolean = false
  sub_process_Function: any;
  toggleShowSubProcessFunction(event) {

    // const value = (<HTMLInputElement>document.getElementById("subProcessSystem")).value
    // console.log("Subprosess", value);
    if (this.sub_process_Function == "NEW PROCESS/FUNCTION")
      this.ShowSubProcessFunction = true;
    else
      this.ShowSubProcessFunction = false;
  }

  class_category: any;
  classCategory(assetPrimaryCategory) {
    // const assetPrimaryCategory = (<HTMLInputElement>document.getElementById("assetselector")).value

    console.log("Asset type Code", assetPrimaryCategory)

    for (let i in this.assetprimarycategory) {

      if (this.assetprimarycategory[i].asset_type_code == assetPrimaryCategory) {
        console.log("Asset category", this.assetprimarycategory[i].asset_category)
        this.class_category = this.assetprimarycategory[i].asset_category
      }
    }
  }

  showBO: boolean = true;
  bo: any;
  boStatus: any;
  getBoValue(assetPrimaryCategory) {
    // const assetPrimaryCategory = (<HTMLInputElement>document.getElementById("assetselector")).value

    for (let i in this.assetprimarycategory) {

      if (this.assetprimarycategory[i].asset_type_code == assetPrimaryCategory) {
        console.log("BO Value", this.assetprimarycategory[i].asset_bussiness_object)
        this.bo = this.assetprimarycategory[i].asset_bussiness_object
        console.log("bo", this.bo)
      }
    }

    if (this.bo == "W1-TrackedGeneralAsset" || this.bo == "W1-TrackedGeneralComponent" || this.bo == "CM-SmartMeter")
      this.boStatus = "INRECEIPT"
    else if (this.bo == "W1-IOSvcGeneralComponent")
      this.boStatus = "ATTACHED"
    else if (this.bo == "W1-IOSvcGeneralAsset" || this.bo == "W1-IOSvcFleetAsset" || this.bo == "W1-IOSvcInfrastructureAsset")
      this.boStatus = "INSERVICE"

    console.log("bo status", this.boStatus)
  }

  detailedDescription: any
  unit_measurement_1: any
  unit_measurement_2: any
  unit_measurement_3: any

  getUnitMeasurement1(event) {
    // console.log("event", event)
    this.unit_measurement_1 = event;
    this.getDetailedDescription();
  }
  getUnitMeasurement2(event) {
    // console.log("event", event)
    this.unit_measurement_2 = event;
    this.getDetailedDescription();
  }
  getUnitMeasurement3(event) {
    // console.log("event", event)
    this.unit_measurement_3 = event;
    this.getDetailedDescription();
  }

  getDetailedDescription() {
    const assetIdentity = (<HTMLInputElement>document.getElementById("asset_identity")).value
    const SubCategory_1 = (<HTMLInputElement>document.getElementById("SubCategory_1")).value
    const SubCategory_2 = (<HTMLInputElement>document.getElementById("SubCategory_2")).value
    const model_number = (<HTMLInputElement>document.getElementById("model_number")).value
    const size_capacity_1 = (<HTMLInputElement>document.getElementById("size_capacity_1")).value
    const size_capacity_2 = (<HTMLInputElement>document.getElementById("size_capacity_2")).value
    const size_capacity_3 = (<HTMLInputElement>document.getElementById("size_capacity_3")).value

    this.detailedDescription = assetIdentity + "-" + this.assetPrimary

    if (SubCategory_1 != "" && SubCategory_1 != null)
      this.detailedDescription = this.detailedDescription + "-" + SubCategory_1

    if (SubCategory_2 != "" && SubCategory_2 != null)
      this.detailedDescription = this.detailedDescription + "-" + SubCategory_2

    if (model_number != "" && model_number != null)
      this.detailedDescription = this.detailedDescription + "-" + model_number

    if (size_capacity_1 != "" && size_capacity_1 != null)
      this.detailedDescription = this.detailedDescription + "-" + size_capacity_1

    if (this.unit_measurement_1 != "" && this.unit_measurement_1 != null)
      this.detailedDescription = this.detailedDescription + "-" + this.unit_measurement_1

    if (size_capacity_2 != "" && size_capacity_2 != null)
      this.detailedDescription = this.detailedDescription + "-" + size_capacity_2

    if (this.unit_measurement_2 != "" && this.unit_measurement_2 != null)
      this.detailedDescription = this.detailedDescription + "-" + this.unit_measurement_2

    if (size_capacity_3 != "" && size_capacity_3 != null)
      this.detailedDescription = this.detailedDescription + "-" + size_capacity_3

    if (this.unit_measurement_3 != "" && this.unit_measurement_3 != null)
      this.detailedDescription = this.detailedDescription + "-" + this.unit_measurement_3

    // this.detailedDescription = assetIdentity + "-" + this.assetPrimary + "-" + SubCategory_1 + "-" + SubCategory_2 + "-" + model_number + "-" + size_capacity_1 + "-" + this.unit_measurement_1 + "-" + size_capacity_2 + "-" + this.unit_measurement_2 + "-" + size_capacity_3 + "-" + this.unit_measurement_3;

    console.log("detailedDescription", this.detailedDescription)
  }

  LocationDescription: any;
  existLocation: any;
  getLocationDescription() {
    // call dropdown item test
    //

    let value: any;
    let assetIdentity = (<HTMLInputElement>document.getElementById("asset_identity")).value

    if (this.newParent) {
      let newParent = (<HTMLInputElement>document.getElementById("newParent")).value
      console.log("newParent", newParent)
      value = newParent;

      this.LocationDescription = value + "-" + assetIdentity;
      console.log('LocationDescription is ', this.LocationDescription)

    }
    else if (this.existingParent) {
      console.log("existingParent", this.existLocation)

      let existingParent: any;

      this.assetLocationSyncService.get().subscribe((response) => {
        // console.log('response from API is ', response);

        existingParent = response.filter((value) => value.node_id.includes(this.existLocation));
        console.log("existing parent", existingParent[0].description);

        value = existingParent[0].description;
        console.log("value", value)

        this.LocationDescription = value + "-" + assetIdentity;
        console.log('LocationDescription is ', this.LocationDescription)

      }, (error) => {
        console.log('Error is ', error)
      })
    }
  }

  asset_or_component: any;
  get_asset_or_component_type(event) {

    for (let i in this.assetprimarycategory) {
      if (this.assetprimarycategory[i].asset_type_code == event) {

        console.log("asset_bussiness_object", this.assetprimarycategory[i].asset_bussiness_object)
        if (this.assetprimarycategory[i].asset_bussiness_object == 'W1-TrackedGeneralComponent' || this.assetprimarycategory[i].asset_bussiness_object == 'W1-IOSvcGeneralComponent') {
          this.asset_or_component = 'COMPONENT'
        } else { // W1-IOSvcGeneralComponent , W1-TrackedGeneralComponent
          this.asset_or_component = 'ASSET'
        }
      }
    }
    console.log("asset_or_component", this.asset_or_component)
  }

  specification: any;
  get_specification(event) {
    if (event == "AMR-FLOWMETER") {
      this.specification = 'AMR-FLOWMETER';
    }
    else {
      this.specification = '';
    }
  }

  // stepper: any;
  reset(stepper) {

    console.log("stepper", stepper)
    this.spinner.hide();
    swal
      .fire({
        title: "Warning",
        text: "The form will be reset",
        type: "warning",
        showCancelButton: true,

      }).then((result) => {
        // this.firstFormGroup.reset();
        // this.secondFormGroup.reset();

        console.log("resilt", result)

        if (result.value) {
          stepper.reset();
        }


      });
    // this.closeModal()
  }

  submitRegistration() {

    swal
      .fire({
        title: "Submit Registration",
        text: "Are you sure want to submit?",
        type: "question",
        showCancelButton: true,

      }).then((result) => {
        // this.firstFormGroup.reset();
        // this.secondFormGroup.reset();

        console.log("resilt", result)

        if (result.value) {

          const SubmitObject = new AssetsRegistrationModel();

          // if (this.firstFormGroup.valid) {

          SubmitObject.node_id = this.firstFormGroup.value.parent_location
          SubmitObject.asset_identity = this.firstFormGroup.value.asset_identity
          SubmitObject.parent_location = this.firstFormGroup.value.parent_location
          SubmitObject.location_description = this.LocationDescription
          SubmitObject.building = this.firstFormGroup.value.building
          SubmitObject.address_line_1 = this.firstFormGroup.value.address_line_1
          SubmitObject.address_line_2 = this.firstFormGroup.value.address_line_2
          SubmitObject.address_line_3 = this.firstFormGroup.value.address_line_3
          SubmitObject.city = this.firstFormGroup.value.city
          SubmitObject.state = this.firstFormGroup.value.state
          SubmitObject.postal_code = this.firstFormGroup.value.postal_code
          SubmitObject.country = this.firstFormGroup.value.country
          SubmitObject.tag_number = this.firstFormGroup.value.tag_number
          SubmitObject.hex_code = this.firstFormGroup.value.rfid_hex_code
          SubmitObject.service_area = this.firstFormGroup.value.service_area
          SubmitObject.location_main_contact = this.firstFormGroup.value.location_main_contact
          SubmitObject.location_asset_maintenance_manager = this.firstFormGroup.value.location_asset_maintenance_manager
          SubmitObject.maintenance_planner = this.firstFormGroup.value.maintenance_planner
          SubmitObject.gis_esri_id = this.firstFormGroup.value.gis_esri_id
          SubmitObject.latitude = this.firstFormGroup.value.latitude
          SubmitObject.longitude = this.firstFormGroup.value.longitude
          SubmitObject.asset_criticality = this.firstFormGroup.value.asset_critically
          SubmitObject.cost_center = this.firstFormGroup.value.cost_center
          SubmitObject.asset_owning_department = this.firstFormGroup.value.asset_owning_department
          SubmitObject.main_operation = this.firstFormGroup.value.main_operation
          SubmitObject.region = this.firstFormGroup.value.region;
          SubmitObject.operation = this.firstFormGroup.value.operation;
          SubmitObject.process_function = this.firstFormGroup.value.process_function;
          SubmitObject.sub_process_system = this.firstFormGroup.value.sub_process_system;
          SubmitObject.asset_or_component_type = this.asset_or_component;
          SubmitObject.maintenance_specification = this.firstFormGroup.value.maintenance_specification;
          SubmitObject.asset_primary_category = this.firstFormGroup.value.asset_primary_category;
          SubmitObject.sub_category_1 = this.firstFormGroup.value.sub_category_1;
          SubmitObject.sub_category_2 = this.firstFormGroup.value.sub_category_2;
          SubmitObject.brand = this.firstFormGroup.value.brand;
          SubmitObject.model_number = this.firstFormGroup.value.model_number;
          SubmitObject.size_capacity_1 = this.firstFormGroup.value.size_capacity_1;
          SubmitObject.size_capacity_1_unit_measurement = this.firstFormGroup.value.size_capacity_1_unit_measurement;
          SubmitObject.size_capacity_2 = this.firstFormGroup.value.size_capacity_2;
          SubmitObject.size_capacity_2_unit_measurement = this.firstFormGroup.value.size_capacity_2_unit_measurement;
          SubmitObject.size_capacity_3 = this.firstFormGroup.value.size_capacity_3;
          SubmitObject.size_capacity_3_unit_measurement = this.firstFormGroup.value.size_capacity_3_unit_measurement;
          SubmitObject.detailed_description = this.detailedDescription;
          SubmitObject.serial_number = this.firstFormGroup.value.serial_number;
          // SubmitObject.asset_tag_number = this.firstFormGroup.value.asset_tag_number;
          SubmitObject.serial_number = this.firstFormGroup.value.serial_number;
          SubmitObject.purchase_date_installed_handed_over_date = this.firstFormGroup.value.purchase_date_installed_handed_over_date;
          SubmitObject.condition_rating = this.firstFormGroup.value.condition_rating;
          SubmitObject.maintenance_specification = this.firstFormGroup.value.maintenance_specification;
          SubmitObject.measurement_type = this.firstFormGroup.value.measurement_type;
          SubmitObject.warranty = this.firstFormGroup.value.warranty;
          SubmitObject.actual_warranty_period = this.firstFormGroup.value.actual_warranty_period;
          SubmitObject.warranty_vendor_name = this.firstFormGroup.value.warranty_vendor_name;
          SubmitObject.asset_class_asset_category = this.class_category;
          SubmitObject.handed_over_asset_or_procured = this.firstFormGroup.value.status;

          SubmitObject.new_parent_location = this.firstFormGroup.value.new_parent_location
          SubmitObject.bo = this.bo
          SubmitObject.bo_status = this.boStatus

          SubmitObject.bottom_water_level = this.secondFormGroup.value.bottom_water_level
          SubmitObject.closing_torque = this.secondFormGroup.value.closing_torque
          SubmitObject.dimention = this.secondFormGroup.value.dimention
          SubmitObject.frequency = this.secondFormGroup.value.frequency
          SubmitObject.infrastructure_status = this.secondFormGroup.value.infrastructure_status
          SubmitObject.installation = this.secondFormGroup.value.installation
          SubmitObject.manufacturer = this.secondFormGroup.value.manufacturer
          SubmitObject.material_type = this.secondFormGroup.value.material_type
          SubmitObject.no_of_channel = this.secondFormGroup.value.no_of_channel
          SubmitObject.opening_torque = this.secondFormGroup.value.opening_torque
          SubmitObject.pump_head = this.secondFormGroup.value.pump_head
          SubmitObject.staging_height = this.secondFormGroup.value.staging_height
          SubmitObject.top_water_level = this.secondFormGroup.value.top_water_level
          SubmitObject.valve_pressure_rating = this.secondFormGroup.value.valve_pressure_rating
          SubmitObject.vehicle_engine_number = this.secondFormGroup.value.vehicle_engine_number
          SubmitObject.vehicle_insurance_auto_windscreen_insured = this.secondFormGroup.value.vehicle_insurance_auto_windscreen_insured
          SubmitObject.vehicle_insurance_date_period_to = this.secondFormGroup.value.vehicle_insurance_date_period_to
          SubmitObject.vehicle_insurance_sum_insured = this.secondFormGroup.value.vehicle_insurance_sum_insured
          SubmitObject.vehicle_owner_status = this.secondFormGroup.value.vehicle_owner_status
          SubmitObject.vehicle_puspakom_expired_date = this.secondFormGroup.value.vehicle_puspakom_expired_date
          SubmitObject.vehicle_roadtax_expired_date = this.secondFormGroup.value.vehicle_roadtax_expired_date
          SubmitObject.vehicle_seating_capacity = this.secondFormGroup.value.vehicle_seating_capacity
          SubmitObject.communication_protocol = this.secondFormGroup.value.communication_protocol
          SubmitObject.environmental_performance = this.secondFormGroup.value.environmental_performance
          SubmitObject.horse_power = this.secondFormGroup.value.horse_power
          SubmitObject.infrastructure_status_reason = this.secondFormGroup.value.infrastructure_status_reason
          SubmitObject.insulation = this.secondFormGroup.value.insulation
          SubmitObject.manufacturer_year = this.secondFormGroup.value.manufacturer_year
          SubmitObject.model = this.secondFormGroup.value.model
          SubmitObject.no_of_phases = this.secondFormGroup.value.no_of_phases
          SubmitObject.outlet_diameter = this.secondFormGroup.value.outlet_diameter
          SubmitObject.revolutions_per_minute = this.secondFormGroup.value.revolutions_per_minute
          SubmitObject.supply_location = this.secondFormGroup.value.supply_location
          SubmitObject.type = this.secondFormGroup.value.type
          SubmitObject.vehicle_chasis_number = this.secondFormGroup.value.vehicle_chasis_number
          SubmitObject.vehicle_insurance_vendor = this.secondFormGroup.value.vehicle_insurance_vendor
          SubmitObject.vehicle_insurance_cover_note_number = this.secondFormGroup.value.vehicle_insurance_cover_note_number
          SubmitObject.vehicle_insurance_no_claim_discount = this.secondFormGroup.value.vehicle_insurance_no_claim_discount
          SubmitObject.vehicle_insurance_total_premium = this.secondFormGroup.value.vehicle_insurance_total_premium
          SubmitObject.vehicle_register_date = this.secondFormGroup.value.vehicle_register_date
          SubmitObject.vehicle_spad_permit_date_period_to = this.secondFormGroup.value.vehicle_spad_permit_date_period_to
          SubmitObject.vehicle_spad_no_license_operator = this.secondFormGroup.value.vehicle_spad_no_license_operator
          SubmitObject.vehicle_registration_owner = this.secondFormGroup.value.vehicle_registration_owner
          SubmitObject.capacity_size = this.secondFormGroup.value.capacity_size
          SubmitObject.coverage_range = this.secondFormGroup.value.coverage_range
          SubmitObject.flow_rate = this.secondFormGroup.value.flow_rate
          SubmitObject.hysteresis = this.secondFormGroup.value.hysteresis
          SubmitObject.inlet_diameter = this.secondFormGroup.value.inlet_diameter
          SubmitObject.legal_name = this.secondFormGroup.value.legal_name
          SubmitObject.manufacture_part_number = this.secondFormGroup.value.manufacture_part_number
          SubmitObject.motor_current = this.secondFormGroup.value.motor_current
          SubmitObject.no_of_stage = this.secondFormGroup.value.no_of_stage
          SubmitObject.power_supply_type = this.secondFormGroup.value.power_supply_type
          SubmitObject.source_from = this.secondFormGroup.value.source_from
          SubmitObject.temperature = this.secondFormGroup.value.temperature
          SubmitObject.valve_diameter = this.secondFormGroup.value.valve_diameter
          SubmitObject.vehicle_engine_capacity = this.secondFormGroup.value.vehicle_engine_capacity
          SubmitObject.vehicle_model = this.secondFormGroup.value.vehicle_model
          SubmitObject.vehicle_insurance_date_period_from = this.secondFormGroup.value.vehicle_insurance_date_period_from
          SubmitObject.vehicle_insurance_policy_type = this.secondFormGroup.value.vehicle_insurance_policy_type
          SubmitObject.vehicle_puspakom_date_inspection = this.secondFormGroup.value.vehicle_puspakom_date_inspection
          SubmitObject.vehicle_roadtax_rate = this.secondFormGroup.value.vehicle_roadtax_rate
          SubmitObject.vehicle_roadtax_renew_date = this.secondFormGroup.value.vehicle_roadtax_renew_date
          SubmitObject.vehicle_spad_permit_date_period_from = this.secondFormGroup.value.vehicle_spad_permit_date_period_from
          SubmitObject.voltage = this.secondFormGroup.value.voltage
          SubmitObject.asset_status = this.secondFormGroup.value.asset_status
          SubmitObject.status = this.secondFormGroup.value.status
          SubmitObject.created_by = this.cuser.username

          console.log("SubmitObject", SubmitObject);


          this.assetsRegistrationService.post(SubmitObject).subscribe(
            (res) => {
              // this.saveAssetType(createAssetTypeData)
              // this.successAlert()

              this.spinner.hide();
              swal
                .fire({
                  title: "success",
                  text: "The submission has success",
                  type: "success",
                }).then((result) => {
                });
              this.modalRegisterAsset.hide();
              //this.closeModal()
              this.getRegisteredData();
            },
            error => {
              console.error("err", error);

              this.spinner.hide();
              swal
                .fire({
                  title: "failed",
                  text: "The submission has failed",
                  type: "warning",
                }).then((result) => {

                });
              this.modalRegisterAsset.hide();
              //this.closeModal()
            }
          )

        }
      });
  }


  //parents location
  public newParent: boolean = false;
  public existingParent: boolean = false;

  toggleNewParent() {
    this.newParent = true
    this.existingParent = false
  }

  toggleExistingParent() {
    this.newParent = false
    this.existingParent = true
  }


  entriesChange($event) {
    console.log($event)
    this.entries = +$event.target.value;
    console.log(this.entries)
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(selected);
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
      this.modalConfig,
      // this.firstFormGroup.patchValue({
      //   ...row,
      // }),
      // this.secondFormGroup.patchValue({
      //   ...row,
      // }),
    );
  }

  openModalAssetAttribute(modalNotification: TemplateRef<any>, row) {

    let temp = this.assetprimarycategory.filter((value) => value.asset_type_code.includes(row.asset_primary_category));
    console.log("Asset_primary_category", temp[0].asset_type_description)

    let tempData = [];
    this.assetsAttributeColumnService.get().subscribe(
      (res) => {
        res.forEach(function (assetprimer) {
          // console.log("asset primary uina =",assetprimer);
          tempData.push(assetprimer);
        })
        this.assetattributecolumnapi = tempData;
        // let assetprimary1 = row.asset_primary_category;
        let assetprimary1 = temp[0].asset_type_description;
        let assetprimary2 = this.assetattributecolumnapi.map(a => a.asset_type_id);
        // let result = this.map(({ foo }) => foo)

        this.rowData = '';
        this.rowData = row;
        console.log("rowData", this.rowData)


        if (assetprimary2.indexOf(assetprimary1) !== -1) {
          this.assetprimary = this.assetattributecolumnapi.filter(function (primary) {
            return primary.asset_type_id == assetprimary1;
          })

          this.assetprimaryshow = Object.values(this.assetprimary)

          let assetattributekeynum = Object.values(this.assetprimaryshow[0])
          let assetname = Object.keys(this.assetprimaryshow[0])

          // this.assetprimaryshow[0].forEach(element => {
          //   if (assetattributekeynum == false) {
          //     console.log("test success")
          //     let assetattributeval2 = (<HTMLInputElement>document.getElementById(assetname[element])).value
          //     assetattributeval2 = null
          //   }
          // });


        }
        else {
          console.log("there is no match");
          this.assetprimaryshow[0] = this.assetprimaryselectorshowdefault
        }
        this.ModalAssetAttribute = this.modalService.show(
          modalNotification,
          this.modalConfig,

        );
      },
      error => {
        console.error("err", error);
      }
    )

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

    this.assetsRegistrationService.post(postAssets).subscribe(
      (res) => {
        if (res) {
          console.log("res", res);
          this.toastr.openToastr(
            "Your asset have successfully registered.",
            "Register Asset"
          );
          // console.log('Berjaya')
          this.modalRegisterAsset.hide();
          this.getAssets();
        }
      },
      (err) => {
        console.log('err=', err)
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

    // this.getRegisteredData();

    let counter = 0
    for (let x in this.is_show1) {
      if (this.is_show1[x]) {
        counter++
      }
    }
    if (counter > 2) {
      this.tableShow1 = true
    }
    else {
      // console.log('bluek')
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
      console.log('this.data = ', this.dataFromExcelFile);
      // let x = this.data.slice(1);
      // console.log('x = ', x);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  closeModal() {
    this.modal.hide();
    // this.modalService.hide();
  }

  submitFileExcel() {

    let assetregserv = this.assetsRegistrationService
    this.spinner.show();
    let currentUser = this.cuser;

    this.dataFromExcelFile.forEach(function (loopval, index) {

      let checkStatus = 'TP'
      const formData = new FormData();
      // console.log("loopval",loopval['Asset Owning Department'])
      console.log("loopval", loopval)


      // formData.asset_owning_department = loopval.asset_owning_department
      formData.append('asset_owning_department', (loopval.asset_owning_department != undefined ? loopval.asset_owning_department : ''));
      formData.append('main_operation', (loopval.main_operation != undefined ? loopval.main_operation : ''))
      formData.append('region', (loopval.region != undefined ? loopval.region : ''))
      formData.append('operation', (loopval.operation != undefined ? loopval.operation : ''))
      formData.append('parent_location', (loopval.parent_location != undefined ? loopval.parent_location : ''))
      formData.append('process_function', (loopval.process_function != undefined ? loopval.process_function : ''))
      formData.append('sub_process_system', (loopval.sub_process_system != undefined ? loopval.sub_process_system : ''))
      formData.append('asset_or_component_type', (loopval.asset_or_component_type != undefined ? loopval.asset_or_component_type : ''))
      formData.append('asset_class_asset_category', (loopval.asset_class_asset_category != undefined ? loopval.asset_class_asset_category : ''))
      formData.append('handed_over_asset_or_procured', (loopval.handed_over_asset_or_procured != undefined ? loopval.handed_over_asset_or_procured : ''))
      formData.append('asset_primary_category', (loopval.asset_primary_category != undefined ? loopval.asset_primary_category : ''))
      formData.append('asset_identity', (loopval.asset_identity != undefined ? loopval.asset_identity : ''))
      formData.append('location_description', (loopval.location_description != undefined ? loopval.location_description : ''))
      formData.append('building', (loopval.building != undefined ? loopval.building : ''))
      formData.append('address_line_1', (loopval.address_line_1 != undefined ? loopval.address_line_1 : ''))
      formData.append('address_line_2', (loopval.address_line_2 != undefined ? loopval.address_line_2 : ''))
      formData.append('address_line_3', (loopval.address_line_3 != undefined ? loopval.address_line_3 : ''))
      formData.append('city', (loopval.city != undefined ? loopval.city : ''))
      formData.append('state', (loopval.state != undefined ? loopval.state : ''))
      formData.append('postal_code', (loopval.postal_code != undefined ? loopval.postal_code : ''))
      formData.append('country', (loopval.country != undefined ? loopval.country : ''))
      formData.append('tag_number', (loopval.tag_number != undefined ? loopval.tag_number : ''))
      formData.append('service_area', (loopval.service_area != undefined ? loopval.service_area : ''))
      formData.append('location_main_contact', (loopval.location_main_contact != undefined ? loopval.location_main_contact : ''))
      formData.append('location_asset_maintenance_manager', (loopval.location_asset_maintenance_manager != undefined ? loopval.location_asset_maintenance_manager : ''))
      formData.append('maintenance_planner', (loopval.maintenance_planner != undefined ? loopval.maintenance_planner : ''))
      formData.append('gis_esri_id', (loopval.gis_esri_id != undefined ? loopval.gis_esri_id : ''))
      formData.append('latitude', (loopval.latitude != undefined ? loopval.latitude : ''))
      formData.append('longitude', (loopval.longitude != undefined ? loopval.longitude : ''))
      formData.append('asset_critically', (loopval.asset_criticality != undefined ? loopval.asset_criticality : ''))
      formData.append('cost_center', (loopval.cost_center != undefined ? loopval.cost_center : ''))
      formData.append('sub_category_1', (loopval.sub_category_1 != undefined ? loopval.sub_category_1 : ''))
      formData.append('sub_category_2', (loopval.sub_category_2 != undefined ? loopval.sub_category_2 : ''))
      formData.append('brand', (loopval.brand != undefined ? loopval.brand : ''))
      formData.append('model_number', (loopval.model_number != undefined ? loopval.model_number : ''))
      formData.append('size_capacity_1', (loopval.size_capacity_1 != undefined ? loopval.size_capacity_1 : ''))
      formData.append('size_capacity_1_unit_measurement', (loopval.size_capacity_1_unit_measurement != undefined ? loopval.size_capacity_1_unit_measurement : ''))
      formData.append('size_capacity_2', (loopval.size_capacity_2 != undefined ? loopval.size_capacity_2 : ''))
      formData.append('size_capacity_2_unit_measurement', (loopval.size_capacity_2_unit_measurement != undefined ? loopval.size_capacity_2_unit_measurement : ''))
      formData.append('size_capacity_3', (loopval.size_capacity_3 != undefined ? loopval.size_capacity_3 : ''))
      formData.append('size_capacity_3_unit_measurement', (loopval.size_capacity_3_unit_measurement != undefined ? loopval.size_capacity_3_unit_measurement : ''))
      formData.append('parent_asset_plate_number', (loopval.parent_asset_plate_number != undefined ? loopval.parent_asset_plate_number : ''))
      formData.append('asset_plate_number', (loopval.asset_plate_number != undefined ? loopval.asset_plate_number : ''))
      formData.append('detailed_description ', (loopval.detailed_description != undefined ? loopval.detailed_description : ''))
      formData.append('serial_number', (loopval.serial_number != undefined ? loopval.serial_number : ''))
      formData.append('asset_tag_number', (loopval.asset_tag_number != undefined ? loopval.asset_tag_number : ''))
      formData.append('purchase_date_installed_handed_over_date', (loopval.purchase_date_installed_handed_over_date != undefined ? loopval.purchase_date_installed_handed_over_date : ''))
      formData.append('condition_rating', (loopval.condition_rating != undefined ? loopval.condition_rating : ''))
      formData.append('asset_status', (loopval.asset_status != undefined ? loopval.asset_status : ''))
      formData.append('maintenance_specification', (loopval.maintenance_specification != undefined ? loopval.maintenance_specification : ''))
      formData.append('measurement_type', (loopval.measurement_type != undefined ? loopval.measurement_type : ''))
      formData.append('warranty', (loopval.warranty != undefined ? loopval.warranty : ''))
      formData.append('actual_warranty_period', (loopval.actual_warranty_period != undefined ? loopval.actual_warranty_period : ''))
      formData.append('warranty_vendor_name', (loopval.warranty_vendor_name != undefined ? loopval.warranty_vendor_name : ''))
      formData.append('bottom_water_level', (loopval.bottom_water_level != undefined ? loopval.bottom_water_level : ''))
      formData.append('closing_torque', (loopval.closing_torque != undefined ? loopval.closing_torque : ''))
      formData.append('dimention', (loopval.dimention != undefined ? loopval.dimention : ''))
      formData.append('frequency', (loopval.frequency != undefined ? loopval.frequency : ''))
      formData.append('infrastructure_status', (loopval.infrastructure_status != undefined ? loopval.infrastructure_status : ''))
      formData.append('installation', (loopval.installation != undefined ? loopval.installation : ''))
      formData.append('manufacturer', (loopval.manufacturer != undefined ? loopval.manufacturer : ''))
      formData.append('material_type', (loopval.material_type != undefined ? loopval.material_type : ''))
      formData.append('no_of_channel', (loopval.no_of_channel != undefined ? loopval.no_of_channel : ''))
      formData.append('opening_torque', (loopval.opening_torque != undefined ? loopval.opening_torque : ''))
      formData.append('pump_head', (loopval.pump_head != undefined ? loopval.pump_head : ''))
      formData.append('staging_height', (loopval.staging_height != undefined ? loopval.staging_height : ''))
      formData.append('top_water_level', (loopval.top_water_level != undefined ? loopval.top_water_level : ''))
      formData.append('valve_pressure_rating', (loopval.valve_pressure_rating != undefined ? loopval.valve_pressure_rating : ''))
      formData.append('vehicle_engine_number', (loopval.vehicle_engine_number != undefined ? loopval.vehicle_engine_number : ''))
      formData.append('vehicle_insurance_auto_windscreen_insured', (loopval.vehicle_insurance_auto_windscreen_insured != undefined ? loopval.vehicle_insurance_auto_windscreen_insured : ''))
      formData.append('vehicle_insurance_date_period_to', (loopval.vehicle_insurance_date_period_to != undefined ? loopval.vehicle_insurance_date_period_to : ''))
      formData.append('vehicle_insurance_sum_insured', (loopval.vehicle_insurance_sum_insured != undefined ? loopval.vehicle_insurance_sum_insured : ''))
      formData.append('vehicle_owner_status', (loopval.vehicle_owner_status != undefined ? loopval.vehicle_owner_status : ''))
      formData.append('vehicle_puspakom_expired_date', (loopval.vehicle_puspakom_expired_date != undefined ? loopval.vehicle_puspakom_expired_date : ''))
      formData.append('vehicle_roadtax_expired_date', (loopval.vehicle_roadtax_expired_date != undefined ? loopval.vehicle_roadtax_expired_date : ''))
      formData.append('vehicle_seating_capacity', (loopval.vehicle_seating_capacity != undefined ? loopval.vehicle_seating_capacity : ''))
      formData.append('communication_protocol', (loopval.communication_protocol != undefined ? loopval.communication_protocol : ''))
      formData.append('environmental_performance', (loopval.environmental_performance != undefined ? loopval.environmental_performance : ''))
      formData.append('horse_power', (loopval.horse_power != undefined ? loopval.horse_power : ''))
      formData.append('infrastructure_status_reason', (loopval.infrastructure_status_reason != undefined ? loopval.infrastructure_status_reason : ''))
      formData.append('insulation', (loopval.insulation != undefined ? loopval.insulation : ''))
      formData.append('manufacturer_year', (loopval.manufacturer_year != undefined ? loopval.manufacturer_year : ''))
      formData.append('model', (loopval.model != undefined ? loopval.model : ''))
      formData.append('no_of_phases', (loopval.no_of_phases != undefined ? loopval.no_of_phases : ''))
      formData.append('outlet_diameter', (loopval.outlet_diameter != undefined ? loopval.outlet_diameter : ''))
      formData.append('revolutions_per_minute', (loopval.revolutions_per_minute != undefined ? loopval.revolutions_per_minute : ''))
      formData.append('supply_location', (loopval.supply_location != undefined ? loopval.supply_location : ''))
      formData.append('type', (loopval.type != undefined ? loopval.type : ''))
      formData.append('vehicle_chasis_number', (loopval.vehicle_chassis_number != undefined ? loopval.vehicle_chassis_number : ''))
      formData.append('vehicle_insurance_vendor', (loopval.vehicle_insurance_vendor != undefined ? loopval.vehicle_insurance_vendor : ''))
      formData.append('vehicle_insurance_cover_note_number', (loopval.vehicle_insurance_cover_note_number != undefined ? loopval.vehicle_insurance_cover_note_number : ''))
      formData.append('vehicle_insurance_no_claim_discount', (loopval.vehicle_insurance_no_claim_discount != undefined ? loopval.vehicle_insurance_no_claim_discount : ''))
      formData.append('vehicle_insurance_total_premium', (loopval.vehicle_insurance_total_premium != undefined ? loopval.vehicle_insurance_total_premium : ''))
      formData.append('vehicle_register_date', (loopval.vehicle_register_date != undefined ? loopval.vehicle_register_date : ''))
      formData.append('vehicle_spad_permit_date_period_to', (loopval.vehicle_spad_permit_date_period_to != undefined ? loopval.vehicle_spad_permit_date_period_to : ''))
      formData.append('vehicle_spad_no_license_operator', (loopval.vehicle_spad_no_license_operator != undefined ? loopval.vehicle_spad_no_license_operator : ''))
      formData.append('vehicle_registration_owner', (loopval.vehicle_registration_owner != undefined ? loopval.vehicle_registration_owner : ''))
      formData.append('capacity_size', (loopval.capacity_size != undefined ? loopval.capacity_size : ''))
      formData.append('coverage_range', (loopval.coverage_range != undefined ? loopval.coverage_range : ''))
      formData.append('flow_rate', (loopval.flow_rate != undefined ? loopval.flow_rate : ''))
      formData.append('hysteresis', (loopval.hysteresis != undefined ? loopval.hysteresis : ''))
      formData.append('inlet_diameter', (loopval.inlet_diameter != undefined ? loopval.inlet_diameter : ''))
      formData.append('legal_name', (loopval.legal_name != undefined ? loopval.legal_name : ''))
      formData.append('manufacture_part_number', (loopval.manufacture_part_number != undefined ? loopval.manufacture_part_number : ''))
      formData.append('motor_current', (loopval.motor_current != undefined ? loopval.motor_current : ''))
      formData.append('no_of_stage', (loopval.no_of_stage != undefined ? loopval.no_of_stage : ''))
      formData.append('power_supply_type', (loopval.power_supply_type != undefined ? loopval.power_supply_type : ''))
      formData.append('source_from', (loopval.source_from != undefined ? loopval.source_from : ''))
      formData.append('temperature', (loopval.temperature != undefined ? loopval.temperature : ''))
      formData.append('valve_diameter', (loopval.valve_diameter != undefined ? loopval.valve_diameter : ''))
      formData.append('vehicle_engine_capacity', (loopval.vehicle_engine_capacity != undefined ? loopval.vehicle_engine_capacity : ''))
      formData.append('vehicle_model', (loopval.vehicle_model != undefined ? loopval.vehicle_model : ''))
      formData.append('vehicle_insurance_date_period_from', (loopval.vehicle_insurance_date_period_from != undefined ? loopval.vehicle_insurance_date_period_from : ''))
      formData.append('vehicle_insurance_policy_type', (loopval.vehicle_insurance_policy_type != undefined ? loopval.vehicle_insurance_policy_type : ''))
      formData.append('vehicle_puspakom_date_inspection', (loopval.vehicle_puspakom_date_inspection != undefined ? loopval.vehicle_puspakom_date_inspection : ''))
      formData.append('vehicle_roadtax_rate', (loopval.vehicle_roadtax_rate != undefined ? loopval.vehicle_roadtax_rate : ''))
      formData.append('vehicle_roadtax_renew_date', (loopval.vehicle_roadtax_renew_date != undefined ? loopval.vehicle_roadtax_renew_date : ''))
      formData.append('vehicle_spad_permit_date_period_from', (loopval.vehicle_spad_permit_date_period_from != undefined ? loopval.vehicle_spad_permit_date_period_from : ''))
      formData.append('voltage', (loopval.voltage != undefined ? loopval.voltage : ''))
      formData.append('created_by', (currentUser.username))


      //formData.forEach(function (loopvaldata) {
      //  console.log("incomplete dataset", loopvaldata);
      //  if (loopvaldata == '' || loopvaldata == null) {
      //    checkStatus = 'IC'
      //  }
      //})

      formData.append('status', checkStatus)

      console.log('formData = ', formData);
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

    console.log("excel data", this.dataFromExcelFile)
    this.spinner.hide();
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
    let filterString = ""
    if (this.crole == "PL") {
      filterString = "status=TP&created_by=" + this.cuser.username;

    } else {
      filterString = "status=TP"
    }

    let tempData = []
    this.assetsRegistrationService.filter(filterString).subscribe(
      (res) => {
        console.log("whaa", res);
        res.forEach(function (val) {
          val['isTick'] = false
          tempData.push(val)
          console.log("status", val.status);
        })
        this.tableTemp1 = tempData
      },
      error => {
        console.error("err", error);
      }
    )
  }


  assetPrimary: any;
  AssetChange(event) {

    console.log("assetPrimary", event)
    let tempData = [];

    let asset_primary = this.assetprimarycategory.filter((value) => value.asset_type_code.includes(event));
    console.log("Asset_primary_category", asset_primary[0].asset_type_description)

    this.assetsAttributeColumnService.get().subscribe(
      (res) => {
        // tempData = res;
        console.log("res", res)


        tempData = res.filter((value) => value.asset_type_id.includes(asset_primary[0].asset_type_description));
        console.log("tempData", tempData);

        this.assetprimaryselectorshow = tempData;
        // console.log("assetprimaryselectorshow", this.assetprimaryselectorshow[0].bottom_water_level)
      },
      error => {
        console.error("err", error);
      }
    )

    this.classCategory(event);
    this.getBoValue(event);
    this.getMaintenanceSpec(event);
    this.getDetailedDescription();
    this.getTableMaintenanceSpec(event);
    this.get_asset_or_component_type(event);
    this.get_specification(event);

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
    // console.log('test test tetst')
    this.tableTemp1.forEach(
      (item) => {
        if (item['id'] == selected['id']) {
          // console.log('item b4 = ', item)
          item['isTick'] = item['isTick']
          // console.log('item after = ', item)
          tempData.push(item)
        } else {
          tempData.push(item)
        }
      }
    )
    // console.log('tempDataqweqe = ', tempData)
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
      console.log('result = ', result.value)
      if (result.value == true) {
        this.changeStatus(task)
      }
    })
  }

  changeStatus(task) {
    let resData: any
    // console.log('this.task = ', task)
    let no = 0
    let assetregser = this.assetsRegistrationService
    this.tableTemp1.forEach(function (itemVal) {

      if (itemVal['isTick'] == true) {

        console.log('itemVal = ', itemVal.status)
        if (itemVal.status == 'TP') {
          // const updateformData = new FormData();
          console.log("itemVal", itemVal);
          let updateformData: any
          // updateformData.append('status', 'PR');

          updateformData = {
            status: task
          }
          // console.log('updateformData = ', updateformData)

          // console.log('---- sini ----')
          assetregser.update(itemVal['id'], updateformData).subscribe(
            (res) => {
              // processing logic
              // post object into selected table
              console.log("update status NP", res);
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

  onKey(event, formName, row) {
    // console.log('event = ', event);
    // console.log('formName = ', formName);
    // console.log('row = ', row['id']);
    let updateformData: any = {}
    let updateStatusComplete: any = {}
    let updateStatus = 'yes'
    // updateformData.append(formName, event);
    // updateformData = {
    //   cendol: event
    // }

    console.log("event", event);
    console.log("form name", formName);
    console.log("row", row);
    updateformData[formName] = event

    // updateformData.value
    this.assetsRegistrationService.update(row['id'], updateformData).subscribe(
      (res) => {
        this.resOnkeyData = res
        console.log("assetsRegistrationService = ", this.resOnkeyData);
        for (var key in this.resOnkeyData) {
          // console.log('-----------')
          // console.log(this.resOnkeyData[key]);
          if (this.resOnkeyData[key] !== null) {
            updateStatus = 'no'
            console.log('+++++++++++++')
            // console.log('----- qweqweqwe -----', key)
          }
        }
        console.log('updateStatus = ', updateStatus)
        if (updateStatus == 'yes') {
          updateStatusComplete['status'] = 'CO'
          this.assetsRegistrationService.update(row['id'], updateStatusComplete).subscribe(
            (res) => {
              // console.log('yeaahhaaaaaaa CO')
              this.getRegisteredData()
            }
          )
        } else {
          updateStatusComplete['status'] = 'IC'
          this.assetsRegistrationService.update(row['id'], updateStatusComplete).subscribe(
            (res) => {
              // console.log('yeaahhaaaaaaa IC')
              this.getRegisteredData()
            }
          )
        }
      },
      error => {
        console.error("err", error);
      }
    )
  }

  // getAssetPrimaryCategory() {
  //   this.assetAttribute.forEach(function (lll, mm) {
  //     console.log('test test = ', lll.asset_primary_category)
  //   })
  // }
}
