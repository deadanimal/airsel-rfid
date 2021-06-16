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
import { AssetsLocationService } from 'src/app/shared/services/assets-location/assets-location.service';
import { AssetsAttributeService } from 'src/app/shared/services/assets-attribute/assets-attribute.service';

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

  // escell data
  dataFromExcelFile = [];
  // worksheet: any;
  // fileUploaded: File;
  // jsonData: any;
  data: [][]

  // Modal
  modal: BsModalRef;
  // modalViewAsset: BsModalRef;
  // modalRegisterAsset: BsModalRef;
  // modalEditAsset: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-xl",
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

  // filterTable($event) {
  //   let val = $event.target.value;
  //   this.temp = this.rows.filter(function (d) {
  //     for (var key in d) {
  //       if (d[key].toString().toLowerCase().indexOf(val.toString().toLowerCase()) !== -1) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   });
  // }

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

  // onFileChange(event: any) {
  //   const target: DataTransfer = <DataTransfer>(event.target);
  //   if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  //     // console.log('wb = ', wb);
  //     const wsname: string = wb.SheetNames[1];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  //     // console.log('ws = ', ws);
  //     this.dataFromExcelFile = (XLSX.utils.sheet_to_json(ws, { raw: false }));
  //     // console.log('this.data = ', this.dataFromExcelFile);
  //     // let x = this.data.slice(1);
  //     // console.log('x = ', x);
  //   };
  //   reader.readAsBinaryString(target.files[0]);
  // }

  closeModal() {
    this.modal.hide();
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
        // console.log('tempData = ', tempData)
        this.tableTemp1 = tempData
      },
      error => {
        console.error("err", error);
      }
    )
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
      window.location.reload();
    })
    // }
  }
}
