import { ShoppingAction, ShoppingActionType } from "../actions/ingredient.actions";
import { Ingredient } from "../../../shared/ingredient.model";

export interface ShoppingState {
  ingredients: Ingredient[];
}

export const initialState: ShoppingState = {
  ingredients: [
    {name: 'Apple', amount: 5},
    {name: 'Tomato', amount: 10}
  ]
};

export function shoppingReducer(state = initialState, action: ShoppingAction): ShoppingState {
  switch (action.type) {
    case ShoppingActionType.ADD_INGREDIENT:
      let ingredients;
      const index = state.ingredients.findIndex(ingredient => ingredient.name === action.payload.name);

      if (index > -1) {
        const ingredient = state.ingredients[index];

        ingredients = [...state.ingredients];
        ingredients[index] = {
          ...ingredient,
          amount: ingredient.amount + action.payload.amount
        };
      } else {
        ingredients = [...state.ingredients, action.payload];
      }

      return {
        ...state,
        ingredients: ingredients
      };
    case ShoppingActionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient.name !== action.payload.name)
      };
    default:
      return state;
  }
}
