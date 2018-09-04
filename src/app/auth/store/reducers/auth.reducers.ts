import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from 'firebase';
import { AuthAction } from '../actions/auth.actions';
import { AuthAPIAction, AuthAPIActionType } from '../actions/auth-api.actions';
import Error = firebase.auth.Error;

export interface AuthState {
  user: User | null;
  error: Error | null;
}

export const initialState: AuthState = {
  user: null,
  error: null
};

export function authReducer(state = initialState, action: AuthAction | AuthAPIAction): AuthState {
  switch (action.type) {
    case AuthAPIActionType.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: null
      };
    case AuthAPIActionType.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.error
      };
    case AuthAPIActionType.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, state => state.user);
export const selectError = createSelector(selectAuthState, state => state.error);
export const selectAuthentication = createSelector(selectUser, user => user !== null);
