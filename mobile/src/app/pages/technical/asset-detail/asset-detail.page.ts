import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
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
    private assetAttributeReferenceService: AssetAttributeReferenceService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.asset_detail = this.router.getCurrentNavigation().extras.state.asset_detail;

        console.log("this.asset_detail ooooo = ", this.asset_detail)
        // console.log("this.asset_detail asset_id = ", this.asset_detail.asset_type)

        // if (this.asset_detail.asset_primary_category.match(/Pump/i)) {
        //   this.asset_type = "Pump";
        // } else if (this.asset_detail.asset_primary_category.match(/Motor/i)) {
        //   this.asset_type = "Motor";
        // }
        let asset_attributes = this.asset_detail["asset_attributes"];
        // console.log('assetType = ', assetType)
        // this.getAssetAttributeData()
        this.getAssetAttributeData(asset_attributes)
        this.assetLocatioSyncService.filter("node_id=" + this.asset_detail.node_id).subscribe(
          (res) => {
            // console.log("res", res);
            // this.assetregistrations = res;
            this.assetLocatioSyncdata = res[0].description
            // console.log(" this.assetLocatioSyncdata = ", this.assetLocatioSyncdata)
          },
          (err) => {
            console.error("err", err);
          }
        );


      }
    });
    // this.firstFormGroup = this.formBuilder.group({
    //   information: ["", Validators.required],
    //   asset_type: ["", Validators.required],
    //   detail_description: ["", Validators.required],
    //   status: ["", Validators.required],
    // });
    // this.secondFormGroup = this.formBuilder.group({
    //   badge_number: ["", Validators.required],
    //   serial_number: ["", Validators.required],
    // });
    // this.thirdFormGroup = this.formBuilder.group({
    //   location: ["", Validators.required],
    // });
    // this.fourthFormGroup = this.formBuilder.group({
    //   condition_rating: ["", Validators.required],
    //   confidence_rating: ["", Validators.required],
    // });
    // this.fifthFormGroup = this.formBuilder.group({
    //   owning_organization: ["", Validators.required],
    // });
    // this.sixthFormGroup = this.formBuilder.group({
    //   something: ["", Validators.required],
    // });
    // this.seventhFormGroup = this.formBuilder.group({
    //   warranty_term: ["", Validators.required],
    // });
  }

  ngOnInit() { }

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
      buttons: ["OK"],
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

  getAssetAttributeData(asset_attr) {

    // console.log('adsadaad');
    asset_attr.forEach(element => {

      this.assetAttributeService.getOne(element).subscribe(
        (aasRes) => {
          // console.log('assetAttributeService = ', aasRes)
          // this.assetAttributedatas.push(aasRes)
          // console.log("assetAttributedatas = ", this.assetAttributedatas)
          let assct = aasRes.characteristic_type
          // console.log('aasRes.characteristic_type = ', assct)
          // this.getsadaasasd(assct)
          this.assetAttributeReferenceService.filter("char_type_cd=" + assct).subscribe(
            // this.assetAttributeReferenceService.filter("char_type_cd=" + assct).subscribe(
            (aarsRes) => {
              // console.log('aarsRes qwe = ', aarsRes)
              aasRes['field_name'] = aarsRes[0].attribute_field_name
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

  getsadaasasd(attrData) {
    console.log('attrData --------- = ', attrData);
    // attrData.forEach(element => {
    //   console.log('element = ', element)
    //   this.assetAttributeReferenceService.filter("char_type_cd=" + element.characteristic_type).subscribe(
    //     (aarsRes) => {
    //       console.log('aarsRes = ', aarsRes)
    //     },
    //     (aarsErr) => {
    //       console.error("err", aarsErr);
    //     }
    //   );
    // });

  }

  onKeyAssDesc(value, row) {
    // console.log(value)
    this.asset_detail['description'] = value
    // console.log(this.asset_detail)
    // this.updateAssetData['characteristic_value'] = value
  }

  onKey(value, row) {

    this.assetAttributedatas.forEach(element => {
      if (element.id == row.id) {
        element.characteristic_value = value;
        element.action_type = 'update';
        // console.log("foreach = ", element);
      }
    });

  }

  updateDetails() {

    let updateAssAttrformData: any = {}
    updateAssAttrformData['description'] = this.asset_detail["description"]
    // update asset data
    this.assetsService.update(this.asset_detail.id, updateAssAttrformData).subscribe(
      (res) => {
        // console.log("updateAssAttrformData = ", res)
      },
      (err) => {
        console.error("err", err);
      }
    );

    // update asset attribute data
    this.assetAttributedatas.forEach(element => {

      if (element.action_type == 'update') {
        let updateformData: any = {}
        updateformData['characteristic_value'] = ''
        updateformData['action_type'] = ''
        updateformData['characteristic_value'] = element.characteristic_value
        updateformData['action_type'] = element.action_type
        // let editAssetsAttr = {
        //   characteristic_value: this.authService.userID
        // }
        this.assetAttributeService.update(element.id, updateformData).subscribe(
          (res) => {
            // console.log(res[0])
            this.assetAttributedatas.push(res)
          },
          (err) => {
            console.error("err", err);
          }
        );
      }

    });
    this.update()
  }

}
