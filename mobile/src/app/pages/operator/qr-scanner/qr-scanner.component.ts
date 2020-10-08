import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from "@ionic/angular";
// import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";

@Component({
  selector: "app-qr-scanner",
  templateUrl: "./qr-scanner.component.html",
  styleUrls: ["./qr-scanner.component.scss"],
})
export class QrScannerComponent implements OnInit {
  scanSubscription;
  scanText: any;
  link: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    // private qrScanner: QRScanner
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.link = this.router.getCurrentNavigation().extras.state.link;
        console.log("link", this.link);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    // this.scan();
  }

  ionViewWillLeave() {
    // this.stopScanning();
  }

  backButton() {
    this.ionViewWillLeave();
    this.toastCtrl.dismiss();

    this.router.navigate([this.link]);
    // this.router.navigate(['/inventory/stock-receive']);
    // this.navCtrl.navigateBack("/inventory/stock-receive");
  }

  /* scan() {
    (window.document.querySelector("ion-app") as HTMLElement).classList.add(
      "cameraView"
    );
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          this.scanSubscription = this.qrScanner
            .scan()
            .subscribe((text: string) => {
              this.scanText = text;
              this.presentToast();
            });
        } else {
          console.error("Permission Denied", status);
        }
      })
      .catch((e: any) => {
        console.error("Error", e);
      });
  }

  stopScanning() {
    this.scanSubscription ? this.scanSubscription.unsubscribe() : null;
    this.scanSubscription = null;
    (window.document.querySelector("ion-app") as HTMLElement).classList.remove(
      "cameraView"
    );
    this.qrScanner.hide();
    this.qrScanner.destroy();
  } */

  async presentToast() {
    const toast = await this.toastCtrl.create({
      header: "Air Selangor QR Code",
      message: this.scanText,
      buttons: [
        {
          text: "Done",
          handler: () => {
            this.backButton();
          },
        },
      ],
    });
    toast.present();
  }
}
