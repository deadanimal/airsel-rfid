import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperationalReadingListPageRoutingModule } from './operational-reading-list-routing.module';

import { OperationalReadingListPage } from './operational-reading-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperationalReadingListPageRoutingModule
  ],
  declarations: [OperationalReadingListPage]
})
export class OperationalReadingListPageModule {}
