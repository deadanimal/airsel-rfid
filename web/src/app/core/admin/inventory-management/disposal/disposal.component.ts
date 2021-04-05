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
import { ColumnMode } from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-disposal',
  templateUrl: './disposal.component.html',
  styleUrls: ['./disposal.component.scss']
})
export class DisposalComponent implements OnInit {

  // Setting up datatable
  ColumnMode = ColumnMode;

  // Modal
  modal:BsModalRef;
  modalConfig: {
    keyboard:true,
    class: "modal-dialog-centered modal-xl",
    ignoreBackdropClick: true,
  }

  constructor(
    public modalService: BsModalService,
  ) { }

  ngOnInit() {
  }

  openModalUpload(modalNotification: TemplateRef<any>) {
    this.modal = this.modalService.show(modalNotification, this.modalConfig);
  }

}
