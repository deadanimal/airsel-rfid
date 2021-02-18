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

@Component({
  selector: 'app-stock-receive-return',
  templateUrl: './stock-receive-return.component.html',
  styleUrls: ['./stock-receive-return.component.scss']
})
export class StockReceiveReturnComponent implements OnInit,AfterViewInit, OnDestroy {

  // Tables Selection
  Stock_All: boolean = false;
  Stock_Partial: boolean = false;
  Stock_Full: boolean = false;
  Stock_Return: boolean = false;

  // Charts
  progress1: am4charts.PieChart;
  progress2: am4charts.PieChart;
  progress3: am4charts.PieChart;
  progress4: am4charts.PieChart;

  // Data entries
  entries: number = 5;

  // Modal
  ModalStockReceive: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-xl",
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

  // Testing data
  tableShowStock =
    [
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


  constructor(
    private zone: NgZone,
    public modalService: BsModalService,){}

  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initProgressOne();
      this.initProgressTwo();
      this.initProgressThree();
      this.initProgressFour();
    });
  }

initProgressOne() {
  let progressone = am4core.create("chartdivpercent1", am4charts.PieChart);
  let total = 500;
  let actual = 125;
  let remaining = total - actual;
  let percentactual = Math.round((actual/total)*100).toFixed(2);
  let percentactualint = Number(percentactual)

  let percentall = Object.values(this.percentvalues);
  let taskall = Object.values(this.taskvalues);

  percentall[0].percent_all_value = percentactualint;
  taskall[0].task_all_value = total;

  this.percentvalues = percentall;
  this.taskvalues = taskall;

  //Data
  var data = [
    {
      "status": "Completed",
      "value": actual
    },
    {
      "status": "Remaining",
      "value": remaining,
      "labelDisabled":true
    }
  ];

  //Insert Date
  progressone.data = data;

  //Configure the series
  var pieseries = progressone.series.push(new am4charts.PieSeries());
  pieseries.dataFields.value = "value";
  pieseries.dataFields.category = "status";
  pieseries.slices.template.stroke = am4core.color("#008000");
  pieseries.slices.template.fill = am4core.color("#50D050");
  pieseries.innerRadius = am4core.percent(40);
  pieseries.ticks.template.disabled = true;
  pieseries.labels.template.disabled = true;
  pieseries.slices.template.strokeWidth = 2;
  pieseries.slices.template.strokeOpacity = 1;

  pieseries.slices.template.propertyFields.disabled = "labelDisabled";
  pieseries.labels.template.propertyFields.disabled = "labelDisabled";
  pieseries.ticks.template.propertyFields.disabled = "labelDisabled";

}

initProgressTwo() {
  let progressone = am4core.create("chartdivpercent2", am4charts.PieChart);
  let total = 1000;
  let actual = 300;
  let remaining = total - actual;
  let percentactual = Math.round((actual/total)*100).toFixed(2);
  let percentactualint = Number(percentactual)

  let percentpartial = Object.values(this.percentvalues);
  let taskpartial = Object.values(this.taskvalues);

  percentpartial[0].percent_partial_value = percentactualint;
  taskpartial[0].task_partial_value = total;

  this.percentvalues = percentpartial;
  this.taskvalues = taskpartial;

  // percentpartial.push(percentactual);


  //Data
  var data = [
    {
      "status": "Completed",
      "value": actual
    },
    {
      "status": "Remaining",
      "value": remaining,
      "labelDisabled":true
    }
  ];

  //Insert Date
  progressone.data = data;

  //Configure the series
  var pieseries = progressone.series.push(new am4charts.PieSeries());
  pieseries.dataFields.value = "value";
  pieseries.dataFields.category = "status";
  pieseries.slices.template.stroke = am4core.color("#ff0080");
  pieseries.slices.template.fill = am4core.color("#ff80bf");
  pieseries.innerRadius = am4core.percent(40);
  pieseries.ticks.template.disabled = true;
  pieseries.labels.template.disabled = true;
  pieseries.slices.template.strokeWidth = 2;
  pieseries.slices.template.strokeOpacity = 1;

  pieseries.slices.template.propertyFields.disabled = "labelDisabled";
  pieseries.labels.template.propertyFields.disabled = "labelDisabled";
  pieseries.ticks.template.propertyFields.disabled = "labelDisabled";

}

