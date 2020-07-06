import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";

declare var tableau: any;

@Component({
  selector: "app-tableau",
  templateUrl: "./tableau.component.html",
  styleUrls: ["./tableau.component.scss"],
})
export class TableauComponent implements OnInit {
  vizOne: any;
  vizTwo: any;

  constructor(private zone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initTableauOne();
    this.initTableauTwo();
  }

  initTableauOne() {
    var placeholderDiv = document.getElementById("vizContainerOne");
    // Replace this url with the url of your Tableau dashboard
    var url =
      "https://public.tableau.com/views/testing_15890862200980/DashboardMovement?:display_count=y&:origin=viz_share_link";
    var options = {
      hideTabs: true,
      width: "80%",
      height: "600px",
      onFirstInteractive: function () {
        // The viz is now ready and can be safely used.
        console.log("Run this code when the viz has finished loading.");
      },
    };
    // Creating a viz object and embed it in the container div.
    this.vizOne = new tableau.Viz(placeholderDiv, url, options);
  }

  initTableauTwo() {
    var placeholderDiv = document.getElementById("vizContainerTwo");
    // Replace this url with the url of your Tableau dashboard
    var url =
      "https://public.tableau.com/views/testing_15890862200980/DashboardStockValue?:display_count=y&:origin=viz_share_link";
    var options = {
      hideTabs: true,
      width: "80%",
      height: "600px",
      onFirstInteractive: function () {
        // The viz is now ready and can be safely used.
        console.log("Run this code when the viz has finished loading.");
      },
    };
    // Creating a viz object and embed it in the container div.
    this.vizTwo = new tableau.Viz(placeholderDiv, url, options);
  }
}
