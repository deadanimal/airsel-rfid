import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-reversal',
  templateUrl: './reversal.page.html',
  styleUrls: ['./reversal.page.scss'],
})
export class ReversalPage implements OnInit {

  constructor(
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async submit() {
    const alert = await this.alertController.create({
      header: "Success",
      message: "Your submission has been successfully recorded.",
      buttons: [
        {
          text: "OK",
          cssClass: "success",
          handler: () => {
            this.router.navigate(["/store-supervisor/tabs/tab2"]);
          },
        },
      ],
    });

    await alert.present();
  }

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: '/store-supervisor/reversal'
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
