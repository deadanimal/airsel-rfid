import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetRegistrationPageRoutingModule } from './asset-registration-routing.module';

import { AssetRegistrationPage } from './asset-registration.page';
import { MatStepperModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetRegistrationPageRoutingModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  declarations: [AssetRegistrationPage]
})
export class AssetRegistrationPageModule { }
