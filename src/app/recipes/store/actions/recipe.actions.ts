import { Action } from '@ngrx/store';

import { Recipe } from '../models/recipe.model';

export enum RecipeActionType {
  ADD_ONE_FROM_RECIPE_EDIT = '[Recipe Edit Page] Add One Recipe',
  UPDATE_ONE_FROM_RECIPE_EDIT = '[Recipe Edit Page] Update One Recipe',
  DELETE_ONE_FROM_RECIPE_ITEM = '[Recipe Item Page] Delete One Recipe',
  LOAD_ALL_FROM_RECIPE_LIST = '[Recipe List Page] Load All Recipes'
}

export class AddOneFromRecipeEdit implements Action {
  readonly type = RecipeActionType.ADD_ONE_FROM_RECIPE_EDIT;

  constructor(public recipe: Recipe) {
  }
}

export class UpdateOneFromRecipeEdit implements Action {
  readonly type = RecipeActionType.UPDATE_ONE_FROM_RECIPE_EDIT;

  constructor(public id: string, public changes: Partial<Recipe>) {
  }
}

export class DeleteOneFromRecipeItem implements Action {
  readonly type = RecipeActionType.DELETE_ONE_FROM_RECIPE_ITEM;

  constructor(public id: string) {
  }
}

export class LoadAllFromRecipeList implements Action {
  readonly type = RecipeActionType.LOAD_ALL_FROM_RECIPE_LIST;

  constructor() {
  }
}

export type RecipeAction =
  AddOneFromRecipeEdit |
  UpdateOneFromRecipeEdit |
  DeleteOneFromRecipeItem |
  LoadAllFromRecipeList;
