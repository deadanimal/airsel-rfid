import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import * as moment from "moment";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { AssetGroupsService } from "src/app/shared/services/asset-groups/asset-groups.service";
import { AssetTypesService } from "src/app/shared/services/asset-types/asset-types.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { AssetLocatioSyncService } from 'src/app/shared/services/asset-location-sync/asset-location-sync.service';
import { AssetAttributeService } from 'src/app/shared/services/asset-attribute/asset-attribute.service';
import { AssetAttributeReferenceService } from 'src/app/shared/services/asset-attribute-reference/asset-attribute-reference.service';
import { AssetAttributeColumnService } from 'src/app/shared/services/asset-attribute-column/asset-attribute-column.service';
import { AssetAttributePredefineService } from 'src/app/shared/services/asset-attribute-predefine/asset-attribute-prodefine.service';

@Component({
  selector: "app-asset-detail",
  templateUrl: "./asset-detail.page.html",
  styleUrls: ["./asset-detail.page.scss"],
  providers: [DatePipe],
})
export class AssetDetailPage implements OnInit {
  // Forms
  assetdetailFormGroup: FormGroup;
  operationalreadingFormGroup: FormGroup;

  asset_detail = {
    id: "",
    asset_id: "",
    badge_no: "",
    node_id: "",
    hex_code: "",
    asset_identity: "",
    parent_location: "",
    location_description: "",
    building: "",
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    tag_number: "",
    service_area: "",
    location_main_contact: "",
    location_asset_maintenance_manager: "",
    maintenance_planner: "",
    gis_esri_id: "",
    latitude: "",
    longitude: "",
    asset_critically: "",
    cost_center: "",
    asset_owning_department: "",
    main_operation: "",
    region: "",
    operation: "",
    process_function: "",
    sub_process_system: "",
    asset_or_component_type: "",
    asset_class_asset_category: "",
    handed_over_asset_or_procured: "",
    internal_asset_adentity: "",
    asset_primary_category: "",
    sub_category_1: "",
    sub_category_2: "",
    brand: "",
    model_number: "",
    size_capacity_1: "",
    size_capacity_1_unit_measurement: "",
    size_capacity_2: "",
    size_capacity_2_unit_measurement: "",
    size_capacity_3: "",
    size_capacity_3_unit_measurement: "",
    parent_asset_plate_number: "",
    asset_plate_number: "",
    detailed_description: "",
    serial_number: "",
    asset_tag_number: "",
    purchase_date_installed_handed_over_date: "",
    condition_rating: "",
    maintenance_specification: "",
    measurement_type: "",
    warranty: "",
    actual_warranty_period: "",
    warranty_vendor_name: "",
    bottom_water_level: "",
    closing_torque: "",
    dimention: "",
    frequency: "",
    infrastructure_status: "",
    installation: "",
    manufacturer: "",
    material_type: "",
    no_of_channel: "",
    opening_torque: "",
    pump_head: "",
    staging_height: "",
    top_water_level: "",
    valve_pressure_rating: "",
    vehicle_engine_number: "",
    vehicle_insurance_auto_windscreen_insured: "",
    vehicle_insurance_date_period_to: "",
    vehicle_insurance_sum_insured: "",
    vehicle_owner_status: "",
    vehicle_puspakom_expired_date: "",
    vehicle_roadtax_expired_date: "",
    vehicle_seating_capacity: "",
    communication_protocol: "",
    environmental_performance: "",
    horse_power: "",
    infrastructure_status_reason: "",
    insulation: "",
    manufacturer_year: "",
    model: "",
    no_of_phases: "",
    outlet_diameter: "",
    revolutions_per_minute: "",
    supply_location: "",
    type: "",
    vehicle_chasis_number: "",
    vehicle_insurance_vendor: "",
    vehicle_insurance_cover_note_number: "",
    vehicle_insurance_no_claim_discount: "",
    vehicle_insurance_total_premium: "",
    vehicle_register_date: "",
    vehicle_spad_permit_date_period_to: "",
    vehicle_spad_no_license_operator: "",
    vehicle_registration_owner: "",
    capacity_size: "",
    coverage_range: "",
    flow_rate: "",
    hysteresis: "",
    inlet_diameter: "",
    legal_name: "",
    manufacture_part_number: "",
    motor_current: "",
    no_of_stage: "",
    power_supply_type: "",
    source_from: "",
    temperature: "",
    valve_diameter: "",
    vehicle_engine_capacity: "",
    vehicle_model: "",
    vehicle_insurance_date_period_from: "",
    vehicle_insurance_policy_type: "",
    vehicle_puspakom_date_inspection: "",
    vehicle_roadtarate: "",
    vehicle_roadtax_renew_date: "",
    vehicle_spad_permit_date_period_from: "",
    voltage: "",
    asset_status: "",
    status: "",
    created_at: "",
    modified_at: "",
  };
  asset_type: string;
  assetLocatioSyncdata: any
  assetAttributedatas: any = []
  assetAttrData: any[]
  updateAssetData: any
  // Forms
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // thirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;
  // fifthFormGroup: FormGroup;
  // sixthFormGroup: FormGroup;
  // seventhFormGroup: FormGroup;
  // validation_messages = [];

