import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouteReuseStrategy } from "@angular/router";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { Camera } from "@ionic-native/camera/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Serial } from "@ionic-native/serial/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { QRScanner } from "@ionic-native/qr-scanner/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpTokenInterceptor } from "./shared/interceptor/http.token.interceptor";
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    LeafletModule.forRoot(),
    IonicSelectableModule
  ],
  providers: [
    Camera,
    Geolocation,
    NativeStorage,
    StatusBar,
    Serial,
    SplashScreen,
    // BarcodeScanner,
    QRScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpTokenInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
