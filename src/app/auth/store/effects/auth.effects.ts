import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import {
  AuthActionType,
  LoginWithEmailAndPassword,
  LoginWithFacebook,
  LoginWithGoogle,
  Logout,
  Signup
} from '../actions/auth.actions';
import {
  AuthAPIAction,
  AuthAPIActionType,
  LoginFailure,
  LoginSuccess,
  LogoutSuccess,
  SignupFailure,
  SignupSucess
} from '../actions/auth-api.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  loginWithEmailAndPassword = this.actions.pipe(
    ofType<LoginWithEmailAndPassword>(AuthActionType.LOGIN_WITH_EMAIL_AND_PASSWORD),
    switchMap(action => this.commonLogin(firebase.auth().signInWithEmailAndPassword(action.email, action.password)))
  );

  @Effect()
  loginWithGoogle = this.actions.pipe(
    ofType<LoginWithGoogle>(AuthActionType.LOGIN_WITH_GOOGLE),
    exhaustMap(() => this.commonLogin(firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())))
  );

  @Effect()
  loginWithFacebook = this.actions.pipe(
    ofType<LoginWithFacebook>(AuthActionType.LOGIN_WITH_FACEBOOK),
    exhaustMap(() => this.commonLogin(firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())))
  );

  @Effect()
  logout = this.actions.pipe(
    ofType<Logout>(AuthActionType.LOGOUT),
    exhaustMap(() => from(firebase.auth().signOut()).pipe(
      map(() => new LogoutSuccess())
    ))
  );

  @Effect()
  signup = this.actions.pipe(
    ofType<Signup>(AuthActionType.SIGNUP),
    switchMap(action => from(firebase.auth().createUserWithEmailAndPassword(action.email, action.password)).pipe(
      map(userCredential => new SignupSucess(userCredential.user)),
      catchError(error => of(new SignupFailure(error)))
    ))
  );

  @Effect({dispatch: false})
  redirect = this.actions.pipe(
    ofType(
      AuthAPIActionType.LOGIN_SUCCESS,
      AuthAPIActionType.LOGOUT_SUCCESS,
      AuthAPIActionType.SIGNUP_SUCCESS
    ),
    tap(() => this.router.navigate(['']))
  );

  constructor(private actions: Actions, private router: Router) {
  }

  /**
   * Dispatch the login action according to a Firebase response.
   *
   * @param response the Firebase response
   * @return the login action
   */
  private commonLogin(response: Promise<firebase.auth.UserCredential>): Observable<AuthAPIAction> {
    return from(response).pipe(
      map(userCredential => new LoginSuccess(userCredential.user)),
      catchError(error => of(new LoginFailure(error)))
    );
  }

}
