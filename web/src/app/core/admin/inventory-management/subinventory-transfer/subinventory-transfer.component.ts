import {
  Component,
  OnInit,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  NgZone,
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { InventoryTransactionService } from "src/app/shared/services/inventory-transaction/inventory-transaction.service";

@Component({
  selector: 'app-subinventory-transfer',
  templateUrl: './subinventory-transfer.component.html',
  styleUrls: ['./subinventory-transfer.component.scss']
})
export class SubinventoryTransferComponent implements OnInit {

  // Declared Modal
  modal: BsModalRef;

  // Modal
  ModalSubInventory: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

  //Data Entries
  entries: number = 5;

  // Actual Data
  tableTemptInventoryTransaction = [];
  tableTempReferenceInventoryTransaction = [];
  rowDataInventoryTransaction: any;
  filterInventoryTransactionDate = [];

  constructor(
    public modalService: BsModalService,
    public InventoryTransactionService: InventoryTransactionService,
  ) {
      this.getInventoryTransactionData();
    }

  ngOnInit() {}

  entriesChange($event) {
    console.log($event)
    this.entries = $event.target.value;
    console.log(this.entries)
  }

  getInventoryTransactionData(){
    let tempData = [];
    this.InventoryTransactionService.get().subscribe(
      (res) => {
        res.forEach(function(result){
          tempData.push(result)
        })
        this.tableTemptInventoryTransaction = tempData;
        console.log("test1 = ", this.tableTemptInventoryTransaction);
      },
      error => {
        console.error("err, error");
      }
    )
  }

  getFilteredTransactionDate(){
    let tempData = [];
    let transaction_date_start: any;
    let transaction_date_end: any;

    this.InventoryTransactionService.get().subscribe(
      (res) => {
        res.forEach(function(result){
          tempData.push(result)
        })
        this.tableTempReferenceInventoryTransaction = tempData;

        // Date Input
        transaction_date_start = (<HTMLInputElement>document.getElementById('startdate')).value;
        transaction_date_end = (<HTMLInputElement>document.getElementById('enddate')).value;

        // Changing the input date format
        var conv_date_start = new Date(transaction_date_start);
        var tran_conv_date_start = `${conv_date_start.getFullYear()}-${conv_date_start.getMonth()+1}-${conv_date_start.getDate()}`
        console.log("converted date", tran_conv_date_start);

        var conv_date_end = new Date(transaction_date_end);
        var tran_conv_date_end = `${conv_date_end.getFullYear()}-${conv_date_end.getMonth()+1}-${conv_date_end.getDate()}`
        console.log("converted date", tran_conv_date_end);

        // Filter date choosen
        this.filterInventoryTransactionDate = this.tableTempReferenceInventoryTransaction.filter(function(transaction){
          var transaction_sub = transaction.TRANSACTION_DATE;
          var tran = new Date(transaction_sub);
          var match = `${tran.getFullYear()}-${tran.getMonth()+1}-${tran.getDate()}`;

          // filter this dates by startDate and endDate
          return match >= tran_conv_date_start && match <= tran_conv_date_end;
        })
        console.log("transaction test = ",this.filterInventoryTransactionDate);

        this.tableTemptInventoryTransaction = this.filterInventoryTransactionDate;
      },
      error => {
        console.error("err, error");
      }
    )
  }

  Reset(){
    this.getInventoryTransactionData()
  }

  checkRowINVTran(selected) {
    let tempData = []
    // console.log('test test tetst')
    this.tableTemptInventoryTransaction.forEach(
      (item) => {
        if (item['id'] == selected['id']) {
          // console.log('item b4 = ', item)
          item['isTick'] = item['isTick']
          // console.log('item after = ', item)
          tempData.push(item)
        } else {
          tempData.push(item)
        }
      }
    )
    // console.log('tempDataqweqe = ', tempData)
    this.tableTemptInventoryTransaction = tempData
  }

  closeModal() {
    this.modal.hide();
  }

  confirmINVTran(task) {

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
      console.log('result = ', result.value)
      if (result.value == true) {
        this.changeStatusINVTran(task)
      }
    })
  }

  changeStatusINVTran(task) {
    let resData: any
    // console.log('this.task = ', task)
    let no = 0
    let inventorytransaction = this.InventoryTransactionService
    this.tableTemptInventoryTransaction.forEach(function (itemVal) {

      if (itemVal['isTick'] == true) {

        console.log('itemVal = ', itemVal.status)
        if (itemVal.status == 'CO') {
          // const updateformData = new FormData();
          let updateformData: any
          // updateformData.append('status', 'PR');

          updateformData = {
            status: task
          }
          // console.log('updateformData = ', updateformData)

          // console.log('---- sini ----')
          inventorytransaction.update(itemVal['id'], updateformData).subscribe(
            (res) => {
              // console.log("ttttatttatt = ", res);
            },
            error => {
              console.error("err", error);
            }
          )
        } else {
          no++
        }
      }
    })

    if (no > 0) {
      swal.fire({
        title: 'Warning',
        text: 'The incomplete data cannot be save.',
        type: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'Ok',
        confirmButtonClass: 'btn btn-warning'
      }).then((result) => {
        this.getInventoryTransactionData()
      })
    } else {
      swal.fire({
        title: 'Success',
        text: 'Successfully Change Status',
        type: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Ok',
        confirmButtonClass: 'btn btn-success'
      }).then((result) => {
        this.getInventoryTransactionData()
      })
    }
  }

  openSubInventory(modalNotification: TemplateRef<any>, row) {
    this.rowDataInventoryTransaction = '';
    this.rowDataInventoryTransaction = row;
      this.ModalSubInventory = this.modalService.show(
          modalNotification,
          this.modalConfig,

        );
      }

}
