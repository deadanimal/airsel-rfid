import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisposePageRoutingModule } from './dispose-routing.module';

import { DisposePage } from './dispose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisposePageRoutingModule
  ],
  declarations: [DisposePage]
})
export class DisposePageModule {}
