import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { OperationalReadingPageRoutingModule } from "./operational-reading-routing.module";

import { OperationalReadingPage } from "./operational-reading.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OperationalReadingPageRoutingModule,
  ],
  declarations: [OperationalReadingPage],
})
export class OperationalReadingPageModule {}
