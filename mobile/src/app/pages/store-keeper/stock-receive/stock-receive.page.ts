import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { AlertController } from "@ionic/angular";
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: "app-stock-receive",
  templateUrl: "./stock-receive.page.html",
  styleUrls: ["./stock-receive.page.scss"],
})
export class StockReceivePage implements OnInit {
  scanArray = [];

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
        link: '/store-keeper/store-receive'
      }
    };
    this.router.navigate(['/store-keeper/qr-scanner'], navigationExtras);

    /* let options = {
      prompt: "Place a QR code inside the scan area"
    }; */

    /* this.barcodeScanner
      .scan(options)
      .then(barcodeData => {
        console.log("Barcode data", barcodeData);
        if (barcodeData.text.length > 0) {
          this.scanArray.push(barcodeData);
          console.log("scanArray", this.scanArray);
          this.scanQrCode();
        }
      })
      .catch(err => {
        console.log("Error", err);
      }); */
  }
}
