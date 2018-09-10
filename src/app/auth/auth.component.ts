import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';

import { AppState, getAuthError } from '../app.reducers';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: Observable<firebase.auth.Error>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.error = this.store.pipe(
      select(getAuthError)
    );
  }

}
