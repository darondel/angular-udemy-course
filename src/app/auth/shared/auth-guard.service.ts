import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { AppState } from '../../app.reducers';
import { selectAuthentication } from '../store/reducers/auth.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectAuthentication),
      first(),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['login']);
        }
      })
    );
  }

}
