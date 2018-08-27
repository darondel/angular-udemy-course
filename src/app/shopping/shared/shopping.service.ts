import { Injectable } from '@angular/core';

import { select, Store } from "@ngrx/store";

import { Observable } from 'rxjs';

import { AddIngredient, RemoveIngredient } from "../store/actions/ingredient.actions";
import { Ingredient } from '../../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private store: Store<{ shopping: { ingredients: Ingredient[] } }>) {
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.store.pipe(
      select(state => state.shopping.ingredients)
    );
  }

  addIngredients(...ingredients: Ingredient[]) {
    if (ingredients.length) {
      ingredients.forEach(ingredient => {
        this.store.dispatch(new AddIngredient(ingredient));
      });
    }
  }

  removeIngredients(...ingredients: Ingredient[]) {
    if (ingredients.length) {
      ingredients.forEach(ingredient => {
        this.store.dispatch(new RemoveIngredient(ingredient))
      });
    }
  }

}
