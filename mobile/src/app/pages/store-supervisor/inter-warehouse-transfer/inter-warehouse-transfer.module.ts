import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterWarehouseTransferPageRoutingModule } from './inter-warehouse-transfer-routing.module';

import { InterWarehouseTransferPage } from './inter-warehouse-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterWarehouseTransferPageRoutingModule
  ],
  declarations: [InterWarehouseTransferPage]
})
export class InterWarehouseTransferPageModule {}
