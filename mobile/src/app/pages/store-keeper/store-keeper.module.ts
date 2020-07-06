import { NgModule } from "@angular/core";
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { IonicModule } from "@ionic/angular";

import { StoreKeeperRoutes } from "./store-keeper.routing";
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { ListItemPageModule } from './list-item/list-item.module';

@NgModule({
  declarations: [QrScannerComponent],
  entryComponents: [],
  imports: [
    // BrowserModule,
    CommonModule,
    ListItemPageModule,
    IonicModule.forRoot(),
    LeafletModule.forRoot(),
    RouterModule.forChild(StoreKeeperRoutes)
  ]
})
export class StoreKeeperModule {}
