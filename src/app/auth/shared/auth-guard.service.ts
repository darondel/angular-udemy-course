import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { AppState, isAuthUserAuthenticated } from '../../app.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(isAuthUserAuthenticated),
      first(),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['login']);
        }
      })
    );
  }

}
