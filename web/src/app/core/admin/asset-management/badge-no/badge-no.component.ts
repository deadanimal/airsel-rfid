import { Component, OnInit, TemplateRef } from "@angular/core"; import { Validators,
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
  currentRow: any;
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  rows: any = [];
  tableTemp: any = [];
  tableRows: any = [];

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
      short: ["",
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]),
      ],

      description: ["", Validators.required],
      status: ["IC", Validators.required],
      latest_no: ["", Validators.required],
      skipped_no: [""]

    })
    this.assetTypeFormDesc = this.formBuilder.group({
      asset_primary_category: ["", Validators.required],
      short: ["", Validators.required],
      description: ["", Validators.required],
      status: ["IC", Validators.required],
      latest_no: ["", Validators.required],
      skipped_no: [""]
    })
  }

  getBadgeNoData() {
    let tempData = []
    this.assetsBadgeNoService.getAll().subscribe(
      (res) => {
        // console.log("getBadgeNoData = ", res);
        // console.log('tempData = ', tempData)
        this.tableRows = res;
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            // id: key,
          };
        });

      },
      error => {
        console.error("err", error);
      }
    )
  }
  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key]) {
          if (d[key].toString().toLowerCase().indexOf(val) !== -1) {
            return true;
          }
        }
      }
      return false;
    });
  }


  getAssetTypeData() {
    let tempData = []
    this.assetTypesService.get().subscribe(
      (res) => {
        // console.log("assetTypesService = ", res);
        // console.log('tempData = ', tempData)
        this.assetTypeList = res
        console.log("SS", res);
      },
      error => {
        console.error("err", error);
      }
    )
  }

  openModal(modalNotification: TemplateRef<any>) {
    this.assetTypeForm.reset();
    this.assetTypeFormDesc.reset();
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
    // TO DO - parse comma delimited string into array 
    let skipped_no = this.assetTypeForm.value.skipped_no
    var formatted_skipped_no;

    console.log("SKI", skipped_no);
    if (skipped_no == null) {
      formatted_skipped_no = [0];
    } else {
      try {
        formatted_skipped_no = skipped_no.split(',');
      } catch {
        formatted_skipped_no = [0];
      }
    }

    // TO DO - patchValue skipped no with formatted_skipped_no
    this.assetTypeForm.patchValue({
      "skipped_no": formatted_skipped_no,
      "short": this.assetTypeForm.value.short.toUpperCase()
    });
    

    let createAssetTypeData: any = {}
    createAssetTypeData['asset_type_code'] = this.assetTypeForm.value.asset_primary_category;
    createAssetTypeData['asset_type_description'] = this.assetTypeForm.value.asset_primary_category;
    createAssetTypeData['status'] = "ACTIVE";
    createAssetTypeData['assessment_class'] = this.assetTypeForm.value.asset_primary_category;
    createAssetTypeData['profile_failure'] = this.assetTypeForm.value.asset_primary_category;

    this.assetsBadgeNoService.create(this.assetTypeForm.value).subscribe(
      (res) => {
        this.successAlert()
      },
      error => {
        console.error("err", error);
        this.errorAlertDuplicate();

      },
      () => {
        this.saveAssetType(createAssetTypeData)

      }
    )
  }

  saveAssetType(createAssetTypeData) {
    this.assetTypesService.post(createAssetTypeData).subscribe(
      (res) => {
        console.log('res target = ', res)
      },
      (err) => {
        console.log('err = ', (err))
      }
    )
  }

  submitAssetTypeDesc() {
    // TO DO - parse comma delimited string into array 
    let skipped_no = this.assetTypeFormDesc.value.skipped_no
    let formatted_skipped_no = skipped_no.split(',');

    // TO DO - patchValue skipped no with formatted_skipped_no
    this.assetTypeFormDesc.patchValue({
      "skipped_no": formatted_skipped_no
    });

    this.assetsBadgeNoService.create(this.assetTypeFormDesc.value).subscribe(
      (res) => {
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

  errorAlertDuplicate() {
    swal.fire({
      title: "Warning",
      text: "Format with this short name already exist.",
      type: "warning",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-warning",
    }).then((result) => {
      // this.closeModal()
    });
  }


  editFormat(row, modalNotification: TemplateRef<any>) {
    this.modal = this.modalService.show(modalNotification, this.modalConfig);
    this.currentRow = row;

    //  asset_primary_category: ["", Validators.required],
    //  short: ["", Validators.required],
    //  description: ["", Validators.required],
    //  status: ["IC", Validators.required],
    //  latest_no: ["", Validators.required],
    //  skipped_no: ["", Validators.required]



    //patchValue
    this.assetTypeFormDesc.patchValue({

      "asset_primary_category": row.asset_primary_category,
      "short": row.short,
      "description": row.description,
      "status": row.status,
      "latest_no": row.latest_no,
      "skipped_no": row.skipped_no,
    })

  }


  submitAssetTypeDescUpdate() {

    let skipped_no = this.assetTypeFormDesc.value.skipped_no

    if (typeof(skipped_no) == "string") {
      let formatted_skipped_no = skipped_no.split(',');

      this.assetTypeFormDesc.patchValue({
        "skipped_no": formatted_skipped_no
      });

    }

    this.assetsBadgeNoService.update(this.currentRow.id, this.assetTypeFormDesc.value).subscribe(
      (res) => {
        this.successAlert()
      },
      error => {
        console.error("err", error);
      }
    )

  
  }

}
