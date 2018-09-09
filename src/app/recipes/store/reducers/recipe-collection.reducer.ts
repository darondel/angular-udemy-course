import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { RecipeAPIAction, RecipeAPIActionType } from '../actions/recipe-api.actions';
import { Recipe } from '../models/recipe.model';

let selectId;

export const recipeAdapter = createEntityAdapter<Recipe>({
  selectId: () => selectId
});

export interface RecipeCollectionState extends EntityState<Recipe> {
}

export const initialState: RecipeCollectionState = recipeAdapter.getInitialState();

export function recipeCollectionReducer(state = initialState, action: RecipeAPIAction): RecipeCollectionState {
  switch (action.type) {
    case RecipeAPIActionType.LOAD_ALL_SUCCESS:
      let newState = {
        ids: [],
        entities: {}
      };

      for (const [id, recipe] of Object.entries(action.recipes)) {
        selectId = id;
        newState = recipeAdapter.addOne(recipe, newState);
      }

      return newState;
    case RecipeAPIActionType.ADD_ONE_SUCCESS:
      selectId = action.id;
      return recipeAdapter.addOne(action.recipe, state);
    case RecipeAPIActionType.UPDATE_ONE_SUCCESS:
      selectId = action.id;
      return recipeAdapter.updateOne({
        id: action.id,
        changes: action.changes
      }, state);
    case RecipeAPIActionType.DELETE_ONE_SUCCESS:
      selectId = action.id;
      return recipeAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}
