import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkActivityAssetPageRoutingModule } from './work-activity-asset-routing.module';

import { WorkActivityAssetPage } from './work-activity-asset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WorkActivityAssetPageRoutingModule
  ],
  declarations: [WorkActivityAssetPage]
})
export class WorkActivityAssetPageModule {}
