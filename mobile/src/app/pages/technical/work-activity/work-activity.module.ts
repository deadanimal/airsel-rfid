import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { WorkActivityPageRoutingModule } from "./work-activity-routing.module";

import { WorkActivityPage } from "./work-activity.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WorkActivityPageRoutingModule,
  ],
  declarations: [WorkActivityPage],
})
export class WorkActivityPageModule {}
