import { Component, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

import { select, Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Ingredient } from './store/models/ingredient.model';
import { getIngredientEntities, ShoppingFeatureState } from './store/reducers/shopping.reducer';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  animations: [
    trigger('shoppingListAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0}),
          stagger(100, animate('.5s', style({opacity: 1})))
        ], {optional: true}),
        query(':leave', stagger(100, animate('.5s', style({opacity: 1}))), {optional: true})
      ])
    ])
  ]
})
export class ShoppingComponent implements OnInit {

  ingredients: Observable<Dictionary<Ingredient>>;
  ingredientsTotal: number;

  constructor(private store: Store<ShoppingFeatureState>) {
  }

  ngOnInit() {
    this.ingredients = this.store.pipe(
      select(getIngredientEntities),
      tap(ingredients => this.ingredientsTotal = Object.entries(ingredients).length)
    );
  }

}
