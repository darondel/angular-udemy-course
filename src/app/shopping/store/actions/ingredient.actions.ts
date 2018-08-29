import { Action } from '@ngrx/store';

import { Ingredient } from "../models/ingredient.model";

export enum IngredientActionType {
  UPSERT = '[Ingredient] Upsert',
  UPDATE = '[Ingredient] Update',
  DELETE = '[Ingredient] Delete'
}

export class Upsert implements Action {
  readonly type = IngredientActionType.UPSERT;

  constructor(public ingredient: Ingredient) {
  }
}

export class Update implements Action {
  readonly type = IngredientActionType.UPDATE;

  constructor(public id: string, public changes: Partial<Ingredient>) {
  }
}

export class Delete implements Action {
  readonly type = IngredientActionType.DELETE;

  constructor(public id: string) {
  }
}

export type IngredientAction = Upsert | Update | Delete;
