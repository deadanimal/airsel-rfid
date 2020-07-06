import { Component, OnInit, NgZone } from "@angular/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-analytics-tam",
  templateUrl: "./analytics-tam.component.html",
  styleUrls: ["./analytics-tam.component.scss"],
})
export class AnalyticsTamComponent implements OnInit {
  private pieone: am4charts.PieChart;
  private pietwo: am4charts.PieChart;
  private piethree: am4charts.PieChart;
  private piefour: am4charts.PieChart;
  private piefive: am4charts.PieChart;
  private piesix: am4charts.PieChart;
  private pieseven: am4charts.PieChart;
  private pieeight: am4charts.PieChart;
  private pienine: am4charts.PieChart;

  constructor(private zone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initPieOne();
      this.initPieTwo();
      this.initPieThree();
      this.initPieFour();
      this.initPieFive();
      this.initPieSix();
      this.initPieSeven();
      this.initPieEight();
      this.initPieNine();
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.pieone) this.pieone.dispose();
      if (this.pietwo) this.pietwo.dispose();
      if (this.piethree) this.piethree.dispose();
      if (this.piefour) this.piefour.dispose();
      if (this.piefive) this.piefive.dispose();
      if (this.piesix) this.piesix.dispose();
      if (this.pieseven) this.pieseven.dispose();
      if (this.pieeight) this.pieeight.dispose();
      if (this.pienine) this.pienine.dispose();
    });
  }

  initPieOne() {
    let chart = am4core.create("piedivone", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        type: "Preventive Maintenance",
        total: 120,
        color: am4core.color("#2174C7"),
      },
      {
        type: "Corrective Maintenance",
        total: 0,
        color: am4core.color("#D8D6D6"),
      },
      {
        type: "Predictive Maintenance",
        total: 0,
        color: am4core.color("#BF9000"),
      },
    ];

    chart.innerRadius = am4core.percent(40);
    // chart.depth = 120;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "total";
    // series.dataFields.depthValue = "total";
    series.dataFields.category = "type";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    series.ticks.template.disabled = true;
    series.alignLabels = false;
    series.labels.template.text = "{value}";
    series.labels.template.radius = am4core.percent(-40);
    series.labels.template.fill = am4core.color("white");
    series.slices.template.propertyFields.fill = "color";

    this.pieone = chart;
  }

  initPieTwo() {
    let chart = am4core.create("piedivtwo", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        type: "Preventive Maintenance",
        total: 2492,
        color: am4core.color("#2174C7"),
      },
      {
        type: "Corrective Maintenance",
        total: 17,
        color: am4core.color("#D8D6D6"),
      },
      {
        type: "Predictive Maintenance",
        total: 400,
        color: am4core.color("#BF9000"),
      },
    ];

    chart.innerRadius = am4core.percent(40);
    // chart.depth = 120;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "total";
    // series.dataFields.depthValue = "total";
    series.dataFields.category = "type";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    series.ticks.template.disabled = true;
    series.alignLabels = false;
    series.labels.template.text = "{value}";
    series.labels.template.radius = am4core.percent(-40);
    series.labels.template.fill = am4core.color("white");
    series.slices.template.propertyFields.fill = "color";

    this.pietwo = chart;
  }

  initPieThree() {
    let chart = am4core.create("piedivthree", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        type: "Preventive Maintenance",
        total: 1547,
        color: am4core.color("#2174C7"),
      },
      {
        type: "Corrective Maintenance",
        total: 4,
        color: am4core.color("#D8D6D6"),
      },
      {
        type: "Predictive Maintenance",
        total: 0,
        color: am4core.color("#BF9000"),
      },
    ];

    chart.innerRadius = am4core.percent(40);
    // chart.depth = 120;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "total";
    // series.dataFields.depthValue = "total";
    series.dataFields.category = "type";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    series.ticks.template.disabled = true;
    series.alignLabels = false;
    series.labels.template.text = "{value}";
    series.labels.template.radius = am4core.percent(-40);
    series.labels.template.fill = am4core.color("white");
    series.slices.template.propertyFields.fill = "color";

    this.piethree = chart;
  }

  initPieFour() {
    let chart = am4core.create("piedivfour", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        type: "Preventive Maintenance",
        total: 1345,
        color: am4core.color("#2174C7"),
      },
      {
        type: "Corrective Maintenance",
        total: 19,
        color: am4core.color("#D8D6D6"),
      },
      {
        type: "Predictive Maintenance",
        total: 7,
        color: am4core.color("#BF9000"),
      },
    ];

    chart.innerRadius = am4core.percent(40);
    // chart.depth = 120;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "total";
    // series.dataFields.depthValue = "total";
    series.dataFields.category = "type";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    series.ticks.template.disabled = true;
    series.alignLabels = false;
    series.labels.template.text = "{value}";
    series.labels.template.radius = am4core.percent(-40);
    series.labels.template.fill = am4core.color("white");
    series.slices.template.propertyFields.fill = "color";

    this.piefour = chart;
  }

  initPieFive() {
    let chart = am4core.create("piedivfive", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        type: "Preventive Maintenance",
        total: 3,
        color: am4core.color("#2174C7"),
      },
      {
        type: "Corrective Maintenance",
        total: 55,
        color: am4core.color("#D8D6D6"),
      },
      {
        type: "Predictive Maintenance",
        total: 0,
        color: am4core.color("#BF9000"),
      },
    ];

    chart.innerRadius = am4core.percent(40);
    // chart.depth = 120;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "total";
    // series.dataFields.depthValue = "total";
    series.dataFields.category = "type";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    series.ticks.template.disabled = true;
    series.alignLabels = false;
    series.labels.template.text = "{value}";
    series.labels.template.radius = am4core.percent(-40);
    series.labels.template.fill = am4core.color("white");
    series.slices.template.propertyFields.fill = "color";

    this.piefive = chart;
  }

  initPieSix() {
    let chart = am4core.create("piedivsix", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        type: "Preventive Maintenance",
        total: 11,
        color: am4core.color("#2174C7"),
      },
      {
        type: "Corrective Maintenance",
        total: 4,
        color: am4core.color("#D8D6D6"),
      },
      {
        type: "Predictive Maintenance",
        total: 0,
        color: am4core.color("#BF9000"),
      },
    ];

    chart.innerRadius = am4core.percent(40);
    // chart.depth = 120;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "total";
    // series.dataFields.depthValue = "total";
    series.dataFields.category = "type";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    series.ticks.template.disabled = true;
    series.alignLabels = false;
    series.labels.template.text = "{value}";
    series.labels.template.radius = am4core.percent(-40);
    series.labels.template.fill = am4core.color("white");
    series.slices.template.propertyFields.fill = "color";

    this.piesix = chart;
  }

  initPieSeven() {
    let chart = am4core.create("piedivseven", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        type: "Preventive Maintenance",
        total: 133,
        color: am4core.color("#2174C7"),
      },
      {
        type: "Corrective Maintenance",
        total: 92,
        color: am4core.color("#D8D6D6"),
      },
      {
        type: "Predictive Maintenance",
        total: 0,
        color: am4core.color("#BF9000"),
      },
    ];

    chart.innerRadius = am4core.percent(40);
    // chart.depth = 120;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "total";
    // series.dataFields.depthValue = "total";
    series.dataFields.category = "type";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    series.ticks.template.disabled = true;
    series.alignLabels = false;
    series.labels.template.text = "{value}";
    series.labels.template.radius = am4core.percent(-40);
    series.labels.template.fill = am4core.color("white");
    series.slices.template.propertyFields.fill = "color";

    this.pieseven = chart;
  }

  initPieEight() {
    let chart = am4core.create("piediveight", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        type: "Preventive Maintenance",
        total: 2050,
        color: am4core.color("#2174C7"),
      },
      {
        type: "Corrective Maintenance",
        total: 30,
        color: am4core.color("#D8D6D6"),
      },
      {
        type: "Predictive Maintenance",
        total: 0,
        color: am4core.color("#BF9000"),
      },
    ];

    chart.innerRadius = am4core.percent(40);
    // chart.depth = 120;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "total";
    // series.dataFields.depthValue = "total";
    series.dataFields.category = "type";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    series.ticks.template.disabled = true;
    series.alignLabels = false;
    series.labels.template.text = "{value}";
    series.labels.template.radius = am4core.percent(-40);
    series.labels.template.fill = am4core.color("white");
    series.slices.template.propertyFields.fill = "color";

    this.pieeight = chart;
  }

  initPieNine() {
    let chart = am4core.create("piedivnine", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        type: "Preventive Maintenance",
        total: 12,
        color: am4core.color("#2174C7"),
      },
      {
        type: "Corrective Maintenance",
        total: 0,
        color: am4core.color("#D8D6D6"),
      },
      {
        type: "Predictive Maintenance",
        total: 0,
        color: am4core.color("#BF9000"),
      },
    ];

    chart.innerRadius = am4core.percent(40);
    // chart.depth = 120;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "total";
    // series.dataFields.depthValue = "total";
    series.dataFields.category = "type";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    series.ticks.template.disabled = true;
    series.alignLabels = false;
    series.labels.template.text = "{value}";
    series.labels.template.radius = am4core.percent(-40);
    series.labels.template.fill = am4core.color("white");
    series.slices.template.propertyFields.fill = "color";

    this.pienine = chart;
  }
}
