import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import Dropzone from "dropzone";
Dropzone.autoDiscover = false;

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import material from "@amcharts/amcharts4/themes/material.js";
am4core.useTheme(material)

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from "sweetalert2";

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  
  // Stepper
  isLinear = false
  isDisableRipple = true

  public chartOne

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-xl"
  }

  // Data
  focusSearch

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    
  }

  initChart() {
    this.chartOne = am4core.create("chartdiv", am4charts.PieChart);

    // Add data
    this.chartOne.data = [ {
      "type": "Lithuania",
      "amount": 501.9
    }, {
      "type": "Czechia",
      "amount": 301.9
    }, {
      "type": "Ireland",
      "amount": 201.1
    }, {
      "type": "Germany",
      "amount": 165.8
    }, {
      "type": "Australia",
      "amount": 139.9
    }, {
      "type": "Austria",
      "amount": 128.3
    }, {
      "type": "UK",
      "amount": 99
    }, {
      "type": "Belgium",
      "amount": 60
    }, {
      "type": "The Netherlands",
      "amount": 50
    } ];
    
    // Add and configure Series
    let pieSeries = this.chartOne.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "type";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;    
  }
  
  openModal(modalNotification: TemplateRef<any>) {
    this.modal = this.modalService.show(
      modalNotification,
      this.modalConfig
    )
    let currentSingleFile = undefined;
    // single dropzone file - accepts only images
    new Dropzone(document.getElementById("dropzone-single"), {
      url: "/",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        "dz-preview-single"
      )[0],
      previewTemplate: document.getElementsByClassName("dz-preview-single")[0]
        .innerHTML,
      maxFiles: 1,
      acceptedFiles: "image/*",
      init: function() {
        this.on("addedfile", function(file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          currentSingleFile = file;
        });
      }
    });
    document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
  }

  approve() {
    swal.fire({
      title: 'Approved!',
      text: 'Asset registration has been approved',
      type: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Ok',
      confirmButtonClass: 'btn btn-success btn-sm'
    })
  }

  reject() {
    swal.fire({
      title: 'Deleted!',
      text: 'Asset registration has been rejected',
      type: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Ok',
      confirmButtonClass: 'btn btn-success btn-sm'
    })
  }

  register() {
    this.modal.hide()
    swal.fire({
      title: 'Registered!',
      text: 'New asset has been registered',
      type: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Ok',
      confirmButtonClass: 'btn btn-success btn-sm'
    })
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function() {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }
  
  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  }

}
