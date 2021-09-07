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
import { EmployeeService } from "src/app/shared/services/employee/employee.service";
import { NotificationService } from "src/app/shared/handler/notification/notification.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { WamsService } from "src/app/shared/services/wams/wams.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  // Form
  validations_form: FormGroup;
  submit_form: FormGroup;
  validation_messages = {
    username: [
      { type: "required", message: "Username is required." },
      { type: "pattern", message: "Please enter a valid username." },
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

  // Slide
  slideOpts = {
    initialSlide: 0,
    // speed: 4000,
    autoplay: {
      delay: 4000,
    },
  };

  // set a default password for user create user account
  // use this password to login to obtain token in our system
  // were not using their input password to login to our system.
  // their input password will only check at AD
  // if exist in AD then login to our system using this below password and the input username
  defaultPassword = 'air$elUs3r'

  constructor(
    public alertController: AlertController,
    public menu: MenuController,
    private router: Router,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private userService: UsersService,
    private wamsService: WamsService,
    private formBuilder: FormBuilder,
    private toastr: NotificationService
  ) { }

  ngOnInit() {
    
    window.addEventListener('keyboardDidShow', function() {
      document.activeElement.scrollIntoView({behavior: 'smooth'});
    });
    // window.location.reload();
    this.menu.enable(false, "menuNotification");

    // "username": "hafez_azman",
    // "password": "5e1AIS04556"

    this.validations_form = this.formBuilder.group({
      username: new FormControl(
        // "mobileapps",
        // "haziq_y",
         "fadhillah",
        // "shafiq_ab",
        // "mahadzir_nadzri",
        // "mohdhuzaimi",
        // "",
        // "rfidapps",
        Validators.compose([
          Validators.required,
          // Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
          // Validators.email,
        ])
      ),
      password: new FormControl(
        // "M0bile@321",
        // "415F@dhill@h",
         "*AIS05163",
        // "5e1AIS01780",
        // "AIS03951++",
        // "Ais1868@",
        // "",
        // "@ppsRF1D!!",
        Validators.compose([Validators.minLength(6), Validators.required])
      ),
    });
  }

  login() {
    this.isLoading = true;

    // to login AD AIR SELANGOR
    let bodyAD = {
      service_name: "getActiveDirectory",
      username: this.validations_form.value.username,
      password: this.validations_form.value.password,
    };

    // // STEP 1 = 
    ////// to check the credential exist in current database or not
    // this.authService
    //   .obtainToken(this.validations_form.value, this.isLogin)
    //   .subscribe(
    //     (res) => {
    //       // Success

    //       console.log("resAD = ", res)
    //       // STEP 2
    //       this.isLoading = false;
    //       this.navigateByRole(this.authService.userType);
    //     },
    //     (err) => {

    // // Failed
    // // STEP 3

    // // console.error("err", err);

    /////// to check credential at wams 
    this.wamsService.getService(bodyAD).subscribe(
      (resAD) => {

        console.log("sini 1")
        console.log("resAD = ", resAD)
        let staff_id = resAD['staff_no']
        // to find employee detail in table employee

        ////// check respon status
        if (resAD.status == "valid") {

          ///// get the employee data from the respon based on hr_employee_number
          // this.employeeService
          //   .filter("hr_employee_number=" + resAD.staff_no)
          //   .subscribe(
          //     (resEmp) => {

          this.employeeService
            .filter("hr_employee_number=" + staff_id)
            .subscribe(
              (resEmp) => {

                console.log("sini 2", resEmp)
                console.log("resEmp[0].uuid", resEmp[0].uuid)
                // to create user account in PIPE who AD is valid
                // STEP 4
                if (resEmp.length > 0) {
                  console.log("sini 3")

                  let bodyPIPE = {
                    username: this.validations_form.value.username,
                    email: resAD.email ? resAD.email : "",
                    // email: '',
                    password1: this.defaultPassword,
                    password2: this.defaultPassword,
                  };

                  ////// check in table user whether the user exist or not
                  this.userService.filter('employee_id=' + resEmp[0].uuid).subscribe(
                    (resUserSer) => {
                      console.log("resUserSer == ", resUserSer)
                      // console.log("resUserSerid == ", resUserSer[0]['id'])

                      //// if user not will create new user 
                      if (resUserSer.length == 0) {
                        console.log("acc not exist")

                        console.log("bodyPIPE = ", bodyPIPE)
                        this.authService.registerAccount(bodyPIPE).subscribe(
                          (resPIPE) => {

                            console.log("sini 4", resPIPE)

                            if (resPIPE) {

                              resAD["first_name"] = resAD.name;
                              resAD["status"] = true;
                              resAD["department"] = "";
                              resAD["employee_id"] = resEmp[0].uuid;
                              resAD["service_area"] = resAD.region;
                              resAD["user_type"] = 'PL';

                              this.userService
                                .update(resAD, resPIPE.user.pk)
                                .subscribe((resPIPE) => {
                                  console.log("relogin => ", resPIPE)
                                  this.retryLogin();

                                });
                            }
                          },
                          (err) => {
                            console.error("err", err);
                          }
                        );

                      } else { ////// if user exist will update the info
                        console.log("acc exist")

                        resAD["first_name"] = resAD.name;
                        resAD["status"] = true;
                        resAD["department"] = "";
                        resAD["service_area"] = resAD.region;

                        console.log("resUserSer['id']", resUserSer[0]['id'])
                        this.userService
                          .update(resAD, resUserSer[0]['id'])
                          .subscribe(
                            (resPIPE) => {
                              console.log("relogin => ", resPIPE
                              )
                              this.retryLogin();

                            });
                      }


                    },
                    (errUserSer) => {
                      console.log("errUserSer", errUserSer)
                    }
                  )
                } else {
                  this.empNotExist()
                }
              },
              (err) => {
                console.error("err", err);
              }
            );
        }
        else {
          this.isLoading = false;
          this.userNotExist()
          //   // to create user account in PIPE who AD is invalid
          //   // STEP 5
          //   let bodyPIPE = {
          //     username: this.validations_form.value.username,
          //     // email: "",
          //     password1: this.validations_form.value.password,
          //     password2: this.validations_form.value.password,
          //   };
          //   this.authService.registerAccount(bodyPIPE).subscribe(
          //     (resPIPE) => {
          //       this.retryLogin();
          //     },
          //     (err) => {
          //       console.error("err", err);
          //     }
          //   );
        }
      },
      (err) => {
        console.error("err", err);
      }
    );

    // //   },
    // //   () => {
    // //     // After
    // //     // this.toastr.openToastr("Welcome back");
    // //   }
    // // );

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

  retryLogin() {

    this.submit_form = this.formBuilder.group({
      username: new FormControl(
        this.validations_form.value.username,
        // "",
      ),
      password: new FormControl(
        this.defaultPassword,
        // "",
      ),
    });
    this.authService
      .obtainToken(this.submit_form.value, this.isLogin)
      .subscribe(
        (res) => {
          // Success
          // STEP 2
          this.isLoading = false;
          this.navigateByRole(this.authService.userType);
        },
        (err) => {
          // Failed
          // STEP 3
          this.isLoading = false;
        },
        () => { }
      );
  }

  navigateByRole(userType: string) {
    /* Data Reference From DB */

    // ('OP', 'Operator'),
    // ('SK', 'Store Keeper'),
    // ('SS', 'Store Supervisor'),
    // ('TC', 'Technical Crew')
    console.log("userType = ", userType)
    if (userType === "TC" || userType === "PL") {
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
    } else if (userType === "IV") {
      // inventory
      this.router.navigate(["/inventory-management/tabs/tab1"]);
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
          handler: () => { },
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

  async empNotExist() {
    const alert = await this.alertController.create({
      header: "Data Not Found",
      message: "Employee not exist. Please try again.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async userNotExist() {
    const alert = await this.alertController.create({
      header: "Data Not Found",
      message: "Username or password did not match. Please try again.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  navigateForgotPage() {
    this.router.navigate(["/forgot"]);
  }
}
