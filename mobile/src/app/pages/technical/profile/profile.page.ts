import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(public menu: MenuController, private router: Router) {}

  ngOnInit() {}

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.open("menuNotification");
  }
}
