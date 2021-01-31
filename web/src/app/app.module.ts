import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from "ngx-bootstrap/collapse";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationModule } from "./examples/presentation/presentation.module";

import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgxMapboxGLModule } from "ngx-mapbox-gl";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { AssetAttributeColumnModel } from './shared/services/asset-attribute-column/asset-attribute-column.model';
// import { HttpTokenInterceptor } from "./shared/interceptor/http.token.interceptor";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
@NgModule({
  imports: [
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    PresentationModule,
    LeafletModule.forRoot(),
    NgxMapboxGLModule.withConfig({
      accessToken:
        "pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w", // Optionnal, can also be set per map (accessToken input of mgl-map)
      //geocoderAccessToken: 'TOKEN' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [
    NgxSpinnerService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpTokenInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
