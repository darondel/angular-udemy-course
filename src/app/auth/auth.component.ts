import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { selectError } from './store/reducers/auth.reducers';
import { AppState } from '../app.reducers';
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
      select(selectError)
    );
  }

}
