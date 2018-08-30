import { Action } from '@ngrx/store';

import { Ingredient } from "../models/ingredient.model";

export enum IngredientActionType {
  UPSERT_ONE_FROM_RECIPE = '[Recipe Page] Upsert One',
  UPSERT_ONE_FROM_SHOPPING = '[Shopping Page] Upsert One',
  UPDATE_ONE_FROM_SHOPPING = '[Shopping Page] Update One',
  DELETE_ONE_FROM_SHOPPING = '[Shopping Page] Delete One'
}

export class UpsertOneFromRecipe implements Action {
  readonly type = IngredientActionType.UPSERT_ONE_FROM_RECIPE;

  constructor(public ingredient: Ingredient) {
  }
}

export class UpsertOneFromShopping implements Action {
  readonly type = IngredientActionType.UPSERT_ONE_FROM_SHOPPING;

  constructor(public ingredient: Ingredient) {
  }
}

export class UpdateOneFromShopping implements Action {
  readonly type = IngredientActionType.UPDATE_ONE_FROM_SHOPPING;

  constructor(public id: string, public changes: Partial<Ingredient>) {
  }
}

export class DeleteOneFromShopping implements Action {
  readonly type = IngredientActionType.DELETE_ONE_FROM_SHOPPING;

  constructor(public id: string) {
  }
}

export type IngredientAction =
  UpsertOneFromRecipe |
  UpsertOneFromShopping |
  UpdateOneFromShopping |
  DeleteOneFromShopping;
