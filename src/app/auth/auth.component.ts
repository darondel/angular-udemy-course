import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppState, getAuthError } from '../app.reducers';
import Error = firebase.auth.Error;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: Observable<Error>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.error = this.store.pipe(
      select(getAuthError)
    );
  }

}
