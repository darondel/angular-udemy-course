import { Action } from '@ngrx/store';

import { Ingredient } from "../../../shared/ingredient.model";

export enum ShoppingActionType {
  ADD_INGREDIENT = '[Shopping] Add Ingredient',
  REMOVE_INGREDIENT = '[Shopping] Remove Ingredient'
}

export class AddIngredient implements Action {
  readonly type = ShoppingActionType.ADD_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class RemoveIngredient implements Action {
  readonly type = ShoppingActionType.REMOVE_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export type ShoppingAction = AddIngredient | RemoveIngredient;
