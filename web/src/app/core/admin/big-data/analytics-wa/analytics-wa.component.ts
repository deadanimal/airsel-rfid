import { Component, OnInit, NgZone } from '@angular/core';


import { WorkOrderActivityCompletionService } from 'src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { formatDate } from '@angular/common';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-analytics-wa',
  templateUrl: './analytics-wa.component.html',
  styleUrls: ['./analytics-wa.component.scss']
})
export class AnalyticsWaComponent implements OnInit {

  private chartone: am4charts.XYChart;

  constructor(private zone: NgZone, public workOrderActivityCompletionService: WorkOrderActivityCompletionService) { }

  ngOnInit() {

    this.getWorkOrderActivity();
  }

  assetowningdepartment = [
    { value: "CBD", name: "CUSTOMER BILLING SERVICES" },
    { value: "DISTRIBUTION", name: "DISTRIBUTION" },
    { value: "ES-D", name: "ENGINEERING SERVICES – DISTRIBUTION" },
    { value: "FLEET", name: "FLEET" },
    { value: "LAND", name: "LAND" },
    { value: "NRW", name: "NRW" },
    { value: "PD-N", name: "PRODUCTION NORTHERN" },
    { value: "PD-S", name: "PRODUCTION SOUTHERN" },
    { value: "SCADA", name: "SCADA" },
    { value: "WQ", name: "WATER QUALITY" },
    { value: "NA", name: "NOT AVAILABLE" },
  ];

  //variable
  WorkOrderActivity: any;
  totalWorkOrder: any
  tempTotalWorkOrder: any
  backLog: any
  totalBackLogToday: any
  totalBackLogYesterday: any
  backLogPercentageToday : any
  backLogPercentageYesterday : any

  getWorkOrderActivity() {

    // let temp = []
    this.workOrderActivityCompletionService.get().subscribe((response) => {
      console.log('response from API is ', response);
      this.WorkOrderActivity = response;
      console.log("WorkOrderActivity", this.WorkOrderActivity);

      this.getTotalWorkOrder();

      this.backLog = this.WorkOrderActivity.filter((value) => value.bo_status_cd.includes("Backlog"));
      console.log("BackLog", this.backLog);
      // this.updateFilter();

      this.getTotalBackLog()
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  getTotalBackLog() {

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)

    console.log("today", today)
    console.log("yesterday", yesterday)

    let yesterdayBacklog =[]

    for (let i in this.backLog) {

      const filteredData = formatDate(this.backLog[i].modified_date, 'yyyy-MM-dd', 'en_US') < formatDate(today, 'yyyy-MM-dd', 'en_US');
      console.log("filtered backlog", filteredData)

      if(formatDate(this.backLog[i].modified_date, 'yyyy-MM-dd', 'en_US') < formatDate(today, 'yyyy-MM-dd', 'en_US'))
        yesterdayBacklog[i] = this.backLog[i]

      // if (formatDate(this.backLog[i].modified_date, 'yyyy-MM-dd', 'en_US') <= formatDate(this.yesterday, 'yyyy-MM-dd', 'en_US'))
      //   yesterdayBacklog[i] = this.backLog[i]
    }
    console.log("yesterday BackLog",yesterdayBacklog)

    this.totalBackLogToday = this.backLog.length
    this.totalBackLogYesterday = yesterdayBacklog.length
    const totalActivity = this.WorkOrderActivity.length

    console.log("Today",this.totalBackLogToday)
    console.log("yesterday",this.totalBackLogYesterday)

    this.backLogPercentageToday = ((this.totalBackLogToday/totalActivity) * 100).toFixed(2);
    this.backLogPercentageYesterday = ((this.totalBackLogYesterday/totalActivity) * 100).toFixed(2);

  }

  getTotalWorkOrder() {
    this.totalWorkOrder = this.WorkOrderActivity.length;
    this.tempTotalWorkOrder = this.WorkOrderActivity.length;
    console.log("Total work order", this.totalWorkOrder);
    console.log("Temp Total work order", this.tempTotalWorkOrder);

  }

  public filters = <any>{
    "to": '',
    "from": '',
  };

  filteredWOA = []
  public getByDate(event) {
    this.filters['from'] = event[0];
    this.filters['to'] = event[1];
    console.log(this.filters['from'], '===', this.filters['to'])

    for (let i in this.WorkOrderActivity) {

      const filteredData = formatDate(this.WorkOrderActivity[i].modified_date, 'yyyy-MM-dd', 'en_US') >= formatDate(this.filters['from'], 'yyyy-MM-dd', 'en_US') && formatDate(this.WorkOrderActivity[i].modified_date, 'yyyy-MM-dd', 'en_US') <= formatDate(this.filters['to'], 'yyyy-MM-dd', 'en_US');
      console.log("filtered date", filteredData)

      if (formatDate(this.WorkOrderActivity[i].modified_date, 'yyyy-MM-dd', 'en_US') >= formatDate(this.filters['from'], 'yyyy-MM-dd', 'en_US') && formatDate(this.WorkOrderActivity[i].modified_date, 'yyyy-MM-dd', 'en_US') <= formatDate(this.filters['to'], 'yyyy-MM-dd', 'en_US'))
        this.filteredWOA[i] = this.WorkOrderActivity[i]
    }
    console.log("filteredWOA", this.filteredWOA)
    this.totalWorkOrder = this.filteredWOA.length
  }

  reset() {
    this.totalWorkOrder = this.WorkOrderActivity.length
  }


  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initChartOne();
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartone) this.chartone.dispose();
    });
  }

  initChartOne() {
    let chart = am4core.create("chartdivone", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        category: "ES-D",
        value1: 1033,
        value2: 3428,
      },
      {
        category: "DISTRIBUTION",
        value1: 677,
        value2: 3089,
      },
      {
        category: "PD-N",
        value1: 236,
        value2: 2365,
      },
      {
        category: "NRW",
        value1: 831,
        value2: 1894,
      },
      {
        category: "PD-S",
        value1: 52,
        value2: 1077,
      },
      {
        category: "FLEET",
        value1: 314,
        value2: 988,
      },
      {
        category: "WQ",
        value1: 70,
        value2: 86,
      },
      {
        category: "OTS",
        value1: 2,
        value2: 15,
      },
      {
        category: "CBS",
        value1: 0,
        value2: 0,
      },
    ];

    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();
    chart;

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueX.totalPercent.formatNumber('#.00')}%";
    series1.name = "Total Work Activity Generated";
    series1.dataFields.categoryY = "category";
    series1.dataFields.valueX = "value1";
    series1.dataFields.valueXShow = "totalPercent";
    series1.dataItems.template.locations.categoryY = 0.5;
    series1.stacked = true;
    series1.tooltip.pointerOrientation = "vertical";
    series1.columns.template.fill = am4core.color("#F8A879");

    let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueX}";
    bullet1.label.fill = am4core.color("#ffffff");
    bullet1.locationX = 0.5;

    let series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
      "{name}: {valueX.totalPercent.formatNumber('#.00')}%";
    series2.name = "Numbers of Work Activity Backlog *";
    series2.dataFields.categoryY = "category";
    series2.dataFields.valueX = "value2";
    series2.dataFields.valueXShow = "totalPercent";
    series2.dataItems.template.locations.categoryY = 0.5;
    series2.stacked = true;
    series2.tooltip.pointerOrientation = "vertical";
    series2.columns.template.fill = am4core.color("#9DCB83");

    let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueX}";
    bullet2.locationX = 0.5;
    bullet2.label.fill = am4core.color("#ffffff");

    chart.scrollbarX = new am4core.Scrollbar();

    this.chartone = chart;
  }

}
