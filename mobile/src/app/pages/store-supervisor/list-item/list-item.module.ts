import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListItemPageRoutingModule } from './list-item-routing.module';

import { ListItemPage } from './list-item.page';
import { MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListItemPageRoutingModule,
    MatTableModule
  ],
  declarations: [ListItemPage]
})
export class ListItemPageModule {}
