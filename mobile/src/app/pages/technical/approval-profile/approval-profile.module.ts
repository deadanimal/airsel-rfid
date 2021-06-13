import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovalProfilePageRoutingModule } from './approval-profile-routing.module';

import { ApprovalProfilePage } from './approval-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovalProfilePageRoutingModule
  ],
  declarations: [ApprovalProfilePage]
})
export class ApprovalProfilePageModule {}
