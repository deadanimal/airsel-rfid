import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkRequestPageRoutingModule } from './work-request-routing.module';

import { WorkRequestPage } from './work-request.page';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WorkRequestPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [WorkRequestPage]
})
export class WorkRequestPageModule {}
