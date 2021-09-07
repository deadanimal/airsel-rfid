import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import {
  AlertController,
  LoadingController,
  MenuController,
} from "@ionic/angular";
import { Chart } from "chart.js";
import "chartjs-plugin-labels";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { WorkActivitiesService } from "src/app/shared/services/work-activities/work-activities.service";
import { WamsService } from "src/app/shared/services/wams/wams.service";
import { WorkOrderActivityCompletionService } from 'src/app/shared/services/work-order-activity-completion/work-order-activity-completion.service';
import { AuthService } from "src/app/shared/services/auth/auth.service";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-maintenance-work-list",
  templateUrl: "./maintenance-work-list.page.html",
  styleUrls: ["./maintenance-work-list.page.scss"],
})
export class MaintenanceWorkListPage implements OnInit {
  @ViewChild("pieChartCM", { static: true }) pieChartCM;
  @ViewChild("pieChartPM", { static: true }) pieChartPM;
  @ViewChild("pieChartITC", { static: true }) pieChartITC;
  @ViewChild("pieChartPDM", { static: true }) pieChartPDM;
  @ViewChild("pieChartD", { static: true }) pieChartD;
  @ViewChild("pieChartC", { static: true }) pieChartC;
  @ViewChild("pieChartR", { static: true }) pieChartR;

  barsCM: any;
  barsPM: any;
  barsITC: any;
  barsPDM: any;
  barsD: any;
  barsC: any;
  barsR: any;

  private chartcm: am4charts.PieChart3D;
  private chartpm: am4charts.PieChart3D;
  private chartitc: am4charts.PieChart;
  private chartpdm: am4charts.PieChart;
  private chartd: am4charts.PieChart;
  private chartc: am4charts.PieChart;
  private chartr: am4charts.PieChart;

