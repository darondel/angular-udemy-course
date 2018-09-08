import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { authReducer, AuthState, getError, getUser, isUserAuthenticated } from './auth/store/reducers/auth.reducers';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};

export const getAuthState = createFeatureSelector<AppState, AuthState>('auth');
export const getAuthUser = createSelector(getAuthState, getUser);
export const getAuthError = createSelector(getAuthState, getError);
export const isAuthUserAuthenticated = createSelector(getAuthState, isUserAuthenticated);
