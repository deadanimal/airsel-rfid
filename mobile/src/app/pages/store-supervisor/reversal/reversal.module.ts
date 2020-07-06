import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReversalPageRoutingModule } from './reversal-routing.module';

import { ReversalPage } from './reversal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReversalPageRoutingModule
  ],
  declarations: [ReversalPage]
})
export class ReversalPageModule {}
