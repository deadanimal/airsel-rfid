import { Component, OnInit } from '@angular/core'; import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { UsersModel } from "src/app/shared/services/users/users.model";
import { EmployeeService } from "src/app/shared/services/employee/employee.service";

import { ActivatedRoute } from "@angular/router";

import swal from "sweetalert2";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any;
  cuser: any;
  closeResult: any;
  processTitle: any;
  userFormGroup: FormGroup;
  private userId: string = "";

  roles = {
    "AM":"Admin System",
    "TC":"Technical Crew",
    "PL":"Planner",
    "CR":"Contractor",
    "OP":"Operator"
  }
 
  constructor(
  private userService: UsersService,
  private employeeService: EmployeeService,
  private authService: AuthService,
	private formBuilder: FormBuilder,
  ) {
  }


  ngOnInit() {
    let user = this.authService.decodedToken();
    this.userService.getOne(user.user_id).subscribe(
      (res) => {
        this.cuser = res;
        console.log("res", res);

        //TODO
        //ambik first_name from user table, use as filter to get employee data from employee table but make sure to uppercase
        let filterValue = this.cuser.first_name.toUpperCase();
        this.employeeService.filter("last_name=" + filterValue).subscribe(
          (res) => {
            console.log("emp", res);
            if (res.length > 0) {
              this.profile = res[0];
            }

          },
          (err) => {
            console.log("err", err);
          }
        );
      },
      (err) => {

        console.log("err", err);
      }
    );

  }
}
