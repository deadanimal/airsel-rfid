import {
  Component,
  OnInit,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  NgZone,
} from "@angular/core";
import { Calendar } from "@fullcalendar/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as moment from "moment";
import * as L from "leaflet";
import swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ColumnMode,SelectionType } from "@swimlane/ngx-datatable";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

import { InventoryPurchaseOrderService } from "src/app/shared/services/inventory-purchase-order/inventory-purchase-order.service";
import { InventoryGrnService} from "src/app/shared/services/inventory-grn/inventory-grn.service";

@Component({
  selector: 'app-stock-receive-return',
  templateUrl: './stock-receive-return.component.html',
  styleUrls: ['./stock-receive-return.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
                    style({ opacity: 1 }))
          ]
        )
      ]
    )
  ]
})
export class StockReceiveReturnComponent implements OnInit, OnDestroy {

  // Setting up datatable
  ColumnMode = ColumnMode;

  // Tables Selection
  table_selection = [{
    Stock_Full: true,
    Stock_Partial: false,
    Stock_Miscellaneous: false,
    Stock_Return: false
  }]

  // Tasks
  stock_full: number = 0;
  stock_partial: number = 0;
  stock_miscellaneous: number = 0;
  stock_return: number = 0;

  // Data entries
  entries: number = 5;

  // Real Data
  tablePO = [];
  tableGRN = [];
  rowDataPO:any
  rowDataGRN:any

  // Declare modal
  modal: BsModalRef;

 // Create information
 ModalCreate: BsModalRef;
 modalConfigCreate = {
   keyboard: true,
   class: "modal-dialog-centered modal-lg",
   ignoreBackdropClick: true,
 }

  // Modal Stock Receive
  ModalStockReceive: BsModalRef;
  modalConfigReceive = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

  // Modal Partial and Full Receipt
  ModalPartialFull: BsModalRef;
  modalConfigPartialFull = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  }

  // Modal Stock Return
  ModalStockReturn: BsModalRef;
  modalConfigReturn = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };


  // Testing value
  percentvalues =
    [
      {
        "percent_full_value": 0,
        "percent_partial_value": 0,
        "percent_miscellaneous_value": 0,
        "percent_return_value":0
      }
    ];

  // Testing task
  taskvalues =
  [
    {
      "task_full_value": 0,
      "task_partial_value": 0,
      "task_miscellaneous_value": 0,
      "task_return_value": 0
    }
  ];


  constructor(
    private zone: NgZone,
    public modalService: BsModalService,
    public InventoryPurchaseOrderService: InventoryPurchaseOrderService,
    public InventoryGrnService: InventoryGrnService,
    private spinner: NgxSpinnerService){

      this.getInventoryPurchaseOrderData();
      this.getInventoryPurchaseOrderTotal();
      this.getInventoryGrnData();
      this.getInventoryGrnTotal();
    }

  ngOnInit() {}


detailSelector(path: string) {
  let tableTemp = [];

  if (path == 'stockmiscellaneous') {
    tableTemp = [{
      Stock_Full: false,
      Stock_Partial: false,
      Stock_Miscellaneous: true,
      Stock_Return: false
    }]

    this.table_selection = tableTemp;
  }
  else if (path == 'stockpartial') {
    tableTemp = [{
      Stock_Full: false,
      Stock_Partial: true,
      Stock_Miscellaneous: false,
      Stock_Return: false
    }]
    this.table_selection = tableTemp;
  }
  else if (path == 'stockfull') {
    tableTemp = [{
      Stock_Full: true,
      Stock_Partial: false,
      Stock_Miscellaneous: false,
      Stock_Return: false
    }]
    this.table_selection = tableTemp;
  }
  else if (path == 'stockreturn') {
    tableTemp = [{
      Stock_Full: false,
      Stock_Partial: false,
      Stock_Miscellaneous: false,
      Stock_Return: true
    }]
    this.table_selection = tableTemp;
    console.log("checking",this.table_selection);
  }
  else {
    tableTemp = [{
      Stock_Full: false,
      Stock_Partial: false,
      Stock_Miscellaneous: false,
      Stock_Return: false
    }]
    this.table_selection = tableTemp;
  }
}

