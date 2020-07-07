import { Component, OnInit } from "@angular/core";
import { AlertController, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(
    public alertController: AlertController,
    public menu: MenuController,
    private router: Router
  ) {}

  ngOnInit() {}

  openPage(path: string) {
    this.router.navigate([path]);
  }

  async clickLogout() {
    const alert = await this.alertController.create({
      header: "Logout",
      message: "Are you want to logout?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Yes, logout it!",
          handler: () => {
            this.router.navigate(["/"]);
          },
        },
      ],
    });

    await alert.present();
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }
}