  myDate = new Date();
  assetAttributeId = []

  constructor(
    public datePipe: DatePipe,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public menu: MenuController,
    public assetsService: AssetsService,
    public assetGroupsService: AssetGroupsService,
    public assetTypesService: AssetTypesService,
    public authService: AuthService,
    public notificationService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router, // private barcodeScanner: BarcodeScanner
    private assetLocatioSyncService: AssetLocatioSyncService,
    private assetAttributeService: AssetAttributeService,
    private assetAttributeReferenceService: AssetAttributeReferenceService,
    private assetAttributeColumnService: AssetAttributeColumnService,
    private assetAttributePredefineService: AssetAttributePredefineService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.asset_detail = this.router.getCurrentNavigation().extras.state.asset_detail;

        // console.log("this.asset_detail==>><<", this.asset_detail)

        let asset_attributes = this.asset_detail["asset_attributes"];
        // console.log('assetType = ', assetType)
        // this.getAssetAttributeData()
        this.getAssetAttributeData(asset_attributes)

        // console.log("this.asset_detail ooooo = ", this.asset_detail)
        // console.log("this.asset_detail asset_id = ", this.asset_detail.asset_type)
        let asset_type = "asset_type_code=" + this.asset_detail['asset_type']
        this.assetAttributeId = this.asset_detail['asset_attributes']
        // console.log("this.assetAttributeId----", this.assetAttributeId)
        this.assetTypesService.filter(asset_type).subscribe(
          (assTypeRes) => {
            // console.log("assTypeRes", assTypeRes)
            // console.log("assTypeRes", assTypeRes[0]['asset_type_description'])
            let asset_typedesc = "asset_type_id=" + assTypeRes[0]['asset_type_description']
            // console.log(asset_typedesc)
            this.assetAttributeColumnService.filter(asset_typedesc).subscribe(
              (assAttColRes) => {
                // console.log("assAttColRes = ", assAttColRes)
                this.getAssAttrColumnData(assAttColRes[0])
              }, (err) => {
                console.log(err)
              }
            )
          }, (err) => {
            console.log(err)
          }
        )

        // if (this.asset_detail.asset_primary_category.match(/Pump/i)) {
        //   this.asset_type = "Pump";
        // } else if (this.asset_detail.asset_primary_category.match(/Motor/i)) {
        //   this.asset_type = "Motor";
        // }

        if (this.asset_detail['attached_to_asset_id'] == '') {
          this.assetLocatioSyncService.filter("node_id=" + this.asset_detail['node_id']).subscribe(
            (res) => {
              // console.log("assetLocatioSyncServiceres", res);
              // this.assetregistrations = res;
              // this.assetLocatioSyncdata = res[0].description
              if (res.length > 0) {
                this.assetLocatioSyncdata = res[0].description
              } else {
                this.assetLocatioSyncdata = '-'
              }
              // console.log(" this.assetLocatioSyncdata = ", this.assetLocatioSyncdata)
            },
            (err) => {
              console.error("err", err);
            }
          );
        } else {

          this.assetsService.filter("asset_id=" + this.asset_detail['attached_to_asset_id']).subscribe(
            (resA) => {
              console.log("assetqqqqqqqqq=res", resA);

              this.assetLocatioSyncService.filter("node_id=" + resA[0]['node_id']).subscribe(
                (resAls) => {
                  console.log("resAls>><<>>", resAls)
                  if (resAls.length > 0) {
                    this.assetLocatioSyncdata = resAls[0].description
                  } else {
                    this.assetLocatioSyncdata = '-'
                  }
                  // console.log(" this.assetLocatioSyncdata = ", this.assetLocatioSyncdata)
                },
                (err) => {
                  console.error("err", err);
                }
              );
            }, (error) => {
              console.log(error)
            }
          )
        }
        // this.assetLocatioSyncService.filter("node_id=" + this.asset_detail.node_id).subscribe(
        //   (res) => {
        //     // console.log("assetLocatioSyncServiceres", res);
        //     // this.assetregistrations = res;
        //     if (res.length > 0) {
        //       this.assetLocatioSyncdata = res[0].description
        //     } else {
        //       this.assetLocatioSyncdata = '-'
        //     }
        //     // console.log(" this.assetLocatioSyncdata = ", this.assetLocatioSyncdata)
        //   },
        //   (err) => {
        //     console.error("err", err);
        //   }
        // );


      }
    });
  }

  ngOnInit() { }

  assetAttributeColumnFormData: any = []
  assetAttrCollumn: any = []
  arraytype = []
  getAssAttrColumnData(assAttCol) {
    // arraytype = []
    setTimeout(() => {
      // console.log("this.assetAttributedatas<>><><>", this.assetAttributedatas)

      // this.assetAttributedatas.forEach((elementqq) => {
      //   console.log("elementqq = ", elementqq)
      //   arraytype.push(elementqq.field_name)
      // })

      // for (let key in this.assetAttributedatas) {
      //   let child = this.assetAttributedatas[key];
      //   console.log("qweqweqweqqwe", this.assetAttributedatas[key])
      // }

      // for (let i = 0; i <= this.assetAttributedatas.length; i++) {
      //   console.log("this.assetAttributedatas = ", this.assetAttributedatas[i])
      //   arraytype.push(this.assetAttributedatas[i].field_name)
      // }

      // console.log("this.arraytype>>>>>>>", this.arraytype)
      if (assAttCol['bottom_water_level'] == true) {
        if (this.arraytype.indexOf('bottom_water_level') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'bottom_water_level'
          assAttColTemp['field_name'] = 'bottom_water_level'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['closing_torque'] == true) {
        if (this.arraytype.indexOf('closing_torque') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'closing_torque'
          assAttColTemp['field_name'] = 'closing_torque'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['dimention'] == true) {
        if (this.arraytype.indexOf('dimention') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'dimention'
          assAttColTemp['field_name'] = 'dimention'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['frequency'] == true) {
        if (this.arraytype.indexOf('frequency') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'frequency'
          assAttColTemp['field_name'] = 'frequency'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['infrastructure_status'] == true) {
        if (this.arraytype.indexOf('infrastructure_status') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'infrastructure_status'
          assAttColTemp['field_name'] = 'infrastructure_status'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['installation'] == true) {
        if (this.arraytype.indexOf('installation') == -1) {
          // console.log("assAttCol['installation']  = ", assAttCol['installation'])
          // console.log("this.arraytype.indexOf('installation')  = ", this.arraytype.indexOf('installation'))
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'installation'
          assAttColTemp['field_name'] = 'installation'
          assAttColTemp['field_value'] = ''
          assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['manufacturer'] == true) {

        // console.log("gggggggg")

        if (this.arraytype.indexOf('manufacturer') == -1) {
          // console.log("hhhhhhh")
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'manufacturer'
          assAttColTemp['field_name'] = 'manufacturer'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['material_type'] == true) {
        if (this.arraytype.indexOf('material_type') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'material_type'
          assAttColTemp['field_name'] = 'material_type'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['no_of_channel'] == true) {
        if (this.arraytype.indexOf('no_of_channel') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'no_of_channel'
          assAttColTemp['field_name'] = 'no_of_channel'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['opening_torque'] == true) {
        if (this.arraytype.indexOf('opening_torque') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'opening_torque'
          assAttColTemp['field_name'] = 'opening_torque'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['pump_head'] == true) {
        if (this.arraytype.indexOf('pump_head') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'pump_head'
          assAttColTemp['field_name'] = 'pump_head'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['staging_height'] == true) {
        if (this.arraytype.indexOf('staging_height') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'staging_height'
          assAttColTemp['field_name'] = 'staging_height'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['top_water_level'] == true) {
        if (this.arraytype.indexOf('top_water_level') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'top_water_level'
          assAttColTemp['field_name'] = 'top_water_level'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['valve_pressure_rating'] == true) {
        if (this.arraytype.indexOf('valve_pressure_rating') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'valve_pressure_rating'
          assAttColTemp['field_name'] = 'valve_pressure_rating'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_engine_number'] == true) {
        if (this.arraytype.indexOf('vehicle_engine_number') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_engine_number'
          assAttColTemp['field_name'] = 'vehicle_engine_number'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_insurance_auto_windscreen_insured'] == true) {
        if (this.arraytype.indexOf('vehicle_insurance_auto_windscreen_insured') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_insurance_auto_windscreen_insured'
          assAttColTemp['field_name'] = 'vehicle_insurance_auto_windscreen_insured'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_insurance_date_period_to'] == true) {
        if (this.arraytype.indexOf('vehicle_insurance_date_period_to') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_insurance_date_period_to'
          assAttColTemp['field_name'] = 'vehicle_insurance_date_period_to'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_insurance_sum_insured'] == true) {
        if (this.arraytype.indexOf('vehicle_insurance_sum_insured') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_insurance_sum_insured'
          assAttColTemp['field_name'] = 'vehicle_insurance_sum_insured'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_owner_status'] == true) {
        if (this.arraytype.indexOf('vehicle_owner_status') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_owner_status'
          assAttColTemp['field_name'] = 'vehicle_owner_status'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_puspakom_expired_date'] == true) {
        if (this.arraytype.indexOf('vehicle_puspakom_expired_date') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_puspakom_expired_date'
          assAttColTemp['field_name'] = 'vehicle_puspakom_expired_date'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_roadtax_expired_date'] == true) {
        if (this.arraytype.indexOf('vehicle_roadtax_expired_date') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_roadtax_expired_date'
          assAttColTemp['field_name'] = 'vehicle_roadtax_expired_date'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_seating_capacity'] == true) {
        if (this.arraytype.indexOf('vehicle_seating_capacity') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_seating_capacity'
          assAttColTemp['field_name'] = 'vehicle_seating_capacity'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['communication_protocol'] == true) {
        if (this.arraytype.indexOf('communication_protocol') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'communication_protocol'
          assAttColTemp['field_name'] = 'communication_protocol'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['environmental_performance'] == true) {
        if (this.arraytype.indexOf('environmental_performance') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'environmental_performance'
          assAttColTemp['field_name'] = 'environmental_performance'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['horse_power'] == true) {
        if (this.arraytype.indexOf('horse_power') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'horse_power'
          assAttColTemp['field_name'] = 'horse_power'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['infrastructure_status_reason'] == true) {
        if (this.arraytype.indexOf('infrastructure_status_reason') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'infrastructure_status_reason'
          assAttColTemp['field_name'] = 'infrastructure_status_reason'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['insulation'] == true) {
        if (this.arraytype.indexOf('insulation') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'insulation'
          assAttColTemp['field_name'] = 'insulation'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['manufacturer_year'] == true) {
        if (this.arraytype.indexOf('manufacturer_year') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'manufacturer_year'
          assAttColTemp['field_name'] = 'manufacturer_year'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['model'] == true) {
        if (this.arraytype.indexOf('model') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'model'
          assAttColTemp['field_name'] = 'model'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['no_of_phases'] == true) {
        if (this.arraytype.indexOf('no_of_phases') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'no_of_phases'
          assAttColTemp['field_name'] = 'no_of_phases'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['outlet_diameter'] == true) {
        if (this.arraytype.indexOf('outlet_diameter') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'outlet_diameter'
          assAttColTemp['field_name'] = 'outlet_diameter'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['revolutions_per_minute'] == true) {
        if (this.arraytype.indexOf('revolutions_per_minute') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'revolutions_per_minute'
          assAttColTemp['field_name'] = 'revolutions_per_minute'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['supply_location'] == true) {
        if (this.arraytype.indexOf('supply_location') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'supply_location'
          assAttColTemp['field_name'] = 'supply_location'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['type'] == true) {
        if (this.arraytype.indexOf('type') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'type'
          assAttColTemp['field_name'] = 'type'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_chasis_number'] == true) {
        if (this.arraytype.indexOf('vehicle_chasis_number') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_chasis_number'
          assAttColTemp['field_name'] = 'vehicle_chasis_number'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_insurance_vendor'] == true) {
        if (this.arraytype.indexOf('vehicle_insurance_vendor') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_insurance_vendor'
          assAttColTemp['field_name'] = 'vehicle_insurance_vendor'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_insurance_cover_note_number'] == true) {
        if (this.arraytype.indexOf('vehicle_insurance_cover_note_number') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_insurance_cover_note_number'
          assAttColTemp['field_name'] = 'vehicle_insurance_cover_note_number'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_insurance_no_claim_discount'] == true) {
        if (this.arraytype.indexOf('vehicle_insurance_no_claim_discount') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_insurance_no_claim_discount'
          assAttColTemp['field_name'] = 'vehicle_insurance_no_claim_discount'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_insurance_total_premium'] == true) {
        if (this.arraytype.indexOf('vehicle_insurance_total_premium') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_insurance_total_premium'
          assAttColTemp['field_name'] = 'vehicle_insurance_total_premium'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_register_date'] == true) {
        if (this.arraytype.indexOf('vehicle_register_date') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_register_date'
          assAttColTemp['field_name'] = 'vehicle_register_date'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_spad_permit_date_period_to'] == true) {
        if (this.arraytype.indexOf('vehicle_spad_permit_date_period_to') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_spad_permit_date_period_to'
          assAttColTemp['field_name'] = 'vehicle_spad_permit_date_period_to'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_spad_no_license_operator'] == true) {
        if (this.arraytype.indexOf('vehicle_spad_no_license_operator') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_spad_no_license_operator'
          assAttColTemp['field_name'] = 'vehicle_spad_no_license_operator'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_registration_owner'] == true) {
        if (this.arraytype.indexOf('vehicle_registration_owner') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_registration_owner'
          assAttColTemp['field_name'] = 'vehicle_registration_owner'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['capacity_size'] == true) {
        if (this.arraytype.indexOf('capacity_size') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'capacity_size'
          assAttColTemp['field_name'] = 'capacity_size'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['coverage_range'] == true) {
        if (this.arraytype.indexOf('coverage_range') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'coverage_range'
          assAttColTemp['field_name'] = 'coverage_range'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['flow_rate'] == true) {
        if (this.arraytype.indexOf('flow_rate') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'flow_rate'
          assAttColTemp['field_name'] = 'flow_rate'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['hysteresis'] == true) {
        if (this.arraytype.indexOf('hysteresis') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'hysteresis'
          assAttColTemp['field_name'] = 'hysteresis'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['inlet_diameter'] == true) {
        if (this.arraytype.indexOf('inlet_diameter') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'inlet_diameter'
          assAttColTemp['field_name'] = 'inlet_diameter'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['legal_name'] == true) {
        if (this.arraytype.indexOf('legal_name') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'legal_name'
          assAttColTemp['field_name'] = 'legal_name'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['manufacture_part_number'] == true) {
        if (this.arraytype.indexOf('manufacture_part_number') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'manufacture_part_number'
          assAttColTemp['field_name'] = 'manufacture_part_number'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['motor_current'] == true) {
        if (this.arraytype.indexOf('motor_current') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'motor_current'
          assAttColTemp['field_name'] = 'motor_current'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['no_of_stage'] == true) {
        if (this.arraytype.indexOf('no_of_stage') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'no_of_stage'
          assAttColTemp['field_name'] = 'no_of_stage'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['power_supply_type'] == true) {
        if (this.arraytype.indexOf('power_supply_type') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'power_supply_type'
          assAttColTemp['field_name'] = 'power_supply_type'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['source_from'] == true) {
        if (this.arraytype.indexOf('source_from') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'source_from'
          assAttColTemp['field_name'] = 'source_from'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['temperature'] == true) {
        if (this.arraytype.indexOf('temperature') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'temperature'
          assAttColTemp['field_name'] = 'temperature'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['valve_diameter'] == true) {
        if (this.arraytype.indexOf('valve_diameter') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'valve_diameter'
          assAttColTemp['field_name'] = 'valve_diameter'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_engine_capacity'] == true) {
        if (this.arraytype.indexOf('vehicle_engine_capacity') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_engine_capacity'
          assAttColTemp['field_name'] = 'vehicle_engine_capacity'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_model'] == true) {
        if (this.arraytype.indexOf('vehicle_model') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_model'
          assAttColTemp['field_name'] = 'vehicle_model'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_insurance_date_period_from'] == true) {
        if (this.arraytype.indexOf('vehicle_insurance_date_period_from') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_insurance_date_period_from'
          assAttColTemp['field_name'] = 'vehicle_insurance_date_period_from'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_insurance_policy_type'] == true) {
        if (this.arraytype.indexOf('vehicle_insurance_policy_type') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_insurance_policy_type'
          assAttColTemp['field_name'] = 'vehicle_insurance_policy_type'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_puspakom_date_inspection'] == true) {
        if (this.arraytype.indexOf('vehicle_puspakom_date_inspection') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_puspakom_date_inspection'
          assAttColTemp['field_name'] = 'vehicle_puspakom_date_inspection'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_roadtax_rate'] == true) {
        if (this.arraytype.indexOf('vehicle_roadtax_rate') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_roadtax_rate'
          assAttColTemp['field_name'] = 'vehicle_roadtax_rate'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_roadtax_renew_date'] == true) {
        if (this.arraytype.indexOf('vehicle_roadtax_renew_date') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_roadtax_renew_date'
          assAttColTemp['field_name'] = 'vehicle_roadtax_renew_date'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['vehicle_spad_permit_date_period_from'] == true) {
        if (this.arraytype.indexOf('vehicle_spad_permit_date_period_from') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'vehicle_spad_permit_date_period_from'
          assAttColTemp['field_name'] = 'vehicle_spad_permit_date_period_from'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['voltage'] == true) {
        if (this.arraytype.indexOf('voltage') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'voltage'
          assAttColTemp['field_name'] = 'voltage'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['asset_status'] == true) {
        if (this.arraytype.indexOf('asset_status') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'asset_status'
          assAttColTemp['field_name'] = 'asset_status'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['brand'] == true) {
        if (this.arraytype.indexOf('brand') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'brand'
          assAttColTemp['field_name'] = 'brand'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['model_number'] == true) {
        if (this.arraytype.indexOf('model_number') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'model_number'
          assAttColTemp['field_name'] = 'model_number'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['bo'] == true) {
        if (this.arraytype.indexOf('bo') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'bo'
          assAttColTemp['field_name'] = 'bo'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }
      if (assAttCol['bo_status'] == true) {
        if (this.arraytype.indexOf('bo_status') == -1) {
          let assAttColTemp = []
          assAttColTemp['id'] = ''
          assAttColTemp['action_type'] = ''
          // assAttColTemp['adhoc_value'] = null
          assAttColTemp['characteristic_type'] = ''
          assAttColTemp['characteristic_type_name'] = 'bo_status'
          assAttColTemp['field_name'] = 'bo_status'
          assAttColTemp['field_value'] = ''
          // assAttColTemp['characteristic_value'] = null
          this.assetAttributedatas.push(assAttColTemp)
        }
      }

      this.assetAttributedatas.forEach(ele => {
        console.log("eleeleeleeleele", ele)
        let filter = "attribute_field_name=" + ele.characteristic_type_name
        this.assetAttributePredefineService.filter(filter).subscribe(
          (res) => {

            if (res.length > 0) {
              ele.dropdown = 'yes'
              ele.option = res
            } else {
              ele.dropdown = 'no'
              ele.option = []
            }

          }, (err) => {

          }
        )
      });

      // setTimeout(() => {
      console.log("this.assetAttributedatas ==== ", this.assetAttributedatas)
      // }, 100);


      for (let i = 0; i < this.assetAttributedatas.length; i++) {
        // console.log("this.assetAttributedatas[1] ===== ", this.assetAttributedatas[i])

        if (this.assetAttributedatas[i].characteristic_type == '') {
          this.assetAttributeReferenceService.filter("attribute_field_name=" + this.assetAttributedatas[i].field_name).subscribe(
            (res) => {
              this.assetAttributedatas[i].characteristic_type = res[0].char_type_cd
              // this.assetAttributedatas.push(this.assetAttributedatas[i])
              // console.log("res ===== ", res)
            }, () => {

            }
          )
        }
      }
    }, 1000);

  }

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: "/technical/tabs/tab2",
      },
    };
    this.router.navigate(["/technical/qr-scanner"], navigationExtras);

    // this.barcodeScanner
    //   .scan({ prompt: "Place a QR code to scan inside the scan area" })
    //   .then((barcodeData) => {
    //     // alert("Barcode data: " + barcodeData.text);
    //     if (barcodeData.text == "MOTR-0000998") {
    //       this.zeroFormGroup.patchValue({
    //         asset_id: "615771728178A6",
    //         badge_no: barcodeData.text,
    //       });
    //     } else {
    //       this.presentAlert("Error", "Sorry, asset not found.");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //   });
  }

  async update() {
    // let postAssets = {
    //   ...this.firstFormGroup.value,
    //   ...this.secondFormGroup.value,
    //   ...this.thirdFormGroup.value,
    //   ...this.fourthFormGroup.value,
    //   ...this.fifthFormGroup.value,
    //   ...this.sixthFormGroup.value,
    //   ...this.seventhFormGroup.value,
    //   // created_by: this.authService.userID
    // };

    /*this.assetsService.post(postAssets).subscribe(
      (res) => {
        if (res) {
          console.log("res", res);
          this.presentAlert(
            "Success",
            "Your asset successfully registered into the system."
          );
        }
      },
      (err) => {
        console.error("err", err);
        // this.validation_messages = err.error;
        this.presentAlert(
          "Error",
          "There are error occured on your form. Please check your form again."
        );
      },
      () => {
        console.log("Http request completed");
      }
    );*/

    const alert = await this.alertController.create({
      header: "Asset Detail",
      message:
        "Your asset detail have successfully updated into the system. Thank you.",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.homePage("/technical/tabs/tab1");
          },
        },
      ],
    });

    await alert.present();
  }

  cancel() {
    this.router.navigate(["/technical/tabs/tab1"]);
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
    this.router.navigate(["/technical/tabs/tab2"]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  field_value = ''

  getAssetAttributeData(asset_attr) {

    this.assetAttributedatas = []

    // console.log('adsadaad');
    asset_attr.forEach(element => {
      this.field_value = null
      this.assetAttributeService.getOne(element).subscribe(
        (aasRes) => {
          // console.log('assetAttributeService>>=// ', aasRes)
          // this.assetAttributedatas.push(aasRes)
          // console.log("assetAttributedatas = ", this.assetAttributedatas)
          let assct = aasRes.characteristic_type
          // console.log('aasRes.characteristic_type = ', assct)
          // this.getsadaasasd(assct)

          let characteristic_type_list = ["CM-MFG", "CM-WASTC", "CM-VRTVD", "CM-VOWNS", "CM-VROWN", "CM-VINPT"]

          // console.log("this.assetAttributedatas[0].characteristic_type", aasRes.characteristic_type)
          if (characteristic_type_list.indexOf(aasRes.characteristic_type) !== -1) {
            // console.log(' already exists!')
            this.field_value = aasRes.characteristic_value
            aasRes['field_value'] = this.field_value
          } else {
            this.field_value = aasRes.adhoc_value
            aasRes['field_value'] = this.field_value
            // console.log('not exist')
          }
          // if (aasRes.characteristic_value != null) {
          //   this.field_value = aasRes.characteristic_value
          //   aasRes['field_value'] = this.field_value
          // } else {
          //   this.field_value = aasRes.adhoc_value
          //   aasRes['field_value'] = this.field_value
          // }
          this.assetAttributeReferenceService.filter("char_type_cd=" + assct).subscribe(
            // this.assetAttributeReferenceService.filter("char_type_cd=" + assct).subscribe(
            (aarsRes) => {

              aasRes['field_name'] = aarsRes[0].attribute_field_name
              this.arraytype.push(aarsRes[0].attribute_field_name)
              // console.log('aarsRes qwe = ', aasRes)

              this.assetAttributedatas.push(aasRes)

            },
            (aarsErr) => {
              console.error("err", aarsErr);
            }
          );

        },
        (aasErr) => {
          console.error("err", aasErr);
        }
      );
    });
    // this.getsadaasasd(this.assetAttributedatas)
    // this.assetAttributeService.filter("characteristic_type=" + this.asset_detail.node_id).subscribe(

  }


  onKeyAssDesc(value, row) {
    // console.log(value)
    this.asset_detail['description'] = value
    // console.log(this.asset_detail)
    // this.updateAssetData['characteristic_value'] = value
  }

  // onKey(value, row) {
  //   console.log("row === ", row)
  //   console.log("value === ", value)
  //   this.assetAttributedatas.forEach(element => {
  //     if (element.field_name == row.field_name) {

  //       let characteristic_type_list = ["CM-MFG", "CM-WASTC", "CM-VRTVD", "CM-VOWNS", "CM-VROWN", "CM-VINPT"]

  //       if (characteristic_type_list.indexOf(row.characteristic_type) !== -1) {
  //         element.characteristic_value = value;
  //       } else {
  //         element.adhoc_value = value;
  //       }
  //       element.action_type = 'update';
  //       console.log("foreach = ", element);
  //     }
  //   });
  //   console.log(this.assetAttributedatas)

  // }

  onKey(value, row) {

    console.log("row === ", row)
    console.log("value === ", value)

    this.assetAttributedatas.forEach(element => {

      // check in the form data 
      if (element.field_name == row.field_name) {

        let characteristic_type_list = ["CM-MFG", "CM-WASTC", "CM-VRTVD", "CM-VOWNS", "CM-VROWN", "CM-VINPT"]

        let updateformData: any = {}
        // console.log(characteristic_type_list.indexOf(row.characteristic_type))
        if (characteristic_type_list.indexOf(row.characteristic_type) !== -1) {
          // console.log("ssss")
          element.characteristic_value = value;
          updateformData['characteristic_value'] = value
        } else {
          // console.log("ddddd")
          element.adhoc_value = value;
          updateformData['adhoc_value'] = value
        }

        // updateformData['action_type'] = 'update'
        updateformData['characteristic_type'] = element.characteristic_type
        updateformData['characteristic_type_name'] = element.field_name

        // console.log("updateformData = ", updateformData);
        // console.log("element = ", element)

        if (element.id == '') {
          element.action_type = 'ADD';
          updateformData['action_type'] = 'ADD'
          // console.log('not exist cok')
          this.assetAttributeService.post(updateformData).subscribe(
            (resAAS) => {
              let atID: any = []
              // this.assetAttributedatas.push(res)
              // this.assetAttributeId.forEach(ele => {
              //   atID.push(ele)
              // });
              // console.log("resAAS = ", resAAS)
              // this.assetAttributeId.push(resAAS.id)
              element.id = resAAS.id;
              // console.log("assetAttributeId = ", this.assetAttributeId)

            },
            (err) => {
              console.error("err", err);
            }
          );
        } else {
          element.action_type = 'UPDATE';
          updateformData['action_type'] = 'UPDATE'
          // console.log('exist cok')
          this.assetAttributeService.update(element.id, updateformData).subscribe(
            (res) => {
              // console.log(res)
              // this.assetAttributedatas.push(res)
              // console.log("resAAS = ", res)
              // this.assetAttributeId.push(res.id)
              // element.id = res.id;
              // let obj = {
              //   submitted_datetime: this.getCurrentDateTime(),
              // }
              // this.assetsService.update(this.asset_detail['id'], obj).subscribe(
              //   (resp) => {
              //     console.log('berjaya cok', resp)
              //   }, (error) => {
              //     console.log('tidak berjaya cok', error)
              //   }
              // )
            },
            (err) => {
              console.error("err", err);
            }
          );

        }
      }
    });

    setTimeout(() => {
      console.log("this.assetAttributedatas", this.assetAttributedatas)
    }, 1000);

  }

  updateDetails() {

    // });
    // setTimeout(() => {
    // console.log("assetAttributedatas --==][ ", this.assetAttributedatas)
    let assetAttrIdExist = []
    this.assetAttributedatas.forEach(element => {

      // console.log("element --- ", element.id)
      if (element.id != '') {
        // console.log('masuk')
        assetAttrIdExist.push(element.id)
      }
    })
    // console.log("assetAttrIdExist---", assetAttrIdExist)

    let selectedDate = new Date(this.asset_detail["effective_datetime"]);
    let obj = {
      asset_attributes: assetAttrIdExist,
      description: this.asset_detail["description"],
      effective_datetime: selectedDate,
      submitted_datetime: new Date //moment(this.getCurrentDateTime()).toDate() // moment.utc(this.getCurrentDateTime()).toDate()
    }

    console.log("this.asset_detail[effective_datetime]", this.asset_detail["effective_datetime"])

    // let roo = this.asset_detail["effective_datetime"].setHours(this.asset_detail["effective_datetime"].getHours() - 2);
    // console.log("datetime", roo)
    console.log("obj = ", obj)
    console.log(" this.selectedDate", selectedDate)
    console.log("this.getCurrentDateTime()", this.getCurrentDateTime())

    var twoHoursBefore = new Date();
    twoHoursBefore.setHours(twoHoursBefore.getHours() - 2);

    // if (this.assetAttributedatas.length == assetAttrIdExist.length) {

    this.assetsService.update(this.asset_detail['id'], obj).subscribe(
      (resp) => {
        console.log('berjaya cok', resp)
      }, (error) => {
        // console.log('tidak berjaya cok', error)
      }, () => {
        this.update()
      }
    )

    // } else {
    //   this.warningAlert('Warning', 'Please fill in all question.')
    // }
  }

  async warningAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['ok'],
    });

    await alert.present();
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

}
