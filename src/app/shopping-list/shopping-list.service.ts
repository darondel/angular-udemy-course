import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

const INGREDIENTS: Ingredient[] = [
  {name: 'Apple', amount: 5},
  {name: 'Tomato', amount: 10}
];

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() {
  }

  getIngredients(): Observable<Ingredient[]> {
    return of(INGREDIENTS);
  }

  addIngredients(...addedIngredients: Ingredient[]) {
    if (addedIngredients.length) {
      addedIngredients.forEach(addedIngredient => {
        const currentIngredient = INGREDIENTS.find(ingredient => ingredient.name === addedIngredient.name);

        if (currentIngredient) {
          currentIngredient.amount += addedIngredient.amount;
        } else {
          INGREDIENTS.push(addedIngredient);
        }
      });
    }
  }

  removeIngredients(...removedIngredients: Ingredient[]) {
    if (removedIngredients.length) {
      removedIngredients.forEach(removedIngredient => {
        const index = INGREDIENTS.indexOf(removedIngredient, 0);

        if (index > -1) {
          INGREDIENTS.splice(index, 1);
        }
      });
    }
  }

}
