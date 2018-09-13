import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { Ingredient } from './store/models/ingredient.model';
import { getIngredientEntities, ShoppingFeatureState } from './store/reducers/shopping.reducer';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  ingredients: Observable<Dictionary<Ingredient>>;

  constructor(private store: Store<ShoppingFeatureState>) {
  }

  ngOnInit() {
    this.ingredients = this.store.pipe(
      select(getIngredientEntities)
    );
  }

}
