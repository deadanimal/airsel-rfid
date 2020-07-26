import { Component, ViewChild } from "@angular/core";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import {
  Platform,
  IonRouterOutlet,
  LoadingController,
  MenuController,
  ToastController,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AuthService } from "./shared/services/auth/auth.service";
import { JwtService } from "./shared/handler/jwt/jwt.service";
import { NotificationsService } from "./shared/services/notifications/notifications.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;

  // Notification
  notifications = [];

  constructor(
    private platform: Platform,
    public loadingController: LoadingController,
    public menu: MenuController,
    public toastController: ToastController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
    private notifyService: NotificationsService
  ) {
    this.initializeApp();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        window.scrollTo(0, 0);
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        if (this.router.url === "/technical/tabs/tab1") {
          this.notifyService
            .filter("receiver=" + this.authService.userID)
            .subscribe(
              (res) => {
                // console.log("res", res);
                this.notifications = res;
              },
              (err) => {
                console.error("err", err);
              }
            );
        }
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

      this.platform.backButton.subscribeWithPriority(0, async () => {
        console.log(this.router.url);
        if (this.routerOutlet && this.routerOutlet.canGoBack() && this.router.url !== "/technical/tabs/tab1") {
          this.routerOutlet.pop();
        } 
        /* else if (
          this.router.url === "/" ||
          this.router.url === "/technical/tabs/tab1"
        ) {
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            navigator["app"].exitApp();
          } else {
            let toast = await this.toastController.create({
              message: "Press back again to exit app",
              duration: 3000,
              position: "bottom",
            });
            toast.present();
            lastTimeBackPress = new Date().getTime();
          }
        } */
      });

      this.checkIsLogin();
    });
  }

  // To verify either rmbrmeAccessToken is valid or not
  checkIsLogin() {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    this.jwtService.getToken("rmbrmeAccessToken").then(async (data) => {
      if (data) {
        let loading = await this.loadingController.create({
          message: "Please wait to be verified...",
        });
        await loading.present();
        let obj = {
          token: data,
        };
        this.authService.verifyToken(obj).subscribe(
          async (res) => {
            if (res) {
              loading.dismiss();
              let decodedToken = jwtHelper.decodeToken(data);
              this.authService.email = decodedToken.email;
              this.authService.username = decodedToken.username;
              this.authService.userID = decodedToken.user_id;
              this.authService.userType = decodedToken.user_type;

              if (this.authService.userType === "TC") {
                // technical
                this.router.navigate(["/technical/tabs/tab1"]);
              } else if (this.authService.userType === "OP") {
                // operator
                this.router.navigate(["/operator/tabs/tab1"]);
              } else if (this.authService.userType === "SK") {
                // store keeper
                this.router.navigate(["/store-keeper/tabs/tab1"]);
              } else if (this.authService.userType === "SS") {
                // store supervisor
                this.router.navigate(["/store-supervisor/tabs/tab1"]);
              }
            }
          },
          async (err) => {
            loading.dismiss();
            console.error("err", err);
          }
        );
      }
    });
  }

  closeNotification() {
    this.menu.close("menuNotification");
  }
}
