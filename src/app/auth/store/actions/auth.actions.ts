import { Action } from '@ngrx/store';

import { User } from 'firebase';

export enum AuthActionType {
  LOGIN = '[Login Page] Login',
  LOGOUT = '[Auth] Confirm Logout',
  LOGOUT_CONFIRMED = '[Auth] Logout Confirmed',
  LOGOUT_CANCELLED = '[Auth] Logout Cancelled'
}

export class Login implements Action {
  readonly type = AuthActionType.LOGIN;

  constructor(public user: User) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionType.LOGOUT;

  constructor() {
  }
}

export class LogoutConfirmed implements Action {
  readonly type = AuthActionType.LOGOUT_CONFIRMED;

  constructor() {
  }
}

export class LogoutCancelled implements Action {
  readonly type = AuthActionType.LOGOUT_CANCELLED;

  constructor() {
  }
}

export type AuthAction =
  Login |
  Logout |
  LogoutConfirmed |
  LogoutCancelled;
