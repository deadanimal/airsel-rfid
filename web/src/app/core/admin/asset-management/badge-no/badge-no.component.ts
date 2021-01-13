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
    class: "modal-dialog-centered modal-xl",
    ignoreBackdropClick: true,
  };

  // Datatable
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  rows: any = [];
  tableTemp: any = [];

  constructor(
    public formBuilder: FormBuilder,
    public assetsBadgeNoService: AssetsBadgeNoService
  ) { }

  ngOnInit() {
    this.getBadgeNoData()
  }

  getBadgeNoData() {
    let tempData = []
    this.assetsBadgeNoService.getAll().subscribe(
      (res) => {
        console.log("res all data", res);
        // console.log('tempData = ', tempData)
        this.tableTemp = res
      },
      error => {
        console.error("err", error);
      }
    )
  }

  entriesChange($event) {
    console.log($event)
    this.entries = $event.target.value;
    console.log(this.entries)
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  onKey(event, formName, row) {
    console.log('event = ', event);
    console.log('formName = ', formName);
    console.log('row = ', row['id']);
    let updateformData: any = {}
    updateformData[formName] = event

    console.log('updateformData = ', updateformData)

    // this.assetsRegistrationService.update(row['id'], updateformData).subscribe(
    //   (res) => {
    //     console.log("assetsRegistrationService = ", res);
    //   },
    //   error => {
    //     console.error("err", error);
    //   }
    // )
  }

}
