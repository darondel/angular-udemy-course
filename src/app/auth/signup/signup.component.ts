import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { LoginWithFacebook, LoginWithGoogle, Signup } from '../store/actions/auth.actions';
import { AppState } from '../../app.reducers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showForm = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
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
    this.store.dispatch(new Signup(this.form.value.email, this.form.value.password));
  }

  onContinueWithGoogle() {
    this.store.dispatch(new LoginWithGoogle());
  }

  onContinueWithFacebook() {
    this.store.dispatch(new LoginWithFacebook());
  }

}
