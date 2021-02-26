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
  styleUrls: ['./stock-receive-return.component.scss']
})
export class StockReceiveReturnComponent implements OnInit, OnDestroy {

  // Tables Selection
  Stock_All: boolean = false;
  Stock_Partial: boolean = false;
  Stock_Full: boolean = false;
  Stock_Return: boolean = false;

  // Tasks
  stock_all: number = 0;
  stock_partial: number = 0;
  stock_full: number = 0;
  stock_return: number = 0;

  // Data entries
  entries: number = 5;

  //Real Data
  tablePO = [];
  tableGRN = [];
  rowDataPO:any
  rowDataGRN:any

  // Modal Stock Receive
  ModalStockReceive: BsModalRef;
  modalConfigReceive = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

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
        "percent_all_value": 0,
        "percent_partial_value": 0,
        "percent_full_value": 0,
        "percent_return_value":0
      }
    ];

  // Testing task
  taskvalues =
  [
    {
      "task_all_value": 0,
      "task_partial_value": 0,
      "task_full_value": 0,
      "task_return_value": 0
    }
  ];


  constructor(
    private zone: NgZone,
    public modalService: BsModalService,
    public InventoryPurchaseOrderService: InventoryPurchaseOrderService,
    public InventoryGrnService: InventoryGrnService,){

      this.getInventoryPurchaseOrderData();
      this.getInventoryPurchaseOrderTotal();
      this.getInventoryGrnData();
      this.getInventoryGrnTotal();
    }

  ngOnInit() {}


detailSelector(path: string) {
  if (path == 'stockall') {
    this.Stock_All = true;
    this.Stock_Partial = false;
    this.Stock_Full = false;
    this.Stock_Return = false;
    console.log("success");
  }
  else if (path == 'stockpartial') {
    this.Stock_All = false;
    this.Stock_Partial = true;
    this.Stock_Full = false;
    this.Stock_Return = false;
  }
  else if (path == 'stockfull') {
    this.Stock_All = false;
    this.Stock_Partial = false;
    this.Stock_Full = true;
    this.Stock_Return = false;
  }
  else if (path == 'stockreturn') {
    this.Stock_All = false;
    this.Stock_Partial = false;
    this.Stock_Full = false;
    this.Stock_Return = true;
  }
  else {
    this.Stock_All = false;
    this.Stock_Partial = false;
    this.Stock_Full = false;
    this.Stock_Return = false;
  }
}

ngOnDestroy() {}

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
      this.stock_all = sum;
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

checkRow2(selected) {
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

entriesChange($event) {
  console.log($event)
  this.entries = $event.target.value;
  console.log(this.entries)
}

openReceiveInformation(modalNotification: TemplateRef<any>, row) {
  this.rowDataPO = '';
  this.rowDataPO = row;
  this.ModalStockReceive = this.modalService.show(
      modalNotification,
      this.modalConfigReceive,

    );
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
