import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetRegistrationListPageRoutingModule } from './asset-registration-list-routing.module';

import { AssetRegistrationListPage } from './asset-registration-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetRegistrationListPageRoutingModule
  ],
  declarations: [AssetRegistrationListPage]
})
export class AssetRegistrationListPageModule {}
