import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceWorkListPageRoutingModule } from './maintenance-work-list-routing.module';

import { MaintenanceWorkListPage } from './maintenance-work-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceWorkListPageRoutingModule
  ],
  declarations: [MaintenanceWorkListPage]
})
export class MaintenanceWorkListPageModule {}
