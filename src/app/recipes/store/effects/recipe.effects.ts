import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Dictionary } from '@ngrx/entity';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import {
  AddOneFromRecipeEdit,
  DeleteOneFromRecipeItem,
  LoadAllFromRecipeList,
  RecipeActionType,
  UpdateOneFromRecipeEdit
} from '../actions/recipe.actions';
import {
  AddOneFailure,
  AddOneSuccess,
  DeleteOneFailure,
  DeleteOneSuccess,
  LoadAllFailure,
  LoadAllSuccess,
  RecipeAPIActionType,
  UpdateOneFailure,
  UpdateOneSuccess
} from '../actions/recipe-api.actions';
import { Recipe } from '../models/recipe.model';

const BACKEND_URL = 'https://udemy-super-mega-recipe-book.firebaseio.com';
const RECIPE_STORE = 'recipes';

@Injectable()
export class RecipeEffects {

  @Effect()
  loadAll = this.actions.pipe(
    ofType<LoadAllFromRecipeList>(RecipeActionType.LOAD_ALL_FROM_RECIPE_LIST),
    mergeMap(() => this.http.get<Dictionary<Recipe>>(this.getURL()).pipe(
      map(recipes => new LoadAllSuccess(recipes)),
      catchError(error => of(new LoadAllFailure(error)))
    ))
  );

  @Effect()
  addOne = this.actions.pipe(
    ofType<AddOneFromRecipeEdit>(RecipeActionType.ADD_ONE_FROM_RECIPE_EDIT),
    mergeMap(action => this.http.post(this.getURL(), action.recipe).pipe(
      map(response => new AddOneSuccess(response['name'], action.recipe)),
      catchError(error => of(new AddOneFailure(error)))
    ))
  );

  @Effect({dispatch: false})
  addOneSuccess = this.actions.pipe(
    ofType<AddOneSuccess>(RecipeAPIActionType.ADD_ONE_SUCCESS),
    tap(action => this.router.navigate(['recipes', action.id]))
  );

  @Effect()
  updateOne = this.actions.pipe(
    ofType<UpdateOneFromRecipeEdit>(RecipeActionType.UPDATE_ONE_FROM_RECIPE_EDIT),
    mergeMap(action => this.http.put<Recipe>(this.getURL(action.id), action.changes).pipe(
      map(recipe => new UpdateOneSuccess(action.id, recipe)),
      catchError(error => of(new UpdateOneFailure(error)))
    ))
  );

  @Effect({dispatch: false})
  updateOneSuccess = this.actions.pipe(
    ofType<UpdateOneSuccess>(RecipeAPIActionType.UPDATE_ONE_SUCCESS),
    tap(action => this.router.navigate(['recipes', action.id]))
  );

  @Effect()
  deleteOne = this.actions.pipe(
    ofType<DeleteOneFromRecipeItem>(RecipeActionType.DELETE_ONE_FROM_RECIPE_ITEM),
    mergeMap(action => this.http.delete<Recipe>(this.getURL(action.id)).pipe(
      map(() => new DeleteOneSuccess(action.id)),
      catchError(error => of(new DeleteOneFailure(error)))
    ))
  );

  @Effect({dispatch: false})
  deleteOneSuccess = this.actions.pipe(
    ofType<DeleteOneSuccess>(RecipeAPIActionType.DELETE_ONE_SUCCESS),
    filter(action => this.router.url.startsWith('/recipes/' + action.id)),
    tap(action => this.router.navigate(['recipes']))
  );

  constructor(private actions: Actions, private http: HttpClient, private router: Router) {
  }

  /**
   * Build the URL to access all or partial recipes.
   *
   * @param id the id of the recipe, can be null
   * @return the associated URL
   */
  private getURL(id?: string): string {
    return BACKEND_URL + '/' + RECIPE_STORE + (id ? '/' + id : '') + '.json';
  }

}
