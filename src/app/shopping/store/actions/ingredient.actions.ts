import { Action } from '@ngrx/store';

import { Ingredient } from "../models/ingredient.model";

export enum IngredientActionType {
  CREATE = '[Ingredient] Create',
  UPDATE = '[Ingredient] Update',
  DELETE = '[Ingredient] Delete'
}

export class Create implements Action {
  readonly type = IngredientActionType.CREATE;

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

export type IngredientAction = Create | Update | Delete;
