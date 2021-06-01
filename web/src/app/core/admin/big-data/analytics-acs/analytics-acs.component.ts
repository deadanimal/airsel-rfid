import { Component, OnInit, NgZone } from "@angular/core";


import { AssetsService } from "src/app/shared/services/assets/assets.service";


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-analytics-acs",
  templateUrl: "./analytics-acs.component.html",
  styleUrls: ["./analytics-acs.component.scss"],
})
export class AnalyticsAcsComponent implements OnInit {

  constructor(
    private zone: NgZone,
    public assetsService: AssetsService) { }

  ngOnInit() {
    // console.log("today",this.today)
    this.getAssets();
    this.getAssetConditionStores()
  }

  //variables
  today = new Date();

  assets: any;
  totalAssets: any;
  PercentageAssetConditionRating: any;
  totalConditionRating: number = 0;

  tableAssetConditionStores = [
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
  ]


  getAssets() {
    this.assetsService.get().subscribe((response) => {
      console.log('response from API is ', response);
      this.assets = response;
      console.log('assets', this.assets);
      this.totalAssets = this.assets.length
      console.log('totalAssets', this.totalAssets);

      this.calcPercentageAssetConditionRating();
      this.getAssetConditionStores();

    }, (error) => {
      console.log('Error is ', error)
    })
  }

  calcPercentageAssetConditionRating() {

    for (let i in this.assets) {
      this.totalConditionRating += parseFloat(this.assets[i].condition_rating);
    }

    this.PercentageAssetConditionRating = (this.totalConditionRating / this.totalAssets * 100).toFixed(2)

    console.log("totalConditionRating", this.totalConditionRating)
    console.log("PercentageAssetConditionRating", this.PercentageAssetConditionRating)
  }

  getAssetConditionStores() {

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
    }

    console.log(this.tableAssetConditionStores)


  }

  // tableAssetConditionStores = [
  //   {
  //     title: "ES-D-PUMP HOUSE",
  //     noasset: "16094",
  //     zero: "23",
  //     one: "9567",
  //     two: "9413",
  //     three: "3090",
  //     four: "649",
  //     five: "47",
  //   },
  //   {
  //     title: "ES-D-VALVE",
  //     noasset: "1242",
  //     zero: "1",
  //     one: "8765",
  //     two: "1244",
  //     three: "0",
  //     four: "0",
  //     five: "0",
  //   },
  //   {
  //     title: "FLEET",
  //     noasset: "1424",
  //     zero: "3",
  //     one: "345",
  //     two: "234",
  //     three: "112",
  //     four: "1",
  //     five: "0",
  //   },
  //   {
  //     title: "NRW-DMZ",
  //     noasset: "12435",
  //     zero: "5",
  //     one: "18456",
  //     two: "12645",
  //     three: "45",
  //     four: "2",
  //     five: "13",
  //   },
  //   {
  //     title: "NRW-TRANSIENT",
  //     noasset: "2143",
  //     zero: "0",
  //     one: "0",
  //     two: "0",
  //     three: "0",
  //     four: "0",
  //     five: "0",
  //   },
  //   {
  //     title: "NRW-WBA",
  //     noasset: "131",
  //     zero: "0",
  //     one: "345",
  //     two: "235",
  //     three: "1",
  //     four: "0",
  //     five: "0",
  //   },
  //   {
  //     title: "PD-N",
  //     noasset: "19525",
  //     zero: "112",
  //     one: "2345",
  //     two: "2391",
  //     three: "3457",
  //     four: "134",
  //     five: "31",
  //   },
  //   {
  //     title: "PD-S",
  //     noasset: "7442",
  //     zero: "13",
  //     one: "1985",
  //     two: "1246",
  //     three: "324",
  //     four: "46",
  //     five: "12",
  //   },
  //   {
  //     title: "OTS-INSTRUMENT",
  //     noasset: "7584",
  //     zero: "0",
  //     one: "1924",
  //     two: "3",
  //     three: "1244",
  //     four: "6",
  //     five: "12",
  //   },
  //   {
  //     title: "OTS-EM FLOWMETER",
  //     noasset: "478",
  //     zero: "0",
  //     one: "2",
  //     two: "321",
  //     three: "456",
  //     four: "0",
  //     five: "1",
  //   },
  //   {
  //     title: "WQ-LAB SERVICES",
  //     noasset: "346",
  //     zero: "3",
  //     one: "312",
  //     two: "22",
  //     three: "4",
  //     four: "0",
  //     five: "9",
  //   },
  //   {
  //     title: "WQ-ONLA",
  //     noasset: "34",
  //     zero: "0",
  //     one: "33",
  //     two: "1",
  //     three: "0",
  //     four: "0",
  //     five: "0",
  //   },
  //   {
  //     title: "WQ-RMS",
  //     noasset: "5",
  //     zero: "0",
  //     one: "1",
  //     two: "1237",
  //     three: "2",
  //     four: "0",
  //     five: "0",
  //   },
  //   {
  //     title: "WQ-SPA",
  //     noasset: "2355",
  //     zero: "0",
  //     one: "1235",
  //     two: "290",
  //     three: "0",
  //     four: "0",
  //     five: "0",
  //   },
  //   {
  //     title: "WQ-SURVEILLANCE",
  //     noasset: "234",
  //     zero: "0",
  //     one: "290",
  //     two: "3245",
  //     three: "0",
  //     four: "235",
  //     five: "1",
  //   },
  //   {
  //     title: "DIST-RESERVOIR",
  //     noasset: "10252",
  //     zero: "2",
  //     one: "3956",
  //     two: "123",
  //     three: "5867",
  //     four: "0",
  //     five: "92",
  //   },
  //   {
  //     title: "CBS-AMR FLOWMETER",
  //     noasset: "234",
  //     zero: "1",
  //     one: "344",
  //     two: "14",
  //     three: "46",
  //     four: "1",
  //     five: "5",
  //   },
  //   {
  //     title: "TOTAL ASSET/OVERALL AVERAGE %",
  //     noasset: "81958",
  //     zero: "163",
  //     one: "49905",
  //     two: "32664",
  //     three: "14648",
  //     four: "1074",
  //     five: "223",
  //   },
  // ];

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => { });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => { });
  }
}
