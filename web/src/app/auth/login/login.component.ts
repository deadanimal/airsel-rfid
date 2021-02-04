import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  focus
  focus1

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailForm: ['', Validators.required],
      passwordForm: ['', Validators.required]
    });
  }

  onSubmit() {
    let value = this.loginForm.value;

    if (value.emailForm == 'AMS') {
      this.router.navigate(['/ams/dashboard']);
    }
    else if (value.emailForm == 'INV') {
      this.router.navigate(['/inv/inventory-dashboard']);
    }
    else if (value.emailForm == 'PLANNER') {
      this.router.navigate(['/planner/dashboard']);
    }
    else {
      swal.fire({
        title: 'Sorry',
        text: 'The login credentials that you entered are wrong. Please try again.',
        type: 'warning',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-warning'
      })
    }
  }
}
