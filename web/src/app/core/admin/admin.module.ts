import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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

import { environment } from 'src/environments/environment';
import * as mapbox from 'mapbox-gl';
(mapbox as any).accessToken = environment.mapbox.accessToken

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ManagementComponent } from './management/management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ReportComponent } from './report/report.component';
import { AssetComponent } from './asset/asset.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ErrorComponent } from './error/error.component';
import { UtilityUserComponent } from './utility-user/utility-user.component';
import { UtilityAuditTrailComponent } from './utility-audit-trail/utility-audit-trail.component';
import { InventoryStockComponent } from './inventory-stock/inventory-stock.component';
import { InventoryInboundComponent } from './inventory-inbound/inventory-inbound.component';
import { InventoryOutbondComponent } from './inventory-outbond/inventory-outbond.component';
import { InventoryStoreKeeperComponent } from './inventory-store-keeper/inventory-store-keeper.component';
import { InventoryStoreCodesComponent } from './inventory-store-codes/inventory-store-codes.component';
import { UtilityUserPrivilegesComponent } from './utility-user-privileges/utility-user-privileges.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementComponent,
    AnalyticsComponent,
    ReportComponent,
    AssetComponent,
    CalendarComponent,
    AssetDetailsComponent,
    ProfileComponent,
    SettingsComponent,
    ErrorComponent,
    UtilityUserComponent,
    UtilityAuditTrailComponent,
    InventoryStockComponent,
    InventoryInboundComponent,
    InventoryOutbondComponent,
    InventoryStoreKeeperComponent,
    InventoryStoreCodesComponent,
    UtilityUserPrivilegesComponent,
    InventoryDashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(AdminRoutes),
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
    NgSelectModule
  ]
})
export class AdminModule { }
