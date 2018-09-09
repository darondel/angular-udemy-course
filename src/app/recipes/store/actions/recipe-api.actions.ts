import { HttpErrorResponse } from '@angular/common/http';

import { Action } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Recipe } from '../models/recipe.model';

export enum RecipeAPIActionType {
  LOAD_ALL_SUCCESS = '[Recipe API] Load All Recipes Success',
  LOAD_ALL_FAILURE = '[Recipe API] Load All Recipes Failure',
  ADD_ONE_SUCCESS = '[Recipe API] Add One Recipe Success',
  ADD_ONE_FAILURE = '[Recipe API] Add One Recipe Failure',
  UPDATE_ONE_SUCCESS = '[Recipe API] Update One Recipe Success',
  UPDATE_ONE_FAILURE = '[Recipe API] Update One Recipe Failure',
  DELETE_ONE_SUCCESS = '[Recipe API] Delete One Recipe Success',
  DELETE_ONE_FAILURE = '[Recipe API] Delete One Recipe Failure'
}

export class LoadAllSuccess implements Action {
  readonly type = RecipeAPIActionType.LOAD_ALL_SUCCESS;

  constructor(public recipes: Dictionary<Recipe>) {
  }
}

export class LoadAllFailure implements Action {
  readonly type = RecipeAPIActionType.LOAD_ALL_FAILURE;

  constructor(public error: HttpErrorResponse) {
  }
}

export class AddOneSuccess implements Action {
  readonly type = RecipeAPIActionType.ADD_ONE_SUCCESS;

  constructor(public id: string, public recipe: Recipe) {
  }
}

export class AddOneFailure implements Action {
  readonly type = RecipeAPIActionType.ADD_ONE_FAILURE;

  constructor(public error: HttpErrorResponse) {
  }
}

export class UpdateOneSuccess implements Action {
  readonly type = RecipeAPIActionType.UPDATE_ONE_SUCCESS;

  constructor(public id: string, public changes: Partial<Recipe>) {
  }
}

export class UpdateOneFailure implements Action {
  readonly type = RecipeAPIActionType.UPDATE_ONE_FAILURE;

  constructor(public error: HttpErrorResponse) {
  }
}

export class DeleteOneSuccess implements Action {
  readonly type = RecipeAPIActionType.DELETE_ONE_SUCCESS;

  constructor(public id: string) {
  }
}

export class DeleteOneFailure implements Action {
  readonly type = RecipeAPIActionType.DELETE_ONE_FAILURE;

  constructor(public error: HttpErrorResponse) {
  }
}

export type RecipeAPIAction =
  LoadAllSuccess |
  LoadAllFailure |
  AddOneSuccess |
  AddOneFailure |
  UpdateOneSuccess |
  UpdateOneFailure |
  DeleteOneSuccess |
  DeleteOneFailure;
