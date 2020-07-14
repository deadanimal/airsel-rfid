import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Select2Module } from "ng-select2-component";
import {
  BsDropdownModule,
  ProgressbarModule,
  TooltipModule,
  BsDatepickerModule,
  ModalModule,
  PopoverModule,
  RatingModule,
  TypeaheadModule
} from "ngx-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';

import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';

import { AssetManagementRoutes } from "./asset-management.routing";
import { RegistrationComponent } from "./registration/registration.component";
import { ApprovalComponent } from "./approval/approval.component";
import { DatabaseComponent } from "./database/database.component";

@NgModule({
  declarations: [RegistrationComponent, ApprovalComponent, DatabaseComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(AssetManagementRoutes),
    LeafletModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    MatAutocompleteModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    RatingModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgxDatatableModule,
    Select2Module
  ],
})
export class AssetManagementModule {}
