import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkOrderPageRoutingModule } from './work-order-routing.module';

import { WorkOrderPage } from './work-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkOrderPageRoutingModule
  ],
  declarations: [WorkOrderPage]
})
export class WorkOrderPageModule {}
