import { createFeatureSelector } from "@ngrx/store";
import { createEntityAdapter, EntityState } from "@ngrx/entity";

import { IngredientAction, IngredientActionType } from "../actions/ingredient.actions";
import { Ingredient } from "../models/ingredient.model";

export const ingredientAdapter = createEntityAdapter<Ingredient>();

export interface IngredientState extends EntityState<Ingredient> {
}

export const initialState: IngredientState = ingredientAdapter.getInitialState({
  ids: ['0', '1'],
  entities: {
    '0': {name: 'Apple', amount: 5},
    '1': {name: 'Tomato', amount: 10}
  }
});

export function ingredientReducer(state = initialState, action: IngredientAction): IngredientState {
  switch (action.type) {
    case IngredientActionType.CREATE:
      return ingredientAdapter.addOne(action.ingredient, state);
    case IngredientActionType.UPDATE:
      return ingredientAdapter.updateOne({
        id: action.id,
        changes: action.changes
      }, state);
    case IngredientActionType.DELETE:
      return ingredientAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}

export const getIngredientState = createFeatureSelector<IngredientState>('ingredient');

export const {selectIds, selectEntities, selectAll, selectTotal} = ingredientAdapter.getSelectors(getIngredientState);
