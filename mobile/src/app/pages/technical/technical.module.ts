import { NgModule } from "@angular/core";
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { IonicModule } from "@ionic/angular";

import { TechnicalRoutes } from "./technical.routing";
import { InventoryInfoPageModule } from './inventory-info/inventory-info.module';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

@NgModule({
  declarations: [QrScannerComponent],
  entryComponents: [],
  imports: [
    // BrowserModule,
    CommonModule,
    InventoryInfoPageModule,
    IonicModule.forRoot(),
    LeafletModule.forRoot(),
    RouterModule.forChild(TechnicalRoutes)
  ]
})
export class TechnicalModule {}
