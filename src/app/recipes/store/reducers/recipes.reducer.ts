import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { recipeAdapter, recipeCollectionReducer, RecipeCollectionState } from './recipe-collection.reducer';
import { getError, recipeAPIReducer, RecipeAPIState } from './recipe-api.reducer';
import { AppState } from '../../../app.reducers';

export interface RecipesFeatureState extends AppState {
  recipes: RecipesState;
}

export interface RecipesState {
  collection: RecipeCollectionState;
  api: RecipeAPIState;
}

export const recipesReducers: ActionReducerMap<RecipesState> = {
  collection: recipeCollectionReducer,
  api: recipeAPIReducer
};

export const getRecipesState = createFeatureSelector<RecipesFeatureState, RecipesState>('recipes');

export const getRecipeCollectionState = createSelector(getRecipesState, state => state.collection);
export const {
  selectIds: getRecipeIds,
  selectEntities: getRecipeEntities,
  selectAll: getAllRecipes,
  selectTotal: getTotalRecipes
} = recipeAdapter.getSelectors(getRecipeCollectionState);
export const getRecipe = createSelector(getRecipeEntities, (entities, props) => entities[props.recipeId]);

export const getRecipeAPIState = createSelector(getRecipesState, state => state.api);
export const getRecipeAPIError = createSelector(getRecipeAPIState, getError);
