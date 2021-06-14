import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  passwordresetFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService

  ) {
      this.passwordresetFormGroup = this.formBuilder.group(
      {
        uid: new FormControl("", Validators.compose([Validators.required])),
        token: new FormControl("", Validators.compose([Validators.required])),
        old_password: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),

        new_password1: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        new_password2: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
      });
      
  }

  ngOnInit() {
  }

  resetpassword() {
  
    // obtain token 
    let user = this.authService.decodedToken();
    let old_password = this.passwordresetFormGroup.value.old_password;

    // body for input validation
    let validation_body = {
      "username": user.username,
      "password": old_password
    }

    this.authService.obtainToken(validation_body).subscribe(
      (res) => {
        
        this.passwordresetFormGroup.patchValue({
          uid: user.user_id,
          token: localStorage.getItem("accessToken"),
        }); 

        
        // change password through endpoint
        this.authService
          .changePassword(this.passwordresetFormGroup.value)
          .subscribe(
            (res) => {
              console.log("res", res);
              swal.fire({
                title: "Successful",
                text:
                  "You password has been changed. Please login with a new password.",
                buttonsStyling: false,
                confirmButtonText: "Tutup",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              }).then(function() {
                location.reload();
              });
            },
            (err) => {
              console.error("err", err);
              swal.fire({
                title: "Failed",
                text:
                  "Fail to change password please try again.",
                buttonsStyling: false,
                confirmButtonText: "Tutup",
                customClass: {
                  confirmButton: "btn btn-warning",
                },
              });
            }
          );

        
      },

      (err) => {
        swal.fire({
          title: "Invalid Password!",
          text: "Please check your old password.",
          type: "warning",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          confirmButtonClass: "btn btn-danger btn-sm",
        })
      }
    );


  }

}
