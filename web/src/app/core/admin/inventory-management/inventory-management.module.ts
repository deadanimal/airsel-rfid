import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
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

import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component';
import { StockCountComponent } from './stock-count/stock-count.component';
import { StockReceiveReturnComponent } from './stock-receive-return/stock-receive-return.component';
import { IssuanceReversalComponent } from './issuance-reversal/issuance-reversal.component';
import { InterwarehouseTransferComponent } from './interwarehouse-transfer/interwarehouse-transfer.component';
import { DisposalComponent } from './disposal/disposal.component';
import { ScReportComponent } from './sc-report/sc-report.component';
import { ScVarianceComponent } from './sc-variance/sc-variance.component';
import { InventoryManagementRoutes } from './inventory-management.routing';
import { SubinventoryTransferComponent } from './subinventory-transfer/subinventory-transfer.component';
import { TransactionUploadComponent } from './transaction-upload/transaction-upload.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxSpinnerService],
  declarations: [
    InventoryDashboardComponent,
    StockCountComponent,
    StockReceiveReturnComponent,
    IssuanceReversalComponent,
    InterwarehouseTransferComponent,
    DisposalComponent,
    ScReportComponent,
    ScVarianceComponent,
    SubinventoryTransferComponent,
    TransactionUploadComponent,
  ],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    NgSelectModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(InventoryManagementRoutes),
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
export class InventoryManagementModule { }
