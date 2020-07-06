import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-work-request',
  templateUrl: './work-request.page.html',
  styleUrls: ['./work-request.page.scss'],
})
export class WorkRequestPage implements OnInit {

  // dropdowns
  assetNames = [
    'SLUICE VALVE-SLUICE VALVE-GROUND-200-MM',
    'SLUICE VALVE-SCOUR VALVE-GROUND-150-MM',
    'BUTTERFLY VALVE-BYPASS RESERVOIR VALVE-GROUND-400-MM',
    'SLUICE VALVE-INLET VALVE-GROUND-150-MM',
    'SLUICE VALVE-BYPASS ALTITUDE VALVE-GROUND-150-MM',
    'ALTITUDE VALVE-ALTITUDE VALVE-GROUND-150-MM'
  ];
  capturedSnapURL: string;

  constructor(
    public menu: MenuController,
    // private barcodeScanner: BarcodeScanner
    private camera: Camera,
  ) { }

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
  }

  scanQrCode() {
    // this.barcodeScanner
    //   .scan()
    //   .then(barcodeData => {
    //     console.log("Barcode data", barcodeData);
    //   })
    //   .catch(err => {
    //     console.log("Error", err);
    //   });
  }

  takeCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.capturedSnapURL = base64Image;
      },
      (err) => {
        // Handle error
        console.log(err);
      }
    );
  }

}
