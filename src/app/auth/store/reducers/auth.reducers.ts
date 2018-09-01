import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from 'firebase';

import { AuthAction, AuthActionType } from '../actions/auth.actions';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null
};

export function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        user: action.user
      };
    case AuthActionType.LOGOUT_CONFIRMED:
      return initialState;
    default:
      return state;
  }
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, state => state.user);
export const selectAuthentication = createSelector(selectUser, user => user !== null);
