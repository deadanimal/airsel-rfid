import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryInfoPageRoutingModule } from './inventory-info-routing.module';

import { InventoryInfoPage } from './inventory-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryInfoPageRoutingModule
  ],
  declarations: [InventoryInfoPage]
})
export class InventoryInfoPageModule {}
