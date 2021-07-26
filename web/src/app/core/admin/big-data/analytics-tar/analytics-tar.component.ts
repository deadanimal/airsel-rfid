import { Component, OnInit, NgZone } from '@angular/core';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { AssetsModel } from 'src/app/shared/services/assets/assets.model';
import { map, tap, catchError } from "rxjs/operators";
import { formatDate } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";  
import { TarService } from "src/app/shared/services/analytic-tar/analytic-tar.service"


am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-analytics-tar',
  templateUrl: './analytics-tar.component.html',
  styleUrls: ['./analytics-tar.component.scss']
})
export class AnalyticsTarComponent implements OnInit {
  asset_registered_length: number = 0;
  assetRegistration: AssetsModel[] = [];
  // selected_date: any;

  dateToday = new Date();

  assetowningdepartment = [
    { value: "CBS", name: "CUSTOMER BILLING SERVICES" },
    { value: "DISTRIBUTION", name: "DISTRIBUTION" },
    { value: "ES-D", name: "ENGINEERING SERVICES – DISTRIBUTION" },
    { value: "FLEET", name: "FLEET" },
    { value: "LAND", name: "LAND" },
    { value: "NRW", name: "NRW" },
    { value: "PD-N", name: "PRODUCTION NORTHERN" },
    { value: "PD-S", name: "PRODUCTION SOUTHERN" },
    { value: "SCADA", name: "SCADA" },
    { value: "WQ", name: "WATER QUALITY" },
  ];

  private charttwo: am4charts.XYChart;

  constructor(
    private zone: NgZone,
    private assetsService: AssetsService,
    private SpinnerService: NgxSpinnerService,
    private tarService: TarService,

  ) { }

