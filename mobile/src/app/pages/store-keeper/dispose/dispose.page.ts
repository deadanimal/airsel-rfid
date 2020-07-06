import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { AlertController } from "@ionic/angular";
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: "app-dispose",
  templateUrl: "./dispose.page.html",
  styleUrls: ["./dispose.page.scss"],
})
export class DisposePage implements OnInit {
  constructor(
    public alertController: AlertController,
    // private barcodeScanner: BarcodeScanner,
    private router: Router
  ) {}

  ngOnInit() {}

  async submit() {
    const alert = await this.alertController.create({
      header: "Success",
      message: "Your submission has been successfully recorded.",
      buttons: [
        {
          text: "OK",
          cssClass: "success",
          handler: () => {
            this.router.navigate(["/store-keeper/tabs/tab2"]);
          },
        },
      ],
    });

    await alert.present();
  }

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: '/store-keeper/dispose'
      }
    };
    this.router.navigate(['/store-supervisor/qr-scanner'], navigationExtras);

    // this.barcodeScanner
    //   .scan()
    //   .then(barcodeData => {
    //     console.log("Barcode data", barcodeData);
    //   })
    //   .catch(err => {
    //     console.log("Error", err);
    //   });
  }
}
