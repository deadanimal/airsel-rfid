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

@Component({
  selector: 'app-issuance-reversal',
  templateUrl: './issuance-reversal.component.html',
  styleUrls: ['./issuance-reversal.component.scss']
})
export class IssuanceReversalComponent implements OnInit,AfterViewInit,OnDestroy{

  // Tables Selection
  Stock_Home: boolean = true;
  Stock_All: boolean = false;
  Stock_Issuance: boolean = false;
  Stock_In: boolean = false;
  Stock_Update: boolean = false;

  // Charts
  progress1: am4charts.PieChart;
  progress2: am4charts.PieChart;
  progress3: am4charts.PieChart;
  progress4: am4charts.PieChart;
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
        "percent_all_value": 0,
        "percent_issuance_value": 0,
        "percent_in_value": 0,
        "percent_update_value":0
      }
    ];

  // Testing task
  taskvalues =
  [
    {
      "task_all_value": 0,
      "task_issuance_value": 0,
      "task_in_value": 0,
      "task_update_value": 0
    }
  ];

  constructor(
    private zone: NgZone,
    public modalService: BsModalService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initProgressOne();
      this.initProgressTwo();
      this.initProgressThree();
      this.initProgressFour();
      this.initChart();
    });
  }

  initProgressOne() {
    let progressone = am4core.create("chartdivpercent1", am4charts.PieChart);
    let total = 465;
    let actual = 145;
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
    pieseries.slices.template.stroke = am4core.color("#02BDA4");
    pieseries.slices.template.fill = am4core.color("#0AE3C6");
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
    let progresstwo = am4core.create("chartdivpercent2", am4charts.PieChart);
    let total = 453;
    let actual = 123;
    let remaining = total - actual;
    let percentactual = Math.round((actual/total)*100).toFixed(2);
    let percentactualint = Number(percentactual)

    let percentissuance = Object.values(this.percentvalues);
    let taskissuance = Object.values(this.taskvalues);

    percentissuance[0].percent_issuance_value = percentactualint;
    taskissuance[0].task_issuance_value = total;

    this.percentvalues = percentissuance;
    this.taskvalues = taskissuance;

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
    progresstwo.data = data;

    //Configure the series
    var pieseries = progresstwo.series.push(new am4charts.PieSeries());
    pieseries.dataFields.value = "value";
    pieseries.dataFields.category = "status";
    pieseries.slices.template.stroke = am4core.color("#B5630D");
    pieseries.slices.template.fill = am4core.color("#E9861E");
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
    let progressthree = am4core.create("chartdivpercent3", am4charts.PieChart);
    let total = 567;
    let actual = 507;
    let remaining = total - actual;
    let percentactual = Math.round((actual/total)*100).toFixed(2);
    let percentactualint = Number(percentactual)

    let percentin = Object.values(this.percentvalues);
    let taskin = Object.values(this.taskvalues);

    percentin[0].percent_in_value = percentactualint;
    taskin[0].task_in_value = total;

    this.percentvalues = percentin;
    this.taskvalues = taskin;

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
    progressthree.data = data;

    //Configure the series
    var pieseries = progressthree.series.push(new am4charts.PieSeries());
    pieseries.dataFields.value = "value";
    pieseries.dataFields.category = "status";
    pieseries.slices.template.stroke = am4core.color("#950FD0");
    pieseries.slices.template.fill = am4core.color("#BC6FDE");
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
    let progressfour = am4core.create("chartdivpercent4", am4charts.PieChart);
    let total = 676;
    let actual = 345;
    let remaining = total - actual;
    let percentactual = Math.round((actual/total)*100).toFixed(2);
    let percentactualint = Number(percentactual)

    let percentupdate = Object.values(this.percentvalues);
    let taskupdate = Object.values(this.taskvalues);

    percentupdate[0].percent_update_value = percentactualint;
    taskupdate[0].task_update_value = total;

    this.percentvalues = percentupdate;
    this.taskvalues = taskupdate;

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
    progressfour.data = data;

    //Configure the series
    var pieseries = progressfour.series.push(new am4charts.PieSeries());
    pieseries.dataFields.value = "value";
    pieseries.dataFields.category = "status";
    pieseries.slices.template.stroke = am4core.color("#BD070D");
    pieseries.slices.template.fill = am4core.color("#FE121A");
    pieseries.innerRadius = am4core.percent(40);
    pieseries.ticks.template.disabled = true;
    pieseries.labels.template.disabled = true;
    pieseries.slices.template.strokeWidth = 2;
    pieseries.slices.template.strokeOpacity = 1;

    pieseries.slices.template.propertyFields.disabled = "labelDisabled";
    pieseries.labels.template.propertyFields.disabled = "labelDisabled";
    pieseries.ticks.template.propertyFields.disabled = "labelDisabled";

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

  openStockIssuance(modalNotification: TemplateRef<any>, row) {
      this.ModalStockIssuance = this.modalService.show(
          modalNotification,
          this.modalConfig,

        );
      }

      detailSelector(path: string) {
        if (path == 'stockall') {
          this.Stock_Home = false;
          this.Stock_All = true;
          this.Stock_Issuance = false;
          this.Stock_In = false;
          this.Stock_Update = false;
          console.log("success");
        }
        else if (path == 'stockissuance') {
          this.Stock_Home = false;
          this.Stock_All = false;
          this.Stock_Issuance = true;
          this.Stock_In = false;
          this.Stock_Update = false;
        }
        else if (path == 'stockin') {
          this.Stock_Home = false;
          this.Stock_All = false;
          this.Stock_Issuance = false;
          this.Stock_In = true;
          this.Stock_Update = false;
        }
        else if (path == 'stockupdate') {
          this.Stock_Home = false;
          this.Stock_All = false;
          this.Stock_Issuance = false;
          this.Stock_In = false;
          this.Stock_Update = true;
        }
        else {
          this.Stock_Home = true;
          this.Stock_All = false;
          this.Stock_Issuance = false;
          this.Stock_In = false;
          this.Stock_Update = false;
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
      if (this.chartpie) {
        this.chartpie.dispose();
      }
    });
  }
}
