import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockReceivePageRoutingModule } from './stock-receive-routing.module';

import { StockReceivePage } from './stock-receive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockReceivePageRoutingModule
  ],
  declarations: [StockReceivePage]
})
export class StockReceivePageModule {}
