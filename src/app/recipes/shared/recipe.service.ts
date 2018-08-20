import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import { AuthService } from '../../auth/shared/auth.service';

const BACKEND_URL = 'https://udemy-super-mega-recipe-book.firebaseio.com';
const RECIPE_STORE = 'recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getRecipes(): Observable<[string, Recipe][]> {
    return this.http.get(this.getURL(RECIPE_STORE)).pipe(
      map(response => Object.entries(response))
    );
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.getURL(RECIPE_STORE, id));
  }

  addRecipe(recipe: Recipe): Observable<string> {
    return this.http.post<Recipe>(this.getURL(RECIPE_STORE), recipe).pipe(
      map(response => response.name)
    );
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(this.getURL(RECIPE_STORE, id));
  }

  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(this.getURL(RECIPE_STORE, id), recipe);
  }

  private getURL(store: string, id?: string): string {
    const token = this.authService.token;

    return BACKEND_URL + '/' + store + (id ? '/' + id : '') + '.json' + (token ? '?auth=' + token : '');
  }

}