  cmArray = [];
  pmArray = [];
  itcArray = [];
  pdmArray = [];
  dArray = [];
  cArray = [];
  rArray = [];
  workorderactivities = [];

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public menu: MenuController,
    private router: Router,
    private zone: NgZone,
    public notificationService: NotificationsService,
    private workactivityService: WorkActivitiesService,
    private wamsService: WamsService,
    private workOrderActivityCompletionService: WorkOrderActivityCompletionService,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // this.initChartCM();
      // this.initChartPM();
      // this.initChartITC();
      // this.initChartPDM();
      // this.initChartD();
      // this.initChartC();
      // this.initChartR();
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      // console.log("Chart disposed");
      if (this.chartcm) this.chartcm.dispose();
      if (this.chartpm) this.chartpm.dispose();
      if (this.chartitc) this.chartitc.dispose();
      if (this.chartpdm) this.chartpdm.dispose();
      if (this.chartd) this.chartd.dispose();
      if (this.chartc) this.chartc.dispose();
      if (this.chartr) this.chartr.dispose();
    });
  }

  ionViewDidEnter() {
    this.getWorkActivities();
    // this.createPieChartCM();
    // this.createPieChartPM();
    // this.createPieChartITC();
    // this.createPieChartPDM();
    // this.createPieChartD();
    // this.createPieChartC();
    // this.createPieChartR();
  }


  getWorkActivities() {
    // From database
    // FLEET COMPLIANCE -> COMPLIANCE,
    // CORRECTIVE MAINTENANCE -> CORRECTIVE MAINTENANCE,
    // RETIRE -> DISPOSAL,
    // INSTALLATION TESTING AND COM -> INSTALLATION, TESTING AND COMMISSIONING,
    // PREDICTIVE MAINTENANCE -> PREDICTIVE MAINTENANCE,
    // PREVENTIVE MAINTENANCE -> PREVENTIVE MAINTENANCE,
    // UPGRADE -> REDESIGN
    let userId = this.authService.userID
    console.log("this.authService.userID ngOnInit", this.authService.userID)
    let obj = {
      userid: this.authService.userID
    }
    let listWorkOrdActComp: any = []
    this.workOrderActivityCompletionService.asc_ordered_list(obj).subscribe(
      (res) => {
        // console.log("workOrderActivityCompletionService_res", res);
        // res.forEach(function (data_qq) {
        //   if (data_qq.field_2 == '' || data_qq.field_2 == userId) {
        //     listWorkOrdActComp.push(data_qq)
        //     console.log("if", data_qq.field_1)
        //   } else {
        //     console.log("else")
        //   }
        // })
        
        listWorkOrdActComp = res;
        console.log("listWorkOrdActComp>>>>>>", listWorkOrdActComp)
        
        if (res) {
          this.cmArray = listWorkOrdActComp.filter(function (data) {
            if (data.field_1.indexOf("CORRECTIVE MAINTENANCE") !== -1 && (data.field_2 == userId || data.field_2 == '' )) {
              return true;
            }
            return false;
          });

          this.pmArray = listWorkOrdActComp.filter(function (data) {
            if (data.field_1.indexOf("PREVENTIVE MAINTENANCE") !== -1 && (data.field_2 == userId || data.field_2 == '')) {
              return true;
            }
            return false;
          });

          this.itcArray = listWorkOrdActComp.filter(function (data) {
            if (data.field_1.indexOf("INSTALLATION TESTING AND COM") !== -1 && (data.field_2 == userId || data.field_2 == '')) {
              return true;
            }
            return false;
          });

          this.pdmArray = listWorkOrdActComp.filter(function (data) {
            console.log(data)
            console.log(data.field_1)
            if (data.field_1 == "PREDICTIVE MAINTENANCE" && (data.field_2 == userId || data.field_2 == '')) {
              return true;
            }
            return false;
          });

          console.log("this.pdmArray = ", this.pdmArray)

          this.dArray = listWorkOrdActComp.filter(function (data) {
            if (data.field_1 == "RETIRE" && (data.field_2 == userId || data.field_2 == '')) {
              return true;
            }
            return false;
          });

          this.cArray = listWorkOrdActComp.filter(function (data) {
            if (
              data.field_1 == "FLEET COMPLIANCE" && (data.field_2 == userId || data.field_2 == '')) {
              return true;
            }
            return false;
          });

          this.rArray = listWorkOrdActComp.filter(function (data) {
            if (
              data.field_1 == "UPGRADE" && (data.field_2 == userId || data.field_2 == '')) {
              return true;
            }
            return false;
          });

          console.log("www cmArray = ", this.cmArray)
          console.log("qqq pmArray = ", this.pmArray)
        }
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request is completed");
      }
    );

    // let temp = []
    // this.workOrderActivityCompletionService.get().subscribe((response) => {
    //   console.log('response from API is ', response);
    //   this.workorderactivities = response;
    //   console.log("WorkOrderActivity", this.workorderactivities);

    // }, (error) => {
    //   console.log('Error is ', error)
    // })
  

    // get work-order-activity from WAMS
    // this.wamsService.getWorkOrderActivity().subscribe(
    //   (res) => {
    //     console.log("res", res);
    //     this.workorderactivities = res.result.filter((obj) => {
    //       return obj.EMPLOYEE_ID == "303714690157";
    //     });
    //     this.cmArray = this.workorderactivities.filter((obj) => {
    //       return obj.ACT_TYPE_CD == "CORRECTIVE-MAINTENANCE";
    //     });
    //   },
    //   (err) => {
    //     console.error("err", err);
    //   }
    // );
  }

  calculateTotalStatus(array: Array<any>, status: string) {
    // From database
    // ('Backlog', 'Backlog'),
    // ('InProgress', 'InProgress'),
    // ('New', 'New')
    // ('Completed', 'Completed')
    if (array.length > 0) {
      let tempArray = array.filter(function (data) {
        if (
          data.status
            .toLowerCase()
            .indexOf(status.toLowerCase()) !== -1
        )
          return true;
        return false;
      });
      return tempArray.length > 0 ? tempArray.length : 0;
    } else {
      return 0;
    }
  }

  createPieChartCM() {
    let ctx = this.pieChartCM.nativeElement;
    ctx.height = 300;
    this.barsCM = new Chart(ctx, {
      type: "pie",
      data: {
        // labels: ['S1', 'S2', 'S3'],
        datasets: [
          {
            label: "Viewers in millions",
            data: [3, 2, 6],
            backgroundColor: ["#00CD00", "#FC4242", "#E3F705"], // array should have same number of elements as number of dataset
            // HIJAU, MERAH, KUNING
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          labels: {
            render: "value",
            fontSize: 14,
            fontStyle: "bold",
            fontColor: "#000",
            fontFamily: '"Lucida Console", Monaco, monospace',
          },
        },
      },
    });
  }

  createPieChartPM() {
    let ctx = this.pieChartPM.nativeElement;
    ctx.height = 300;
    this.barsPM = new Chart(ctx, {
      type: "pie",
      data: {
        // labels: ['S1', 'S2', 'S3'],
        datasets: [
          {
            label: "Viewers in millions",
            data: [2, 3],
            backgroundColor: ["#00CD00", "#E3F705"], // array should have same number of elements as number of dataset
            // HIJAU, MERAH, KUNING
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          labels: {
            render: "value",
            fontSize: 14,
            fontStyle: "bold",
            fontColor: "#000",
            fontFamily: '"Lucida Console", Monaco, monospace',
          },
        },
      },
    });
  }

  createPieChartITC() {
    let ctx = this.pieChartITC.nativeElement;
    ctx.height = 300;
    this.barsITC = new Chart(ctx, {
      type: "pie",
      data: {
        // labels: ['S1', 'S2', 'S3'],
        datasets: [
          {
            label: "Viewers in millions",
            data: [3],
            backgroundColor: ["#00CD00"], // array should have same number of elements as number of dataset
            // HIJAU, MERAH, KUNING
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          labels: {
            render: "value",
            fontSize: 14,
            fontStyle: "bold",
            fontColor: "#000",
            fontFamily: '"Lucida Console", Monaco, monospace',
          },
        },
      },
    });
  }

  createPieChartPDM() {
    let ctx = this.pieChartPDM.nativeElement;
    ctx.height = 300;
    this.barsPDM = new Chart(ctx, {
      type: "pie",
      data: {
        // labels: ['S1', 'S2', 'S3'],
        datasets: [
          {
            label: "Viewers in millions",
            data: [1, 3],
            backgroundColor: ["#FC4242", "#00CD00"], // array should have same number of elements as number of dataset
            // HIJAU, MERAH, KUNING
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          labels: {
            render: "value",
            fontSize: 14,
            fontStyle: "bold",
            fontColor: "#000",
            fontFamily: '"Lucida Console", Monaco, monospace',
          },
        },
      },
    });
  }

  createPieChartD() {
    let ctx = this.pieChartD.nativeElement;
    ctx.height = 300;
    this.barsD = new Chart(ctx, {
      type: "pie",
      data: {
        // labels: ['S1', 'S2', 'S3'],
        datasets: [
          {
            label: "Viewers in millions",
            data: [2, 3],
            backgroundColor: ["#00CD00", "#E3F705"], // array should have same number of elements as number of dataset
            // HIJAU, MERAH, KUNING
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          labels: {
            render: "value",
            fontSize: 14,
            fontStyle: "bold",
            fontColor: "#000",
            fontFamily: '"Lucida Console", Monaco, monospace',
          },
        },
      },
    });
  }

  createPieChartC() {
    let ctx = this.pieChartC.nativeElement;
    ctx.height = 300;
    this.barsC = new Chart(ctx, {
      type: "pie",
      data: {
        // labels: ['S1', 'S2', 'S3'],
        datasets: [
          {
            label: "Viewers in millions",
            data: [1],
            backgroundColor: ["#E3F705"], // array should have same number of elements as number of dataset
            // HIJAU, MERAH, KUNING
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          labels: {
            render: "value",
            fontSize: 14,
            fontStyle: "bold",
            fontColor: "#000",
            fontFamily: '"Lucida Console", Monaco, monospace',
          },
        },
      },
    });
  }

  createPieChartR() {
    let ctx = this.pieChartR.nativeElement;
    ctx.height = 300;
    this.barsR = new Chart(ctx, {
      type: "pie",
      data: {
        // labels: ['S1', 'S2', 'S3'],
        datasets: [
          {
            label: "Viewers in millions",
            data: [3, 2, 6],
            backgroundColor: ["#00CD00", "#FC4242", "#E3F705"], // array should have same number of elements as number of dataset
            // HIJAU, MERAH, KUNING
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          labels: {
            render: "value",
            fontSize: 14,
            fontStyle: "bold",
            fontColor: "#000",
            fontFamily: '"Lucida Console", Monaco, monospace',
          },
        },
      },
    });
  }

  // ionViewDidLeave() {
  //   console.log("ionViewDidLeave MaintenanceWorkListPage");
  //   this.ngOnDestroy();
  // }

  initChartCM() {
    let chart = am4core.create("chartdivcm", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    // Add data
    chart.data = [
      {
        country: "New",
        litres: 3,
        color: am4core.color("#00CD00"),
      },
      {
        country: "Pending",
        litres: 2,
        color: am4core.color("#FC4242"),
      },
      {
        country: "In Progress",
        litres: 6,
        color: am4core.color("#E3F705"),
      },
    ];

    chart.innerRadius = 30;
    // chart.legend = new am4charts.Legend();

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    series.slices.template.propertyFields.fill = "color";

    series.labels.template.text = "{value.value}";
    series.labels.template.fontSize = "24px";
    // series.alignLabels = false;
    // series.labels.template.bent = false;
    // series.labels.template.radius = 3;
    // series.labels.template.padding(0, 0, 0, 0);

    series.slices.template.events.on("hit", function (ev) {
      let navigationExtras: NavigationExtras = {
        state: {
          status: ev.target.dataItem.properties.category,
        },
      };
    });

    this.chartcm = chart;
  }

  initChartPM() {
    let chart = am4core.create("chartdivpm", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    // Add data
    chart.data = [
      {
        country: "New",
        litres: 2,
        color: am4core.color("#00CD00"),
      },
      {
        country: "In Progress",
        litres: 3,
        color: am4core.color("#E3F705"),
      },
    ];

    chart.innerRadius = 30;
    // chart.legend = new am4charts.Legend();

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    series.slices.template.propertyFields.fill = "color";

    series.labels.template.text = "{value.value}";
    series.labels.template.fontSize = "24px";
    // series.alignLabels = false;
    // series.labels.template.bent = false;
    // series.labels.template.radius = 3;
    // series.labels.template.padding(0, 0, 0, 0);

    this.chartpm = chart;
  }

  initChartITC() {
    let chart = am4core.create("chartdivitc", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    // Add data
    chart.data = [
      {
        country: "New",
        litres: 3,
        color: am4core.color("#00CD00"),
      },
    ];

    chart.innerRadius = 30;
    // chart.legend = new am4charts.Legend();

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    series.slices.template.propertyFields.fill = "color";

    series.labels.template.text = "{value.value}";
    series.labels.template.fontSize = "24px";
    // series.alignLabels = false;
    // series.labels.template.bent = false;
    // series.labels.template.radius = 3;
    // series.labels.template.padding(0, 0, 0, 0);

    this.chartitc = chart;
  }

  initChartPDM() {
    let chart = am4core.create("chartdivpdm", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    // Add data
    chart.data = [
      {
        country: "Pending",
        litres: 1,
        color: am4core.color("#FC4242"),
      },
      {
        country: "New",
        litres: 3,
        color: am4core.color("#00CD00"),
      },
    ];

    chart.innerRadius = 30;
    // chart.legend = new am4charts.Legend();

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    series.slices.template.propertyFields.fill = "color";

    series.labels.template.text = "{value.value}";
    series.labels.template.fontSize = "24px";
    // series.alignLabels = false;
    // series.labels.template.bent = false;
    // series.labels.template.radius = 3;
    // series.labels.template.padding(0, 0, 0, 0);

    this.chartpdm = chart;
  }

  initChartD() {
    let chart = am4core.create("chartdivd", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    // Add data
    chart.data = [
      {
        country: "New",
        litres: 2,
        color: am4core.color("#00CD00"),
      },
      {
        country: "In Progress",
        litres: 3,
        color: am4core.color("#E3F705"),
      },
    ];

    chart.innerRadius = 30;
    // chart.legend = new am4charts.Legend();

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    series.slices.template.propertyFields.fill = "color";

    series.labels.template.text = "{value.value}";
    series.labels.template.fontSize = "24px";
    // series.alignLabels = false;
    // series.labels.template.bent = false;
    // series.labels.template.radius = 3;
    // series.labels.template.padding(0, 0, 0, 0);

    this.chartd = chart;
  }

  initChartC() {
    let chart = am4core.create("chartdivc", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    // Add data
    chart.data = [
      {
        country: "In Progress",
        litres: 1,
        color: am4core.color("#E3F705"),
      },
    ];

    chart.innerRadius = 30;
    // chart.legend = new am4charts.Legend();

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    series.slices.template.propertyFields.fill = "color";

    series.labels.template.text = "{value.value}";
    series.labels.template.fontSize = "24px";
    // series.alignLabels = false;
    // series.labels.template.bent = false;
    // series.labels.template.radius = 3;
    // series.labels.template.padding(0, 0, 0, 0);

    this.chartc = chart;
  }

  initChartR() {
    let chart = am4core.create("chartdivr", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    // Add data
    chart.data = [
      {
        country: "New",
        litres: 3,
        color: am4core.color("#00CD00"),
      },
      {
        country: "Pending",
        litres: 2,
        color: am4core.color("#FC4242"),
      },
      {
        country: "In Progress",
        litres: 6,
        color: am4core.color("#E3F705"),
      },
    ];

    chart.innerRadius = 30;
    // chart.legend = new am4charts.Legend();

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    series.slices.template.propertyFields.fill = "color";

    series.labels.template.text = "{value.value}";
    series.labels.template.fontSize = "24px";
    // series.alignLabels = false;
    // series.labels.template.bent = false;
    // series.labels.template.radius = 3;
    // series.labels.template.padding(0, 0, 0, 0);

    this.chartr = chart;
  }

  openPage(
    route: string,
    type: string,
    status: string,
    image: string,
    name: string
  ) {
    let array: any;
    switch (type) {
      case "CM":
        array = this.cmArray;
        // array = this.cmArray.filter((obj) => {
        //   return obj.bo_status == status;
        // });
        break;
      case "PM":
        array = this.pmArray;
        // array = this.pmArray.filter((obj) => {
        //   return obj.bo_status == status;
        // });
        break;
      case "ITC":
        array = this.itcArray;
        // array = this.itcArray.filter((obj) => {
        //   return obj.bo_status == status;
        // });
        break;
      case "PdM":
        array = this.pdmArray;
        // array = this.pdmArray.filter((obj) => {
        //   return obj.bo_status == status;
        // });
        break;
      case "Disposal":
        array = this.dArray;
        // array = this.dArray.filter((obj) => {
        //   return obj.bo_status == status;
        // });
        break;
      case "Compliance":
        array = this.cArray;
        // array = this.cArray.filter((obj) => {
        //   return obj.bo_status == status;
        // });
        break;
      case "Redesign":
        array = this.rArray;
        // array = this.rArray.filter((obj) => {
        //   return obj.bo_status == status;
        // });
        break;
    }

    console.log("array = ", array)

    let navigationExtras: NavigationExtras = {
      state: {
        type: type,
        status: status,
        work_activity: array,
        image: image,
        name: name,
      },
    };
    console.log("navigationExtras = ", navigationExtras)
    this.router.navigate([route], navigationExtras);
  }

  async clickLogout() {
    const alert = await this.alertController.create({
      header: "Logout",
      message: "Are you want to logout?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => { },
        },
        {
          text: "Yes, logout it!",
          handler: () => {
            this.router.navigate(["/"]);
          },
        },
      ],
    });

    await alert.present();
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }
}
