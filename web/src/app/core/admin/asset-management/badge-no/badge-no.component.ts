import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";

import { system } from '@amcharts/amcharts4/core';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { AssetsBadgeNoService } from 'src/app/shared/services/assets-badge-no/assets-badge-no.service';
import { AssetTypesService } from 'src/app/shared/services/asset-types/asset-types.service';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}
@Component({
  selector: 'app-badge-no',
  templateUrl: './badge-no.component.html',
  styleUrls: ['./badge-no.component.scss']
})
export class BadgeNoComponent implements OnInit {

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    // ignoreBackdropClick: true,
  };

  // Datatable
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  rows: any = [];
  tableTemp: any = [];
  assetTypeList: any = [];
  assTypeList: any
  assetTypeForm: FormGroup;
  assetTypeFormDesc: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public assetsBadgeNoService: AssetsBadgeNoService,
    public modalService: BsModalService,
    public assetTypesService: AssetTypesService
  ) { }

  ngOnInit() {
    this.getBadgeNoData()
    this.getAssetTypeData()

    this.assetTypeForm = this.formBuilder.group({
      asset_primary_category: ["", Validators.required],
      short: ["", Validators.required],
      description: ["", Validators.required],
      status: ["IC", Validators.required],
      latest_no: ["", Validators.required]
    })
    this.assetTypeFormDesc = this.formBuilder.group({
      asset_primary_category: ["", Validators.required],
      short: ["", Validators.required],
      description: ["", Validators.required],
      status: ["IC", Validators.required],
      latest_no: ["", Validators.required]
    })
  }

  getBadgeNoData() {
    let tempData = []
    this.assetsBadgeNoService.getAll().subscribe(
      (res) => {
        // console.log("getBadgeNoData = ", res);
        // console.log('tempData = ', tempData)
        this.tableTemp = res
      },
      error => {
        console.error("err", error);
      }
    )
  }

  getAssetTypeData() {
    let tempData = []
    this.assetTypesService.get().subscribe(
      (res) => {
        // console.log("assetTypesService = ", res);
        // console.log('tempData = ', tempData)
        this.assetTypeList = res
        console.log("nasty", res);
      },
      error => {
        console.error("err", error);
      }
    )
  }

  openModal(modalNotification: TemplateRef<any>) {
    this.getAssetTypeData()
    // console.log("openModal");
    this.modal = this.modalService.show(modalNotification, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.getBadgeNoData()
  }

  entriesChange($event) {
    // console.log($event)
    this.entries = $event.target.value;
    // console.log(this.entries)
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  submitAssetType() {
    console.log('assetTypeForm = ', this.assetTypeForm.value)

    let createAssetTypeData: any = {}
    createAssetTypeData['name'] = this.assetTypeForm.value.asset_primary_category

    this.assetsBadgeNoService.create(this.assetTypeForm.value).subscribe(
      (res) => {
        console.log("yeaaayyy = ", res);
        this.saveAssetType(createAssetTypeData)
        this.successAlert()
      },
      error => {
        console.error("err", error);
      }
    )
  }

  saveAssetType(createAssetTypeData) {
    this.assetTypesService.post(createAssetTypeData).subscribe(
      (res) => {
        console.log('res = ', res)
      },
      (err) => {
        console.log('err = ', (err))
      }
    )
  }

  submitAssetTypeDesc() {
    console.log('assetTypeForm = ', this.assetTypeFormDesc.value)

    this.assetsBadgeNoService.create(this.assetTypeFormDesc.value).subscribe(
      (res) => {
        console.log("yeaaayyy = ", res);
        this.successAlert()
      },
      error => {
        console.error("err", error);
      }
    )
  }

  onKey(event, formName, row) {
    // console.log('event = ', event);
    // console.log('formName = ', formName);
    // console.log('row = ', row);
    let field = "asset_primary_category=" + row.asset_primary_category
    let noTotal = 0
    let noActive = 0
    let noInactive = 0

    this.assetsBadgeNoService.filter(field).subscribe(
      (res) => {
        // console.log("assTypeListjhjhj = ", res);
        this.assTypeList = res
        console.log("asset types", res);
        noTotal = res.length
        // console.log('assTypeList = ', this.assTypeList)
        if (noTotal > 1) {
          this.assTypeList.forEach(element => {
            if (event == "AC") {
              if (element.id != row.id) {
                // console.log('--- iiifff ---', element.id, "==", row.id)
                this.addOnKeyData('IC', element.id)
              } else {
                // console.log('--- elseee ---', element.id, "==", row.id)
                this.addOnKeyData('AC', element.id)
              }
            } else {
              noActive++
            }
          });
        } else {
          if (event == 'IC') {
            this.errorAlert()
          } else {
            this.addOnKeyData(event, row)
          }
        }
        // console.log('dadadasdasda')
        this.getBadgeNoData()
      },
      error => {
        console.error("err", error);
      }
    )
    // console.log('huhuhuhhu')

  }

  addOnKeyData(event, row) {
    // console.log('noTotal = ', noTotal, '-', noInactive, '-', noActive)
    // console.log('row[id] = ', row)

    let updateformData: any = {}
    updateformData['status'] = ''
    updateformData['status'] = event

    // console.log('updateformData = ', updateformData)

    this.assetsBadgeNoService.update(row, updateformData).subscribe(
      (res) => {
        // this.getBadgeNoData()
        // console.log("assetsBadgeNoService = ", res);
      },
      (err) => {
        console.error("err", (err));
      }
    )

  }

  successAlert() {
    swal.fire({
      title: "Success",
      text: "Your data successfully inserted into the system",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    }).then((result) => {
      this.closeModal()
    });
  }

  errorAlert() {
    swal.fire({
      title: "Warning",
      text: "Cannot Update Data",
      type: "warning",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-warning",
    }).then((result) => {
      // this.closeModal()
    });
  }

}
