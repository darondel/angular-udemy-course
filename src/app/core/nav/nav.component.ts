import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppState } from '../../app.reducers';
import { AuthService } from '../../auth/shared/auth.service';
import { selectTotal } from '../../shopping/store/reducers/ingredient.reducer';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  ingredientsNumber: Observable<number>;

  constructor(private router: Router, protected authService: AuthService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.ingredientsNumber = this.store.pipe(
      select(selectTotal)
    );
  }

  onLogout() {
    this.authService.signout();
    this.router.navigate(['']);
  }

}
