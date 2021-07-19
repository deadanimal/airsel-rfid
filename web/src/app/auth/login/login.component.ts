import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { WamsService } from "src/app/shared/services/wams/wams.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { EmployeeService } from "src/app/shared/services/employee/employee.service";
import { WamsAuthService } from "src/app/shared/services/wams-auth/wams-auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  focus
  focus1

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private wamsService: WamsService,
    private userService: UsersService,
    private employeeService: EmployeeService,
    private wamsAuthService: WamsAuthService,


  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailForm: ['', Validators.required],
      passwordForm: ['', Validators.required]
    });

    this.loginForm.value.emailForm = "";
    this.loginForm.value.passwordForm = "";

  }
  onSubmit() {
    let value = this.loginForm.value;

   
    // login body for django
    let loginBody = {
      "username": value.emailForm,
      "password": value.passwordForm
    }

    // login body for ais-ad
    let loginBodyAD = {
      "service_name": "getActiveDirectory",
      "username": value.emailForm,
      "password": value.passwordForm
    }

    // quick access
    if (value.emailForm == 'AMS') {
      this.router.navigate(['/ams/dashboard']);
    }
    else if (value.emailForm == 'INV') {
      this.router.navigate(['/inv/inventory-dashboard']);
    }
    else if (value.emailForm == 'PLANNER') {
      this.router.navigate(['/planner/dashboard']);
    }

    this.authService.obtainToken(loginBody).subscribe(
      (res) => {
        // validate user status
        // if is_active == true then redirect
        // if is_active == false then swalAlert
        let user = this.authService.decodedToken();
        this.userService.getOne(user.user_id).subscribe(
          (res) => {
            if (res.status == true) {
              // check user role
              // if role == admin => go to admin
              // if role != admin => planner
              if (res.user_type == "AM") {
                this.router.navigate(['/ams/dashboard']);
              } else {
                this.router.navigate(['/planner/dashboard']);
              }

            } else {
              swal.fire({
                title: 'Sorry',
                text: 'The login credential is correct, but you did not activate your account yet. Please check your email (inbox and spam)',
                type: 'warning',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-warning'
              })

            }

          },
          (err) => {
            console.log("err", err);
            

          }
        );

        

      },
      (err) => {
        console.log("gagal login, mengimbas pengesahan pada WAMS", err);

        // TO be decoupled
        let public_key = "9pjCj7PMDLZx7NaD";
        let private_key = "ZSMmaAkpQU9y27XWmUYRVbKnyVefV8cg";
        let time = parseInt(new Date().getTime())
        let hashedVal = ""

        //TODO
        // 1. Hash private key, publick key, username, password, timestamp (SHA-1)

        let body = {
          "key": public_key,
          "username": this.loginBody.value.username,
          "password": this.loginBody.value.password,
          "time": time_,
          "hash": hashedVal
        }

        // if fail check kat wams endpoint
        this.wamsAuthService.authenticate(body).subscribe(
          (res) => {
            console.log("res", res); },
          (err) => {
            console.log("err", err)

          },
          () => {
            this.userService
                .update(resAD, resPIPE.user.pk)
                .subscribe((resPIPE) => {
                  this.router.navigate(['/planner/dashboard']);

          }


      },
      () => {

      }
    )

    // else {
    //   swal.fire({
    //     title: 'Sorry',
    //     text: 'The login credentials that you entered are wrong. Please try again.',
    //     type: 'warning',
    //     buttonsStyling: false,
    //     confirmButtonClass: 'btn btn-warning'
    //   })
    // }
  }


  // deprecated
  onSubmitOld() {
    let value = this.loginForm.value;

   
    // login body for django
    let loginBody = {
      "username": value.emailForm,
      "password": value.passwordForm
    }

    // login body for ais-ad
    let loginBodyAD = {
      "service_name": "getActiveDirectory",
      "username": value.emailForm,
      "password": value.passwordForm
    }

    // quick access
    if (value.emailForm == 'AMS') {
      this.router.navigate(['/ams/dashboard']);
    }
    else if (value.emailForm == 'INV') {
      this.router.navigate(['/inv/inventory-dashboard']);
    }
    else if (value.emailForm == 'PLANNER') {
      this.router.navigate(['/planner/dashboard']);
    }

    this.authService.obtainToken(loginBody).subscribe(
      (res) => {
        // validate user status
        // if is_active == true then redirect
        // if is_active == false then swalAlert
        let user = this.authService.decodedToken();
        this.userService.getOne(user.user_id).subscribe(
          (res) => {
            if (res.status == true) {
              // check user role
              // if role == admin => go to admin
              // if role != admin => planner
              if (res.user_type == "AM") {
                this.router.navigate(['/ams/dashboard']);
              } else {
                this.router.navigate(['/planner/dashboard']);
              }

            } else {
              swal.fire({
                title: 'Sorry',
                text: 'The login credential is correct, but you did not activate your account yet. Please check your email (inbox and spam)',
                type: 'warning',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-warning'
              })

            }

          },
          (err) => {
            console.log("err", err);
            

          }
        );

        

      },
      (err) => {
        console.log("gagal login, mengimbas pengesahan pada WAMS", err);
        // if fail check kat wams endpoint

        this.wamsService.getService(loginBodyAD).subscribe(
          (resAD) => {
            console.log("resAD = ", resAD)
            // to find employee detail in table employee
            if (resAD.status == "valid") {
              this.employeeService
                .filter("hr_employee_number=" + resAD.staff_no)
                .subscribe(
                  (resEmp) => {
                    // to create user account in PIPE who AD is valid
                    // STEP 4
                    if (resEmp.length > 0) {
                      let bodyPIPE = {
                        username: this.loginForm.value.username,
                        email: resAD.email ? resAD.email : "",
                        password1: this.loginForm.value.password,
                        password2: this.loginForm.value.password,
                      };
                      this.authService.register(bodyPIPE).subscribe(
                        (resPIPE) => {
                          if (resPIPE) {
                            resAD["first_name"] = resAD.name;
                            resAD["status"] = true;
                            resAD["department"] = "";
                            resAD["employee_id"] = resEmp[0].uuid;
                            
                            //
                            this.userService
                              .update(resAD, resPIPE.user.pk)
                              .subscribe((resPIPE) => {
                               // this.retryLogin();
                                this.router.navigate(['/planner/dashboard']);

                              });
                          }
                        },
                        (err) => {
                          console.error("err", err);
                        }
                      );
                    }
                  },
                  (err) => {
                    console.error("err", err);
                  }
                );
            }
            else {
              swal.fire({
                title: 'Sorry',
                text: 'Incorrect login credentials.',
                type: 'warning',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-warning'
              })
            }
            // else {
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
            // }
          },
          (err) => {
            console.error("masukkksss", err);
          });
       },
      () => {

      }
    )

    // else {
    //   swal.fire({
    //     title: 'Sorry',
    //     text: 'The login credentials that you entered are wrong. Please try again.',
    //     type: 'warning',
    //     buttonsStyling: false,
    //     confirmButtonClass: 'btn btn-warning'
    //   })
    // }
  }
}
