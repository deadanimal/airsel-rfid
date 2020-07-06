import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";

// import * as L from "leaflet";
import { Map, tileLayer, Marker, icon, LatLng } from 'leaflet';

import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-asset-location",
  templateUrl: "./asset-location.page.html",
  styleUrls: ["./asset-location.page.scss"]
})
export class AssetLocationPage implements OnInit {

  map: Map;

  pumphouses: Array<any> = [
    {name: "Taman Ixora Pump House", lat: 2.817576, lng: 101.728028 },
    {name: "Taman Dahlia Pump House", lat: 2.825785, lng: 101.722880 },
    {name: "Taman Seroja Pump House", lat: 2.826200, lng: 101.725592},
    {name: "Taman Mawar Pump House", lat: 2.831514, lng: 101.733691 },
    {name: "Desa Vista Pump House", lat: 2.841246, lng: 101.747838 }
  ];

  locationName: string;
  assetName: string;

  /* options = {
    layers: [
      L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
      })
    ],
    zoom: 13,
    center: L.latLng(2.835388, 101.738382)
  }; */

  constructor(
    private geolocation: Geolocation,
    private alertController: AlertController,
    private menu: MenuController,
    private router: Router
  ) {}

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = new Map("mapId").setView([2.835388, 101.738382], 14);
    tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", { 
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    })
    .addTo(this.map); // This line is added to add the Tile Layer to our map

    let marker = new Marker(
      [2.835388, 101.738382],
      {
        draggable: true,
        icon: icon({
          iconSize: [30, 30],
          iconAnchor: [13, 41],
          iconUrl: "assets/icon/location.svg"
        })
      }
    );
    marker.addTo(this.map);
    marker.on("dragend", function() {
      var lat = marker.getLatLng().lat;
      var lng = marker.getLatLng().lng;
      marker.bindPopup(
        "Moved to: " + lat.toFixed(4) + ", " + lng.toFixed(4) + "."
      );
    });

    // Add multiple markers
    for (var i = 0; i < this.pumphouses.length; i++) {
      var markerpumphouse = new Marker([ this.pumphouses[i].lat, this.pumphouses[i].lng ], {
        icon: icon({
          iconSize: [30, 30],
          iconAnchor: [13, 41],
          iconUrl: "assets/icon/location.svg"
        })
      })
        .bindPopup("Pump house: " + this.pumphouses[i].name)
        .addTo(this.map);
    }
  }

  /* onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);

    // this.geolocation.getCurrentPosition().then(resp => {
    //   if (resp) {
        let marker = new L.Marker(
          [2.835388, 101.738382],
          {
            draggable: true,
            icon: L.icon({
              iconSize: [30, 30],
              iconAnchor: [13, 41],
              iconUrl: "assets/icon/location.svg"
            })
          }
        );
        marker.addTo(map);
        marker.on("dragend", function() {
          var lat = marker.getLatLng().lat;
          var lng = marker.getLatLng().lng;
          marker.bindPopup(
            "Moved to: " + lat.toFixed(4) + ", " + lng.toFixed(4) + "."
          );
        });

        map.panTo(new L.LatLng(2.835388, 101.738382));
    //   }
    // });

    for (var i = 0; i < this.pumphouses.length; i++) {
      var markerpumphouse = new L.Marker([ this.pumphouses[i].lat, this.pumphouses[i].lng ], {
        icon: L.icon({
          iconSize: [30, 30],
          iconAnchor: [13, 41],
          iconUrl: "assets/icon/location.svg"
        })
      })
        .bindPopup("Pump house: " + this.pumphouses[i].name)
        .addTo(map);
    }
  } */

  locateMe(name, lat, lng) {
    this.map.panTo(new LatLng(lat, lng));
    this.locationName = name;

    this.assetNameAlertRadio();
  }

  async assetNameAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Choose Asset',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Booster Ixora Pump House - Motor',
          value: 'Booster Ixora Pump House - Motor',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Booster Ixora Pump House - Butterfly valve',
          value: 'Booster Ixora Pump House - Butterfly valve'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Booster Ixora Pump House - Check valve',
          value: 'Booster Ixora Pump House - Check valve'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Booster Ixora Pump House - Pressure gauge',
          value: 'Booster Ixora Pump House - Pressure gauge'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Booster Ixora Pump House - Control panel',
          value: 'Booster Ixora Pump House - Control panel'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('cancel clicked');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.assetName = data;
            console.log('ok clicked');
          }
        }
      ]
    });

    await alert.present();
  }

  confirm() {
    let navigationExtras: NavigationExtras = {
      state: {
        locationName: this.locationName,
        assetName: this.assetName
      }
    };

    this.router.navigate(['/technical/tabs/tab2'], navigationExtras);
  }
}
