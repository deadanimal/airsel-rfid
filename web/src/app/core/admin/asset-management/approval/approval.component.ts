import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Select2Data } from 'ng-select2-component';
import Dropzone from "dropzone";
Dropzone.autoDiscover = false;

import swal from "sweetalert2";

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {
  // Stepper
  isLinear = false
  isDisableRipple = true

  // Modal
  modal: BsModalRef;
  modalViewAsset: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-xl",
    ignoreBackdropClick: true
  }
  modalViewAssetConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    ignoreBackdropClick: true
  }

  // Data
  focusSearch

  value: string = "";
  data: Select2Data = [
    { value: "", label: "Please select" },
    { value: "Sepang", label: "Sepang" },
    { value: "Kuala Lumpur", label: "Kuala Lumpur" },
    { value: "Hulu Langat", label: "Hulu Langat" },
    { value: "Petaling", label: "Petaling" },
    { value: "Gombak", label: "Gombak" },
  ];
  selectedTypes: string;
  selectedRegions: string;
  regions: string[] = [
    'Sepang',
    'Kuala Lumpur',
    'Hulu Langat',
    'Petaling',
    'Gombak'
  ];
  types: string[] = [
    'Distribution',
    'Installation',
    'Maintenance',
    'Replacement'
  ];
  assets = [
    { name: "PUMP-01", error: true },
    { name: "PUMP-02", error: true },
    { name: "MOTOR-01", error: false },
    { name: "MOTOR-02", error: false },
    { name: "Butterfly Valve-01", error: false },
  ];

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(modalNotification: TemplateRef<any>) {
    this.modal = this.modalService.show(
      modalNotification,
      this.modalConfig
    )
  }

  openModalViewAsset(modalNotification: TemplateRef<any>) {
    this.modalViewAsset = this.modalService.show(
      modalNotification,
      this.modalViewAssetConfig
    )
  }

  approve() {
    swal.fire({
      title: 'Approved!',
      text: 'Asset registration has been approved',
      type: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Ok',
      confirmButtonClass: 'btn btn-success btn-sm'
    })
  }

  reject() {
    swal.fire({
      title: 'Deleted!',
      text: 'Asset registration has been rejected',
      type: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Ok',
      confirmButtonClass: 'btn btn-success btn-sm'
    })
  }

  register() {
    this.modal.hide()
    this.modalViewAsset.hide()
    swal.fire({
      title: 'Registered!',
      text: 'New asset has been registered',
      type: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Ok',
      confirmButtonClass: 'btn btn-success btn-sm'
    })
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function() {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }
  
  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  }

}
