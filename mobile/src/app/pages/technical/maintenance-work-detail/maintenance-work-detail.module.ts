import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceWorkDetailPageRoutingModule } from './maintenance-work-detail-routing.module';

import { MaintenanceWorkDetailPage } from './maintenance-work-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceWorkDetailPageRoutingModule
  ],
  declarations: [MaintenanceWorkDetailPage]
})
export class MaintenanceWorkDetailPageModule {}
