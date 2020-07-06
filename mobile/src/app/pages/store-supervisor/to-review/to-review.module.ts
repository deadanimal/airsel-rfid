import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToReviewPageRoutingModule } from './to-review-routing.module';

import { ToReviewPage } from './to-review.page';
import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    ToReviewPageRoutingModule
  ],
  declarations: [ToReviewPage]
})
export class ToReviewPageModule {}
