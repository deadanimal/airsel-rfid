import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";

import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { AssetGroupsService } from "src/app/shared/services/asset-groups/asset-groups.service";
import { AssetTypesService } from "src/app/shared/services/asset-types/asset-types.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";
import { RegionsService } from "src/app/shared/services/regions/regions.service";
import { IonicSelectableComponent } from 'ionic-selectable';
import { AssetRegistrationsService } from 'src/app/shared/services/asset-registrations/asset-registrations.service';
import { StatesService } from 'src/app/shared/services/state/states.service';
import { AssetAttributeColumnService } from 'src/app/shared/services/asset-attribute-column/asset-attribute-column.service';
import { AssetAttributePredefineService } from 'src/app/shared/services/asset-attribute-predefine/asset-attribute-prodefine.service';
import { AssetAttributeReferenceService } from 'src/app/shared/services/asset-attribute-reference/asset-attribute-reference.service';
import { MaintenanceManagerService } from 'src/app/shared/services/maintenance-manager/maintenance-manager.service';
import { PlannerService } from 'src/app/shared/services/planner/planner.service';
import { AssetLocatioSyncService } from 'src/app/shared/services/asset-location-sync/asset-location-sync.service';

class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: "app-asset-registration",
  templateUrl: "./asset-registration.page.html",
  styleUrls: ["./asset-registration.page.scss"],
})
export class AssetRegistrationPage implements OnInit {
  // Stepper
  isLinear = false;
  isDisableRipple = true;

