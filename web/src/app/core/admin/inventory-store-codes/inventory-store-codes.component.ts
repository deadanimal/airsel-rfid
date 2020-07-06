import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from 'sweetalert2';

import { StoreCodeData } from '../../../../assets/mock/inventory';

@Component({
  selector: 'app-inventory-store-codes',
  templateUrl: './inventory-store-codes.component.html',
  styleUrls: ['./inventory-store-codes.component.scss']
})
export class InventoryStoreCodesComponent implements OnInit {

  // Data
  storeCodes
  focusSearch
  
  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-md"
  }
  
  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.storeCodes = StoreCodeData
  }

  openModal(modalInventory: TemplateRef<any>) {
    this.modal = this.modalService.show(modalInventory, this.modalConfig)
  }

  closeModal() {
    this.modal.hide()
  }

  save() {
    this.modal.hide()
  }

  delete() {
    swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this action',
      type: 'warning',
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      confirmButtonClass: 'btn btn-warning btn-sm',
      cancelButtonText: 'Cancel',
      cancelButtonClass: 'btn btn-secondary btn-sm'
    }).then((result) => {
      if (result.value) {
        swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted',
          type: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Ok',
          confirmButtonClass: 'btn btn-success btn-sm'
        })
      }
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
