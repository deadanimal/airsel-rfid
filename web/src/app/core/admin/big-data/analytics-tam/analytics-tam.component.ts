import { Component, OnInit, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { map } from "rxjs/operators";
import { WorkOrderActivityCompletionModel } from "src/app/shared/services/work-order-activity-completion/work-order-activity-completion.model";
import { WorkOrderActivityCompletionService } from "src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service";
import { WorkOrderActivityCompletionAssetLocationAssetListService } from "src/app/shared/services/WorkOrderActivityCompletionAssetLocationAssetList/WorkOrderActivityCompletionAssetLocationAssetList.service";
import { NgxSpinnerService } from "ngx-spinner";
import { formatDate } from "@angular/common";
import { TarService } from "src/app/shared/services/analytic-tar/analytic-tar.service"


am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-analytics-tam", templateUrl: "./analytics-tam.component.html", styleUrls: ["./analytics-tam.component.scss"], })
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

  constructor(
    private zone: NgZone,
    public assetsService: AssetsService,
    public workOrderActivityCompletionService: WorkOrderActivityCompletionService,
    public WOACALALS: WorkOrderActivityCompletionAssetLocationAssetListService,
    private SpinnerService: NgxSpinnerService,
    private tarService: TarService,

  ) { }

  ngOnInit() {
    //this.getAssets()
    this.getChartData();
    this.computeTAM();
  }
  computeTAM() {
    this.tarService.post_analytics_tam().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
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

      

    }, (error) => {
      console.log('Error is ', error)
    })
  }

  totalAssetMaintenance = 0;
  WorkOrderActivity: any
  date = new Date()
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
    let data;
    this.tarService.get_analytics_tam().subscribe(
      (res) => {
        data = res;
        console.log("AA", data)
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.CBS = data["CBS"]
        this.DISTRIBUTION = data["DISTRIBUTION"]
        this.ESD = data["ES-D"]
        this.FLEET = data["FLEET"]
        this.LAND = data["LAND "]
        this.NRW = data["NRW"]
        this.PDN = data["PDN"]
        this.PDS = data["PDS"]
        this.SCADA = data["SCADA"]
        this.WQ = data["WQ"]
        this.totalAssetMaintenance = data.totalAssetMaintenance

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
        // this.initPieTwo();

        this.SpinnerService.hide();



      }

    );

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
      // this.totalWorkOrder = temp2.length


    }, (error) => {
      console.log('Error is ', error)
    })
  }

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
      this.initPieTen();
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
