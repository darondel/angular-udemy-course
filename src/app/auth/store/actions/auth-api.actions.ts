import { Action } from '@ngrx/store';

export enum AuthAPIActionType {
  LOGIN_SUCCESS = '[Auth API] Login Success',
  LOGIN_FAILURE = '[Auth API] Login Failure',
  LOGOUT_SUCCESS = '[Auth API] Logout Success'
}

export class LoginSuccess implements Action {
  readonly type = AuthAPIActionType.LOGIN_SUCCESS;

  constructor() {
  }
}

export class LoginFailure implements Action {
  readonly type = AuthAPIActionType.LOGIN_FAILURE;

  constructor() {
  }
}

export class LogoutSucess implements Action {
  readonly type = AuthAPIActionType.LOGOUT_SUCCESS;

  constructor() {
  }
}

export type AuthAPIAction =
  LoginSuccess |
  LoginFailure |
  LogoutSucess;
