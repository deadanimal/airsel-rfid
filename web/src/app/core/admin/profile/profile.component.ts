import { Component, OnInit } from '@angular/core'; import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { UsersModel } from "src/app/shared/services/users/users.model";
import { ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
      },
      (err) => {

        console.log("err", err);
      }
    );

  }
}
