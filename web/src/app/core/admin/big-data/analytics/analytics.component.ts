import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  public chartOne: am4charts.XYChart;
  public chartTwo: any;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.initChart();
      this.initChart1();
    });
  }

  ngOnDestroy() {
    if (this.chartOne) {
      this.chartOne.dispose();
    }

    if (this.chartTwo) {
      this.chartTwo.dispose();
    }
  }

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        month: "Jan",
        asset1: 2.5,
        asset2: 2.5,
        asset3: 2.1,
        asset4: 0.3,
        asset5: 0.2,
      },
      {
        month: "Feb",
        asset1: 2.6,
        asset2: 2.7,
        asset3: 2.2,
        asset4: 0.3,
        asset5: 0.3,
      },
      {
        month: "Mac",
        asset1: 2.8,
        asset2: 2.9,
        asset3: 2.4,
        asset4: 0.3,
        asset5: 0.3,
      },
    ];

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.opacity = 0;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;

    // Create series
    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "month";
      series.stacked = true;
      series.name = name;

      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.locationX = 0.5;
      labelBullet.label.text = "{valueX}";
      labelBullet.label.fill = am4core.color("#fff");
    }

    createSeries("asset1", "Asset 1");
    createSeries("asset2", "Asset 2");
    createSeries("asset3", "Asset 3");
    createSeries("asset4", "Asset 4");
    createSeries("asset5", "Asset 5");

    this.chartOne = chart;
  }

  initChart1() {
    let chart = am4core.create("chartdiv1", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        maintenance: "Preventive",
        amount: 501,
      },
      {
        maintenance: "Pending",
        amount: 301,
      },
      {
        maintenance: "Delayed",
        amount: 201,
      },
    ];

    // Set inner radius
    chart.innerRadius = am4core.percent(20);

    // Set radius
    chart.radius = am4core.percent(35);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "maintenance";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    this.chartTwo = chart;
  }
}
