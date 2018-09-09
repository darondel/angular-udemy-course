import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { Recipe } from '../store/models/recipe.model';
import { getRecipe, RecipesFeatureState } from '../store/reducers/recipes.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private router: Router, private store: Store<RecipesFeatureState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.store.pipe(
      select(getRecipe, {recipeId: route.params['id']}),
      first(),
      tap(recipe => {
        if (!recipe) {
          this.router.navigate(['404']);
        }
      })
    );
  }

}
