import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Recipe } from '../store/models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private router: Router, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    const resolvedRecipe = this.recipeService.getRecipe(route.params['id']);

    resolvedRecipe.subscribe(recipe => {
      if (!recipe) {
        this.router.navigate(['404']);
      }
    });

    return resolvedRecipe;
  }

}
