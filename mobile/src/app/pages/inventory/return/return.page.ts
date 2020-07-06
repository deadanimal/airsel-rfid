import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: "app-return",
  templateUrl: "./return.page.html",
  styleUrls: ["./return.page.scss"],
})
export class ReturnPage implements OnInit {
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
            this.router.navigate(["/inventory/tabs/tab2"]);
          },
        },
      ],
    });

    await alert.present();
  }

  scanQrCode() {

    this.router.navigate(['/inventory/qr-scanner']);

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
