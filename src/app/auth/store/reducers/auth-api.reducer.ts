import Error = firebase.auth.Error;
import { AuthAPIAction } from '../actions/auth-api.actions';

export interface AuthAPIState {
  pending: boolean,
  error: Error | null
}

export const initialState: AuthAPIState = {
  pending: false,
  error: null
};

export function authReducer(state = initialState, action: AuthAPIAction): AuthAPIState {
  switch (action.type) {
    default:
      return state;
  }
}
