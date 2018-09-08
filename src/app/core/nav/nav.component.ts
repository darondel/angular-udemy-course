import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppState, isAuthUserAuthenticated } from '../../app.reducers';
import { Logout } from '../../auth/store/actions/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isUserAuthenticated: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isUserAuthenticated = this.store.pipe(
      select(isAuthUserAuthenticated)
    );
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

}
