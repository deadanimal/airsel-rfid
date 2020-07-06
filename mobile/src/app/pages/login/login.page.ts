import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm = {
    username: "",
    password: "",
  };

  constructor(
    public alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    if (
      this.loginForm.username == "technical" ||
      this.loginForm.username == "1"
    ) {
      // technical
      this.router.navigate(["/technical/tabs/tab1"]);
    } else if (
      this.loginForm.username == "operator" ||
      this.loginForm.username == "2"
    ) {
      // operator
      this.router.navigate(["/operator/tabs/tab1"]);
    } else if (
      this.loginForm.username == "store-keeper" ||
      this.loginForm.username == "3"
    ) {
      // inventory
      this.router.navigate(["/store-keeper/tabs/tab1"]);
    } else if (
      this.loginForm.username == "store-supervisor" ||
      this.loginForm.username == "4"
    ) {
      // inventory
      this.router.navigate(["/store-supervisor/tabs/tab1"]);
    } else {
      alert("wrong user!");
    }
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: "Forgot Password",
      subHeader: "Disclaimer",
      message:
        "Forgot password is for operator ONLY. Meanwhile, for technical, please refer WAMS and for store keeper, please refer ERP",
      inputs: [
        {
          name: "email",
          type: "email",
          placeholder: "Enter email",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Submit",
          handler: () => {
            this.emailCheck();
          },
        },
      ],
    });

    await alert.present();
  }

  async emailCheck() {
    const alert = await this.alertController.create({
      header: "Forgot Password",
      message:
        "Forgot password success. Please refer your email for further details.",
      buttons: ["OK"],
    });

    await alert.present();
  }
}
