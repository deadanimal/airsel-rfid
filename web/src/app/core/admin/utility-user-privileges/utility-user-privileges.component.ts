import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from 'sweetalert2';

import { UserPrivilegeData } from '../../../../assets/mock/utility';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-utility-user-privileges',
  templateUrl: './utility-user-privileges.component.html',
  styleUrls: ['./utility-user-privileges.component.scss']
})
export class UtilityUserPrivilegesComponent implements OnInit {

  // Data
  userPrivileges
  focusSearch

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-md"
  }

  // Table
  entries: number = 5
  selected: any[] = []
  temp = []
  activeRow: any
  rows: any = []

  SelectionType
  
  constructor(
    private modalService: BsModalService
  ) { 
    this.userPrivileges = UserPrivilegeData
    this.rows = this.userPrivileges
    this.temp = this.rows.map((prop,key)=>{
      return {
        ...prop,
        id: key
      };

    })
  }

  ngOnInit() {
    this.userPrivileges = UserPrivilegeData
    console.log(this.temp)
  }

  openModal(modalInventory: TemplateRef<any>) {
    this.modal = this.modalService.show(modalInventory, this.modalConfig)
  }

  closeModal() {
    this.modal.hide()
  }

  register() {
    this.modal.hide()
    swal.fire({
      title: 'Added!',
      text: 'New user privilege has been added',
      type: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Ok',
      confirmButtonClass: 'btn btn-success btn-sm'
    })
  }

  save() {
    this.modal.hide()
    swal.fire({
      title: 'Saved!',
      text: 'Your edited information has been saved',
      type: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Ok',
      confirmButtonClass: 'btn btn-success btn-sm'
    })
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

  entriesChange($event){
    this.entries = $event.target.value;
  }
  
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {

      for(var key in d){
        if(d[key].toLowerCase().indexOf(val) !== -1){
          return true;
        }
      }
      return false;
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
