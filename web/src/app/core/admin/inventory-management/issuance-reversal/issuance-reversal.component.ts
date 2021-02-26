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

import { InventoryMaterialService} from "src/app/shared/services/inventory-material/inventory-material.service";

@Component({
  selector: 'app-issuance-reversal',
  templateUrl: './issuance-reversal.component.html',
  styleUrls: ['./issuance-reversal.component.scss']
})
export class IssuanceReversalComponent implements OnInit,AfterViewInit,OnDestroy{

  // Tables Selection
  Stock_All: boolean = true;
  Stock_Issuance: boolean = false;
  Stock_In: boolean = false;
  Stock_Update: boolean = false;

  // Real Data
  tableTempMaterialRequest = [];
  tableTemptInventoryTransaction = [];
  rowDataMaterialRequest: any;
  rowDataInventoryTransaction: any [];



  // Charts
  chartpie: am4charts.PieChart3D;

  //Data Entries
  entries: number = 5;

  // Modal
  ModalStockIssuance: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

  // Testing data
  tableShowStockIssuance = [
      {
        "id": 1,
        "delivery_date":"12/2/2021",
        "purchase_order": "23-959-4348",
        "delivery_order": "82-527-1812",
        "updated_date": "2/1/2021",
        "organization": "LANGAT 2 - STORE",
        "supplier_name": "Technology Supply Sdn Bhd",
      },
      {
        "id": 2,
        "delivery_date":"12/2/2021",
        "purchase_order": "51-406-9702",
        "delivery_order": "40-682-0480",
        "updated_date": "2/1/2021",
        "organization": "SEMENYIH 2 - STORE",
        "supplier_name": "Technology Supply Sdn Bhd",
      },
      {
        "id": 3,
        "delivery_date":"12/2/2021",
        "purchase_order": "23-959-4348",
        "delivery_order": "82-527-1812",
        "updated_date": "2/1/2021",
        "organization": "LANGAT 2 - STORE",
        "supplier_name": "Technology Supply Sdn Bhd",
      },
      {
        "id": 4,
        "delivery_date":"12/2/2021",
        "purchase_order": "23-959-4348",
        "delivery_order": "82-527-1812",
        "updated_date": "2/1/2021",
        "organization": "LANGAT 2 - STORE",
        "supplier_name": "Technology Supply Sdn Bhd",
      },
      {
        "id": 5,
        "delivery_date":"12/2/2021",
        "purchase_order": "23-959-4348",
        "delivery_order": "82-527-1812",
        "updated_date": "2/1/2021",
        "organization": "LANGAT 2 - STORE",
        "supplier_name": "Technology Supply Sdn Bhd",
      },
      {
        "id": 5,
        "delivery_date":"12/2/2021",
        "purchase_order": "23-959-4348",
        "delivery_order": "82-527-1812",
        "updated_date": "2/1/2021",
        "organization": "LANGAT 2 - STORE",
        "supplier_name": "Technology Supply Sdn Bhd",
      },
      {
        "id": 5,
        "delivery_date":"12/2/2021",
        "purchase_order": "23-959-4348",
        "delivery_order": "82-527-1812",
        "updated_date": "2/1/2021",
        "organization": "LANGAT 2 - STORE",
        "supplier_name": "Technology Supply Sdn Bhd",
      },
      {
        "id": 5,
        "delivery_date":"12/2/2021",
        "purchase_order": "23-959-4348",
        "delivery_order": "82-527-1812",
        "updated_date": "2/1/2021",
        "organization": "LANGAT 2 - STORE",
        "supplier_name": "Technology Supply Sdn Bhd",
      },
      {
        "id": 5,
        "delivery_date":"12/2/2021",
        "purchase_order": "23-959-4348",
        "delivery_order": "82-527-1812",
        "updated_date": "2/1/2021",
        "organization": "LANGAT 2 - STORE",
        "supplier_name": "Technology Supply Sdn Bhd",
      },
      {
        "id": 5,
        "delivery_date":"12/2/2021",
        "purchase_order": "23-959-4348",
        "delivery_order": "82-527-1812",
        "updated_date": "2/1/2021",
        "organization": "LANGAT 2 - STORE",
        "supplier_name": "Technology Supply Sdn Bhd",
      },
    ];

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
  taskvalues =
  [
    {
      "task_all_value": 234,
      "task_issuance_value": 3245,
      "task_in_value": 3423,
      "task_update_value": 15
    }
  ];

  constructor(
    private zone: NgZone,
    public modalService: BsModalService,
    public InventoryMaterialService: InventoryMaterialService,){

      this.getInventoryMaterialData();
     }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initChart();
    });
  }

  getInventoryMaterialData(){
    let tempData = [];
    this.InventoryMaterialService.get().subscribe(
      (res) => {
        res.forEach(function(result){
          tempData.push(result)
        })
        this.tableTempMaterialRequest = tempData;
        console.log("test1 = ",this.tableTempMaterialRequest);
      },
      error => {
        console.error("err", error);
      }
    )
  }

  initChart() {
    let chartdiv = am4core.create("chartdiv", am4charts.PieChart3D);
    chartdiv.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chartdiv.legend = new am4charts.Legend();

    chartdiv.data = [
      {
        country: "Stock Issuance",
        litres: 453,
      },
      {
        country: "Stock In",
        litres: 567,
      },
      {
        country: "Stock Update",
        litres: 676,
      }
    ];

    let series = chartdiv.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";

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

  openStockIssuance(modalNotification: TemplateRef<any>, row) {
    this.rowDataMaterialRequest = '';
    this.rowDataMaterialRequest = row;
    this.ModalStockIssuance = this.modalService.show(
      modalNotification,
      this.modalConfig,

    );
  }

  ngOnDestroy() {}
}
