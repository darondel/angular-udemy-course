import { ingredientReducer, IngredientState } from './ingredient.reducer';
import { Ingredient } from '../models/ingredient.model';
import { DeleteOneFromShopping, UpdateOneFromShopping, UpsertOneFromRecipe } from '../actions/ingredient.actions';

describe('IngredientReducer', () => {
  const ingredient1: Ingredient = {name: 'Apple', amount: 7};
  const ingredient2: Ingredient = {name: 'Tomato', amount: 5};
  const ingredient3: Ingredient = {name: 'Onion', amount: 3};
  const initialState: IngredientState = {
    ids: [getId(ingredient1), getId(ingredient2)],
    entities: {
      [getId(ingredient1)]: ingredient1,
      [getId(ingredient2)]: ingredient2
    }
  };

  function getId(ingredient: Ingredient): string {
    return ingredient.name.toLowerCase();
  }

  describe('Actions', () => {
    describe('undefined', () => {
      it('should return the initial state', () => {
        const result = ingredientReducer(initialState, {} as any);

        expect(result).toEqual(initialState);
      });
    });

    describe('UPSERT_ONE_FROM_RECIPE & UPSERT_ONE_FROM_SHOPPING', () => {
      it('should update the selected ingredient if it exists', () => {
        const updatedIngredient = {...ingredient1, amount: 11};
        const action = new UpsertOneFromRecipe(updatedIngredient);
        const result = ingredientReducer(initialState, action);
        const expectedResult = {
          ids: [...initialState.ids as string[]],
          entities: {
            [getId(ingredient1)]: {...ingredient1, amount: ingredient1.amount + updatedIngredient.amount},
            [getId(ingredient2)]: ingredient2
          }
        };

        expect(result).toEqual(expectedResult);
      });

      it('should add the selected ingredient if it does not exist', () => {
        const action = new UpsertOneFromRecipe(ingredient3);
        const result = ingredientReducer(initialState, action);
        const expectedResult = {
          ids: [...initialState.ids as string[], getId(ingredient3)],
          entities: {
            ...initialState.entities,
            [getId(ingredient3)]: ingredient3
          }
        };

        expect(result).toEqual(expectedResult);
      });
    });

    describe('UPDATE_ONE_FROM_SHOPPING', () => {
      it('should update the selected ingredient if it exists', () => {
        const updatedIngredient = {name: 'Strawberry', amount: 50};
        const action = new UpdateOneFromShopping(getId(ingredient1), updatedIngredient);
        const result = ingredientReducer(initialState, action);
        const expectedResult = {
          ids: [getId(updatedIngredient), getId(ingredient2)],
          entities: {
            [getId(updatedIngredient)]: updatedIngredient,
            [getId(ingredient2)]: ingredient2
          }
        };

        expect(result).toEqual(expectedResult);
      });

      it('should return the initial state if the selected ingredient does not exist', () => {
        const action = new UpdateOneFromShopping(getId(ingredient3), {});
        const result = ingredientReducer(initialState, action);

        expect(result).toEqual(initialState);
      });
    });

    describe('DELETE_ONE_FROM_SHOPPING', () => {
      it('should delete the selected ingredient if it exists', () => {
        const action = new DeleteOneFromShopping(getId(ingredient1));
        const result = ingredientReducer(initialState, action);
        const expectedResult = {
          ids: [getId(ingredient2)],
          entities: {
            [getId(ingredient2)]: ingredient2
          }
        };

        expect(result).toEqual(expectedResult);
      });

      it('should return the initial state if the selected ingredient does not exist', () => {
        const action = new DeleteOneFromShopping(getId(ingredient3));
        const result = ingredientReducer(initialState, action);

        expect(result).toEqual(initialState);
      });
    });
  });
});