  ngOnInit() {
    this.getTAR();
    this.getAssetRegistered();
    // this.initChartTwo();

    
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initChartTwo();
    });
  }

  ngAfterViewChecked() {
    // if date range not empty 
    // call api and slice data between range

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.charttwo) this.charttwo.dispose();
    });
  }

  chartData: any
  getTAR(){
    this.SpinnerService.show();

    this.tarService.get().subscribe(
      (res) => {
        console.log("TARSER", res)
        this.chartData = res

        for(let i in this.chartData){
          this.asset_registered_length += this.chartData[i].total
        }
        console.log("total", this.asset_registered_length)
        
        this.initChartTwo()

       

        console.log("chartData", this.chartData)
        this.SpinnerService.hide();

      },
      (err) => {

      }
    );

  }

  assets: any;

  getAssetRegistered() {

    // this.SpinnerService.show();
    this.currentDate = true
    this.filteredDate = false

    this.assetsService.get().subscribe(
      (res) => {
        console.log("Resss", res);
        this.assets = res;
        // this.asset_registered_length = res.length;

        this.getChartdata();

      },
      (err) => {

      }
    );

  }

  selected_date: any;
  asset_owning: any;
  fromDate: any
  toDate: any
  currentDate = true
  filteredDate = false

  filter() {
    console.log("asset_owning", this.asset_owning)

    let temp: AssetsModel[] = [];
    let temp2: AssetsModel[] = [];

    // for (let i in this.assets){

    // }

    this.SpinnerService.show();
    this.assetsService.get().pipe(map(x => x.filter(i => i.registered_datetime != null))).subscribe((response) => {
      // temp = response
      // console.log("temp", temp)

      if (this.asset_owning != null && this.selected_date == null) {
        temp = response.filter((value) => value.owning_access_group.includes(this.asset_owning));
        console.log("temp", temp);
        temp2 = temp;
      }
      else if (this.asset_owning == null && this.selected_date != null) {
        this.fromDate = this.selected_date[0]
        this.toDate = this.selected_date[1]

        console.log("from", this.fromDate);
        console.log("to", this.toDate);
        temp = response;
        for (let i in temp) {
          if (formatDate(temp[i].registered_datetime, 'yyyy-MM-dd', 'en_US') >= formatDate(this.fromDate, 'yyyy-MM-dd', 'en_US') && formatDate(this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') <= formatDate(this.toDate, 'yyyy-MM-dd', 'en_US'))
            temp2.push(temp[i])
        }
        this.currentDate = false
        this.filteredDate = true

      }
      else if (this.asset_owning != null && this.selected_date != null) {

        this.fromDate = this.selected_date[0]
        this.toDate = this.selected_date[1]

        console.log("from", this.fromDate);
        console.log("to", this.toDate);

        temp = response.filter((value) => value.owning_access_group.includes(this.asset_owning));
        console.log("temp", temp);

        for (let i in temp) {
          if (formatDate(temp[i].registered_datetime, 'yyyy-MM-dd', 'en_US') >= formatDate(this.fromDate, 'yyyy-MM-dd', 'en_US') && formatDate(this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') <= formatDate(this.toDate, 'yyyy-MM-dd', 'en_US'))
            temp2.push(temp[i])
        }

        this.currentDate = false
        this.filteredDate = true
      }

      console.log("temp2", temp2)
      console.log("temp2 length", temp2.length)

      this.assets = temp2
      this.asset_registered_length = this.assets.length;
      console.log('assets', this.assets);

      this.getChartdata();
      
      // this.initChartTwo();

      console.log("filtered chartdata", this.chartData)
      // this.initChartTwo();

      this.SpinnerService.hide();

    }, (error) => {
      console.log('Error is ', error)
    })
  }

  // 
  getChartdata() {

    this.chartData = [
      { title: "CBS", total: 0, },
      { title: "DISTRIBUTION", total: 0, },
      { title: "ES-D", total: 0, },
      { title: "FLEET", total: 0, },
      { title: "LAND", total: 0, },
      { title: "NRW", total: 0, },
      { title: "PD-N", total: 0, },
      { title: "PD-S", total: 0, },
      { title: "SCADA", total: 0, },
      { title: "WQ", total: 0, },
    ];

    for (let i in this.assets) {

      if (this.assets[i].owning_access_group == "CBS") {
        this.chartData[0].total += 1;
      }
      else if (this.assets[i].owning_access_group == "DISTRIBUTION") {
        this.chartData[1].total += 1;
      }
      else if (this.assets[i].owning_access_group == "ES-D") {
        this.chartData[2].total += 1;
      }
      else if (this.assets[i].owning_access_group == "FLEET") {
        this.chartData[3].total += 1;
      }
      else if (this.assets[i].owning_access_group == "LAND") {
        this.chartData[4].total += 1;
      }
      else if (this.assets[i].owning_access_group == "NRW") {
        this.chartData[5].total += 1;
      }
      else if (this.assets[i].owning_access_group == "PD-N") {
        this.chartData[6].total += 1;
      }
      else if (this.assets[i].owning_access_group == "PD-S") {
        this.chartData[7].total += 1;
      }
      else if (this.assets[i].owning_access_group == "SCADA") {
        this.chartData[8].total += 1;
      }
      else if (this.assets[i].owning_access_group == "WQ") {
        this.chartData[9].total += 1;
      }
    }

    console.log("chartdata", this.chartData)
    this.initChartTwo();

  }

  initChartTwo() {

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    let chart = am4core.create("chartdivtwo", am4charts.XYChart);

    chart.paddingBottom = 50;

    chart.cursor = new am4charts.XYCursor();
    chart.scrollbarX = new am4core.Scrollbar();

    // Modify chart's colors
    chart.colors.list = [
      am4core.color("#809fd5"),
    ];

    // Add data
    chart.data = this.chartData

    console.log("this.chartData 3", this.chartData)
    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "title";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
      if (target.dataItem && target.dataItem.index && 2 == 2) {
        return dy + 25;
      }
      return dy;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "total";
    series.dataFields.categoryX = "title";
    series.name = "Totals";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    this.charttwo = chart;

  }

}