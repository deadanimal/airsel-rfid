import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockCountListPageRoutingModule } from './stock-count-list-routing.module';

import { StockCountListPage } from './stock-count-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockCountListPageRoutingModule
  ],
  declarations: [StockCountListPage]
})
export class StockCountListPageModule {}
