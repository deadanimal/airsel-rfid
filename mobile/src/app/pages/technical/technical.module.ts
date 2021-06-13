import { NgModule } from "@angular/core";
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { IonicModule } from "@ionic/angular";
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar'

import { TechnicalRoutes } from "./technical.routing";
import { InventoryInfoPageModule } from './inventory-info/inventory-info.module';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { ServiceHistoryPageModule } from './service-history/service-history.module';
import { WorkRequestPageModule } from './work-request/work-request.module';
import { OperationalReadingPageModule } from './operational-reading/operational-reading.module';
import { MeasurementTypePageModule } from './measurement-type/measurement-type.module';
import { ApprovalProfilePageModule } from "./approval-profile/approval-profile.module";

@NgModule({
  declarations: [QrScannerComponent],
  entryComponents: [],
  imports: [
    // BrowserModule,
    CommonModule,
    InventoryInfoPageModule,
    ServiceHistoryPageModule,
    WorkRequestPageModule,
    OperationalReadingPageModule,
    MeasurementTypePageModule,
    ApprovalProfilePageModule,
    IonCustomScrollbarModule,
    IonicModule.forRoot(),
    LeafletModule.forRoot(),
    RouterModule.forChild(TechnicalRoutes)
  ]
})
export class TechnicalModule {}
