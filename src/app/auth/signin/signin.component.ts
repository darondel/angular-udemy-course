import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { LoginWithEmailAndPassword } from '../store/actions/auth.actions';
import { AppState } from '../../app.reducers';
import { fadeIn } from '../../shared/fade-in.animation';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [fadeIn(500)]
})
export class SigninComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.store.dispatch(new LoginWithEmailAndPassword(this.form.value.email, this.form.value.password));
  }

}
