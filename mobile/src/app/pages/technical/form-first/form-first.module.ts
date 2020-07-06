import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormFirstPageRoutingModule } from './form-first-routing.module';

import { FormFirstPage } from './form-first.page';
import { MatStepperModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormFirstPageRoutingModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  declarations: [FormFirstPage]
})
export class FormFirstPageModule {}
