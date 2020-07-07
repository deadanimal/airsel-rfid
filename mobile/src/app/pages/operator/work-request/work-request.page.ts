import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
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
    public alertController: AlertController,
    public menu: MenuController,
    private router: Router,
    // private barcodeScanner: BarcodeScanner
    private camera: Camera
  ) { }

  ngOnInit() {
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

  async clickLogout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }, {
          text: 'Yes, logout it!',
          handler: () => {
            this.router.navigate(['/']);
          }
        }
      ]
    });

    await alert.present();
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

}
