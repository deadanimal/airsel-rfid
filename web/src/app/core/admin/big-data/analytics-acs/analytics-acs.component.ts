import { Component, OnInit, NgZone } from "@angular/core";

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
  tableAssetConditionStores = [
    {
      title: "ES-D-PUMP HOUSE",
      noasset: "16094",
      zero: "23",
      one: "9567",
      two: "9413",
      three: "3090",
      four: "649",
      five: "47",
    },
    {
      title: "ES-D-VALVE",
      noasset: "1242",
      zero: "1",
      one: "8765",
      two: "1244",
      three: "0",
      four: "0",
      five: "0",
    },
    {
      title: "FLEET",
      noasset: "1424",
      zero: "3",
      one: "345",
      two: "234",
      three: "112",
      four: "1",
      five: "0",
    },
    {
      title: "NRW-DMZ",
      noasset: "12435",
      zero: "5",
      one: "18456",
      two: "12645",
      three: "45",
      four: "2",
      five: "13",
    },
    {
      title: "NRW-TRANSIENT",
      noasset: "2143",
      zero: "0",
      one: "0",
      two: "0",
      three: "0",
      four: "0",
      five: "0",
    },
    {
      title: "NRW-WBA",
      noasset: "131",
      zero: "0",
      one: "345",
      two: "235",
      three: "1",
      four: "0",
      five: "0",
    },
    {
      title: "PD-N",
      noasset: "19525",
      zero: "112",
      one: "2345",
      two: "2391",
      three: "3457",
      four: "134",
      five: "31",
    },
    {
      title: "PD-S",
      noasset: "7442",
      zero: "13",
      one: "1985",
      two: "1246",
      three: "324",
      four: "46",
      five: "12",
    },
    {
      title: "OTS-INSTRUMENT",
      noasset: "7584",
      zero: "0",
      one: "1924",
      two: "3",
      three: "1244",
      four: "6",
      five: "12",
    },
    {
      title: "OTS-EM FLOWMETER",
      noasset: "478",
      zero: "0",
      one: "2",
      two: "321",
      three: "456",
      four: "0",
      five: "1",
    },
    {
      title: "WQ-LAB SERVICES",
      noasset: "346",
      zero: "3",
      one: "312",
      two: "22",
      three: "4",
      four: "0",
      five: "9",
    },
    {
      title: "WQ-ONLA",
      noasset: "34",
      zero: "0",
      one: "33",
      two: "1",
      three: "0",
      four: "0",
      five: "0",
    },
    {
      title: "WQ-RMS",
      noasset: "5",
      zero: "0",
      one: "1",
      two: "1237",
      three: "2",
      four: "0",
      five: "0",
    },
    {
      title: "WQ-SPA",
      noasset: "2355",
      zero: "0",
      one: "1235",
      two: "290",
      three: "0",
      four: "0",
      five: "0",
    },
    {
      title: "WQ-SURVEILLANCE",
      noasset: "234",
      zero: "0",
      one: "290",
      two: "3245",
      three: "0",
      four: "235",
      five: "1",
    },
    {
      title: "DIST-RESERVOIR",
      noasset: "10252",
      zero: "2",
      one: "3956",
      two: "123",
      three: "5867",
      four: "0",
      five: "92",
    },
    {
      title: "CBS-AMR FLOWMETER",
      noasset: "234",
      zero: "1",
      one: "344",
      two: "14",
      three: "46",
      four: "1",
      five: "5",
    },
    {
      title: "TOTAL ASSET/OVERALL AVERAGE %",
      noasset: "81958",
      zero: "163",
      one: "49905",
      two: "32664",
      three: "14648",
      four: "1074",
      five: "223",
    },
  ];

  constructor(private zone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {});
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {});
  }
}
