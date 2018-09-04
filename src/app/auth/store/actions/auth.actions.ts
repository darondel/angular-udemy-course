import { Action } from '@ngrx/store';

export enum AuthActionType {
  LOGIN_WITH_EMAIL_AND_PASSWORD = '[Login Page] Login with Email and Password',
  LOGIN_WITH_GOOGLE = '[Login Page] Login with Google',
  LOGIN_WITH_FACEBOOK = '[Login Page] Login with Facebook',
  LOGOUT = '[Navigation Menu] Logout',
}

export class LoginWithEmailAndPassword implements Action {
  readonly type = AuthActionType.LOGIN_WITH_EMAIL_AND_PASSWORD;

  constructor(public email: string, public password: string) {
  }
}

export class LoginWithGoogle implements Action {
  readonly type = AuthActionType.LOGIN_WITH_GOOGLE;

  constructor() {
  }
}

export class LoginWithFacebook implements Action {
  readonly type = AuthActionType.LOGIN_WITH_FACEBOOK;

  constructor() {
  }
}

export class Logout implements Action {
  readonly type = AuthActionType.LOGOUT;

  constructor() {
  }
}

export type AuthAction =
  LoginWithEmailAndPassword |
  LoginWithGoogle |
  LoginWithFacebook |
  Logout;