initProgressThree() {
  let progressone = am4core.create("chartdivpercent3", am4charts.PieChart);
  let total = 567;
  let actual = 176;
  let remaining = total - actual;
  let percentactual = Math.round((actual/total)*100).toFixed(2);
  let percentactualint = Number(percentactual)

  let percentfull = Object.values(this.percentvalues);
  let taskfull = Object.values(this.taskvalues);

  percentfull[0].percent_full_value = percentactualint;
  taskfull[0].task_full_value = total;

  this.percentvalues = percentfull;
  this.taskvalues = taskfull;

  //Data
  var data = [
    {
      "status": "Completed",
      "value": actual
    },
    {
      "status": "Remaining",
      "value": remaining,
      "labelDisabled":true
    }
  ];

  //Insert Date
  progressone.data = data;

  //Configure the series
  var pieseries = progressone.series.push(new am4charts.PieSeries());
  pieseries.dataFields.value = "value";
  pieseries.dataFields.category = "status";
  pieseries.slices.template.stroke = am4core.color("#005ce6");
  pieseries.slices.template.fill = am4core.color("#80b3ff");
  pieseries.innerRadius = am4core.percent(40);
  pieseries.ticks.template.disabled = true;
  pieseries.labels.template.disabled = true;
  pieseries.slices.template.strokeWidth = 2;
  pieseries.slices.template.strokeOpacity = 1;

  pieseries.slices.template.propertyFields.disabled = "labelDisabled";
  pieseries.labels.template.propertyFields.disabled = "labelDisabled";
  pieseries.ticks.template.propertyFields.disabled = "labelDisabled";

}

initProgressFour() {
  let progressone = am4core.create("chartdivpercent4", am4charts.PieChart);
  let total = 676;
  let actual = 345;
  let remaining = total - actual;
  let percentactual = Math.round((actual/total)*100).toFixed(2);
  let percentactualint = Number(percentactual)

  let percentreturn = Object.values(this.percentvalues);
  let taskreturn = Object.values(this.taskvalues);

  percentreturn[0].percent_return_value = percentactualint;
  taskreturn[0].task_return_value = total;

  this.percentvalues = percentreturn;
  this.taskvalues = taskreturn;

  //Data
  var data = [
    {
      "status": "Completed",
      "value": actual
    },
    {
      "status": "Remaining",
      "value": remaining,
      "labelDisabled":true
    }
  ];

  //Insert Date
  progressone.data = data;

  //Configure the series
  var pieseries = progressone.series.push(new am4charts.PieSeries());
  pieseries.dataFields.value = "value";
  pieseries.dataFields.category = "status";
  pieseries.slices.template.stroke = am4core.color("#cc6600");
  pieseries.slices.template.fill = am4core.color("#ff8c1a");
  pieseries.innerRadius = am4core.percent(40);
  pieseries.ticks.template.disabled = true;
  pieseries.labels.template.disabled = true;
  pieseries.slices.template.strokeWidth = 2;
  pieseries.slices.template.strokeOpacity = 1;

  pieseries.slices.template.propertyFields.disabled = "labelDisabled";
  pieseries.labels.template.propertyFields.disabled = "labelDisabled";
  pieseries.ticks.template.propertyFields.disabled = "labelDisabled";

}

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

ngOnDestroy() {
  this.zone.runOutsideAngular(() => {
    if (this.progress1) {
      this.progress1.dispose();
    }
    if (this.progress2) {
      this.progress2.dispose();
    }
    if (this.progress3) {
      this.progress3.dispose();
    }
    if (this.progress4) {
      this.progress4.dispose();
    }
  });
}

checkRow(selected) {
  let tempData = []
  // console.log('test test tetst')
  this.tableShowStock.forEach(
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
  this.tableShowStock = tempData
}

entriesChange($event) {
  console.log($event)
  this.entries = $event.target.value;
  console.log(this.entries)
}

openReceiveInformation(modalNotification: TemplateRef<any>, row) {
    this.ModalStockReceive = this.modalService.show(
        modalNotification,
        this.modalConfig,

      );
    }

}
