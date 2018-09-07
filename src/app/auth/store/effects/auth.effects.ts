import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
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
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthEffects {

  @Effect()
  loginWithEmailAndPassword = this.actions.pipe(
    ofType<LoginWithEmailAndPassword>(AuthActionType.LOGIN_WITH_EMAIL_AND_PASSWORD),
    exhaustMap(action => this.commonLogin(firebase.auth().signInWithEmailAndPassword(action.email, action.password)))
  );

  @Effect()
  loginWithGoogle = this.actions.pipe(
    ofType<LoginWithGoogle>(AuthActionType.LOGIN_WITH_GOOGLE),
    exhaustMap(action => this.commonLogin(firebase.auth().signInWithPopup(new GoogleAuthProvider())))
  );

  @Effect()
  loginWithFacebook = this.actions.pipe(
    ofType<LoginWithFacebook>(AuthActionType.LOGIN_WITH_FACEBOOK),
    exhaustMap(action => this.commonLogin(firebase.auth().signInWithPopup(new FacebookAuthProvider())))
  );

  @Effect({dispatch: false})
  loginSuccess = this.actions.pipe(
    ofType<LoginSuccess>(AuthAPIActionType.LOGIN_SUCCESS),
    tap(() => this.router.navigate(['']))
  );

  @Effect()
  logout = this.actions.pipe(
    ofType<Logout>(AuthActionType.LOGOUT),
    exhaustMap(action => from(firebase.auth().signOut()).pipe(
      map(() => new LogoutSuccess())
    ))
  );

  @Effect({dispatch: false})
  logoutSuccess = this.actions.pipe(
    ofType<LogoutSuccess>(AuthAPIActionType.LOGOUT_SUCCESS),
    tap(() => this.router.navigate(['']))
  );

  @Effect()
  signup = this.actions.pipe(
    ofType<Signup>(AuthActionType.SIGNUP),
    exhaustMap(action => from(firebase.auth().createUserWithEmailAndPassword(action.email, action.password)).pipe(
      map(userCredential => new SignupSucess(userCredential.user)),
      catchError(error => of(new SignupFailure(error)))
    ))
  );

  @Effect({dispatch: false})
  signupSuccess = this.actions.pipe(
    ofType<SignupSucess>(AuthAPIActionType.SIGNUP_SUCCESS),
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
  private commonLogin(response: Promise<UserCredential>): Observable<AuthAPIAction> {
    return from(response).pipe(
      map(userCredential => new LoginSuccess(userCredential.user)),
      catchError(error => of(new LoginFailure(error)))
    );
  }

}
