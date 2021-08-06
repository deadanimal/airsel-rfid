import { Component, OnInit, NgZone } from '@angular/core';


import { WorkOrderActivityCompletionService } from 'src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service';
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { WorkOrderActivityCompletionAssetLocationAssetListService } from 'src/app/shared/services/WorkOrderActivityCompletionAssetLocationAssetList/WorkOrderActivityCompletionAssetLocationAssetList.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { AssetsModel } from 'src/app/shared/services/assets/assets.model';
import { WorkOrderActivityCompletionModel } from 'src/app/shared/services/work-order-activity-completion/work-order-activity-completion.model';
import { WorkOrderActivityCompletionAssetLocationAssetListModel } from 'src/app/shared/services/WorkOrderActivityCompletionAssetLocationAssetList/WorkOrderActivityCompletionAssetLocationAssetList.model';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { NgxSpinnerService } from "ngx-spinner";  
import { TarService } from "src/app/shared/services/analytic-tar/analytic-tar.service"


am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-analytics-wa',
  templateUrl: './analytics-wa.component.html',
  styleUrls: ['./analytics-wa.component.scss']
})
export class AnalyticsWaComponent implements OnInit {

  private chartone: am4charts.XYChart;

  constructor(
    private tarService: TarService,
    private zone: NgZone,
    public workOrderActivityCompletionService: WorkOrderActivityCompletionService,
    public assetsService: AssetsService,
    public WOACALALS: WorkOrderActivityCompletionAssetLocationAssetListService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {

    this.getWorkOrderActivity();
    this.waCompute();
    //this.getAssets();
  }

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

  //variable
  WorkOrderActivity: any;
  totalWorkOrder: any
  tempTotalWorkOrder: any
  backLog: any
  totalBackLogToday: any
  totalBackLogYesterday: any
  backLogPercentageToday: any
  backLogPercentageYesterday: any

  getWorkOrderActivity() {

    // let temp = []
    this.workOrderActivityCompletionService.get().subscribe((response) => {
      console.log('response from API is ', response);
      this.WorkOrderActivity = response;
      console.log("WorkOrderActivity", this.WorkOrderActivity);

      this.getTotalWorkOrder();
      // this.updateFilter();

      this.getTotalBackLog();
      this.getChartData();
      // this.initChartOne();
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  waCompute() {
    this.tarService.post_analytics_wa().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTotalBackLog() {

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)

    console.log("today", today)
    console.log("yesterday", yesterday)

    let yesterdayBacklog = []

    this.backLog = this.WorkOrderActivity.filter((value) => value.status.includes("BackLog"));
    console.log("BackLog", this.backLog);

    for (let i in this.backLog) {

      const filteredData = formatDate(this.backLog[i].modified_date, 'yyyy-MM-dd', 'en_US') < formatDate(today, 'yyyy-MM-dd', 'en_US');
      console.log("filtered backlog", filteredData)

      if (formatDate(this.backLog[i].modified_date, 'yyyy-MM-dd', 'en_US') < formatDate(today, 'yyyy-MM-dd', 'en_US'))
        yesterdayBacklog[i] = this.backLog[i]

      // if (formatDate(this.backLog[i].modified_date, 'yyyy-MM-dd', 'en_US') <= formatDate(this.yesterday, 'yyyy-MM-dd', 'en_US'))
      //   yesterdayBacklog[i] = this.backLog[i]
    }
    console.log("yesterday BackLog", yesterdayBacklog)

    this.totalBackLogToday = this.backLog.length
    this.totalBackLogYesterday = yesterdayBacklog.length
    const totalActivity = this.WorkOrderActivity.length

    console.log("Today", this.totalBackLogToday)
    console.log("yesterday", this.totalBackLogYesterday)

    this.backLogPercentageToday = ((this.totalBackLogToday / totalActivity) * 100).toFixed(2);
    this.backLogPercentageYesterday = ((this.totalBackLogYesterday / totalActivity) * 100).toFixed(2);

  }

  getTotalWorkOrder() {
    this.totalWorkOrder = this.WorkOrderActivity.length;
    this.tempTotalWorkOrder = this.WorkOrderActivity.length;
    console.log("Total work order", this.totalWorkOrder);
    console.log("Temp Total work order", this.tempTotalWorkOrder);

  }

  chartData: any;

  getChartData() {

    let data = [
      { category: "CBS", backLog: 0, inprogress: 0, new: 0 },
      { category: "DISTRIBUTION", backLog: 0, inprogress: 0, new: 0 },
      { category: "ES-D", backLog: 0, inprogress: 0, new: 0 },
      { category: "FLEET", backLog: 0, inprogress: 0, new: 0 },
      { category: "LAND", backLog: 0, inprogress: 0, new: 0 },
      { category: "NRW", backLog: 0, inprogress: 0, new: 0 },
      { category: "PD-N", backLog: 0, inprogress: 0, new: 0 },
      { category: "PD-S", backLog: 0, inprogress: 0, new: 0 },
      { category: "SCADA", backLog: 0, inprogress: 0, new: 0 },
      { category: "WQ", backLog: 0, inprogress: 0, new: 0 },
    ];

    //let temp = this.WorkOrderActivity;
    //let temp2: any;
    //let temp3: any;

    //let test = []

    //console.log("temp", temp)

    //for (let j in temp) {

    //  console.log("id : ", temp[j].asset_location_asset_list[0])

    //  this.WOACALALS.get().pipe(map(x => x.filter(i => i.id == temp[j].asset_location_asset_list[0]))).subscribe((response) => {
    //    console.log('response from API is ', response);
    //    temp2 = response;
    //    console.log("temp2", temp2);

    //    temp3 = this.assets.filter((value) => value.asset_id.includes(temp2[0].asset_id));

    //    console.log("temp3 debug", temp3);
    //    console.log("owning org", temp3[0].owning_access_group);

    //    if (temp3[0].owning_access_group == "CBS") {
    //      if (temp[j].status == "BackLog") {
    //        data[0].backLog += 1;
    //      }
    //      else if (temp[j].status == "InProgress") {
    //        data[0].inprogress += 1;
    //      }
    //      else if (temp[j].status == "New") {
    //        data[0].new += 1;
    //      }
    //      else {
    //        console.log("Failed ", temp3[0].owning_access_group)
    //      }
    //    }
    //    else if (temp3[0].owning_access_group == "DISTRIBUTION") {
    //      if (temp[j].status == "BackLog") {
    //        data[1].backLog += 1;
    //      }
    //      else if (temp[j].status == "InProgress") {
    //        data[1].inprogress += 1;
    //      }
    //      else if (temp[j].status == "New") {
    //        data[1].new += 1;
    //      }
    //      else {
    //        console.log("Failed ", temp3[0].owning_access_group)
    //      }
    //    }
    //    else if (temp3[0].owning_access_group == "ES-D") {
    //      if (temp[j].status == "BackLog") {
    //        data[2].backLog += 1;
    //      }
    //      else if (temp[j].status == "InProgress") {
    //        data[2].inprogress += 1;
    //      }
    //      else if (temp[j].status == "New") {
    //        data[2].new += 1;
    //      }
    //      else {
    //        console.log("Failed ", temp3[0].owning_access_group)
    //      }
    //    }
    //    else if (temp3[0].owning_access_group == "FLEET") {
    //      // data[3].backLog += 1;
    //      if (temp[j].status == "BackLog") {
    //        data[3].backLog += 1;
    //      }
    //      else if (temp[j].status == "InProgress") {
    //        data[3].inprogress += 1;
    //      }
    //      else if (temp[j].status == "New") {
    //        data[3].new += 1;
    //      }
    //      else {
    //        console.log("Failed ", temp3[0].owning_access_group)
    //      }
    //    }
    //    else if (temp3[0].owning_access_group == "LAND") {
    //      if (temp[j].status == "BackLog") {
    //        data[4].backLog += 1;
    //      }
    //      else if (temp[j].status == "InProgress") {
    //        data[4].inprogress += 1;
    //      }
    //      else if (temp[j].status == "New") {
    //        data[4].new += 1;
    //      }
    //      else {
    //        console.log("Failed ", temp3[0].owning_access_group)
    //      }
    //    }
    //    else if (temp3[0].owning_access_group == "NRW") {
    //      if (temp[j].status == "BackLog") {
    //        data[5].backLog += 1;
    //      }
    //      else if (temp[j].status == "InProgress") {
    //        data[5].inprogress += 1;
    //      }
    //      else if (temp[j].status == "New") {
    //        data[5].new += 1;
    //      }
    //      else {
    //        console.log("Failed ", temp3[0].owning_access_group)
    //      }
    //    }
    //    else if (temp3[0].owning_access_group == "PD-N") {
    //      if (temp[j].status == "BackLog") {
    //        data[6].backLog += 1;
    //      }
    //      else if (temp[j].status == "InProgress") {
    //        data[6].inprogress += 1;
    //      }
    //      else if (temp[j].status == "New") {
    //        data[6].new += 1;
    //      }
    //      else {
    //        console.log("Failed ", temp3[0].owning_access_group)
    //      }
    //    }
    //    else if (temp3[0].owning_access_group == "PD-S") {
    //      if (temp[j].status == "BackLog") {
    //        data[7].backLog += 1;
    //      }
    //      else if (temp[j].status == "InProgress") {
    //        data[7].inprogress += 1;
    //      }
    //      else if (temp[j].status == "New") {
    //        data[7].new += 1;
    //      }
    //      else {
    //        console.log("Failed ", temp3[0].owning_access_group)
    //      }
    //    }
    //    else if (temp3[0].owning_access_group == "SCADA") {
    //      if (temp[j].status == "BackLog") {
    //        data[8].backLog += 1;
    //      }
    //      else if (temp[j].status == "InProgress") {
    //        data[8].inprogress += 1;
    //      }
    //      else if (temp[j].status == "New") {
    //        data[8].new += 1;
    //      }
    //      else {
    //        console.log("Failed ", temp3[0].owning_access_group)
    //      }
    //    }
    //    else if (temp3[0].owning_access_group == "WQ") {
    //      if (temp[j].status == "BackLog") {
    //        data[9].backLog += 1;
    //      }
    //      else if (temp[j].status == "InProgress") {
    //        data[9].inprogress += 1;
    //      }
    //      else if (temp[j].status == "New") {
    //        data[9].new += 1;
    //      }
    //      else {
    //        console.log("Failed ", temp3[0].owning_access_group)
    //      }
    //    }
    //    else {
    //      console.log("Failed ", temp3[0].owning_access_group)
    //    }

    //    console.log("data", data);
    //    this.chartData = data;
    //    console.log("Chartdata", this.chartData);

    //    console.log("test", test)

    //    this.initChartOne();

    //  }, (error) => {
    //    console.log('Error is ', error)
    //  })
    //}
    this.SpinnerService.show();
    this.tarService.get_analytics_wa().subscribe(
      (res) => {
        console.log(res);

        this.chartData = res;
        this.SpinnerService.hide();



      },
      (err) => {
        console.log(err);

      },
      () => {
        this.initChartOne()
      }
    );

  }

  assets: any;
  getAssets() {
    this.SpinnerService.show();  
    this.assetsService.get().pipe(map(x => x.filter(i => i.owning_access_group != ""))).subscribe((response) => {
      console.log('response from API is ', response);
      this.assets = response;
      console.log('assets', this.assets);

      this.getWorkOrderActivity();
      this.SpinnerService.hide();

    }, (error) => {
      console.log('Error is ', error)
    })
  }

  asset_owning: any;
  selected_date: any;

  filter() {

    let temp: any = []
    let temp2: any = []


    this.workOrderActivityCompletionService.get().subscribe((response) => {
      // temp = response
      // console.log("temp", temp)

      console.log("asset_owning", this.asset_owning)
      console.log("response", response)

      if (this.asset_owning != null && this.selected_date == null) {
        temp = response.filter((value) => value.owning_organization.includes(this.asset_owning));
        console.log("temp", temp);
        temp2 = temp;

      }
      else if (this.asset_owning == null && this.selected_date != null) {
        let from = this.selected_date[0]
        let to = this.selected_date[1]

        console.log("from", from);
        console.log("to", to);
        console.log("from 2", formatDate(from, 'yyyy-MM-dd', 'en_US'));
        console.log("to 2", formatDate(to, 'yyyy-MM-dd', 'en_US'));

        temp = response;
        for (let i in temp) {
          if (formatDate(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') >= formatDate(from, 'yyyy-MM-dd', 'en_US') && formatDate(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') <= formatDate(to, 'yyyy-MM-dd', 'en_US')) {
            console.log("data" + i, formatDate(temp[i].modified_date, 'yyyy-MM-dd', 'en_US'));

            temp2.push(temp[i])

          }
        }
      }
      else if (this.asset_owning != null && this.selected_date != null) {

        let from = this.selected_date[0]
        let to = this.selected_date[1]
        console.log("from", from);
        console.log("to", to);

        temp = response.filter((value) => value.owning_organization.includes(this.asset_owning));
        console.log("temp", temp);

        for (let i in temp) {
          if (formatDate(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') >= formatDate(from, 'yyyy-MM-dd', 'en_US') && formatDate(temp[i].modified_date, 'yyyy-MM-dd', 'en_US') <= formatDate(to, 'yyyy-MM-dd', 'en_US'))
            temp2.push(temp[i])
        }
      }

      console.log("temp2", temp2)
      console.log("temp2 length", temp2.length)

      // this.assets = temp2
      // console.log('assets', this.assets);
      this.totalWorkOrder = temp2.length


    }, (error) => {
      console.log('Error is ', error)
    })
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
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdivone", am4charts.XYChart);


    // Add data
    chart.data = this.chartData;

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.calculateTotals = true;

     // Modify chart's colors
     chart.colors.list = [
      am4core.color("#f5365b"),
      am4core.color("#fed602"),
      am4core.color("#2bce89"),
    ];

    // Create series
    function createSeries(field, name) {

      // Set up series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "category";
      series.sequencedInterpolation = true;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

      // Add label
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{valueY}";
      labelBullet.label.fill = am4core.color("#fff");
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;

      return series;
    }

    createSeries("backLog", "BackLog");
    createSeries("inprogress", "Active");
    createSeries("new", "New");


    // Create series for total
    let totalSeries = chart.series.push(new am4charts.ColumnSeries());
    totalSeries.dataFields.valueY = "none";
    totalSeries.dataFields.categoryX = "category";
    totalSeries.stacked = true;
    totalSeries.hiddenInLegend = true;
    totalSeries.columns.template.strokeOpacity = 0;

    let totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
    totalBullet.dy = -20;
    totalBullet.label.text = "{valueY.total}";
    totalBullet.label.hideOversized = false;
    totalBullet.label.fontSize = 18;
    totalBullet.label.background.fill = totalSeries.stroke;
    totalBullet.label.background.fillOpacity = 0.2;
    totalBullet.label.padding(5, 10, 5, 10);
    totalBullet.label.fill = am4core.color("#000000");


    valueAxis.extraMax = 0.1;
    valueAxis.calculateTotals = true;

    // Legend
    chart.legend = new am4charts.Legend();

    this.chartone = chart
  }

}
