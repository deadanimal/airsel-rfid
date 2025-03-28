import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from "@angular/core";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as moment from "moment";
import * as L from "leaflet";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

import { CompareChartData } from "../../../../assets/mock/dashboard";

@Component({
  selector: "app-inventory-dashboard",
  templateUrl: "./inventory-dashboard.component.html",
  styleUrls: ["./inventory-dashboard.component.scss"],
})
export class InventoryDashboardComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // Data
  completedMaintenance = 1420;
  pendingMaintenance = 105;
  delayedMaintenance = 15;
  registeredAsset = 100324;

  markers = [];

  // Chart
  compareChart: am4charts.XYChart;
  chartone: am4charts.XYChart;
  charttwo: am4charts.PieChart3D;
  chartthree: am4charts.XYChart;

  storeLocations = [
    {
      id: "shah-alam",
      title: "SHAH ALAM - CENTRAL STORE",
    },
    {
      id: "klang",
      title: "KLANG - STORE",
    },
    {
      id: "petaling",
      title: "PETALING - STORE",
    },
    {
      id: "kuala-langat",
      title: "KUALA LANGAT - STORE",
    },
    {
      id: "sungai-batu",
      title: "SUNGAI BATU - STORE",
    },
    {
      id: "gombak",
      title: "GOMBAK - STORE",
    },
    {
      id: "kuala-lumpur",
      title: "KUALA LUMPUR - STORE",
    },
    {
      id: "ssp2",
      title: "SSP2 - STORE",
    },
    {
      id: "kuala-selangor",
      title: "KUALA SELANGOR - STORE",
    },
    {
      id: "sabak-bernam",
      title: "SABAK BERNAM - STORE",
    },
    {
      id: "hulu-selangor",
      title: "HULU SELANGOR - STORE",
    },
    {
      id: "rantau-panjang",
      title: "RANTAU PANJANG - STORE",
    },
    {
      id: "semenyih",
      title: "SEMENYIH - STORE",
    },
    {
      id: "hulu-langat",
      title: "HULU LANGAT - STORE",
    },
    {
      id: "sepang",
      title: "SEPANG - STORE",
    },
    {
      id: "sg-langat",
      title: "SG LANGAT - STORE",
    },
    {
      id: "langat2",
      title: "LANGAT 2 - STORE",
    },
    {
      id: "semenyih2",
      title: "SEMENYIH 2 - STORE",
    },
  ];

  constructor(private zone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initChartOne();
      this.initChartTwo();
      this.initChartThree();
    });
  }

  initChartOne() {
    let chartdivone = am4core.create("chartdivone", am4charts.XYChart);

    // Add data
    chartdivone.data = generateChartData();

    // Create axes
    let dateAxis = chartdivone.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chartdivone.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chartdivone.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12);

    // Add scrollbar
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chartdivone.scrollbarX = scrollbarX;

    // Add cursor
    chartdivone.cursor = new am4charts.XYCursor();
    chartdivone.cursor.xAxis = dateAxis;
    chartdivone.cursor.snapToSeries = series;

    function generateChartData() {
      let chartData = [];
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 1000);
      let visits = 1200;
      for (var i = 0; i < 500; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        visits += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        );

        chartData.push({
          date: newDate,
          visits: visits,
        });
      }
      return chartData;
    }

    this.chartone = chartdivone;
  }

  initChartTwo() {
    let chartdivtwo = am4core.create("chartdivtwo", am4charts.PieChart3D);
    chartdivtwo.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chartdivtwo.legend = new am4charts.Legend();

    chartdivtwo.data = [
      {
        country: "Lithuania",
        litres: 501.9,
      },
      {
        country: "Czech Republic",
        litres: 301.9,
      },
      {
        country: "Ireland",
        litres: 201.1,
      },
      {
        country: "Germany",
        litres: 165.8,
      },
      {
        country: "Australia",
        litres: 139.9,
      },
      {
        country: "Austria",
        litres: 128.3,
      },
      {
        country: "UK",
        litres: 99,
      },
      {
        country: "Belgium",
        litres: 60,
      },
      {
        country: "The Netherlands",
        litres: 50,
      },
    ];

    let series = chartdivtwo.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";

    this.charttwo = chartdivtwo;
  }

  initChartThree() {
    let chart = am4core.create("chartdivthree", am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    // Data for both series
    let data = [
      {
        year: "2009",
        income: 23.5,
        expenses: 21.1,
      },
      {
        year: "2010",
        income: 26.2,
        expenses: 30.5,
      },
      {
        year: "2011",
        income: 30.1,
        expenses: 34.9,
      },
      {
        year: "2012",
        income: 29.5,
        expenses: 31.1,
      },
      {
        year: "2013",
        income: 30.6,
        expenses: 28.2,
        lineDash: "5,5",
      },
      {
        year: "2014",
        income: 34.1,
        expenses: 32.9,
        strokeWidth: 1,
        columnDash: "5,5",
        fillOpacity: 0.2,
        additional: "(projection)",
      },
    ];

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Income";
    columnSeries.dataFields.valueY = "income";
    columnSeries.dataFields.categoryX = "year";

    columnSeries.columns.template.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Expenses";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = "year";

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    bullet.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    chart.data = data;

    this.chartthree = chart;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.compareChart) {
        this.compareChart.dispose();
      }
      if (this.chartone) {
        this.chartone.dispose();
      }
      if (this.charttwo) {
        this.charttwo.dispose();
      }
      if (this.chartthree) {
        this.chartthree.dispose();
      }
    });
  }
}
