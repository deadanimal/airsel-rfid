import { NgModule } from "@angular/core";
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { IonicModule } from "@ionic/angular";

import { OperatorRoutes } from "./operator.routing";
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

@NgModule({
  declarations: [QrScannerComponent],
  entryComponents: [],
  imports: [
    // BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    LeafletModule.forRoot(),
    RouterModule.forChild(OperatorRoutes)
  ]
})
export class OperatorModule {}
