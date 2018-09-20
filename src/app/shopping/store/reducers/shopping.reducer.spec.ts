import { IngredientState } from './ingredient.reducer';
import {
  getAllIngredients,
  getIngredientEntities,
  getIngredientIds,
  getIngredientState,
  getShoppingState,
  getTotalIngredients,
  ShoppingFeatureState,
  ShoppingState
} from './shopping.reducer';
import { Ingredient } from '../models/ingredient.model';

describe('ShoppingReducer', () => {
  const ingredient = {name: 'Tomato', amount: 7};
  const ingredientState: IngredientState = {
    ids: [getId(ingredient)],
    entities: {
      [getId(ingredient)]: ingredient
    }
  };
  const shoppingState: ShoppingState = {
    ingredient: ingredientState
  };
  const featureState: ShoppingFeatureState = {
    auth: undefined,
    shopping: shoppingState
  };

  function getId(ingredient: Ingredient): string {
    return ingredient.name.toLowerCase();
  }

  describe('Selectors', () => {
    describe('getShoppingState', () => {
      it('should return the shopping state', () => {
        const result = getShoppingState(featureState);

        expect(result).toBe(shoppingState);
      });
    });

    describe('getIngredientState', () => {
      it('should return the ingredient state', () => {
        const result = getIngredientState(featureState);

        expect(result).toBe(ingredientState);
      });
    });

    describe('getIngredientIds', () => {
      it('should return the ingredient ids', () => {
        const result = getIngredientIds(featureState);

        expect(result).toBe(ingredientState.ids);
      });
    });

    describe('getIngredientEntities', () => {
      it('should return the ingredient entities', () => {
        const result = getIngredientEntities(featureState);

        expect(result).toBe(ingredientState.entities);
      });
    });

    describe('getAllIngredients', () => {
      it('should return the ingredients', () => {
        const result = getAllIngredients(featureState);

        expect(result).toEqual([ingredient]);
      });
    });

    describe('getTotalIngredients', () => {
      it('should return the number of ingredients', () => {
        const result = getTotalIngredients(featureState);

        expect(result).toBe(ingredientState.ids.length);
      });
    });
  });
});
