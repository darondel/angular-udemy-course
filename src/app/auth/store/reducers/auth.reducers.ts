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
    case AuthAPIActionType.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: null
      };
    case AuthAPIActionType.LOGIN_FAILURE:
    case AuthAPIActionType.SIGNUP_FAILURE:
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

export const getUser = (state: AuthState) => state.user;
export const getError = (state: AuthState) => state.error;
export const isUserAuthenticated = (state: AuthState) => state.user !== null;
