import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  BsDatepickerModule,
  ModalModule,
  PopoverModule,
  RatingModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';


import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { BigDataRoutes } from './big-data.routing';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TableauComponent } from './tableau/tableau.component';
import { AnalyticsTarComponent } from './analytics-tar/analytics-tar.component';
import { AnalyticsWaComponent } from './analytics-wa/analytics-wa.component';
import { AnalyticsAcsComponent } from './analytics-acs/analytics-acs.component';
import { AnalyticsTamComponent } from './analytics-tam/analytics-tam.component';
import {  NgxSpinnerModule } from "ngx-spinner"; 

@NgModule({
  declarations: [
    AnalyticsComponent,
    TableauComponent,
    AnalyticsTarComponent,
    AnalyticsWaComponent,
    AnalyticsAcsComponent,
    AnalyticsTamComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(BigDataRoutes),
    LeafletModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    RatingModule.forRoot(),
    NgxDatatableModule,
    NgxSpinnerModule
  ]
})
export class BigDataModule { }
