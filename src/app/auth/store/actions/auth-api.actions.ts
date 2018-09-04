import { Action } from '@ngrx/store';

import { User } from 'firebase';
import Error = firebase.auth.Error;

export enum AuthAPIActionType {
  LOGIN_SUCCESS = '[Auth API] Login Success',
  LOGIN_FAILURE = '[Auth API] Login Failure',
  LOGOUT_SUCCESS = '[Auth API] Logout Success'
}

export class LoginSuccess implements Action {
  readonly type = AuthAPIActionType.LOGIN_SUCCESS;

  constructor(public user: User) {
  }
}

export class LoginFailure implements Action {
  readonly type = AuthAPIActionType.LOGIN_FAILURE;

  constructor(public error: Error) {
  }
}

export class LogoutSuccess implements Action {
  readonly type = AuthAPIActionType.LOGOUT_SUCCESS;

  constructor() {
  }
}

export type AuthAPIAction =
  LoginSuccess |
  LoginFailure |
  LogoutSuccess;
