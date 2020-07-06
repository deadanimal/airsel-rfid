import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { Camera } from "@ionic-native/camera/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Serial } from '@ionic-native/serial/ngx';
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
// import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
    LeafletModule.forRoot()
  ],
  providers: [
    Camera,
    Geolocation,
    StatusBar,
    Serial,
    SplashScreen,
    // BarcodeScanner,
    QRScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
