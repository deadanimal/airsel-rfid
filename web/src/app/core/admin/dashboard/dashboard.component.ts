import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as moment from "moment";
import * as L from "leaflet";
import * as mapboxgl from "mapbox-gl";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

import { CompareChartData } from "../../../../assets/mock/dashboard";
import { Map, NavigationControl, Popup } from "mapbox-gl";
import { GeojsonService } from "src/app/shared/services/geojson/geojson.service";
import { columnsByPin } from "@swimlane/ngx-datatable/release/utils";
import { WorkOrderActivityCompletionService } from "src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { WorkRequestService } from "src/app/shared/services/work-request/work-request.service";

import { formatDate } from "@angular/common";
import { map } from "rxjs/operators";
import { AssetsModel } from "src/app/shared/services/assets/assets.model";

import { JwtService } from 'src/app/shared/handler/jwt/jwt.service';

import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { WorkActivitiesService } from "src/app/shared/services/work-activities/work-activities.service";
import { WorkActivityEmployeeService } from "src/app/shared/services/work-activity-employee/work-activity-employee.service";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {


  constructor(
    private geoJSONSrv: GeojsonService,
    private zone: NgZone,
    public workOrderActivityCompletionService: WorkOrderActivityCompletionService,
    public assetsService: AssetsService,

    public jwtService: JwtService,
    private router: Router,
    public workRequestService: WorkRequestService,
    private workactivityService: WorkActivitiesService,
    private workactivityemployeeService: WorkActivityEmployeeService) { }


  // variables
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
  ];

  // work activity
  //variable
  WorkOrderActivity: any;
  totalWorkOrder: any
  tempTotalWorkOrder: any
  backLog: any
  totalBackLogToday: any
  totalBackLogYesterday: any
  backLogPercentageToday: any
  backLogPercentageYesterday: any
  dateToday = new Date();


  completedPreventiveMaintenance: number = 0;
  latestMonth = new Date();
  getWorkOrderActivity() {

    // let temp = []
    this.workOrderActivityCompletionService.get().subscribe((response) => {
      console.log('response from API is ', response);
      this.WorkOrderActivity = response;
      console.log("WorkOrderActivity", this.WorkOrderActivity);

      //work activity statistic
      this.workorderactivity = response;
      this.calcWorkActivityStatistic();

      this.getTotalWorkOrder();
      // this.updateFilter();

      this.getTotalBackLog();
      this.getChartData();
      this.initChartOne();

      //calculate preventive maintenance
      for (let i in response) {

        if (response[i].field_1 == "PREVENTIVE MAINTENANCE") {
          this.completedPreventiveMaintenance += response[i].asset_location_asset_list.length
        }
      }
      console.log("completedPreventiveMaintenance", this.completedPreventiveMaintenance)

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

    this.workOrderActivityCompletionService

    let data = [
      { category: "CBS", value1: 0, value2: 0 },
      { category: "DISTRIBUTION", value1: 0, value2: 0 },
      { category: "ES-D", value1: 0, value2: 0 },
      { category: "FLEET", value1: 0, value2: 0 },
      { category: "LAND", value1: 0, value2: 0 },
      { category: "NRW", value1: 0, value2: 0 },
      { category: "PD-N", value1: 0, value2: 0 },
      { category: "PD-S", value1: 0, value2: 0 },
      { category: "SCADA", value1: 0, value2: 0 },
      { category: "WQ", value1: 0, value2: 0 },
    ];

    for (let i in this.workOrderActivityCompletionService) {

      if (this.workOrderActivityCompletionService[i].owning_organization == "CBS") {
        data[0].value1 += 1;
        if (this.workOrderActivityCompletionService[i].status == "BackLog") {
          data[0].value2 += 1;
        }
      }
      else if (this.workOrderActivityCompletionService[i].owning_organization == "DISTRIBUTION") {
        data[1].value1 += 1;
        if (this.workOrderActivityCompletionService[i].status == "BackLog") {
          data[1].value2 += 1;
        }
      }
      else if (this.workOrderActivityCompletionService[i].owning_organization == "ES-D") {
        data[2].value1 += 1;
        if (this.workOrderActivityCompletionService[i].status == "BackLog") {
          data[2].value2 += 1;
        }
      }
      else if (this.workOrderActivityCompletionService[i].owning_organization == "FLEET") {
        data[3].value1 += 1;
        if (this.workOrderActivityCompletionService[i].status == "BackLog") {
          data[3].value2 += 1;
        }
      }
      else if (this.workOrderActivityCompletionService[i].owning_organization == "LAND") {
        data[4].value1 += 1;
        if (this.workOrderActivityCompletionService[i].status == "BackLog") {
          data[4].value2 += 1;
        }
      }
      else if (this.workOrderActivityCompletionService[i].owning_organization == "NRW") {
        data[5].value1 += 1;
        if (this.workOrderActivityCompletionService[i].status == "BackLog") {
          data[5].value2 += 1;
        }
      }
      else if (this.workOrderActivityCompletionService[i].owning_organization == "PD-N") {
        data[6].value1 += 1;
        if (this.workOrderActivityCompletionService[i].status == "BackLog") {
          data[6].value2 += 1;
        }
      }
      else if (this.workOrderActivityCompletionService[i].owning_organization == "PD-S") {
        data[7].value1 += 1;
        if (this.workOrderActivityCompletionService[i].status == "BackLog") {
          data[7].value2 += 1;
        }
      }
      else if (this.workOrderActivityCompletionService[i].owning_organization == "SCADA") {
        data[8].value1 += 1;
        if (this.workOrderActivityCompletionService[i].status == "BackLog") {
          data[8].value2 += 1;
        }
      }
      else if (this.workOrderActivityCompletionService[i].owning_organization == "WQ") {
        data[9].value1 += 1;
        if (this.workOrderActivityCompletionService[i].status == "BackLog") {
          data[9].value2 += 1;
        }
      }
    }
    console.log("data", data);
    this.chartData = data;
  }
  //end work activity

  //asset condition score

  assets: any;
  totalAssets: any;

  public assetsToday = []
  totalAssetToday: any;

  firstDayLastMonth = new Date();
  assetsLastMonth = [];
  totalassetsLastMonth: any

  PercentageAssetConditionRating: any;
  totalConditionRating: number = 0;

  nullassetOwning = []

  tableAssetConditionStores: any;

  getAssets() {
    this.assetsService.get().pipe(map(x => x.filter(i => i.owning_access_group != ""))).subscribe((response) => {
      console.log('response from API is ', response);
      this.assets = response;
      console.log('assets', this.assets);
      this.totalAssets = this.assets.length
      console.log('totalAssets', this.totalAssets);

      //calculate asset condition rating
      this.getTotalAssetToday();
      this.calcPercentageAssetConditionRating();
      this.getAssetConditionStores();

      //calculate total asset registered
      this.asset_registered_length = response.length;
      this.getChartdata();

    }, (error) => {
      console.log('Error is ', error)
    })
  }

  getTotalAssetToday() {
    const today = new Date();
    console.log("today", today)

    let assetsToday = [];

    for (let i in this.assets) {

      if (formatDate(this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') == formatDate(today, 'yyyy-MM-dd', 'en_US'))
        this.assetsToday[i] = this.assets[i]

    }
    this.totalAssetToday = assetsToday.length
    console.log("totalToday", this.totalAssetToday)
    console.log("assets today", this.assetsToday)


    let date = new Date()
    var firstDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.firstDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.firstDayLastMonth.setMonth(this.firstDayLastMonth.getMonth() - 1)

    console.log("firstDayThisMonth", firstDayThisMonth)
    console.log("firstDayLastMonth", this.firstDayLastMonth)

    for (let i in this.assets) {

      if (formatDate(this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') >= formatDate(this.firstDayLastMonth, 'yyyy-MM-dd', 'en_US') && formatDate(this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') < formatDate(firstDayThisMonth, 'yyyy-MM-dd', 'en_US'))
        this.assetsLastMonth[i] = this.assets[i]
    }
    this.totalassetsLastMonth = this.assetsLastMonth.length
    console.log("total lastmonth", this.totalAssetToday)
    console.log("assets last month", this.assetsLastMonth)

  }

  calcPercentageAssetConditionRating() {

    this.totalConditionRating = 0;

    for (let i in this.assets) {
      this.totalConditionRating += parseFloat(this.assets[i].condition_rating);
    }

    this.PercentageAssetConditionRating = (this.totalConditionRating / this.totalAssets * 100).toFixed(2)

    console.log("totalConditionRating", this.totalConditionRating)
    console.log("PercentageAssetConditionRating", this.PercentageAssetConditionRating)
  }

  getAssetConditionStores() {

    this.tableAssetConditionStores = [
      { title: "CBD", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
      { title: "DISTRIBUTION", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
      { title: "ES-D", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
      { title: "FLEET", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
      { title: "LAND", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
      { title: "NRW", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
      { title: "PD-N", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
      { title: "PD-S", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
      { title: "SCADA", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
      { title: "WQ", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
    ];

    for (let i in this.assets) {

      if (this.assets[i].owning_access_group == "CBD") {
        this.tableAssetConditionStores[0].noasset += 1;

        if (this.assets[i].condition_rating < 2)
          this.tableAssetConditionStores[0].one += 1;
        else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
          this.tableAssetConditionStores[0].two += 1;
        else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
          this.tableAssetConditionStores[0].three += 1;
        else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
          this.tableAssetConditionStores[0].four += 1;
        else if (this.assets[i].condition_rating >= 5)
          this.tableAssetConditionStores[0].five += 1;
      }
      else if (this.assets[i].owning_access_group == "DISTRIBUTION") {
        this.tableAssetConditionStores[1].noasset += 1;

        if (this.assets[i].condition_rating < 2)
          this.tableAssetConditionStores[1].one += 1;
        else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
          this.tableAssetConditionStores[1].two += 1;
        else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
          this.tableAssetConditionStores[1].three += 1;
        else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
          this.tableAssetConditionStores[1].four += 1;
        else if (this.assets[i].condition_rating >= 5)
          this.tableAssetConditionStores[1].five += 1;
      }
      else if (this.assets[i].owning_access_group == "ES-D") {
        this.tableAssetConditionStores[2].noasset += 1;

        if (this.assets[i].condition_rating < 2)
          this.tableAssetConditionStores[2].one += 1;
        else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
          this.tableAssetConditionStores[2].two += 1;
        else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
          this.tableAssetConditionStores[2].three += 1;
        else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
          this.tableAssetConditionStores[2].four += 1;
        else if (this.assets[i].condition_rating >= 5)
          this.tableAssetConditionStores[2].five += 1;
      }
      else if (this.assets[i].owning_access_group == "FLEET") {
        this.tableAssetConditionStores[3].noasset += 1;

        if (this.assets[i].condition_rating < 2)
          this.tableAssetConditionStores[3].one += 1;
        else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
          this.tableAssetConditionStores[3].two += 1;
        else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
          this.tableAssetConditionStores[3].three += 1;
        else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
          this.tableAssetConditionStores[3].four += 1;
        else if (this.assets[i].condition_rating >= 5)
          this.tableAssetConditionStores[3].five += 1;
      }
      else if (this.assets[i].owning_access_group == "LAND") {
        this.tableAssetConditionStores[4].noasset += 1;

        if (this.assets[i].condition_rating < 2)
          this.tableAssetConditionStores[4].one += 1;
        else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
          this.tableAssetConditionStores[4].two += 1;
        else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
          this.tableAssetConditionStores[4].three += 1;
        else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
          this.tableAssetConditionStores[4].four += 1;
        else if (this.assets[i].condition_rating >= 5)
          this.tableAssetConditionStores[4].five += 1;
      }
      else if (this.assets[i].owning_access_group == "NRW") {
        this.tableAssetConditionStores[5].noasset += 1;

        if (this.assets[i].condition_rating < 2)
          this.tableAssetConditionStores[5].one += 1;
        else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
          this.tableAssetConditionStores[5].two += 1;
        else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
          this.tableAssetConditionStores[5].three += 1;
        else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
          this.tableAssetConditionStores[5].four += 1;
        else if (this.assets[i].condition_rating >= 5)
          this.tableAssetConditionStores[5].five += 1;
      }
      else if (this.assets[i].owning_access_group == "PD-N") {
        this.tableAssetConditionStores[6].noasset += 1;

        if (this.assets[i].condition_rating < 2)
          this.tableAssetConditionStores[6].one += 1;
        else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
          this.tableAssetConditionStores[6].two += 1;
        else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
          this.tableAssetConditionStores[6].three += 1;
        else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
          this.tableAssetConditionStores[6].four += 1;
        else if (this.assets[i].condition_rating >= 5)
          this.tableAssetConditionStores[6].five += 1;
      }
      else if (this.assets[i].owning_access_group == "PD-S") {
        this.tableAssetConditionStores[7].noasset += 1;

        if (this.assets[i].condition_rating < 2)
          this.tableAssetConditionStores[7].one += 1;
        else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
          this.tableAssetConditionStores[7].two += 1;
        else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
          this.tableAssetConditionStores[7].three += 1;
        else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
          this.tableAssetConditionStores[7].four += 1;
        else if (this.assets[i].condition_rating >= 5)
          this.tableAssetConditionStores[7].five += 1;
      }
      else if (this.assets[i].owning_access_group == "SCADA") {
        this.tableAssetConditionStores[8].noasset += 1;

        if (this.assets[i].condition_rating < 2)
          this.tableAssetConditionStores[8].one += 1;
        else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
          this.tableAssetConditionStores[8].two += 1;
        else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
          this.tableAssetConditionStores[8].three += 1;
        else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
          this.tableAssetConditionStores[8].four += 1;
        else if (this.assets[i].condition_rating >= 5)
          this.tableAssetConditionStores[8].five += 1;
      }
      else if (this.assets[i].owning_access_group == "WQ") {
        this.tableAssetConditionStores[9].noasset += 1;

        if (this.assets[i].condition_rating < 2)
          this.tableAssetConditionStores[9].one += 1;
        else if (this.assets[i].condition_rating >= 2 && this.assets[i].condition_rating < 3)
          this.tableAssetConditionStores[9].two += 1;
        else if (this.assets[i].condition_rating >= 3 && this.assets[i].condition_rating < 4)
          this.tableAssetConditionStores[9].three += 1;
        else if (this.assets[i].condition_rating >= 4 && this.assets[i].condition_rating < 5)
          this.tableAssetConditionStores[9].four += 1;
        else if (this.assets[i].condition_rating >= 5)
          this.tableAssetConditionStores[9].five += 1;
      }
      else {
        // this.nullassetOwning.push(this.assets[i])
      }
    }
    // console.log("nullassetOwning", this.nullassetOwning)
    console.log("tableAssetConditionStores", this.tableAssetConditionStores)

  }

  //end Asset condition score

  //start Total Asset Registered

  asset_registered_length: number = 0;
  assetRegistration: AssetsModel[] = [];

  chartData2: any
  getChartdata() {

    this.chartData2 = [
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
        this.chartData2[0].total += 1;

      }
      else if (this.assets[i].owning_access_group == "DISTRIBUTION") {
        this.chartData2[1].total += 1;

      }
      else if (this.assets[i].owning_access_group == "ES-D") {
        this.chartData2[2].total += 1;

      }
      else if (this.assets[i].owning_access_group == "FLEET") {
        this.chartData2[3].total += 1;

      }
      else if (this.assets[i].owning_access_group == "LAND") {
        this.chartData2[4].total += 1;

      }
      else if (this.assets[i].owning_access_group == "NRW") {
        this.chartData2[5].total += 1;

      }
      else if (this.assets[i].owning_access_group == "PD-N") {
        this.chartData2[6].total += 1;

      }
      else if (this.assets[i].owning_access_group == "PD-S") {
        this.chartData2[7].total += 1;

      }
      else if (this.assets[i].owning_access_group == "SCADA") {
        this.chartData2[8].total += 1;

      }
      else if (this.assets[i].owning_access_group == "WQ") {
        this.chartData2[9].total += 1;
      }
    }

    console.log("chartdata2", this.chartData2)
    this.initChartTwo();

  }

  //end Total Asset Registered

  // work activity statistic

  workactivities = [];
  workorderactivity: any;

  workActivityStats = []

  calcWorkActivityStatistic() {

    let data = [
      { title: "New", total: 0, today: 0, color: "bg-green", textcolor: "text-green", },
      { title: "In Progress", total: 0, today: 0, color: "bg-yellow", textcolor: "text-yellow", },
      { title: "Backlog", total: 0, today: 0, color: "bg-red", textcolor: "text-red", },
      { title: "Total Generated", total: 0, today: 0, color: "bg-blue", textcolor: "text-blue", },
    ];

    for (let i in this.workorderactivity) {

      if (this.workorderactivity[i].status == "New")
        data[0].total += 1;
      else if (this.workorderactivity[i].status == "InProgress")
        data[1].total += 1;
      else if (this.workorderactivity[i].status == "BackLog")
        data[2].total += 1;
    }
    data[3].total = data[0].total + data[1].total + data[2].total

    console.log("data",data)
    this.workActivityStats = data;

    
  }

  //end work activity statistic


  // Map
  leafletOptions = {
    layers: [
      L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }),
    ],
    zoom: 8,
    center: L.latLng(3.0738, 101.5183),
  };

  // Data
  completedMaintenance = 1420;
  pendingMaintenance = 105;
  delayedMaintenance = 15;
  registeredAsset = 100324;

  markers = [];

  // Chart
  compareChart: am4charts.XYChart;



  centerDistricts = [
    {
      name: "Sabak Bernam",
      lat: 3.7564,
      lng: 100.9549,
      workactivity: 14,
    },
    {
      name: "Kuala Selangor",
      lat: 3.3565,
      lng: 101.2775,
      workactivity: 32,
    },
    {
      name: "Petaling",
      lat: 3.1117,
      lng: 101.5629,
      workactivity: 59,
    },
    {
      name: "Klang",
      lat: 3.0358,
      lng: 101.3977,
      workactivity: 44,
    },
    {
      name: "Kuala Langat",
      lat: 2.8312,
      lng: 101.5079,
      workactivity: 31,
    },
    {
      name: "Hulu Selangor",
      lat: 3.552,
      lng: 101.5796,
      workactivity: 32,
    },
    {
      name: "Gombak",
      lat: 3.2844,
      lng: 101.6407,
      workactivity: 12,
    },
    // {
    //   name: "Kuala Lumpur",
    //   lat: 3.1399,
    //   lng: 101.6870
    // },
    {
      name: "Hulu Langat",
      lat: 3.1752,
      lng: 101.8672,
      workactivity: 9,
    },
    {
      name: "Sepang",
      lat: 2.7634,
      lng: 101.7236,
      workactivity: 22,
    },
  ];

  @ViewChild("mapEl", { static: true }) mapEl: ElementRef<HTMLDivElement>;

  private map: Map;
  private popup: Popup;

  private chartone: am4charts.XYChart;
  private charttwo: am4charts.XYChart;



  private pieone: am4charts.PieChart;
  private pietwo: am4charts.PieChart;
  private piethree: am4charts.PieChart;
  private piefour: am4charts.PieChart;
  private piefive: am4charts.PieChart;
  private piesix: am4charts.PieChart;
  private pieseven: am4charts.PieChart;
  private pieeight: am4charts.PieChart;
  private pienine: am4charts.PieChart;


  ngOnInit() {
    // check token
    let accessToken = this.jwtService.getToken("accessToken");
    if (accessToken === undefined) {
      this.router.navigate(['/auth/login']);


    } else {
      this.getWorkOrderActivity();
      this.getAssets();
      // this.getAssetRegistered();
      // this.getWorkRequest();

    }


   
    var calendarEl = document.getElementById("widget-calendar");

    var calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      defaultView: "dayGridMonth",
      selectable: true,
      contentHeight: "auto",

      buttonIcons: {
        prev: " ni ni-bold-left",
        next: " ni ni-bold-right",
      },
      header: {
        right: "next",
        center: "title, ",
        left: "prev",
      },
      defaultDate: "2020-02-24",
      editable: true,
      events: [
        {
          title: "CM",
          start: "2020-02-18",
          end: "2020-02-18",
          className: "bg-red",
        },

        {
          title: "CM",
          start: "2020-02-21",
          end: "2020-02-22",
          className: "bg-orange",
        },

        {
          title: "PM",
          start: "2020-02-29",
          end: "2020-02-29",
          className: "bg-green",
        },

        {
          title: "CM",
          start: "2020-02-01",
          end: "2020-02-01",
          className: "bg-blue",
        },

        {
          title: "PM",
          start: "2020-02-03",
          end: "2020-02-03",
          className: "bg-red",
        },

        {
          title: "PM",
          start: "2020-02-07",
          end: "2020-02-09",
          className: "bg-warning",
        },

        {
          title: "CM",
          start: "2020-02-10",
          end: "2020-02-10",
          className: "bg-purple",
        },

        {
          title: "PM",
          start: "2020-02-19",
          end: "2020-02-19",
          className: "bg-red",
        },

        {
          title: "CM",
          start: "2020-02-23",
          end: "2020-02-23",
          className: "bg-blue",
        },

        {
          title: "PM",
          start: "2020-02-02",
          end: "2020-02-02",
          className: "bg-yellow",
        },
      ],
    });

    calendar.render();

    //Display Current Date as Calendar widget header
    var mYear = moment().format("YYYY");
    var mDay = moment().format("dddd, MMM D");
    document.getElementsByClassName(
      "widget-calendar-year"
    )[0].innerHTML = mYear;
    document.getElementsByClassName("widget-calendar-day")[0].innerHTML = mDay;

    this.zone.runOutsideAngular(() => {
      this.initCompareChart();
    });

    this.addMarker();
  }

  ngAfterViewInit() {
    this.map = new Map({
      container: this.mapEl.nativeElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: { lng: 101.5183, lat: 3.0738 },
      zoom: 9,
      pitch: 20,
      attributionControl: false,
    });
    this.map.addControl(
      new NavigationControl({
        showZoom: true,
        showCompass: true,
      }),
      "top-right"
    );
    this.map.scrollZoom.disable();

    this.loadSelangorGeoJSON();
    this.loadSelangorPopup();

    this.zone.runOutsideAngular(() => {
      this.initChartOne();
      this.initChartTwo();

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
    if (this.compareChart) this.compareChart.dispose();
    if (this.chartone) this.chartone.dispose();
    if (this.charttwo) this.charttwo.dispose();

    if (this.pieone) this.pieone.dispose();
    if (this.pietwo) this.pietwo.dispose();
    if (this.piethree) this.piethree.dispose();
    if (this.piefour) this.piefour.dispose();
    if (this.piefive) this.piefive.dispose();
    if (this.piesix) this.piesix.dispose();
    if (this.pieseven) this.pieseven.dispose();
    if (this.pieeight) this.pieeight.dispose();
    if (this.pienine) this.pienine.dispose();
  }

  initCompareChart() {

    //end

    this.compareChart = am4core.create("compareChart", am4charts.XYChart);
    this.compareChart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    this.compareChart.data = CompareChartData;

    this.compareChart.colors.step = 2;
    this.compareChart.padding(30, 30, 10, 30);
    this.compareChart.legend = new am4charts.Legend();

    let categoryAxis = this.compareChart.xAxes.push(
      new am4charts.CategoryAxis()
    );
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = this.compareChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;

    let series1 = this.compareChart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series1.name = "Preventive Maintenance";
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "value1";
    series1.dataFields.valueYShow = "totalPercent";
    series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    series1.tooltip.pointerOrientation = "vertical";

    let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color("#ffffff");
    bullet1.locationY = 0.5;

    let series2 = this.compareChart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series2.name = "Corrective Maintenance";
    series2.dataFields.categoryX = "category";
    series2.dataFields.valueY = "value2";
    series2.dataFields.valueYShow = "totalPercent";
    series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    series2.tooltip.pointerOrientation = "vertical";

    let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationY = 0.5;
    bullet2.label.fill = am4core.color("#ffffff");

    this.compareChart.scrollbarX = new am4core.Scrollbar();

  }

  addMarker() {
    let marker1 = L.marker([2.940298, 101.47522], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: "assets/img/marker/marker-green.svg",
      }),
    });
    this.markers.push(marker1);
    let marker2 = L.marker([3.196735, 101.431274], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: "assets/img/marker/marker-red.svg",
      }),
    });
    this.markers.push(marker2);
    let marker3 = L.marker([3.126804, 101.862488], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: "assets/img/marker/marker-yellow.svg",
      }),
    });
    this.markers.push(marker3);
  }

  loadSelangorGeoJSON() {
    this.map.on("load", () => {
      this.geoJSONSrv.getGeoJSON().subscribe((data) => {
        if (data.features) {
          for (let i = 0; i < data.features.length; i++) {
            let id = "selangor-" + i;

            this.map.addSource(id, {
              type: "geojson",
              data: {
                type: data.features[i].type,
                properties: data.features[i].properties,
                geometry: data.features[i].geometry,
              },
            });

            this.map.addLayer({
              id: id,
              type: "fill",
              source: id,
              layout: {},
              paint: {
                "fill-color": data.features[i].fill
                  ? data.features[i].fill
                  : "#088",
                "fill-opacity": 0.8,
              },
            });
          }

          /* this.map.addSource("selangor", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {
                name: "Shah Alam",
                statename: "Selangor",
                subname: null,
                id: "428",
              },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [101.481691101865977, 3.059570936294211],
                    [101.481372775760207, 3.060007574177448],
                    [101.480346007678662, 3.059402920764425],
                    [101.48031687172076, 3.060537874794911],
                    [101.480192067879983, 3.061157305297279],
                    [101.479954466182249, 3.065119826751896],
                    [101.479654247417741, 3.071552132606807],
                    [101.479592561903772, 3.074029062681076],
                    [101.476290870552305, 3.073948792603463],
                    [101.476106526374537, 3.074125937538096],
                    [101.476391851071696, 3.079960902879954],
                    [101.476188863258542, 3.085535191215981],
                    [101.468819531130322, 3.09150191648461],
                    [101.468804927218756, 3.092870031227829],
                    [101.459245278747346, 3.092569203811665],
                    [101.451534258926102, 3.092545039338587],
                    [101.448621334175101, 3.092593012172387],
                    [101.444495496042649, 3.092579604608298],
                    [101.443975162185666, 3.094484285214212],
                    [101.4435260045436, 3.097118564415905],
                    [101.442106360069147, 3.110027889185092],
                    [101.44459663466553, 3.110188094677368],
                    [101.444422792691753, 3.112196525351126],
                    [101.448853105806577, 3.112167712225392],
                    [101.450315628666132, 3.11222593856262],
                    [101.450271893288217, 3.11355045612957],
                    [101.452950448479882, 3.113754262828718],
                    [101.452819986151212, 3.115544369826207],
                    [101.452762012476043, 3.116810641889753],
                    [101.45293573138062, 3.116839773318619],
                    [101.452820080474282, 3.119619494731188],
                    [101.454838777275739, 3.119490443831804],
                    [101.454846794739609, 3.122138511796262],
                    [101.454830982594018, 3.126621685109411],
                    [101.454813575040447, 3.127925040098332],
                    [101.455063144992664, 3.134421122711814],
                    [101.450991987311582, 3.133808629195892],
                    [101.451269617039983, 3.136414811980154],
                    [101.451530323406828, 3.137026120867571],
                    [101.451834385164162, 3.137622781002499],
                    [101.454136465403394, 3.137448252413966],
                    [101.455565495475966, 3.141528934080801],
                    [101.456976066067696, 3.144872124721684],
                    [101.45798362457522, 3.147122455725881],
                    [101.458174680964746, 3.147341244100806],
                    [101.459660086609574, 3.149178642348286],
                    [101.460726215273581, 3.150716115472457],
                    [101.461185738575708, 3.151379166801508],
                    [101.462954177315382, 3.153650429434702],
                    [101.465274171758026, 3.155421666235591],
                    [101.467388244489854, 3.157115475134463],
                    [101.468645177116798, 3.157966956586888],
                    [101.469115124469539, 3.158148767671107],
                    [101.470514359220701, 3.158236024853418],
                    [101.471117591408685, 3.158590586797649],
                    [101.473100368175139, 3.160583479970418],
                    [101.471972254858201, 3.161326148895717],
                    [101.471033860339361, 3.161965326573175],
                    [101.469719567586495, 3.162825724183988],
                    [101.469491639846112, 3.162997280521106],
                    [101.468386515315629, 3.163836622363749],
                    [101.466403469952851, 3.165177405184646],
                    [101.46457446769503, 3.166513228862356],
                    [101.457117516588966, 3.171694081412034],
                    [101.454134600500893, 3.173600443332509],
                    [101.448675677758203, 3.17745705706891],
                    [101.429595211391828, 3.190788195332485],
                    [101.427733091842725, 3.191987540763886],
                    [101.466819937323123, 3.192449995540797],
                    [101.467695917474629, 3.192768989691326],
                    [101.467981435309568, 3.193056066233196],
                    [101.468381526970816, 3.193572869999062],
                    [101.468667029534416, 3.194261778042994],
                    [101.469466595714309, 3.195295385894639],
                    [101.469809406301422, 3.195582645598432],
                    [101.470209194332128, 3.195984678457302],
                    [101.471009096481936, 3.196386460918607],
                    [101.4715804645285, 3.196443920159454],
                    [101.472037875891402, 3.196271923617411],
                    [101.472552266494461, 3.196157179115392],
                    [101.473124263361711, 3.195927486472346],
                    [101.473524383769018, 3.195697965986313],
                    [101.473981485213187, 3.195525698449866],
                    [101.474324621888769, 3.195353423709107],
                    [101.474438905559225, 3.195066548719445],
                    [101.47461048198187, 3.194721974838097],
                    [101.474782683631943, 3.194205290940912],
                    [101.475068223924708, 3.193860723048982],
                    [101.47552563888091, 3.193516344291573],
                    [101.475869089966864, 3.193171869448144],
                    [101.476383481468218, 3.192999784459646],
                    [101.476897866681369, 3.192999720778275],
                    [101.477412250097899, 3.193057357798961],
                    [101.477698090428049, 3.192999851728683],
                    [101.477983932554807, 3.192885095200974],
                    [101.478155504485855, 3.192655472682594],
                    [101.478612918543675, 3.192310822650842],
                    [101.479413151273533, 3.191966462209115],
                    [101.479756282559251, 3.191909139049776],
                    [101.480099103027882, 3.19190924668042],
                    [101.480498901838317, 3.192024218578372],
                    [101.481299119296807, 3.192253890568474],
                    [101.48181350450993, 3.192253825990123],
                    [101.482213926751214, 3.192196687612665],
                    [101.482613726459988, 3.19231138771124],
                    [101.483070811734407, 3.192655903204702],
                    [101.483470605154963, 3.193000686761865],
                    [101.483985299388607, 3.193057962323503],
                    [101.484271139718729, 3.193000545945338],
                    [101.484556673723361, 3.19277101942335],
                    [101.484900121216057, 3.192426545226909],
                    [101.485185651627461, 3.192369128813478],
                    [101.485585763051617, 3.192369330620716],
                    [101.486385991289865, 3.192139739379338],
                    [101.486957669255219, 3.192082247608491],
                    [101.487529343627244, 3.19219704638123],
                    [101.488100710775512, 3.192197166568692],
                    [101.488500826691265, 3.191967645248743],
                    [101.488729687781301, 3.19173793552393],
                    [101.4888442750823, 3.191508490339755],
                    [101.488730007581523, 3.191221332642407],
                    [101.488444174437902, 3.190934347073916],
                    [101.488444493339856, 3.190474812304846],
                    [101.488616377884611, 3.189958128065293],
                    [101.488844929055787, 3.189670986079439],
                    [101.489913858242218, 3.188892404522359],
                    [101.489999084603369, 3.188548063559519],
                    [101.489819459879271, 3.187794807364885],
                    [101.489715089535778, 3.18693955194631],
                    [101.489944132733825, 3.186480234832723],
                    [101.490287452754174, 3.186020992923924],
                    [101.490516435409376, 3.18561910908726],
                    [101.491032592084281, 3.18509930172831],
                    [101.491481030765499, 3.184778308992648],
                    [101.49190622944063, 3.184446590025606],
                    [101.492534888442734, 3.184102309468522],
                    [101.49310687273362, 3.183930679499197],
                    [101.493825338111307, 3.183653331191665],
                    [101.493587051897393, 3.193633386101343],
                    [101.493277786496364, 3.205663595999859],
                    [101.493001552394745, 3.22362791023187],
                    [101.4929470837548, 3.22910222629307],
                    [101.49294680986489, 3.229646669601416],
                    [101.492918629323242, 3.229951038814255],
                    [101.493227288304155, 3.229649950019026],
                    [101.493603883630826, 3.229286122637638],
                    [101.49374882231038, 3.229155170578829],
                    [101.493936810953244, 3.228907732336296],
                    [101.494068806706167, 3.228719340745585],
                    [101.494110554112325, 3.228645821825955],
                    [101.494907111834337, 3.226928465489844],
                    [101.494950469919857, 3.226870224081736],
                    [101.495891650114388, 3.225356724801987],
                    [101.497338058424816, 3.223914167091492],
                    [101.49913510009273, 3.222634887061432],
                    [101.500104043802452, 3.22201801654618],
                    [101.501954786171382, 3.22009759148351],
                    [101.502353410158321, 3.219937459696938],
                    [101.503966790345231, 3.219940550309133],
                    [101.504420918311681, 3.220351208117755],
                    [101.504631554146684, 3.221228341263504],
                    [101.505106784367513, 3.221661292357941],
                    [101.505402130267498, 3.222334214749801],
                    [101.50554704386704, 3.22247773362154],
                    [101.505786077110244, 3.222579864329854],
                    [101.506603517222018, 3.222715600628758],
                    [101.506831592381914, 3.222672303452011],
                    [101.507050934085783, 3.222541398503629],
                    [101.507242153503469, 3.222499288544894],
                    [101.508623601351246, 3.22278802539838],
                    [101.509047051190393, 3.222779406199376],
                    [101.509235819525315, 3.222648736892501],
                    [101.509885905183907, 3.221907215075379],
                    [101.510560775812507, 3.221727684118623],
                    [101.51108063832595, 3.221747260564337],
                    [101.512452553441008, 3.220116361000161],
                    [101.513086030444356, 3.219563870896473],
                    [101.513475310756547, 3.219432586054765],
                    [101.514109413304965, 3.218228432719178],
                    [101.514476844320669, 3.218060256523533],
                    [101.515387947399105, 3.218830656181682],
                    [101.515566947008139, 3.219330914523564],
                    [101.516090803906621, 3.219280864190452],
                    [101.516411393199263, 3.218609618315414],
                    [101.516747461031599, 3.218333227631588],
                    [101.518349971493507, 3.217875336392102],
                    [101.519059473481349, 3.217627778809228],
                    [101.520695578701591, 3.217933427635995],
                    [101.52094177368329, 3.217162044995463],
                    [101.5215063387882, 3.216987386352038],
                    [101.522013309306999, 3.217351310512274],
                    [101.522259538424734, 3.219112292876954],
                    [101.522418726181272, 3.219578063468975],
                    [101.522969061073766, 3.220349425445418],
                    [101.523823204398681, 3.221077005752682],
                    [101.526444135359895, 3.221135180225304],
                    [101.527110286448746, 3.221222439237312],
                    [101.527616937167309, 3.220902261678414],
                    [101.527935594751341, 3.220058161777505],
                    [101.528152674436413, 3.219272217818112],
                    [101.528340955031808, 3.218660918185384],
                    [101.528789678787533, 3.217656732506472],
                    [101.529745364078977, 3.216550515387488],
                    [101.53036783907865, 3.216317702523585],
                    [101.5305998415772, 3.21834069497629],
                    [101.530903648213098, 3.218277698617433],
                    [101.533307476133018, 3.218238695189162],
                    [101.537549947030357, 3.218267704476789],
                    [101.542024066490029, 3.21828223692414],
                    [101.543457630359768, 3.218282199254363],
                    [101.547063071753158, 3.218466472426711],
                    [101.55155204575442, 3.225500763007493],
                    [101.560023013356542, 3.229721176419103],
                    [101.56079032372952, 3.227494302161643],
                    [101.562107936655693, 3.22487462533476],
                    [101.5644679456544, 3.221803617789791],
                    [101.568319297263514, 3.216709572531488],
                    [101.572257374925201, 3.21241611426204],
                    [101.575500537442593, 3.209039505680659],
                    [101.575906190573775, 3.208442729814379],
                    [101.576253633772851, 3.208020603044311],
                    [101.576499826059617, 3.207860495164442],
                    [101.577247915180465, 3.20726787847022],
                    [101.579069379674721, 3.206673813821812],
                    [101.581222176083486, 3.205980075295954],
                    [101.579547948159231, 3.206217921280049],
                    [101.579507641650693, 3.206024619401404],
                    [101.578697602012937, 3.200601557628423],
                    [101.578537047020532, 3.199023237884915],
                    [101.578315114636311, 3.198478184012776],
                    [101.578374948722427, 3.197339205984748],
                    [101.578134060089113, 3.19602599319541],
                    [101.577770457994703, 3.19482387561882],
                    [101.578094297061384, 3.193890743856722],
                    [101.578694089600148, 3.192988616002821],
                    [101.578721163924513, 3.192384951401412],
                    [101.5788951478321, 3.191862651598534],
                    [101.578977737142694, 3.19127496590202],
                    [101.578894006971723, 3.189939100732702],
                    [101.578451553456617, 3.189215968551906],
                    [101.578678640373894, 3.188289375660652],
                    [101.579305536881449, 3.187266035046261],
                    [101.579667989132275, 3.186027954809699],
                    [101.579621749251345, 3.185410569412285],
                    [101.579564618195946, 3.184823690852066],
                    [101.57898346480097, 3.183811237300776],
                    [101.577779292027202, 3.179660298381279],
                    [101.576500855528906, 3.177935807278716],
                    [101.574959583656636, 3.176681700163719],
                    [101.574048444023504, 3.175158980678065],
                    [101.573577817544503, 3.174498925076892],
                    [101.571708991173466, 3.171228211054041],
                    [101.571000098243431, 3.170873841791235],
                    [101.566325605966398, 3.163683040070615],
                    [101.563294208700754, 3.158846187192588],
                    [101.557804870799146, 3.155586798023621],
                    [101.553143395110553, 3.155493219789035],
                    [101.550981417021319, 3.150187419046905],
                    [101.550927669919545, 3.149323441076018],
                    [101.550766460055286, 3.148081479167282],
                    [101.55209571874073, 3.138487854892685],
                    [101.552338018627438, 3.137200922205207],
                    [101.553199795835638, 3.136602392544969],
                    [101.553675554389912, 3.136710338338147],
                    [101.554227956305866, 3.136015245091993],
                    [101.554290224826445, 3.135936663337878],
                    [101.554787837594901, 3.135648665930419],
                    [101.555538206639966, 3.134909169224827],
                    [101.556381892676654, 3.134222211210902],
                    [101.556611611657772, 3.133712377824494],
                    [101.556832422944538, 3.133189514767786],
                    [101.557103436580917, 3.13239040169676],
                    [101.557733143916948, 3.13209999852765],
                    [101.558037479660456, 3.132254087781887],
                    [101.558355572204306, 3.132063410085211],
                    [101.558311758672914, 3.132392352613329],
                    [101.558613030263032, 3.132392961658139],
                    [101.559290985214716, 3.132532640100772],
                    [101.559529168122381, 3.132245022970048],
                    [101.560124059453031, 3.132147848469269],
                    [101.561016175463337, 3.13214452697692],
                    [101.561376647827331, 3.131854818894156],
                    [101.5624302908072, 3.131939664520978],
                    [101.563290287554523, 3.132085745620293],
                    [101.563410428240644, 3.132393602096919],
                    [101.563704863651452, 3.132454715566375],
                    [101.563897964606554, 3.132220462047647],
                    [101.564274011960904, 3.132158385215201],
                    [101.564476936892049, 3.132362587456093],
                    [101.564842994980452, 3.132272393212088],
                    [101.564832812576668, 3.131873271434984],
                    [101.565285351477485, 3.131919538228668],
                    [101.565718092407735, 3.13191453401323],
                    [101.565909862059598, 3.132212796513855],
                    [101.566357175460411, 3.132045899369865],
                    [101.566766534142062, 3.132435218062092],
                    [101.567020638789884, 3.132039879781047],
                    [101.567526805316533, 3.131916841029204],
                    [101.567793968773586, 3.131859312731887],
                    [101.567963590462142, 3.131823292065391],
                    [101.567960059184784, 3.131226787387694],
                    [101.568059940166279, 3.131147270626861],
                    [101.568383613044617, 3.131007940922507],
                    [101.568383443263045, 3.131284695139776],
                    [101.568383625621038, 3.131370535556981],
                    [101.568658640353675, 3.13088483298234],
                    [101.568746668065003, 3.130361144193817],
                    [101.568749200415809, 3.128057049087559],
                    [101.568761958289471, 3.127883319007774],
                    [101.570205128742856, 3.12696856441662],
                    [101.570205090115309, 3.124576652915905],
                    [101.570222335972105, 3.120217077903326],
                    [101.570235914905922, 3.115870998818341],
                    [101.566491757463012, 3.115813918135433],
                    [101.568284228831459, 3.114588208480992],
                    [101.572151980982824, 3.113182177399581],
                    [101.572322460562447, 3.113120613416871],
                    [101.574980478470152, 3.112103840226931],
                    [101.57620458845328, 3.111651113790577],
                    [101.582364940024348, 3.109483716146492],
                    [101.583677732590687, 3.108997828544253],
                    [101.584260048405625, 3.108769953698306],
                    [101.58553019345382, 3.107838987256741],
                    [101.586192784519213, 3.106983962269403],
                    [101.586674579752184, 3.105807996914582],
                    [101.587173103412326, 3.104575880041488],
                    [101.58767547276021, 3.103491078379819],
                    [101.590181598129789, 3.097946199339057],
                    [101.591117816030703, 3.095129876865211],
                    [101.591482836564907, 3.094537119729462],
                    [101.591791649511819, 3.093154085433326],
                    [101.591847758284487, 3.092194447656924],
                    [101.591151780433293, 3.088156882461305],
                    [101.591026135769411, 3.087402278157795],
                    [101.590990103445094, 3.086687781417201],
                    [101.591071069499918, 3.086353132194837],
                    [101.591671727116335, 3.085849745817132],
                    [101.592285781308576, 3.08532193084165],
                    [101.589507426882093, 3.084557512987915],
                    [101.586872302539476, 3.084805134519287],
                    [101.585598369295724, 3.084485097957266],
                    [101.583802927198576, 3.083379173461296],
                    [101.582746038605535, 3.082709827977578],
                    [101.581051886048272, 3.082011333539451],
                    [101.579922887890802, 3.081880577308832],
                    [101.574073524087908, 3.081167894213847],
                    [101.571192483241333, 3.080411149152299],
                    [101.569889432904247, 3.079741731834506],
                    [101.568745540679359, 3.078999413405048],
                    [101.566733378223276, 3.07805353299211],
                    [101.562853094573754, 3.077020242510104],
                    [101.561245986072606, 3.076525475674178],
                    [101.560029960028672, 3.075899648450666],
                    [101.557365970120998, 3.074327835777544],
                    [101.556685337291455, 3.073818574494223],
                    [101.556613146878618, 3.072872554034657],
                    [101.55651156808122, 3.072566862682297],
                    [101.556294475819783, 3.071926539912714],
                    [101.556366887218203, 3.070878586999099],
                    [101.556077316184656, 3.06975792908051],
                    [101.556381339314498, 3.068622784790948],
                    [101.556482565073964, 3.067967891926208],
                    [101.556048111056455, 3.067545720074463],
                    [101.555816440934578, 3.066323222534559],
                    [101.556265061384096, 3.065027902685176],
                    [101.55620710387862, 3.063819871382316],
                    [101.556699352806547, 3.061840627509329],
                    [101.557596969201356, 3.06080721549848],
                    [101.557843108487532, 3.060195912821479],
                    [101.557712710837492, 3.059380944304946],
                    [101.556655834820916, 3.058114784083226],
                    [101.556887404331505, 3.057110420813946],
                    [101.556510838649245, 3.056266335701638],
                    [101.555483061759631, 3.054723603993987],
                    [101.55551177910263, 3.052919015047437],
                    [101.555193385623213, 3.051085132857765],
                    [101.554889267271989, 3.049950003777145],
                    [101.554064013766549, 3.048610941336989],
                    [101.551732937706518, 3.046369758982285],
                    [101.548866434296187, 3.042309260812809],
                    [101.550024483071638, 3.04216362037806],
                    [101.553745092976072, 3.04152319783038],
                    [101.558537043569814, 3.040693543898062],
                    [101.563864654177507, 3.039703614066471],
                    [101.571899403470951, 3.038233550381146],
                    [101.571942241431927, 3.029573917961062],
                    [101.571927274601009, 3.017246592208421],
                    [101.571941349404909, 3.014321153355231],
                    [101.571927015886189, 3.012734800773328],
                    [101.571955478107654, 3.006942258473296],
                    [101.571955170883825, 3.001586371087048],
                    [101.564673631108363, 3.001572080556795],
                    [101.560576626201566, 3.001601214220153],
                    [101.554727739404072, 3.001615920099372],
                    [101.553788983762502, 3.001058014265896],
                    [101.553927015295841, 3.00023901457822],
                    [101.553929984227807, 2.999561014444831],
                    [101.55383398396836, 2.999060015044726],
                    [101.553606984187638, 2.998630014336217],
                    [101.553254015451259, 2.998171014267496],
                    [101.552077014918254, 2.996809014888515],
                    [101.551647984030097, 2.996112983864757],
                    [101.551195014836338, 2.995152983345495],
                    [101.551055983478108, 2.994356014430001],
                    [101.551070372692294, 2.993845983444306],
                    [101.551257984042806, 2.993122014263804],
                    [101.551845983498524, 2.991988015005631],
                    [101.552846015022226, 2.990530014620159],
                    [101.554348015245267, 2.987581014700073],
                    [101.554764983555785, 2.98669898311336],
                    [101.554999015348514, 2.986124015000065],
                    [101.555405015229411, 2.98529898373765],
                    [101.556598424511051, 2.983592142427615],
                    [101.556713479298082, 2.982871448112442],
                    [101.556710460033031, 2.981915178006747],
                    [101.556788320763886, 2.981477067871313],
                    [101.557131456289611, 2.981054388331656],
                    [101.557571306817238, 2.980494892454432],
                    [101.558225220355155, 2.979874473055873],
                    [101.558771219978084, 2.979424472932787],
                    [101.559342984194885, 2.978800014747233],
                    [101.560538521434353, 2.977868039678091],
                    [101.561485520915298, 2.977806008642948],
                    [101.562191489829104, 2.977687039412614],
                    [101.562814520885979, 2.977447007972925],
                    [101.563566489830507, 2.977035039537932],
                    [101.564182521214718, 2.976825007981954],
                    [101.565772489860294, 2.976405008444247],
                    [101.567047604827593, 2.976271021120938],
                    [101.567940636221195, 2.97630802125987],
                    [101.568253599384761, 2.976352614481608],
                    [101.568993636007377, 2.97647302101576],
                    [101.571039372391709, 2.977081000380334],
                    [101.571801088115876, 2.977360617073624],
                    [101.571177058119545, 2.976670976622093],
                    [101.568676464840593, 2.974954599056051],
                    [101.567509628756611, 2.973976651215698],
                    [101.565100655635788, 2.972453709316909],
                    [101.561444554333065, 2.970649741916479],
                    [101.560813006508454, 2.970256736612152],
                    [101.560780274484884, 2.969819857558598],
                    [101.562068274144792, 2.966501922770386],
                    [101.562831751993471, 2.964873392944898],
                    [101.554320220274803, 2.960325394863644],
                    [101.550059418467043, 2.958075308282454],
                    [101.550080272897546, 2.961334711825874],
                    [101.549908027233101, 2.964934744726777],
                    [101.545837511260814, 2.962471501982384],
                    [101.536020622856952, 2.956834344061255],
                    [101.524084346903408, 2.949977538830471],
                    [101.520171451259159, 2.956483147536981],
                    [101.515524475277559, 2.964620472608816],
                    [101.511225134734516, 2.972101404704547],
                    [101.507026982221674, 2.979320323631096],
                    [101.503856426037089, 2.984923651179622],
                    [101.499151621009062, 2.993161414447633],
                    [101.496661561110102, 2.997425730485704],
                    [101.495503531199248, 2.999405152275498],
                    [101.492810634404037, 3.003800329003413],
                    [101.488684699253525, 3.010829834393292],
                    [101.484558714695737, 3.017771881277155],
                    [101.481387936627243, 3.023200419494219],
                    [101.47936128254905, 3.026736873857001],
                    [101.478637278159269, 3.029487630673711],
                    [101.47820280976876, 3.031219482287837],
                    [101.477985726490445, 3.032209177688338],
                    [101.476740685761158, 3.031830709019312],
                    [101.47280276799961, 3.030360657050271],
                    [101.471412971847172, 3.034639397298491],
                    [101.470616503058338, 3.036924284270817],
                    [101.472585361327802, 3.040970388914239],
                    [101.473540842701652, 3.043051775101893],
                    [101.473975246413517, 3.043735808526172],
                    [101.474119832055109, 3.04425974544488],
                    [101.47410525778794, 3.044929286307528],
                    [101.473917272738362, 3.04596257634661],
                    [101.473497345377297, 3.047650835651491],
                    [101.473569455840121, 3.048756943305554],
                    [101.474163009579271, 3.049702994927534],
                    [101.476175338223598, 3.050954718207383],
                    [101.477290340628983, 3.051697029183517],
                    [101.477927265928372, 3.052060907682042],
                    [101.478723349339859, 3.052381110934911],
                    [101.479490639051662, 3.052599565468983],
                    [101.480446194985632, 3.052730480468439],
                    [101.481010984669368, 3.052715947514731],
                    [101.481054286161012, 3.054651677621623],
                    [101.479606393264191, 3.054593362913777],
                    [101.479635449272024, 3.056485410195165],
                    [101.481604478221399, 3.056456382961882],
                    [101.481691101865977, 3.059570936294211],
                  ],
                ],
              },
            },
          }); */

          // this.map.addLayer({
          //   id: "selangor",
          //   type: "fill",
          //   source: "selangor",
          //   layout: {},
          //   paint: {
          //     "fill-color": "#088",
          //     "fill-opacity": 0.8,
          //   },
          // });
        }
      });
    });
  }

  loadSelangorPopup() {
    this.map.on("load", () => {
      for (let i = 0; i < this.centerDistricts.length; i++) {
        let html =
          "<h6>" +
          this.centerDistricts[i].name +
          "</h6><h3 style='text-align:center'>" +
          this.centerDistricts[i].workactivity +
          "</h3>";

        new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
          .setLngLat([this.centerDistricts[i].lng, this.centerDistricts[i].lat])
          .setHTML(html)
          .addTo(this.map);
      }
    });
  }

  initChartOne() {
    let chart = am4core.create("chartdivone", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = this.chartData;

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
    chart.data = this.chartData2

    console.log("this.chartData 2", this.chartData2)
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
  checkToken() {
      }

}
