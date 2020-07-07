import { Component, ViewChild } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { Platform, IonRouterOutlet, MenuController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    public menu: MenuController,
    public toastController: ToastController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          // Show loading indicator
          window.scrollTo(0,0);
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
      }
    });
  }

  initializeApp() {
    this.statusBar.hide();
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;

      this.platform.backButton.subscribeWithPriority(0, async() => {
        console.log(this.router.url);
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        } else if (this.router.url === "/") {
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            navigator['app'].exitApp();
          } else {
            let toast = await this.toastController.create({
              message: 'Press back again to exit app',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }

  closeNotification() {
    this.menu.close("menuNotification");
  }
}
