import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-action',
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
})
export class ActionPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async stockReceiveInfo() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'Stock Receive is initiate when user receive stock at store. The process start by scanning the QR code or RFID tag on stock using mobile phone or RFID scanner. After complete scanning all stock item, user will submit the information into the system.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async stockIssuanceInfo() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'Stock Issuance is initiate when user want to issue stock from store. The process start by scanning the QR code or RFID tag on stock using mobile phone or RFID scanner. After complete scanning all stock item, user will submit the information into the system.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async returnInfo() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'Return is initiate when user want to return stock to vendor. The process start by scanning the QR code or RFID tag on stock using mobile phone or RFID scanner. After complete scanning all stock item, user will submit the information into the system.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async stockCountInfo() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'Stock Count is initiate when user want to do stock count in store. The process start by scanning the QR code or RFID tag on stock using mobile phone or RFID scanner. User able to made multiple scanning before submit. After complete scanning all stock item, user will submit the information into the system.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async disposeInfo() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'Dispose is initiate when user want to dispose stock. The process start by scanning the QR code or RFID tag on stock using mobile phone or RFID scanner. After complete scanning all stock item, user will submit the information into the system.',
      buttons: ['OK']
    });

    await alert.present();
  }

  goToPage(link) {
    let navigationExtras: NavigationExtras = {
      state: {
        link: link
      }
    };
    this.router.navigate(['/inventory/qr-scanner'], navigationExtras);
  }

}
