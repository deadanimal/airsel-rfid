import { Component, OnInit, NgZone } from "@angular/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { map } from "rxjs/operators";
import { WorkOrderActivityCompletionModel } from "src/app/shared/services/work-order-activity-completion/work-order-activity-completion.model";
import { WorkOrderActivityCompletionService } from "src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service";
import { WorkOrderActivityCompletionAssetLocationAssetListService } from "src/app/shared/services/WorkOrderActivityCompletionAssetLocationAssetList/WorkOrderActivityCompletionAssetLocationAssetList.service";

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
  private pieten: am4charts.PieChart;

  constructor(
    private zone: NgZone,
    public assetsService: AssetsService,
    public workOrderActivityCompletionService: WorkOrderActivityCompletionService,
    public WOACALALS: WorkOrderActivityCompletionAssetLocationAssetListService

  ) { }

  ngOnInit() {
    this.getAssets()
  }


  assets: any;
  getAssets() {
    this.assetsService.get().pipe(map(x => x.filter(i => i.owning_access_group != ""))).subscribe((response) => {
      console.log('response from API is ', response);
      this.assets = response;
      console.log('assets', this.assets);

      this.getWorkOrderActivity();

    }, (error) => {
      console.log('Error is ', error)
    })
  }

  WorkOrderActivity: any
  getWorkOrderActivity() {

    // let temp = []
    this.workOrderActivityCompletionService.get().subscribe((response) => {
      console.log('response from API is ', response);
      this.WorkOrderActivity = response;
      console.log("WorkOrderActivity", this.WorkOrderActivity);

      this.getChartData();
      // this.initChartOne();
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  getChartData() {

    this.workOrderActivityCompletionService

    let cbs = [
      { type: "Preventive Maintenance", total: 0, color: am4core.color("#2174C7") },
      { type: "Corrective Maintenance", total: 0, color: am4core.color("#D8D6D6") },
      { type: "Predictive Maintenance", total: 0, color: am4core.color("#BF9000") },
    ];
    let distribution = [
      { type: "Preventive Maintenance", total: 0, color: am4core.color("#2174C7") },
      { type: "Corrective Maintenance", total: 0, color: am4core.color("#D8D6D6") },
      { type: "Predictive Maintenance", total: 0, color: am4core.color("#BF9000") },
    ];
    let esd = [
      { type: "Preventive Maintenance", total: 0, color: am4core.color("#2174C7") },
      { type: "Corrective Maintenance", total: 0, color: am4core.color("#D8D6D6") },
      { type: "Predictive Maintenance", total: 0, color: am4core.color("#BF9000") },
    ];
    let fleet = [
      { type: "Preventive Maintenance", total: 0, color: am4core.color("#2174C7") },
      { type: "Corrective Maintenance", total: 0, color: am4core.color("#D8D6D6") },
      { type: "Predictive Maintenance", total: 0, color: am4core.color("#BF9000") },
    ];
    let land = [
      { type: "Preventive Maintenance", total: 0, color: am4core.color("#2174C7") },
      { type: "Corrective Maintenance", total: 0, color: am4core.color("#D8D6D6") },
      { type: "Predictive Maintenance", total: 0, color: am4core.color("#BF9000") },
    ];
    let nrw = [
      { type: "Preventive Maintenance", total: 0, color: am4core.color("#2174C7") },
      { type: "Corrective Maintenance", total: 0, color: am4core.color("#D8D6D6") },
      { type: "Predictive Maintenance", total: 0, color: am4core.color("#BF9000") },
    ];
    let pdn = [
      { type: "Preventive Maintenance", total: 0, color: am4core.color("#2174C7") },
      { type: "Corrective Maintenance", total: 0, color: am4core.color("#D8D6D6") },
      { type: "Predictive Maintenance", total: 0, color: am4core.color("#BF9000") },
    ];
    let pds = [
      { type: "Preventive Maintenance", total: 0, color: am4core.color("#2174C7") },
      { type: "Corrective Maintenance", total: 0, color: am4core.color("#D8D6D6") },
      { type: "Predictive Maintenance", total: 0, color: am4core.color("#BF9000") },
    ];
    let scada = [
      { type: "Preventive Maintenance", total: 0, color: am4core.color("#2174C7") },
      { type: "Corrective Maintenance", total: 0, color: am4core.color("#D8D6D6") },
      { type: "Predictive Maintenance", total: 0, color: am4core.color("#BF9000") },
    ];
    let wq = [
      { type: "Preventive Maintenance", total: 0, color: am4core.color("#2174C7") },
      { type: "Corrective Maintenance", total: 0, color: am4core.color("#D8D6D6") },
      { type: "Predictive Maintenance", total: 0, color: am4core.color("#BF9000") },
    ];



    let temp = this.WorkOrderActivity;
    let temp2: any;
    let temp3: any;

    console.log("temp", temp)

    for (let j in temp) {

      console.log("id : ", temp[j])

      this.WOACALALS.get().pipe(map(x => x.filter(i => i.id == temp[j].asset_location_asset_list[0]))).subscribe((response) => {
        console.log('response from API is ', response);
        temp2 = response;
        console.log("temp2", temp2);

        temp3 = this.assets.filter((value) => value.asset_id.includes(temp2[0].asset_id));
        console.log("temp3 debug", temp3);

        if (temp3[0].owning_access_group == "CBS") {
          if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
            cbs[0].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
            cbs[1].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
            cbs[2].total += temp[j].asset_location_asset_list.length;
          }
          else {
            console.log("Failed ", temp3[0].owning_access_group)
          }
        }
        else if (temp3[0].owning_access_group == "DISTRIBUTION") {
          if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
            distribution[0].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
            distribution[1].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
            distribution[2].total += temp[j].asset_location_asset_list.length;
          }
          else {
            console.log("Failed ", temp3[0].owning_access_group)
          }
        }
        else if (temp3[0].owning_access_group == "ES-D") {
          if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
            esd[0].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
            esd[1].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
            esd[2].total += temp[j].asset_location_asset_list.length;
          }
          else {
            console.log("Failed ", temp3[0].owning_access_group)
          }
        }
        else if (temp3[0].owning_access_group == "FLEET") {
          if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
            fleet[0].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
            fleet[1].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
            fleet[2].total += temp[j].asset_location_asset_list.length;
          }
          else {
            console.log("Failed ", temp3[0].owning_access_group)
          }
        }
        else if (temp3[0].owning_access_group == "LAND") {
          if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
            land[0].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
            land[1].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
            land[2].total += temp[j].asset_location_asset_list.length;
          }
          else {
            console.log("Failed ", temp3[0].owning_access_group)
          }
        }
        else if (temp3[0].owning_access_group == "NRW") {
          if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
            nrw[0].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
            nrw[1].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
            nrw[2].total += temp[j].asset_location_asset_list.length;
          }
          else {
            console.log("Failed ", temp3[0].owning_access_group)
          }
        }
        else if (temp3[0].owning_access_group == "PD-N") {
          if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
            pdn[0].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
            pdn[1].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
            pdn[2].total += temp[j].asset_location_asset_list.length;
          }
          else {
            console.log("Failed ", temp3[0].owning_access_group)
          }
        }
        else if (temp3[0].owning_access_group == "PD-S") {
          if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
            pds[0].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
            pds[1].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
            pds[2].total += temp[j].asset_location_asset_list.length;
          }
          else {
            console.log("Failed ", temp3[0].owning_access_group)
          }
        }
        else if (temp3[0].owning_access_group == "SCADA") {
          if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
            scada[0].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
            scada[1].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
            scada[2].total += temp[j].asset_location_asset_list.length;
          }
          else {
            console.log("Failed ", temp3[0].owning_access_group)
          }
        }
        else if (temp3[0].owning_access_group == "WQ") {
          if (temp[j].field_1 == "PREVENTIVE MAINTENANCE") {
            wq[0].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "CORRECTIVE MAINTENANCE") {
            wq[1].total += temp[j].asset_location_asset_list.length;
          }
          else if (temp[j].field_1 == "PREDICTIVE MAINTENANCE") {
            wq[2].total += temp[j].asset_location_asset_list.length;
          }
          else {
            console.log("Failed ", temp3[0].owning_access_group)
          }
        }


        console.log("cbs", cbs);
        console.log("dist", distribution);
        console.log("esd", esd);
        console.log("fleet", fleet);
        console.log("land", land);
        console.log("nrw", nrw);
        console.log("pdn", pdn);
        console.log("pds", pds);
        console.log("scada", scada);
        console.log("wq", wq);

        this.ESD = esd
        this.CBS = cbs
        this.DISTRIBUTION = distribution
        this.ESD = esd
        this.FLEET = fleet
        this.LAND = land
        this.NRW = nrw
        this.PDN = pdn
        this.PDS = pds
        this.SCADA = scada
        this.WQ = wq

        this.initPieOne();
        this.initPieTwo();
        this.initPieThree();
        this.initPieFour();
        this.initPieFive();
        this.initPieSix();
        this.initPieSeven();
        this.initPieEight();
        this.initPieNine();
        this.initPieTen();

        // this.chartData = data;
        // console.log("Chartdata", this.chartData);
        this.initPieTwo();



      }, (error) => {
        console.log('Error is ', error)
      })
    }

  }

  // ngAfterViewInit() {
  //   this.zone.runOutsideAngular(() => {
  //     this.initPieOne();
  //     this.initPieTwo();
  //     this.initPieThree();
  //     this.initPieFour();
  //     this.initPieFive();
  //     this.initPieSix();
  //     this.initPieSeven();
  //     this.initPieEight();
  //     this.initPieNine();
  //     this.initPieTen();
  //   });
  // }

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
      if (this.pieten) this.pieten.dispose();
    });
  }

  CBS: any
  DISTRIBUTION: any
  ESD: any
  FLEET: any
  LAND: any
  NRW: any
  PDN: any
  PDS: any
  SCADA: any
  WQ: any


  initPieOne() {
    let chart = am4core.create("piedivone", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = this.CBS

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

    chart.data = this.DISTRIBUTION

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

    chart.data = this.ESD

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

    chart.data = this.FLEET

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

    chart.data = this.LAND

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

    chart.data = this.NRW

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

    chart.data = this.PDN

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

    chart.data = this.PDS

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

    chart.data = this.SCADA

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

  initPieTen() {
    let chart = am4core.create("piedivten", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = this.WQ

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

    this.pieten = chart;
  }
}
