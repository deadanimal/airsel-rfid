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

import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { AssetGroupsService } from "src/app/shared/services/asset-groups/asset-groups.service";
import { AssetTypesService } from "src/app/shared/services/asset-types/asset-types.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";
import { RegionsService } from "src/app/shared/services/regions/regions.service";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";

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
  modalViewAssetConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    ignoreBackdropClick: true,
  };

  focusSearch;

  regions = [];
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

  // Datatable
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [];
  SelectionType = SelectionType;

  // Forms
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
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
    public toastr: NotifyService
  ) {
    this.getAssets();

    this.firstFormGroup = this.formBuilder.group({
      id: ["", Validators.required],
      owning_department: ["", Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      level_1: ["", Validators.required],
      level_2: ["", Validators.required],
      level_3: ["", Validators.required],
      level_4: ["", Validators.required],
      level_5: ["", Validators.required],
      level_6: ["", Validators.required],
    });
    this.thirdFormGroup = this.formBuilder.group({
      identity: ["", Validators.required],
      primary_category: ["", Validators.required],
      sub_category_1: ["", Validators.required],
      sub_category_2: ["", Validators.required],
    });
    this.fourthFormGroup = this.formBuilder.group({
      type_asset: ["", Validators.required],
      category: ["", Validators.required],
      // category_extra: [""], // required IF category is 'OT'
      acquired_by: [""],
    });
    this.fifthFormGroup = this.formBuilder.group({
      brand: ["", Validators.required],
      model_no: ["", Validators.required],
      size_capacity_1: ["", Validators.required],
      size_capacity_1_measurement: ["", Validators.required],
      size_capacity_2: ["", Validators.required],
      size_capacity_2_measurement: ["", Validators.required],
      size_capacity_3: ["", Validators.required],
      size_capacity_3_measurement: ["", Validators.required],
      parent_plate_number: ["", Validators.required],
      plate_number: ["", Validators.required],
      serial_number: ["", Validators.required],
      vendor_part_no: ["", Validators.required],
      scada_id: ["", Validators.required],
      external_id: ["", Validators.required],
      tag_number: ["", Validators.required],
      pallet_number: ["", Validators.required],
      installed_at: ["", Validators.required],
      rating: ["", Validators.required],
      status: ["", Validators.required],
      maintenance_specification: ["", Validators.required],
      bill_of_material: ["", Validators.required],
      measuring_type: ["", Validators.required],
    });
    this.sixthFormGroup = this.formBuilder.group({
      is_warranty: ["", Validators.required],
      warranty_period_actual: ["", Validators.required],
      warranty_vendor: ["", Validators.required],
    });
    this.seventhFormGroup = this.formBuilder.group({
      po_vendor: ["", Validators.required],
      po_cost: ["", Validators.required],
    });
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
    this.thirdFormGroup.patchValue({
      ...row,
    });
    this.fourthFormGroup.patchValue({
      ...row,
    });
    this.fifthFormGroup.patchValue({
      ...row,
    });
    this.sixthFormGroup.patchValue({
      ...row,
    });
    this.seventhFormGroup.patchValue({
      ...row,
    });

    this.modalEditAsset = this.modalService.show(
      modalNotification,
      this.modalConfig
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
      ...this.seventhFormGroup.value,
      // created_by: this.authService.userID
    };

    this.assetsService.post(postAssets).subscribe(
      (res) => {
        if (res) {
          console.log("res", res);
          this.toastr.openToastr(
            "Your asset have successfully registered.",
            "Register Asset"
          );
          this.modalRegisterAsset.hide();
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

  update() {
    let editAssets = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      ...this.fourthFormGroup.value,
      ...this.fifthFormGroup.value,
      ...this.sixthFormGroup.value,
      ...this.seventhFormGroup.value,
      // created_by: this.authService.userID
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
}
