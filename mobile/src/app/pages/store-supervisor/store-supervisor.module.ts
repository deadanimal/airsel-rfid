import { NgModule } from "@angular/core";
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { IonicModule } from "@ionic/angular";

import { StoreSupervisorRoutes } from "./store-supervisor.routing";
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { ListItemPageModule } from './list-item/list-item.module';

@NgModule({
  declarations: [QrScannerComponent],
  entryComponents: [],
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    ListItemPageModule,
    IonicModule.forRoot(),
    LeafletModule.forRoot(),
    RouterModule.forChild(StoreSupervisorRoutes)
  ]
})
export class StoreSupervisorModule {}
