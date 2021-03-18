import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from "@angular/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Apply chart themes
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

@Component({
  selector: 'app-transaction-upload',
  templateUrl: './transaction-upload.component.html',
  styleUrls: ['./transaction-upload.component.scss']
})
export class TransactionUploadComponent implements OnInit,AfterViewInit, OnDestroy {

  // Chart
  trackingCharts: am4charts.XYChart;

  constructor(private zone: NgZone) { }
  ngOnInit() {
    this.datezoom();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initChartAll();
    });
  }

  initChartAll() {
    let chartdivone = am4core.create("chartdiv", am4charts.XYChart);

    var data = [];
    for(var i = 0; i < 24; i++) {
      data.push({
        date: new Date(2021, i, 1),
        value: Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        )
      })
    }

    // // Add data
    chartdivone.data = generateChartData();

    // Create axes
    let dateAxis = chartdivone.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chartdivone.yAxes.push(new am4charts.ValueAxis());

    // Create Bar Series
    var series = chartdivone.series.push(new am4charts.ColumnSeries());
    series.name = "Quantity";
    series.fill = am4core.color("#2D3CEF");
    series.stroke = am4core.color("#73E717");
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";

    // Create Line Series
    var series2 = chartdivone.series.push(new am4charts.LineSeries());
    series2.name = "Quantity";
    series2.stroke = am4core.color("#CDA2AB");
    series2.strokeWidth = 3;
    series2.dataFields.valueY = "value";
    series2.dataFields.dateX = "date";

    // Set date label formatting
    dateAxis.periodChangeDateFormats.setKey("month", "[bold]yyyy");

    // Add scrollbar
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chartdivone.scrollbarX = scrollbarX;

    // Add cursor
    chartdivone.cursor = new am4charts.XYCursor();
    chartdivone.cursor.xAxis = dateAxis;
    chartdivone.cursor.snapToSeries = series;

    // Zoom specific date
    dateAxis.zoomToDates(
      new Date(this.datezoom().startdate),
      new Date(this.datezoom().enddate)
    );

    function generateChartData() {
      let chartData = [];
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 500);
      let quantity = 1200;
      for (var i = 0; i < 500; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        quantity += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        );

        chartData.push({
          date: newDate,
          value: quantity,
        });
      }
      return chartData;
    }

    this.trackingCharts = chartdivone;
  }

  datezoom(){
    let startdate: any;
    let enddate: any;

    startdate = (<HTMLInputElement>document.getElementById('startdatechoose')).value;
    enddate = (<HTMLInputElement>document.getElementById('endatechoose')).value;
    console.log("check date = ",startdate);

    return startdate;
    return enddate;
    this.initChartAll();

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.trackingCharts) {
        this.trackingCharts.dispose();
      }
    });
  }
}
