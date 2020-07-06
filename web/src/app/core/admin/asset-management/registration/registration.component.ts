import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Select2Data, Select2UpdateEvent } from "ng-select2-component";
import Dropzone from "dropzone";
import swal from "sweetalert2";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  // Stepper
  isLinear = false;
  isDisableRipple = true;

  // Modal
  modal: BsModalRef;
  modalViewAsset: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-xl",
    ignoreBackdropClick: true,
  };
  modalViewAssetConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    ignoreBackdropClick: true,
  };

  focusSearch;

  selectedValue: string = "";
  data: Select2Data = [
    { value: "", label: "Please select" },
    { value: "01", label: "Sepang" },
    { value: "02", label: "Kuala Lumpur" },
    { value: "03", label: "Hulu Langat" },
    { value: "04", label: "Petaling" },
    { value: "05", label: "Gombak" },
  ];
  selectedTypes: string;
  selectedRegions: string;
  regions: string[] = [
    "Sepang",
    "Kuala Lumpur",
    "Petaling",
    "Gombak",
    "Hulu Langat",
    "Hulu Selangor",
    "Klang",
    "Kuala Selangor",
    "Kuala Langat",
    "Sabak Bernam",
  ];
  types: string[] = [
    "Distribution",
    "Installation",
    "Maintenance",
    "Replacement",
  ];
  selectedOperation: string;
  operations: string[] = [
    "PUMP HOUSE"
  ];
  selectedPumpHouse: string;
  pumpHouses: string[] = [
    "Booster Ixora Pump House",
    "Taman Ixora Pump House",
    "Taman Dahlia Pump House",
    "Taman Seroja Pump House",
    "Taman Mawar Pump House",
    "Desa Vista Sepang Pump House",
    "Taman Salak Perdana Pump House",
    "Desa Bistari Pump House",
    "Taman Salak Maju Pump House",
    "Pusat Operasi Bandar Baru Salak Tinggi  Pump House(BBST Pump House)",
    "Kota Warisan Pump House",
    "Saujana KLIA Pump House",
    "Taman Jenderam Harmoni Pump House",
    "Sepang Gold Coast Pump House",
    "Pantai Sepang Putra Pump House",
    "Taman Desa Saujana Pump House",
    "Puncak Pinggiran Putra Pump House",
    "Sungai Merab Luar Pump House",
    "Maktab Perguruan Islam Pump House (MPI Pump House)",
    "Seksyen 6 Kampung Sungai Merab Pump House (Desa Camelia Pump House)",
    "Institusi Pump House",
    "Taman Prima Tropika Pump House",
    "Taman Suria Tropika Pump House",
    "Taman Lestari Permai Pump House",
    "Taman D'Alpinia Pump House",
    "Bandar 16 Sierra Pump House (Sierra 16 Pump House)",
    "Taman Alam Putra Pump House",
    "Taman Putra Impiana Pump House",
    "Abadi Heights Pump House",
    "Putrajaya WR6 Pump House (WR6 Pump House)",
    "Putrajaya WR5 Pump House (WR5 Pump House)",
    "Southville City Pump House",
    "Taman Putra Prima Pump House",
    "Kosmopleks BBST Pump House",
    "Taman Desa Damai Pump House",
    "Taman Sri Sungai Pelek Pump House",
    "Agrotek Pump House",
    "Taman Permata Pump House",
    "Taman Sri Bayu Pump House",
  ]
  assets = [
    { name: "PUMP-01", error: true },
    { name: "PUMP-02", error: true },
    { name: "MOTOR-01", error: false },
    { name: "MOTOR-02", error: false },
    { name: "Butterfly Valve-01", error: false },
  ];

  constructor(public modalService: BsModalService) {}

  ngOnInit() {
    let currentSingleFile = undefined;
    // single dropzone file - accepts only images
    new Dropzone(document.getElementsByClassName("dropzone-single")[0], {
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
      init: function () {
        this.on("addedfile", function (file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          currentSingleFile = file;
        });
      },
    });
    document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
  }

  openModal(modalNotification: TemplateRef<any>) {
    this.modal = this.modalService.show(modalNotification, this.modalConfig);
  }

  openModalViewAsset(modalNotification: TemplateRef<any>) {
    this.modalViewAsset = this.modalService.show(
      modalNotification,
      this.modalViewAssetConfig
    );
  }

  update() {
    this.modal.hide();
    swal.fire({
      title: "Updated!",
      text: "The asset has been updated",
      type: "success",
      buttonsStyling: false,
      confirmButtonText: "Ok",
      confirmButtonClass: "btn btn-success btn-sm",
    });
  }

  select2Region(event: Select2UpdateEvent<string>) {
    this.selectedValue = event.value;
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }

  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  }

  onSubmit() {
    swal.fire({
      title: "Success",
      text: "Your data successfully inserted into the system",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    });
  }
}
