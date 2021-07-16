import { Component, OnInit, NgZone } from "@angular/core";


import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { AssetsModel } from "src/app/shared/services/assets/assets.model";


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { formatDate } from "@angular/common";
import { map, tap, catchError } from "rxjs/operators";
import { WorkOrderActivityCompletionService } from "src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service";
import { NgxSpinnerService } from "ngx-spinner";  

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-analytics-acs",
  templateUrl: "./analytics-acs.component.html",
  styleUrls: ["./analytics-acs.component.scss"],
})
export class AnalyticsAcsComponent implements OnInit {

  constructor(
    private zone: NgZone,
    public assetsService: AssetsService,
    public workOrderActivityCompletionService: WorkOrderActivityCompletionService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    // console.log("today",this.today)
    this.getAssets();
    this.getWorkOrderActivityCompletion();
    // this.getAssetConditionStores()
  }

  //variables

  today = new Date();

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

  lastmonth = new Date
  // workOrderActivityCompletion: any;
  completedPreventiveMaintenance: number = 0;
  latestMonth = new Date();

  getWorkOrderActivityCompletion(){
    this.workOrderActivityCompletionService.get().subscribe((response) => {
      console.log('response from API is ', response);
      // this.workOrderActivityCompletion = response;
      
      for(let i in response){

        if( response[i].field_1 == "PREVENTIVE MAINTENANCE"){
          this.completedPreventiveMaintenance += response[i].asset_location_asset_list.length
        }
      }
      console.log("completedPreventiveMaintenance", this.completedPreventiveMaintenance)

    }, (error) => {
      console.log('Error is ', error)
    })
  }

  getAssets() {
    this.SpinnerService.show();
    this.assetsService.get().pipe(map(x => x.filter(i => i.owning_access_group != ""))).subscribe((response) => {
      console.log('response from API is ', response);
      this.assets = response;
      console.log('assets', this.assets);
      this.totalAssets = this.assets.length
      console.log('totalAssets', this.totalAssets);

      this.getTotalAssetToday();
      this.calcPercentageAssetConditionRating();
      this.getAssetConditionStores();

      this.SpinnerService.hide();

    }, (error) => {
      console.log('Error is ', error)
    })
  }

  reset() {
    this.SpinnerService.show();

    this.assetsService.get().pipe(map(x => x.filter(i => i.owning_access_group != ""))).subscribe((response) => {
      console.log('response from API is ', response);
      this.assets = response;
      console.log('assets', this.assets);
      this.totalAssets = this.assets.length
      console.log('totalAssets', this.totalAssets);

      this.calcPercentageAssetConditionRating();
      this.getAssetConditionStores();

      this.SpinnerService.hide();

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
      { title: "CBS", noasset: 0, zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0 },
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

      if (this.assets[i].owning_access_group == "CBS") {
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
        this.nullassetOwning.push(this.assets[i])
      }
    }
    console.log("nullassetOwning", this.nullassetOwning)
    console.log("tableAssetConditionStores", this.tableAssetConditionStores)

  }

  selected_date: any;
  asset_owning: any;

  filter() {

    this.SpinnerService.show();

    let temp: AssetsModel[] = [];
    let temp2: AssetsModel[] = [];


    this.assetsService.get().pipe(map(x => x.filter(i => i.registered_datetime != null))).subscribe((response) => {
      // temp = response
      // console.log("temp", temp)

      console.log("asset_owning", this.asset_owning)

      if (this.asset_owning != null && this.selected_date == null) {
        temp = response.filter((value) => value.owning_access_group.includes(this.asset_owning));
        console.log("temp", temp);
        temp2 = temp;

      }
      else if (this.asset_owning == null && this.selected_date != null) {
        let from = this.selected_date[0]
        let to = this.selected_date[1]

        console.log("from", from);
        console.log("to", to);
        temp = response;
        for (let i in temp) {
          if (formatDate(temp[i].registered_datetime, 'yyyy-MM-dd', 'en_US') >= formatDate(from, 'yyyy-MM-dd', 'en_US') && formatDate(this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') <= formatDate(to, 'yyyy-MM-dd', 'en_US'))
            temp2.push(temp[i])
        }
      }
      else if (this.asset_owning != null && this.selected_date != null) {

        let from = this.selected_date[0]
        let to = this.selected_date[1]
        console.log("from", from);
        console.log("to", to);

        temp = response.filter((value) => value.owning_access_group.includes(this.asset_owning));
        console.log("temp", temp);

        for (let i in temp) {
          if (formatDate(temp[i].registered_datetime, 'yyyy-MM-dd', 'en_US') >= formatDate(from, 'yyyy-MM-dd', 'en_US') && formatDate(this.assets[i].registered_datetime, 'yyyy-MM-dd', 'en_US') <= formatDate(to, 'yyyy-MM-dd', 'en_US'))
            temp2.push(temp[i])
        }
      }

      console.log("temp2", temp2)
      console.log("temp2 length", temp2.length)

      this.assets = temp2
      console.log('assets', this.assets);

      this.calcPercentageAssetConditionRating();
      this.getAssetConditionStores();

      this.SpinnerService.hide();


    }, (error) => {
      console.log('Error is ', error)
    })
  }



  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => { });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => { });
  }
}
