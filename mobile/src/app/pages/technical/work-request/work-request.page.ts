import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";

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

  segmentModal = "first";

  constructor(
    public alertController: AlertController,
    public menu: MenuController,
    public notificationService: NotificationsService,
    private router: Router,
    // private barcodeScanner: BarcodeScanner
    private camera: Camera,
  ) { }

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
  }

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: "/technical/work-request",
      },
    };
    this.router.navigate(["/technical/qr-scanner"], navigationExtras);

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

  async submit() {
    const alert = await this.alertController.create({
      header: 'Work Request',
      message: 'Your work request have successfully submitted into the system. Thank you.',
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.clickBack();
          }
        }
      ]
    });

    await alert.present();  
  }

  clickBack() {
    this.router.navigate(["/technical/work-request-list"]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }

  changeSegment(segment: string) {
    this.segmentModal = segment;
  }

}
