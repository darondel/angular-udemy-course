import { HttpErrorResponse } from '@angular/common/http';

import { RecipeAPIAction, RecipeAPIActionType } from '../actions/recipe-api.actions';

export interface RecipeAPIState {
  error: HttpErrorResponse | null;
}

export const initialState: RecipeAPIState = {
  error: null
};

export function recipeAPIReducer(state = initialState, action: RecipeAPIAction): RecipeAPIState {
  switch (action.type) {
    case RecipeAPIActionType.LOAD_ALL_SUCCESS:
    case RecipeAPIActionType.ADD_ONE_SUCCESS:
    case RecipeAPIActionType.UPDATE_ONE_SUCCESS:
    case RecipeAPIActionType.DELETE_ONE_SUCCESS:
      return {
        ...state,
        error: null
      };
    case RecipeAPIActionType.LOAD_ALL_FAILURE:
    case RecipeAPIActionType.ADD_ONE_FAILURE:
    case RecipeAPIActionType.UPDATE_ONE_FAILURE:
    case RecipeAPIActionType.DELETE_ONE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export const getError = (state: RecipeAPIState) => state.error;
