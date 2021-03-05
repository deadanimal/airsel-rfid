import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
// import swal from 'sweetalert2';

import { InboundData } from '../../../../assets/mock/inventory';

@Component({
  selector: 'app-inventory-inbound',
  templateUrl: './inventory-inbound.component.html',
  styleUrls: ['./inventory-inbound.component.scss']
})
export class InventoryInboundComponent implements OnInit {

  // Data
  inbounds
  focusSearch

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-md"
  }

  rating: number = 4;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.inbounds = InboundData
  }

  openModal(modalInventory: TemplateRef<any>) {
    this.modal = this.modalService.show(modalInventory, this.modalConfig)
  }

  closeModal() {
    this.modal.hide()
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
