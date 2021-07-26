import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { WamsService } from "src/app/shared/services/wams/wams.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { EmployeeService } from "src/app/shared/services/employee/employee.service";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  defaultPassword = 'air$elUs3r'
  loginForm: FormGroup;
  submit_form: FormGroup;


  focus
  focus1

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private wamsService: WamsService,
    private userService: UsersService,
    private employeeService: EmployeeService,


  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailForm: ['', Validators.required],
      passwordForm: ['', Validators.required]
    });

    this.loginForm.value.emailForm = "";
    this.loginForm.value.passwordForm = "";

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

  onSubmit() {

    let loginBodyAD = {
      service_name: "getActiveDirectory",
      username: this.loginForm.value.emailForm,
      password: this.loginForm.value.passwordForm
    }

    this.wamsService.getService(loginBodyAD).subscribe(
      (resAD) => {
        let staff_id = resAD['staff_no']
        console.log("sid", staff_id);
        if (resAD.status == "valid") {
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
                    username: this.loginForm.value.username,
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
                          .update(resUserSer[0]['id'], resAD)
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
                  alert("data not found")
                }
              },
              (err) => {
                console.error("err", err);
              }
            );
        }
        else {
          this.onSubmitOld();
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
    console.log("AAA", this.loginForm.value);

    this.submit_form = this.formBuilder.group({
      username: new FormControl(
        this.loginForm.value.emailForm,
        // "",
      ),
      password: new FormControl(
        this.defaultPassword,
        // "",
      ),
    });
    console.log("AA", this.submit_form.value);
    this.authService
      .obtainToken(this.submit_form.value)
      .subscribe(
        (res) => {
          // Success
          // STEP 2
          this.navigateByRole(this.authService.userType);
        },
        (err) => {
          // Failed
          // STEP 3
          console.log("err", err);
          let submitFormBackup = this.formBuilder.group({
            username: new FormControl(
              this.loginForm.value.emailForm,
              // "",
            ),
            password: new FormControl(
              this.loginForm.value.passwordForm,
              // "",
            ),
          });

          this.authService.obtainToken(submitFormBackup.value).subscribe(
            (res) => {
              this.navigateByRole(this.authService.userType);
            },
            (err) => {
              console.log("err", err);

            }
          );

        },
        () => {
        }
      );
  }

  navigateByRole(userType: string) {
    if (userType == "AM") {
      this.router.navigate(['/ams/dashboard']);
    } else {
      this.router.navigate(['/planner/dashboard']);
    }

  }

  // ultimatum




}
