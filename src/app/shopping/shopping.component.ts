import { Component, OnInit } from '@angular/core';

import { select, Store } from "@ngrx/store";
import { Dictionary } from "@ngrx/entity";

import { Observable } from 'rxjs';

import { Ingredient } from './store/models/ingredient.model';
import { DeleteOneFromShopping, UpdateOneFromShopping } from "./store/actions/ingredient.actions";
import { IngredientState, selectEntities } from "./store/reducers/ingredient.reducer";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  ingredients: Observable<Dictionary<Ingredient>>;

  constructor(private store: Store<IngredientState>) {
  }

  ngOnInit() {
    this.ingredients = this.store.pipe(
      select(selectEntities)
    );
  }

  onIncrementAmount(id: string, ingredient: Ingredient) {
    this.store.dispatch(new UpdateOneFromShopping(id, {amount: ingredient.amount + 1}));
  }

  onDecrementAmount(id: string, ingredient: Ingredient) {
    this.store.dispatch(new UpdateOneFromShopping(id, {amount: ingredient.amount - 1}));
  }

  onRemoveIngredient(id: string) {
    this.store.dispatch(new DeleteOneFromShopping(id));
  }

}
