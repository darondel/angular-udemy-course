import { Component, OnInit } from '@angular/core';

import { select, Store } from "@ngrx/store";

import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { Delete, Update } from "./store/actions/ingredient.actions";
import { IngredientState, selectAll } from "./store/reducers/ingredient.reducer";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  ingredients: Observable<Ingredient[]>;

  constructor(private store: Store<IngredientState>) {
  }

  ngOnInit() {
    this.ingredients = this.store.pipe(
      select(selectAll)
    );
  }

  onIncrementAmount(ingredient: Ingredient) {
    this.store.dispatch(new Update('TODO', {amount: ingredient.amount + 1}));
  }

  onDecrementAmount(ingredient: Ingredient) {
    this.store.dispatch(new Update('TODO', {amount: ingredient.amount - 1}));
  }

  onRemoveIngredient(ingredient: Ingredient) {
    this.store.dispatch(new Delete('TODO'));
  }

}
