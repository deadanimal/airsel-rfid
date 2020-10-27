import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeasurementTypePageRoutingModule } from './measurement-type-routing.module';

import { MeasurementTypePage } from './measurement-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MeasurementTypePageRoutingModule
  ],
  declarations: [MeasurementTypePage]
})
export class MeasurementTypePageModule {}
