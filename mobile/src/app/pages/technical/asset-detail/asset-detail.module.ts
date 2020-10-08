import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AssetDetailPageRoutingModule } from "./asset-detail-routing.module";

import { AssetDetailPage } from "./asset-detail.page";
import {
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    AssetDetailPageRoutingModule,
  ],
  declarations: [AssetDetailPage],
})
export class AssetDetailPageModule {}
