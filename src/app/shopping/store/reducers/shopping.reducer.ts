import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { ingredientAdapter, ingredientReducer, IngredientState } from './ingredient.reducer';
import { AppState } from '../../../app.reducers';

export interface ShoppingFeatureState extends AppState {
  shopping: ShoppingState;
}

export interface ShoppingState {
  ingredient: IngredientState;
}

export const shoppingReducers: ActionReducerMap<ShoppingState> = {
  ingredient: ingredientReducer
};

export const getShoppingState = createFeatureSelector<ShoppingFeatureState, ShoppingState>('shopping');
export const getIngredientState = createSelector(getShoppingState, state => state.ingredient);
export const {
  selectIds: getIngredientIds,
  selectEntities: getIngredientEntities,
  selectAll: getAllIngredients,
  selectTotal: getTotalIngredients
} = ingredientAdapter.getSelectors(getIngredientState);