  typeassets = [];
  regions = [];
  states = [];
  organisations = [];
  departments = [
    { value: "CB", name: "Customer Billing Services" },
    { value: "DB", name: "Distribution" },
    { value: "ED", name: "Engineering Services - Distribution" },
    { value: "FL", name: "Fleet" },
    { value: "LN", name: "Land" },
    { value: "NR", name: "NRW" },
    { value: "PN", name: "Production Northern" },
    { value: "PS", name: "Production Southern" },
    { value: "SD", name: "SCADA" },
    { value: "WQ", name: "Water Quality" },
    { value: "NA", name: "Not Available" },
  ];
  hierarchylevel1s = [
    { value: "CB", name: "Customer Billing Services" },
    { value: "DB", name: "Distribution" },
    { value: "FL", name: "Fleet" },
    { value: "GA", name: "General Admin" },
    { value: "PD", name: "Production" },
    { value: "SD", name: "SCADA" },
    { value: "WQ", name: "Water Quality" },
    { value: "NA", name: "Not Available" },
  ];
  hierarchylevel3s = [
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
  hierarchylevel4s = [
    { value: "NR", name: "NRW" },
    { value: "PH", name: "Pump House" },
    { value: "RS", name: "Reservoir" },
    { value: "TP", name: "Treatment Plant Name" },
    { value: "NA", name: "Not Available" },
  ];
  hierarchylevel5s = [
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
  hierarchylevel6s = [
    { value: "AP", name: "Actiflo Process" },
    { value: "AC", name: "Activated Carbon Process" },
    { value: "AS", name: "Aeration System" },
    { value: "ES", name: "Alum Process" },
    { value: "BP", name: "Backwash Process" },
    { value: "BR", name: "Balancing Reservoir" },
    { value: "BO", name: "Boat House" },
    { value: "BU", name: "Buildings" },
    { value: "CD", name: "Chemical Dosing" },
    { value: "CM", name: "Chemical Process" },
    { value: "CP", name: "Chlorination Process" },
    { value: "CO", name: "Coagulation Process" },
    { value: "CR", name: "Chemical Room" },
    { value: "CC", name: "Control Centre" },
    { value: "CR", name: "Control Room" },
    { value: "DP", name: "Data Process" },
    { value: "DS", name: "Distrafication" },
    { value: "DO", name: "Draw Off Process" },
    { value: "ES", name: "Earthing System" },
    { value: "EL", name: "Electrical System" },
    { value: "FS", name: "Facilities System" },
    { value: "FP", name: "Filtration Process" },
    { value: "FW", name: "Filtered Water Sampling" },
    { value: "FO", name: "Flocculation Process" },
    { value: "FL", name: "Fluoride Process" },
    { value: "LB", name: "Laboratory" },
    { value: "LP", name: "Lime Process" },
    { value: "OA", name: "Online Analyzer" },
    { value: "PR", name: "Polymer (Residual) Dosing" },
    { value: "PA", name: "Poly Aluminium Chloride Process" },
    { value: "PP", name: "Polymer Process" },
    { value: "PS", name: "Power Supply" },
    { value: "RM", name: "Rapid Mixing" },
    { value: "RE", name: "Residual Emergency Lagoon" },
    { value: "RT", name: "Residual Thickened Pumping Station" },
    { value: "RI", name: "Raw Water Intake System" },
    { value: "RS", name: "Raw Water Pumping System" },
    { value: "RP", name: "Raw Water Process" },
    { value: "RE", name: "Raw Water Pipeline" },
    { value: "RV", name: "Reservoir" },
    { value: "SS", name: "SCADA System" },
    { value: "SD", name: "Sedimentation Process" },
    { value: "SL", name: "Settled Water Process" },
    { value: "SS", name: "Settled Water Sampling" },
    { value: "SW", name: "Settled Water Pumping System" },
    { value: "SB", name: "Sludge Balancing" },
    { value: "ST", name: "Sludge Treament Process" },
    { value: "SQ", name: "Solid Liquid Separation" },
    { value: "SA", name: "Solar System" },
    { value: "SI", name: "Sodium Alumino Silicate Process" },
    { value: "SO", name: "Soda Ash Process" },
    { value: "TA", name: "Tangki Sedit SYABAS" },
    { value: "TE", name: "Telemetry System" },
    { value: "TP", name: "Treated Water Process" },
    { value: "TS", name: "Treated Water Sampling" },
    { value: "TL", name: "Treated Water Pipeline" },
    { value: "TW", name: "Treated Water Pumping System" },
    { value: "TT", name: "Treatment Process" },
    { value: "WA", name: "Water Analysis" },
    { value: "WO", name: "Workshop" },
    { value: "WT", name: "Water Transfer" },
    { value: "WP", name: "Wash Water Process" },
    { value: "WR", name: "Wash Water Recovery" },
    { value: "WS", name: "Wash Water System" },
    { value: "NA", name: "Not Available" },
  ];

  categories = [];
  identities = [];
  primarycategories = [];
  groupsubcategory1s = [];
  groupsubcategory2s = [];
  statuses = [{ value: "NA", name: "Not Available" }];
  measuringtypes = [
    { value: "FM", name: "Flow Meter Readings" },
    { value: "TP", name: "Temperature" },
    { value: "OT", name: "Other" },
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
    { desc: "Ampere", value: 'amp' },
    { desc: "Kilovolt Ampere", value: 'kva' },
    { desc: "Hertz", value: 'hz' },
    { desc: "Ampere", value: 'amp' },
    { desc: "Ampere", value: 'amp' },
    { desc: "Ampere", value: 'amp' },
  ]

  // asset attribute // 
  assetAttrColumn: any
  assetAttrData: any
  assetCategoryData: any
  assetAttPredefine: any
  assetAttPredefineMans: any = [] // manufacturer
  assetAttPredefinePreInsVens: any = [] // vehicle_insurance_vendor
  assetAttPredefineInsPols: any = [] // vehicle_insurance_policy_type
  assetAttPredefineOwnStas: any = [] //vehicle_owner_status
  assetAttPredefineRegOwns: any = [] // vehicle_registration_owner

  // hide show div
  parentLocaDiv = 0;
  assetLocDiv = 0;
  port: Port;
  segmentModal = "first";
  process = "create";

  // state data
  stateList = [
    { id: 'JHR', name: 'Johor' },
    { id: 'KDH', name: 'Kedah' },
    { id: 'KEL', name: 'Kelantan' },
    { id: 'KUL', name: 'Kuala Lumpur' },
    { id: 'LBN', name: 'Labuan' },
    { id: 'MLK', name: 'Melaka' },
    { id: 'NSN', name: 'Negeri Sembilan' },
    { id: 'PHG', name: 'Pahang' },
    { id: 'PJY', name: 'Putrajaya' },
    { id: 'PLS', name: 'Perlis' },
    { id: 'PNG', name: 'Penang' },
    { id: 'PRK', name: 'Perak' },
    { id: 'SBH', name: 'Sabah' },
    { id: 'SGR', name: 'Selangor' },
    { id: 'SWK', name: 'Serawak' },
    { id: 'TRG', name: 'Terengganu' },
  ];

  // service area
  servAreaList = [
    { id: 'GOMBAK', name: 'GOMBAK' },
    { id: 'HEADQUARTERS', name: 'HEADQUARTERS' },
    { id: 'HULU-LANGAT', name: 'HULU LANGAT' },
    { id: 'HULU-SELANGOR', name: 'HULU SELANGOR' },
    { id: 'KLANG', name: 'KLANG' },
    { id: 'KUALA-LANGAT', name: 'KUALA LANGAT' },
    { id: 'KUALA-LUMPUR', name: 'KUALA LUMPUR' },
    { id: 'KUALA-SELANGOR', name: 'KUALA SELANGOR' },
    { id: 'NORTH', name: 'NORTH' },
    { id: 'PETALING', name: 'PETALING' },
    { id: 'SABAK-BERNAM', name: 'SABAK BERNAM' },
    { id: 'SEPANG', name: 'SEPANG' },
    { id: 'SOUTH', name: 'SOUTH' },
  ];

  // asset criticality
  assCriticalList = [
    { id: '01', name: '01 Asset Failure Low Impact' },
    { id: '02', name: '02' },
    { id: '03', name: '03' },
    { id: '04', name: '04' },
    { id: '05', name: '05' },
    { id: '06', name: '06' },
    { id: '07', name: '07' },
    { id: '08', name: '08' },
    { id: '09', name: '09 Highest' }
  ];

  // asset owning department
  assOwningDepartList = [
    { id: 'CBD', name: 'CUSTOMER BILLING SERVICES' },
    { id: 'DISTRIBUTION', name: 'DISTRIBUTION' },
    { id: 'ES-D', name: 'ENGINEERING SERVICES – DISTRIBUTION' },
    { id: 'FLEET', name: 'FLEET' },
    { id: 'LAND', name: 'LAND' },
    { id: 'NRW', name: 'NRW' },
    { id: 'PD-N', name: 'PRODUCTION NORTHERN' },
    { id: 'PD-S', name: 'PRODUCTION SOUTHERN' },
    { id: 'SCADA', name: 'SCADA' },
    { id: 'WQ', name: 'WATER QUALITY' }
  ];

  // main operation
  mainOperationList = [
    { id: 'CUSTOMER-BILLING-SERVICES', name: 'CUSTOMER BILLING SERVICES' },
    { id: 'DISTRIBUTION', name: 'DISTRIBUTION' },
    { id: 'GENERAL-ADMIN', name: 'GENERAL ADMIN' },
    { id: 'PRODUCTION', name: 'PRODUCTION' },
    { id: 'SCADA', name: 'SCADA' },
    { id: 'WATER-QUALITY', name: 'WATER QUALITY' },
    { id: 'FLEET', name: 'FLEET' },
  ];

  // condition rating
  conditionRatingList = [
    { id: 1, name: 'Very Good' },
    { id: 2, name: 'Good' },
    { id: 3, name: 'Average' },
    { id: 4, name: 'Poor' },
    { id: 5, name: 'Replace' },
  ];

  // warranty
  warrantyList = [
    { id: 'Available', name: 'Yes' },
    { id: 'Not-Available', name: 'No' },
  ];

  // search region
  ports = [
    { id: 1, name: 'Tokai' },
    { id: 2, name: 'Vladivostok' },
    { id: 3, name: 'Navlakhi' }
  ];

  // operation list

  operationList = [
    { id: 'NRW-DISTRICT METERING ZONE', name: 'NRW-DISTRICT METERING ZONE' },
    { id: 'NRW-TRANSMISSION NETWORK', name: 'NRW-TRANSMISSION NETWORK' },
    { id: 'NRW-WATER BALANCING AREA', name: 'NRW-WATER BALANCING AREA' },
    { id: 'PUMP HOUSE', name: 'PUMP HOUSE' },
    { id: 'RESERVOIR', name: 'RESERVOIR' },
    { id: 'VALVE-DISTRIBUTION MAIN', name: 'VALVE-DISTRIBUTION MAIN' },
    { id: 'VALVE-TRUNK MAIN', name: 'VALVE-TRUNK MAIN' },
    { id: 'WATER TREATMENT PLANT', name: 'WATER TREATMENT PLANT' },
    { id: 'WQ-ONLINE ANALYZER', name: 'WQ-ONLINE ANALYZER' },
    { id: 'WQ-RIVER MONITORING STATION', name: 'WQ-RIVER MONITORING STATION' },
    { id: 'WQ-SAMPLING STATION', name: 'WQ-SAMPLING STATION' },
    { id: 'WQ-LABORATORY SERVICES', name: 'WQ-LABORATORY SERVICES' },
  ];

  // asset // component
  assetOrCompList = [
    { id: 'Asset', name: 'Asset' },
    { id: 'Component', name: 'Component' },
  ];

  //asset Or Component
  assetOrComponent = ''

  // Forms
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  warrantyFormGroup: FormGroup;
  validation_messages = [];

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public menu: MenuController,
    public assetsService: AssetsService,
    public assetGroupsService: AssetGroupsService,
    public assetTypesService: AssetTypesService,
    public authService: AuthService,
    public notificationService: NotificationsService,
    public organisationsService: OrganisationsService,
    public regionsService: RegionsService,
    private route: ActivatedRoute,
    private router: Router,
    private assetRegistrationsService: AssetRegistrationsService,
    private statesService: StatesService,
    private assetAttributeColumnService: AssetAttributeColumnService,
    private assetAttributePredefineService: AssetAttributePredefineService,
    private assetAttributeReferenceService: AssetAttributeReferenceService,
    private maintenanceManagerService: MaintenanceManagerService,
    private plannerService: PlannerService,
    private assetLocatioSyncService: AssetLocatioSyncService
  ) {
    // console.log("parentLocaDiv = ", this.parentLocaDiv)
    this.firstFormGroup = this.formBuilder.group({
      asset_primary_category: [""], // primary cat
      asset_identity: [""],
      sub_category_1: [""],
      sub_category_2: [""],
      model_number: [""],
      bo: [""]
    });
    this.secondFormGroup = this.formBuilder.group({
      asset_or_component_type: [""],
      asset_class_asset_category: [""],
      handed_over_asset_or_procured: [""],
    });
    this.thirdFormGroup = this.formBuilder.group({
      asset_owning_department: [""],
      main_operation: [""],
      region: [""],
      operation: [""],
      parent_location: [""],
      new_parent_location: [""],
    });
    this.fourthFormGroup = this.formBuilder.group({
      location_description: [""],
      building: [""],
      address_line_1: [""],
      address_line_2: [""],
      address_line_3: [""],
      city: [""],
      state: [""],
      postal_code: [""],
      country: [""],
      tag_number: [""],
      service_area: [""],
      location_main_contact: [""],
      location_asset_maintenance_manager: [""],
      maintenance_planner: [""],
      gis_esri_id: [""],
      latitude: [""],
      longitude: [""],
      asset_criticality: [""],
      cost_center: [""],
    });
    this.fifthFormGroup = this.formBuilder.group({
      size_capacity_1: [""],
      size_capacity_1_unit_measurement: [""],
      size_capacity_2: [""],
      size_capacity_2_unit_measurement: [""],
      size_capacity_3: [""],
      size_capacity_3_unit_measurement: [""],
      detailed_description: [""],
      serial_number: [""],
      asset_tag_number: [""],
      purchase_date_installed_handed_over_date: [""],
      condition_rating: [""],
      status: [""],
      maintenance_specification: [""],
      measurement_type: [""],
      warranty: [""],
      actual_warranty_period: [""],
      warranty_vendor_name: [""],
    });
    this.sixthFormGroup = this.formBuilder.group({
      bottom_water_level: [""],
      brand: [""],
      capacity_size: [""],
      closing_torque: [""],
      communication_protocol: [""],
      coverage_range: [""],
      dimention: [""],
      environmental_performance: [""],
      flow_rate: [""],
      frequency: [""],
      horse_power: [""],
      hysteresis: [""],
      infrastructure_status: [""],
      infrastructure_status_reason: [""],
      inlet_diameter: [""],
      installation: [""],
      insulation: [""],
      legal_name: [""],
      manufacturer: [""],
      manufacturer_year: [""],
      manufacture_part_number: [""],
      material_type: [""],
      model: [""],
      motor_current: [""],
      no_of_channel: [""],
      no_of_phases: [""],
      no_of_stage: [""],
      opening_torque: [""],
      outlet_diameter: [""],
      power_supply_type: [""],
      pump_head: [""],
      revolutions_per_minute: [""],
      source_from: [""],
      staging_height: [""],
      supply_location: [""],
      temperature: [""],
      top_water_level: [""],
      type: [""],
      valve_diameter: [""],
      valve_pressure_rating: [""],
      vehicle_chasis_number: [""],
      vehicle_engine_capacity: [""],
      vehicle_engine_number: [""],
      vehicle_insurance_vendor: [""],
      vehicle_model: [""],
      vehicle_insurance_auto_windscreen_insured: [""],
      vehicle_insurance_cover_note_number: [""],
      vehicle_insurance_date_period_from: [""],
      vehicle_insurance_date_period_to: [""],
      vehicle_insurance_no_claim_discount: [""],
      vehicle_insurance_policy_type: [""],
      vehicle_insurance_sum_insured: [""],
      vehicle_insurance_total_premium: [""],
      vehicle_puspakom_date_inspection: [""],
      vehicle_owner_status: [""],
      vehicle_register_date: [""],
      vehicle_roadtax_rate: [""],
      vehicle_puspakom_expired_date: [""],
      vehicle_spad_permit_date_period_to: [""],
      vehicle_roadtax_renew_date: [""],
      vehicle_roadtax_expired_date: [""],
      vehicle_spad_no_license_operator: [""],
      vehicle_spad_permit_date_period_from: [""],
      vehicle_seating_capacity: [""],
      vehicle_registration_owner: [""],
      voltage: [""],
      status: ["IC"]
    });

    /// get data form asset reg list
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = 'view';
        let assetregistration = this.router.getCurrentNavigation().extras.state
          .assetregistration;
        this.firstFormGroup.patchValue({
          ...assetregistration
        });
        this.secondFormGroup.patchValue({
          ...assetregistration
        });
        this.thirdFormGroup.patchValue({
          ...assetregistration
        });
        this.fourthFormGroup.patchValue({
          ...assetregistration
        });
        this.fifthFormGroup.patchValue({
          ...assetregistration
        });
        this.sixthFormGroup.patchValue({
          ...assetregistration
        });

      }
    });
  }

  ngOnInit() {

    this.getRegion()
    this.getState()
    this.getOrganisations()
    this.getAssetType()
    this.getAssetGroup()
    this.getAttributePredefine()
    this.getMaintenanceManager()
    this.getPlanner()
    this.getAssetLocationSync()
  }

  removeDuplicates(originalArray, prop) {
    console
    var newArray = [];
    var lookupObject = [];

    for (var i in originalArray) {

      lookupObject[originalArray[i][prop]] = originalArray[i];
      console.log(i, " qqqqq= ", originalArray[i])
    }

    for (i in lookupObject) {
      this.assetLocationData.push(lookupObject[i]);
    }
    console.log("uniqueArray is: " + this.assetLocationData);
    // return this.assetLocationData;
  }

  assetLocationData: any = []
  getAssetLocationSync() {

    console.log("iiiiiiiiii")
    this.assetLocatioSyncService.get_asset_location().subscribe(
      (res) => {
        console.log("assetLocatioSyncService = ", res)
        // let assetLocationarr = res
        // this.assetLocationData.push(res)
        this.assetLocationData = res

        // var newArray = [];
        // var lookupObject = {};

        // for (var i in assetLocationarr) {
        //   console.log("i = ", i)
        //   // lookupObject[assetLocationarr[i][prop]] = assetLocationarr[i];
        //   // if(){

        //   // }
        // }
        // this.assetLocationData = this.removeDuplicates(assetLocationarr, "node_id");
        console.log("uniqueArray is: " + this.assetLocationData);
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  plannerData = []
  getPlanner() {
    this.plannerService.get().subscribe(
      (res) => {
        // console.log("planner = ", res)
        if (res) this.plannerData = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );

  }

  maintenanceManagerData = []
  getMaintenanceManager() {
    this.maintenanceManagerService.get().subscribe(
      (res) => {
        // console.log("regions = ", res)
        if (res) this.maintenanceManagerData = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  getAttributePredefine() {
    this.assetAttributePredefineService.get().subscribe(
      (res) => {
        // console.log("assetAttPredefine = ", res)

        res.forEach(element => {
          // console.log("assetAttPredefine element = ", element)
          // console.log("assetAttPredefine attribute_field_name = ", element.attribute_field_name)

          if (element.attribute_field_name == "manufacturer") {
            this.assetAttPredefineMans.push(element); // manufacturer
            // console.log("assetAttPredefineMans = ", this.assetAttPredefineMans)
          }
          if (element.attribute_field_name == "vehicle_insurance_vendor") {
            this.assetAttPredefinePreInsVens.push(element); // vehicle_insurance_vendor
          }
          if (element.attribute_field_name == "vehicle_insurance_policy_type") {
            this.assetAttPredefineInsPols.push(element); // vehicle_insurance_policy_type
          }
          if (element.attribute_field_name == "vehicle_owner_status") {
            this.assetAttPredefineOwnStas.push(element); //vehicle_owner_status
          }
          if (element.attribute_field_name == "vehicle_registration_owner") {
            this.assetAttPredefineRegOwns.push(element); // vehicle_registration_owner
          }
        });

      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  getRegion() {
    this.regionsService.get().subscribe(
      (res) => {
        // console.log("regions = ", res)
        if (res) this.regions = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  getState() {
    this.statesService.get().subscribe(
      (res) => {
        // console.log("states = ", res)
        if (res) this.states = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  getOrganisations() {
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
  }

  getAssetType() {
    this.assetTypesService.get().subscribe(
      (res) => {
        if (res) {
          // console.log('this.primarycategories = ', res)
          this.primarycategories = res;
          // this.primarycategories = res.filter(function (data) {
          //   if (data.category.toString().toLowerCase().indexOf("at") !== -1)
          //     return true;
          //   return false;
          // });

          // console.log('this.primarycategories = ', this.primarycategories)

          this.typeassets = res
          // .filter(function (data) {
          //   if (data.category.toString().toLowerCase().indexOf("ac") !== -1)
          //     return true;
          //   return false;
          // });

          this.categories = res
          // .filter(function (data) {
          //   if (data.category.toString().toLowerCase().indexOf("ag") !== -1)
          //     return true;
          //   return false;
          // });
        }
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  getAssetGroup() {
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
  }

  register() {
    let postAssets = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      ...this.fourthFormGroup.value,
      ...this.fifthFormGroup.value,
      ...this.sixthFormGroup.value,
      // ...this.seventhFormGroup.value,
      // created_by: this.authService.userID
    };

    // console.log('postAssets = ', postAssets);
    // this.assetsService.post(postAssets).subscribe( 
    this.assetRegistrationsService.post(postAssets).subscribe(
      (res) => {
        if (res) {
          // console.log("register_res = ", res);
          this.presentAlert("Success", "Your asset successfully registered into the system.");
        } else {
          console.log('eweqqweeq');
        }
      },
      (err) => {
        console.error("register_rerr", err);
        // this.validation_messages = err.error;
        this.presentAlert("Error", "There are error occured on your form. Please check your form again.");
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            if (header == "Success") this.homePage("/technical/tabs/tab1");
          },
        },
      ],
    });

    await alert.present();
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  clickBack() {
    this.router.navigate(["/technical/asset-registration-list"]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  onChangeParent(event) {
    if (event == 0) {
      this.parentLocaDiv = 0
    } else {
      this.parentLocaDiv = 1
    }
  }

  onChangeAssLoc(event) {
    if (event == 0) {
      this.assetLocDiv = 0
    } else {
      this.assetLocDiv = 1
    }
  }

  changeSegment(segment) {
    this.segmentModal = segment;
  }

  portChange2(event) {

  }

  portChange(event: {
    // console.log(event);
    // if(value.length > 3)
    component: IonicSelectableComponent,
    value: any
    // }
  }) {
    console.log('port:', event.value);
  }

  onChangeLocAssMaiMan(event: {
    // console.log(event);
    // if(value.length > 3)
    component: IonicSelectableComponent,
    value: any
    // }
  }) {
    console.log('port:', event.value);
  }
  // onChangeLocAssMaiMan(event: {
  //   // console.log(event);
  //   // if(value.length > 3)
  //   component: IonicSelectableComponent,
  //   value: any
  //   // }
  // }) { }

  onChangeAssPrimaryCat(event: {
    // console.log(event);
    // if(value.length > 3)
    component: IonicSelectableComponent,
    value: any
    // }
  }) {
    console.log('port:', event.value.asset_type_code);
    console.log("event = ", event)
    let field = "asset_type_id=" + event.value.asset_type_description;

    this.primarycategories.forEach(element => {
      if (element.asset_type_code == event.value.asset_type_code) {
        console.log("element = ---", element);
        this.assetAttrData = element.asset_bussiness_object
        this.assetCategoryData = element.asset_category
        if (element.asset_category == 'W1-TrackedGeneralComponent' || element.asset_category == 'W1-IOSvcGeneralComponent') {
          this.assetOrComponent = 'Component'
        } else { // W1-IOSvcGeneralComponent , W1-TrackedGeneralComponent
          this.assetOrComponent = 'Asset'
        }
      }
    });
    this.assetAttributeColumnService.filter(field).subscribe(
      (res) => {
        if (res) {
          this.assetAttrColumn = res[0]
          // console.log(" this.assetAttrColumn = ", this.assetAttrColumn);
        }
      },
      () => {

      }
    )
  }

}
