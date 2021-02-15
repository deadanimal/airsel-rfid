import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockIssuancePageRoutingModule } from './stock-issuance-routing.module';

import { StockIssuancePage } from './stock-issuance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockIssuancePageRoutingModule
  ],
  declarations: [StockIssuancePage]
})
export class StockIssuancePageModule {}
