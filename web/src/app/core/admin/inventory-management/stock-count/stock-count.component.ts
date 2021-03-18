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
import { NgxSpinnerService } from "ngx-spinner";

import { InventoryTransactionService } from "src/app/shared/services/inventory-transaction/inventory-transaction.service";

@Component({
  selector: 'app-stock-count',
  templateUrl: './stock-count.component.html',
  styleUrls: ['./stock-count.component.scss']
})
export class StockCountComponent implements OnInit{

  //Data entries
  entries: number = 5;

  // Declare modal
  modal: BsModalRef;

  // Modal
  ModalStockCount: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

  ModalCreate: BsModalRef;
  modalConfigCreate = {
    keyboard:true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

  // Actual Data
  tableTemptInventoryTransaction = [];
  tableTempReferenceInventoryTransaction = [];
  rowDataInventoryTransaction: any;
  filterInventoryTransactionDate = [];

  constructor(
    public InventoryTransactionService: InventoryTransactionService,
    public modalService: BsModalService,
    private spinner: NgxSpinnerService){
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

  closeModal() {
    this.modal.hide();
  }

  createTask() {
    let invtransaction = this.InventoryTransactionService
    this.spinner.show();

    this.spinner.hide();
    swal.fire({
        title: "Success",
        text: "The task has been created",
        type: "success",
      })
    this.closeModal()
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

  openCreate(modalNotification: TemplateRef<any>) {
    this.ModalCreate = this.modalService.show(
      modalNotification,
      this.modalConfigCreate,
    );
  }

  openStockCount(modalNotification: TemplateRef<any>, row) {
      this.ModalStockCount = this.modalService.show(
          modalNotification,
          this.modalConfig,

        );
      }

}
