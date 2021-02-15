import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockDisposalPageRoutingModule } from './stock-disposal-routing.module';

import { StockDisposalPage } from './stock-disposal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockDisposalPageRoutingModule
  ],
  declarations: [StockDisposalPage]
})
export class StockDisposalPageModule {}
