import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Error = firebase.auth.Error;

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showForm = false;
  form: FormGroup;
  error: Error;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onShowForm() {
    this.showForm = true;
  }

  onCancelForm() {
    this.showForm = false;
  }

  onSubmitForm() {
    this.authService.signup(this.form.value.email, this.form.value.password)
      .then(user => this.router.navigate(['']))
      .catch(error => this.error = error);
  }

  onContinueWithGoogle() {
    this.authService.signinWithGoogle()
      .then(user => this.router.navigate(['']))
      .catch(error => this.error = error);
  }

  onContinueWithFacebook() {
    this.authService.signinWithFacebook()
      .then(user => this.router.navigate(['']))
      .catch(error => this.error = error);
  }

}
