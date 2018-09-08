import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { select, Store } from '@ngrx/store';

import { from, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { User } from 'firebase';

import { AppState, getAuthUser } from '../../app.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(getAuthUser),
      first(),
      switchMap(user => this.getIdToken(user)),
      map(idToken => this.getRequest(req, idToken)),
      switchMap(request => next.handle(request))
    );
  }

  /**
   * Gets the Authentication ID Token associated with a user.
   *
   * @param user the user, can be null
   * @return the associated Authentication ID token
   */
  private getIdToken(user: User): Observable<string> {
    return user ? from(user.getIdToken()) : of(null);
  }

  /**
   * Append a 'auth' parameter to an existing HTTP request, based on an Authentication ID token.
   *
   * @param request the existing HTTP request
   * @param idToken the Authentication ID token, can be null
   * @return the associated HTTP request
   */
  private getRequest(request: HttpRequest<any>, idToken: string): HttpRequest<any> {
    return idToken ? request.clone({setParams: {auth: idToken}}) : request;
  }

}
