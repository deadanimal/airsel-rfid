import {
  Component,
  OnInit,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  NgZone,
} from "@angular/core";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
import swal from "sweetalert2";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ColumnMode } from "@swimlane/ngx-datatable";

import { InventoryMaterialService} from "src/app/shared/services/inventory-material/inventory-material.service";
import { InventoryTransactionService } from "src/app/shared/services/inventory-transaction/inventory-transaction.service";

@Component({
  selector: 'app-issuance-reversal',
  templateUrl: './issuance-reversal.component.html',
  styleUrls: ['./issuance-reversal.component.scss'],
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
export class IssuanceReversalComponent implements OnInit,AfterViewInit,OnDestroy{
  //Setting up datatable
  ColumnMode = ColumnMode;


  // Tables Selection
  Stock_All: boolean = true;
  Stock_Issuance: boolean = false;
  Stock_In: boolean = false;
  Stock_Update: boolean = false;

  // Real Data
  tableTempMaterialRequest = [];
  tableTemptInventoryTransaction = [];
  rowDataMaterialRequest: any;
  rowDataInventoryTransaction: any;

  // Charts
  chartpie: am4charts.PieChart3D;

  //Data Entries
  entries: number = 5;

  // Modal
  ModalStockIssuance: BsModalRef;
  modalConfigIssuance = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

  ModalStockIn: BsModalRef;
  modalConfigIn = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

  // Testing value
  percentvalues =
    [
      {
        "percent_all_value": 343,
        "percent_issuance_value": 5463,
        "percent_in_value": 4345,
        "percent_update_value":23
      }
    ];

  // Testing task
  task_all_value:number = 0;
  task_issuance_value:number = 0;
  task_in_value:number = 0;
  task_update_value:number = 0;

  constructor(
    private zone: NgZone,
    public modalService: BsModalService,
    public InventoryMaterialService: InventoryMaterialService,
    public InventoryTransactionService: InventoryTransactionService,
  ){
      this.getInventoryTransactionData();
      this.getInventoryTransactionTotal();
      this.getInventoryMaterialData();
      this.getInventoryMaterialTotal();
     }

  ngOnInit() {
    // this.initChart();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initChart();
    });
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


  getInventoryMaterialData(){
    let tempData = [];
    this.InventoryMaterialService.get().subscribe(
      (res) => {
        res.forEach(function(result){
          tempData.push(result)
        })
        this.tableTempMaterialRequest = tempData;
      },
      error => {
        console.error("err", error);
      }
    )
  }

  getInventoryTransactionTotal(){
    let sum: number = 0
    this.InventoryTransactionService.get().subscribe(
      (res) => {
        sum = Object.keys(res).length;
        this.task_in_value = sum;
        this.task_update_value = sum;
        this.initChart();

      }

    )
    console.log("check",);
  }

  getInventoryMaterialTotal(){
    let sum: number = 0
    this.InventoryMaterialService.get().subscribe(
      (res) => {
        sum = Object.keys(res).length;
        this.task_issuance_value = sum;
        this.initChart();
      },
    )
  }

  initChart() {
    let chartdiv = am4core.create("chartdiv", am4charts.PieChart3D);
    chartdiv.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chartdiv.legend = new am4charts.Legend();

    chartdiv.data = [
      {
        stock_type: "Stock Issuance",
        task: this.task_issuance_value,
      },
      {
        stock_type: "Stock In",
        task: this.task_in_value,
      },
      {
        stock_type: "Stock Update",
        task: this.task_update_value,
      }
    ];

    let series = chartdiv.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "task";
    series.dataFields.category = "stock_type";

    this.chartpie = chartdiv;
  }

  entriesChange($event) {
    console.log($event)
    this.entries = $event.target.value;
    console.log(this.entries)
  }

  detailSelector(path: string) {
    if (path == 'stockall') {
      this.Stock_All = true;
      this.Stock_Issuance = false;
      this.Stock_In = false;
      this.Stock_Update = false;
      console.log("success");
    }
    else if (path == 'stockissuance') {
      this.Stock_All = false;
      this.Stock_Issuance = true;
      this.Stock_In = false;
      this.Stock_Update = false;
    }
    else if (path == 'stockin') {
      this.Stock_All = false;
      this.Stock_Issuance = false;
      this.Stock_In = true;
      this.Stock_Update = false;
    }
    else if (path == 'stockupdate') {
      this.Stock_All = false;
      this.Stock_Issuance = false;
      this.Stock_In = false;
      this.Stock_Update = true;
    }
    else {
      this.Stock_All = false;
      this.Stock_Issuance = false;
      this.Stock_In = false;
      this.Stock_Update = false;
    }
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

  openStockIssuance(modalNotification: TemplateRef<any>, row) {
    this.rowDataMaterialRequest = '';
    this.rowDataMaterialRequest = row;
    this.ModalStockIssuance = this.modalService.show(
      modalNotification,
      this.modalConfigIssuance,

    );
  }

  openStockIn(modalNotification: TemplateRef<any>, row) {
    this.rowDataInventoryTransaction = '';
    this.rowDataInventoryTransaction = row;
    this.ModalStockIn = this.modalService.show(
      modalNotification,
      this.modalConfigIn,

    );
  }

  ngOnDestroy() {}
}
