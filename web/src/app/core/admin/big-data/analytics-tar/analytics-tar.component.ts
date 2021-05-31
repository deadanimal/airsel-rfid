import { Component, OnInit, NgZone } from '@angular/core';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { AssetsModel } from 'src/app/shared/services/assets/assets.model';
import { map, tap, catchError } from "rxjs/operators";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-analytics-tar',
  templateUrl: './analytics-tar.component.html',
  styleUrls: ['./analytics-tar.component.scss']
})
export class AnalyticsTarComponent implements OnInit {
  asset_registered_length: number = 0;
  assetRegistration: AssetsModel[] = [];
  selected_date: any;

  private charttwo: am4charts.XYChart;

  constructor(
    private zone: NgZone,
    private assetsService: AssetsService,
            
  ) { }

  ngOnInit() {
    this.getAssetRegistered();
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

  searchAsset() {
    let before = this.selected_date[0].toJSON().slice(0,10);
    let after = this.selected_date[1].toJSON().slice(0,10);

    let temp: AssetsModel[] = [];

    this.assetsService.get().pipe(map(x => x.filter(i=>i.registered_datetime != null))).subscribe(
       (res) => {
         res.forEach(function (val) {
           if(val["registered_datetime"].slice(0,10) >= before && val["registered_datetime"].slice(0,10) <= after) {
             console.log(val);
             temp.push(val);
           }
         })

         
       },
       (err) => {
         console.log("err", err);
       },
       () => {
         this.asset_registered_length = temp.length;
       }
     );


  }

  getAssetRegistered() {
    // for default value of chart
    // call api
    // 
    this.assetsService.get().subscribe(
      (res) => {
        console.log("Resss", res);
        this.asset_registered_length = res.length;

      },
      (err) => {

      }
    );

  }

  initChartTwo() {
    let chart = am4core.create("chartdivtwo", am4charts.XYChart);

    // some extra padding for range labels
    chart.paddingBottom = 50;

    chart.cursor = new am4charts.XYCursor();
    chart.scrollbarX = new am4core.Scrollbar();

    // will use this to store colors of the same items
    let colors = {};

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataItems.template.text = "{realName}";
    categoryAxis.renderer.fontSize = "10";
    // categoryAxis.adapter.add("tooltipText", function (tooltipText, target) {
    // return categoryAxis.tooltipDataItem.dataContext.realName;
    // });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.min = 0;

    // single column series for all data
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.columns.template.width = am4core.percent(80);
    columnSeries.tooltipText = "{provider}: {realName}, {valueY}";
    columnSeries.dataFields.categoryX = "category";
    columnSeries.dataFields.valueY = "value";
    columnSeries.columns.template.fill = am4core.color("#809FD6");
    columnSeries.columns.template.stroke = am4core.color("#809FD6");

    // second value axis for quantity
    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    valueAxis2.syncWithAxis = valueAxis;
    valueAxis2.tooltip.disabled = true;

    // quantity line series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.tooltipText = "{valueY}";
    lineSeries.dataFields.categoryX = "category";
    lineSeries.dataFields.valueY = "quantity";
    lineSeries.yAxis = valueAxis2;
    lineSeries.bullets.push(new am4charts.CircleBullet());
    lineSeries.stroke = chart.colors.getIndex(13);
    lineSeries.fill = lineSeries.stroke;
    lineSeries.strokeWidth = 2;
    lineSeries.snapTooltip = true;

    // when data validated, adjust location of data item based on count
    /* lineSeries.events.on("datavalidated", function () {
      lineSeries.dataItems.each(function (dataItem) {
        // if count divides by two, location is 0 (on the grid)
        if (
          dataItem.dataContext.count / 2 ==
          Math.round(dataItem.dataContext.count / 2)
        ) {
          dataItem.setLocation("categoryX", 0);
        }
        // otherwise location is 0.5 (middle)
        else {
          dataItem.setLocation("categoryX", 0.5);
        }
      });
    }); */

    // fill adapter, here we save color value to colors object so that each time the item has the same name, the same color is used
    // columnSeries.columns.template.adapter.add("fill", function (fill, target) {
    //   let name = target.dataItem.dataContext.realName;
    //   if (!colors[name]) {
    //     colors[name] = chart.colors.next();
    //   }
    //   target.stroke = colors[name];
    //   return colors[name];
    // });

    let rangeTemplate = categoryAxis.axisRanges.template;
    rangeTemplate.tick.disabled = false;
    rangeTemplate.tick.location = 0;
    rangeTemplate.tick.strokeOpacity = 0.6;
    rangeTemplate.tick.length = 60;
    rangeTemplate.grid.strokeOpacity = 0.5;
    rangeTemplate.label.tooltip = new am4core.Tooltip();
    rangeTemplate.label.tooltip.dy = -10;
    rangeTemplate.label.cloneTooltip = false;

    ///// DATA
    let chartData = [];
    let lineSeriesData = [];

    let data = {
      NRW: {
        DMZ: 18829,
        WBA: 709,
        TRA: 2110,
      },
      PRODUCTION: {
        NRO: 10402,
        SRO: 7942,
      },
      "ES-DISTRIBUTION": {
        PH: 16080,
        VALVE: 2297,
      },
      DISTRIBUTION: {
        RESVR: 10388,
      },
      OTS: {
        INST: 7867,
        EM: 345,
      },
      FLEET: {
        FLEET: 1177,
      },
      "WATER QUALITY": {
        LAB: 556,
        RMS: 3,
        ONLA: 40,
        SPA: 1275,
        SURV: 292,
      },
      CBS: {
        AMR: 820,
      },
    };

    // process data ant prepare it for the chart
    for (var providerName in data) {
      let providerData = data[providerName];

      // add data of one provider to temp array
      let tempArray = [];
      let count = 0;
      // add items
      for (var itemName in providerData) {
        if (itemName != "quantity") {
          count++;
          // we generate unique category for each column (providerName + "_" + itemName) and store realName
          tempArray.push({
            category: providerName + "_" + itemName,
            realName: itemName,
            value: providerData[itemName],
            provider: providerName,
          });
        }
      }
      // sort temp array
      tempArray.sort(function (a, b) {
        if (a.value > b.value) {
          return 1;
        } else if (a.value < b.value) {
          return -1;
        } else {
          return 0;
        }
      });

      // add quantity and count to middle data item (line series uses it)
      let lineSeriesDataIndex = Math.floor(count / 2);
      tempArray[lineSeriesDataIndex].quantity = providerData.quantity;
      tempArray[lineSeriesDataIndex].count = count;
      // push to the final data
      am4core.array.each(tempArray, function (item) {
        chartData.push(item);
      });

      // create range (the additional label at the bottom)
      let range = categoryAxis.axisRanges.create();
      range.category = tempArray[0].category;
      range.endCategory = tempArray[tempArray.length - 1].category;
      range.label.text = tempArray[0].provider;
      range.label.dy = 30;
      range.label.truncate = true;
      range.label.fontWeight = "bold";
      range.label.tooltipText = tempArray[0].provider;

      // range.label.adapter.add("maxWidth", function (maxWidth, target) {
      //   let range = target.dataItem;
      //   let startPosition = categoryAxis.categoryToPosition(range.category, 0);
      //   let endPosition = categoryAxis.categoryToPosition(range.endCategory, 1);
      //   let startX = categoryAxis.positionToCoordinate(startPosition);
      //   let endX = categoryAxis.positionToCoordinate(endPosition);
      //   return endX - startX;
      // });
    }

    chart.data = chartData;

    // last tick
    let range = categoryAxis.axisRanges.create();
    range.category = chart.data[chart.data.length - 1].category;
    range.label.disabled = true;
    range.tick.location = 1;
    range.grid.location = 1;

    this.charttwo = chart;
  }

}
