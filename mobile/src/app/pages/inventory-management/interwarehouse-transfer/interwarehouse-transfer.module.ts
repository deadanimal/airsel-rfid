import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterwarehouseTransferPageRoutingModule } from './interwarehouse-transfer-routing.module';

import { InterwarehouseTransferPage } from './interwarehouse-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterwarehouseTransferPageRoutingModule
  ],
  declarations: [InterwarehouseTransferPage]
})
export class InterwarehouseTransferPageModule {}
