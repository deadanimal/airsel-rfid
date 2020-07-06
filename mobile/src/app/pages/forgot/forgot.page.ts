import { MenuController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
// import { NotificationService } from 'src/app/shared/handler/notification/notification.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  // Form
  validations_form: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };

  // Loading
  isLoading: boolean = false

  constructor(
    public menu: MenuController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    // private toastr: NotificationService
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });

    this.menu.enable(false, "menuNotification");
  }

  resetPassword() {
    // this.isLoading = true
    // this.authService.resetPassword(this.validations_form.value).subscribe(
    //   () => {
    //     // Success
    //     this.isLoading = false
    //   },
    //   () => {
    //     // Failed
    //     this.isLoading = false
    //   },
    //   () => {
    //     // After
    //     this.toastr.openToastr('A reset link has been sent to your email')
    //   }
    // )
  }

  navigatePage(path: string) {
    let navigationPath = '/' + path
    this.router.navigate([navigationPath])
  }

}
