import { ActionReducerMap } from '@ngrx/store';

import { ingredientReducer, IngredientState } from './shopping/store/reducers/ingredient.reducer';

export interface AppState {
  ingredient: IngredientState
}

export const reducers: ActionReducerMap<AppState> = {
  ingredient: ingredientReducer
};
