import { ActionReducerMap } from '@ngrx/store';

import { authReducer, AuthState } from './auth/store/reducers/auth.reducers';
import { ingredientReducer, IngredientState } from './shopping/store/reducers/ingredient.reducer';

export interface AppState {
  auth: AuthState;
  ingredient: IngredientState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  ingredient: ingredientReducer
};