ngOnDestroy() {}

closeModal() {
  this.modal.hide();
}

getInventoryPurchaseOrderData(){
  let tempData = [];
  this.InventoryPurchaseOrderService.get().subscribe(
    (res) => {
      res.forEach(function(result){
        tempData.push(result)
      })
      this.tablePO = tempData;
      console.log("test1 = ",this.tablePO);
    },
    error => {
      console.error("err", error);
    }
  )
}

getInventoryPurchaseOrderTotal(){
  let sum: number = 0
  this.InventoryPurchaseOrderService.get().subscribe(
    (res) => {
      sum = Object.keys(res).length;
      this.stock_miscellaneous = sum;
      this.stock_partial = sum;
      this.stock_full = sum;
    }

  )
}

getInventoryGrnData(){
  let tempData = [];
  this.InventoryGrnService.get().subscribe(
    (res) => {
      res.forEach(function(result){
        tempData.push(result)
      })
      this.tableGRN = tempData;
      console.log("test2 = ", this.tableGRN);
    },
    error => {
      console.error("err", error);
    }
  )
}

getInventoryGrnTotal(){
  let sum: number = 0
  this.InventoryGrnService.get().subscribe(
    (res) => {
      sum = Object.keys(res).length;
      this.stock_return = sum;
    }

  )
}

sendTask() {
  let assetregserv = this.InventoryPurchaseOrderService
  this.spinner.show();

  this.spinner.hide();
  swal
  .fire({
    title: "Success",
    text: "The task has been send",
    type: "success",
  }).then((result) => {
    this.getInventoryPurchaseOrderData()
  });
  this.closeModal()
}

checkRowPO(selected) {
  let tempData = []
  // console.log('test test tetst')
  this.tablePO.forEach(
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
  this.tablePO = tempData
}


checkRowGRN(selected) {
  let tempData = []
  // console.log('test test tetst')
  this.tableGRN.forEach(
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
  this.tableGRN = tempData
}

confirmPO(task) {

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
      this.changeStatusPO(task)
    }
  })
}

confirmGRN(task) {

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
      this.changeStatusGRN(task)
    }
  })
}

changeStatusPO(task) {
  let resData: any
  // console.log('this.task = ', task)
  let no = 0
  let purchaseorder = this.InventoryPurchaseOrderService
  this.tablePO.forEach(function (itemVal) {

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
        purchaseorder.update(itemVal['id'], updateformData).subscribe(
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
      this.getInventoryPurchaseOrderData()
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
      this.getInventoryPurchaseOrderData()
    })
  }
}

changeStatusGRN(task) {
  let resData: any
  // console.log('this.task = ', task)
  let no = 0
  let goodreceivenote = this.InventoryGrnService
  this.tableGRN.forEach(function (itemVal) {

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
        goodreceivenote.update(itemVal['id'], updateformData).subscribe(
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
      this.getInventoryGrnData()
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
      this.getInventoryGrnData()
    })
  }
}

entriesChange($event) {
  console.log($event)
  this.entries = $event.target.value;
  console.log(this.entries)
}

openCreate(modalNotification: TemplateRef<any>) {
  this.ModalCreate = this.modalService.show(
    modalNotification,
    this.modalConfigCreate,
  );
}

openReceiveInformation(modalNotification: TemplateRef<any>, row) {
  this.rowDataPO = '';
  this.rowDataPO = row;
  this.ModalStockReceive = this.modalService.show(
      modalNotification,
      this.modalConfigReceive,

    );
  }

openPartialFullReceiptInformation(modalNotification: TemplateRef<any>, row) {
  this.rowDataPO = '';
  this.rowDataPO = row;
  this.ModalPartialFull = this.modalService.show(
    modalNotification,
    this.modalConfigPartialFull,
  )
}

openReturnInformation(modalNotification: TemplateRef<any>, row) {
    this.rowDataGRN = '';
    this.rowDataGRN = row;
    this.ModalStockReturn = this.modalService.show(
      modalNotification,
      this.modalConfigReturn,
    )
  }
}
