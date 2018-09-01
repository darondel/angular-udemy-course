import { createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { IngredientAction, IngredientActionType } from '../actions/ingredient.actions';
import { Ingredient } from '../models/ingredient.model';

export const ingredientAdapter = createEntityAdapter<Ingredient>({
  selectId: ingredient => ingredient.name.toLowerCase()
});

export interface IngredientState extends EntityState<Ingredient> {
}

export const initialState: IngredientState = ingredientAdapter.getInitialState({
  ids: ['apple', 'tomato'],
  entities: {
    'apple': {name: 'Apple', amount: 5},
    'tomato': {name: 'Tomato', amount: 10}
  }
});

export function ingredientReducer(state = initialState, action: IngredientAction): IngredientState {
  switch (action.type) {
    case IngredientActionType.UPSERT_ONE_FROM_SHOPPING:
    case IngredientActionType.UPSERT_ONE_FROM_RECIPE:
      const id = ingredientAdapter.selectId.call(null, action.ingredient);

      if (id in state.entities) {
        return ingredientAdapter.updateOne({
          id: id,
          changes: {
            amount: state.entities[id].amount + action.ingredient.amount
          }
        }, state);
      } else {
        return ingredientAdapter.addOne(action.ingredient, state);
      }
    case IngredientActionType.UPDATE_ONE_FROM_SHOPPING:
      return ingredientAdapter.updateOne({
        id: action.id,
        changes: action.changes
      }, state);
    case IngredientActionType.DELETE_ONE_FROM_SHOPPING:
      return ingredientAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}

export const selectIngredientState = createFeatureSelector<IngredientState>('ingredient');

export const {selectIds, selectEntities, selectAll, selectTotal} = ingredientAdapter.getSelectors(selectIngredientState);
