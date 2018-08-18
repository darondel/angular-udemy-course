import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

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

  constructor(private http: Http, private authService: AuthService) {
  }

  getRecipes(): Observable<[string, Recipe][]> {
    return this.http.get(this.getURL(RECIPE_STORE)).pipe(
      map(response => Object.entries(this.toRecipe(response)))
    );
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get(this.getURL(RECIPE_STORE, id)).pipe(
      map(response => this.toRecipe(response))
    );
  }

  addRecipe(recipe: Recipe): Observable<string> {
    return this.http.post(this.getURL(RECIPE_STORE), recipe).pipe(
      map(response => this.toRecipe(response).name)
    );
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete(this.getURL(RECIPE_STORE, id)).pipe(
      map(response => this.toRecipe(response))
    );
  }

  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.http.put(this.getURL(RECIPE_STORE, id), recipe).pipe(
      map(response => this.toRecipe(response))
    );
  }

  private getURL(store: string, id?: string): string {
    const token = this.authService.token;

    return BACKEND_URL + '/' + store + (id ? '/' + id : '') + '.json' + (token ? '?auth=' + token : '');
  }

  private toRecipe(response: Response): Recipe {
    return response.json();
  }

}
