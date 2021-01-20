import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetDetailListPageRoutingModule } from './asset-detail-list-routing.module';

import { AssetDetailListPage } from './asset-detail-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetDetailListPageRoutingModule
  ],
  declarations: [AssetDetailListPage]
})
export class AssetDetailListPageModule {}
