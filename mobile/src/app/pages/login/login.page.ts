import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import {
  AlertController,
  MenuController,
  ToastController,
} from "@ionic/angular";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotificationService } from "src/app/shared/handler/notification/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  // Form
  validations_form: FormGroup;
  validation_messages = {
    username: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." },
    ],
    password: [
      { type: "required", message: "Password is required." },
      { type: "minlength", message: "At least 6 characters long." },
    ],
  };

  // Loading
  isLoading: boolean = false;

  // Stay Login
  isLogin: boolean = false;

  constructor(
    public alertController: AlertController,
    public menu: MenuController,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: NotificationService
  ) {}

  ngOnInit() {
    this.menu.enable(false, "menuNotification");

    this.validations_form = this.formBuilder.group({
      username: new FormControl(
        "syafiqbasri@pipeline.com.my",
        Validators.compose([
          Validators.required,
          // Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
          Validators.email,
        ])
      ),
      password: new FormControl(
        "PabloEscobar",
        Validators.compose([Validators.minLength(6), Validators.required])
      ),
    });
  }

  login() {
    this.isLoading = true;
    this.authService.obtainToken(this.validations_form.value, this.isLogin).subscribe(
      () => {
        // Success
        this.isLoading = false;
      },
      () => {
        // Failed
        this.isLoading = false;
      },
      () => {
        // After
        this.toastr.openToastr("Welcome back");
        this.navigateByRole(this.authService.userType);
      }
    );

    /* if (
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
    } */
  }

  navigateByRole(userType: string) {
    /* Data Reference From DB */

    // ('OP', 'Operator'),
    // ('SK', 'Store Keeper'),
    // ('SS', 'Store Supervisor'),
    // ('TC', 'Technical Crew')

    if (userType === "TC") {
      // technical
      this.router.navigate(["/technical/tabs/tab1"]);
    } else if (userType === "OP") {
      // operator
      this.router.navigate(["/operator/tabs/tab1"]);
    } else if (userType === "SK") {
      // store keeper
      this.router.navigate(["/store-keeper/tabs/tab1"]);
    } else if (userType === "SS") {
      // store supervisor
      this.router.navigate(["/store-supervisor/tabs/tab1"]);
    } else {
      this.wrongCredential();
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

  async wrongCredential() {
    const alert = await this.alertController.create({
      header: "Wrong Credential",
      message: "You have entered wrong credentials. Please try again.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  navigateForgotPage() {
    this.router.navigate(["/forgot"]);
  }
}
