import { ActionReducerMap } from '@ngrx/store';

import { authReducer, AuthState } from './auth/store/reducers/auth.reducers';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};
