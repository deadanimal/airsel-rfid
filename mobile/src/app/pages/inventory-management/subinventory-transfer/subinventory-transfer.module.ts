import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubinventoryTransferPageRoutingModule } from './subinventory-transfer-routing.module';

import { SubinventoryTransferPage } from './subinventory-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubinventoryTransferPageRoutingModule
  ],
  declarations: [SubinventoryTransferPage]
})
export class SubinventoryTransferPageModule {}
