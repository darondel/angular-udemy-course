import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { transition, trigger, useAnimation } from '@angular/animations';

import { Store } from '@ngrx/store';

import { LoginWithEmailAndPassword } from '../store/actions/auth.actions';
import { AppState } from '../../app.reducers';
import { fadeInAnimation } from '../../shared/animations';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', useAnimation(fadeInAnimation, {params: {timings: '.5s'}}))
    ])
  ]
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
