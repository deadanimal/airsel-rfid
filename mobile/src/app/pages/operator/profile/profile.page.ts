import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(
    public alertController: AlertController,
    public menu: MenuController,
    private router: Router
  ) {}

  ngOnInit() {}

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
