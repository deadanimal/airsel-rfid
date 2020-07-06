import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-inter-warehouse-transfer',
  templateUrl: './inter-warehouse-transfer.page.html',
  styleUrls: ['./inter-warehouse-transfer.page.scss'],
})
export class InterWarehouseTransferPage implements OnInit {
  warehouses = [
    {
      name: 'radio1',
      type: 'radio',
      label: 'SHAH ALAM - CENTRAL STORE',
      value: 'value1',
      checked: true
    },
    {
      name: 'radio2',
      type: 'radio',
      label: 'KLANG - STORE',
      value: 'value2',
    },
    {
      name: 'radio3',
      type: 'radio',
      label: 'PETALING - STORE',
      value: 'value3',
    },
    {
      name: 'radio4',
      type: 'radio',
      label: 'KUALA LANGAT - STORE',
      value: 'value4',
    },
    {
      name: 'radio5',
      type: 'radio',
      label: 'SUNGAI BATU - STORE',
      value: 'value5',
    },
    {
      name: 'radio6',
      type: 'radio',
      label: 'KUALA LUMPUR - STORE',
      value: 'value6',
    },
    {
      name: 'radio7',
      type: 'radio',
      label: 'SSP2 - STORE',
      value: 'value7',
    },
    {
      name: 'radio8',
      type: 'radio',
      label: 'KUALA SELANGOR - STORE',
      value: 'value8',
    },
    {
      name: 'radio9',
      type: 'radio',
      label: 'SABAK BERNAM - STORE',
      value: 'value9',
    },
    {
      name: 'radio10',
      type: 'radio',
      label: 'HULU SELANGOR - STORE',
      value: 'value10',
    },
    {
      name: 'radio11',
      type: 'radio',
      label: 'RANTAU PANJANG - STORE',
      value: 'value11',
    },
    {
      name: 'radio12',
      type: 'radio',
      label: 'SEMENYIH - STORE',
      value: 'value12',
    },
    {
      name: 'radio13',
      type: 'radio',
      label: 'SEMENYIH 2 - STORE',
      value: 'value13',
    },
    {
      name: 'radio14',
      type: 'radio',
      label: 'HULU LANGAT - STORE',
      value: 'value14',
    },
    {
      name: 'radio15',
      type: 'radio',
      label: 'SEPANG - STORE',
      value: 'value15',
    },
    {
      name: 'radio16',
      type: 'radio',
      label: 'SHAH ALAM - STORE',
      value: 'value16',
    },
    {
      name: 'radio17',
      type: 'radio',
      label: 'SUNGAI LANGAT - STORE',
      value: 'value17',
    },
  ];

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

  async selectWarehouseRadio() {
    const alert = await this.alertController.create({
      header: 'Select Warehouse',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'SHAH ALAM - CENTRAL STORE',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'KLANG - STORE',
          value: 'value2',
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'PETALING - STORE',
          value: 'value3',
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'KUALA LANGAT - STORE',
          value: 'value4',
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'SUNGAI BATU - STORE',
          value: 'value5',
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'KUALA LUMPUR - STORE',
          value: 'value6',
        },
        {
          name: 'radio7',
          type: 'radio',
          label: 'SSP2 - STORE',
          value: 'value7',
        },
        {
          name: 'radio8',
          type: 'radio',
          label: 'KUALA SELANGOR - STORE',
          value: 'value8',
        },
        {
          name: 'radio9',
          type: 'radio',
          label: 'SABAK BERNAM - STORE',
          value: 'value9',
        },
        {
          name: 'radio10',
          type: 'radio',
          label: 'HULU SELANGOR - STORE',
          value: 'value10',
        },
        {
          name: 'radio11',
          type: 'radio',
          label: 'RANTAU PANJANG - STORE',
          value: 'value11',
        },
        {
          name: 'radio12',
          type: 'radio',
          label: 'SEMENYIH - STORE',
          value: 'value12',
        },
        {
          name: 'radio13',
          type: 'radio',
          label: 'SEMENYIH 2 - STORE',
          value: 'value13',
        },
        {
          name: 'radio14',
          type: 'radio',
          label: 'HULU LANGAT - STORE',
          value: 'value14',
        },
        {
          name: 'radio15',
          type: 'radio',
          label: 'SEPANG - STORE',
          value: 'value15',
        },
        {
          name: 'radio16',
          type: 'radio',
          label: 'SHAH ALAM - STORE',
          value: 'value16',
        },
        {
          name: 'radio17',
          type: 'radio',
          label: 'SUNGAI LANGAT - STORE',
          value: 'value17',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }, {
          text: 'Submit',
          handler: () => {
            this.submit();
          }
        }
      ]
    });

    await alert.present();
  }

  scanQrCode() {
    let navigationExtras: NavigationExtras = {
      state: {
        link: '/store-supervisor/inter-warehouse-transfer'
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
