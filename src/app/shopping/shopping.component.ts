import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ShoppingService } from './shared/shopping.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  ingredients: Observable<Ingredient[]>;

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
  }

  onIncrementAmount(ingredient: Ingredient) {
    this.shoppingService.addIngredients({
      name: ingredient.name,
      amount: 1
    });
  }

  onDecrementAmount(ingredient: Ingredient) {
    this.shoppingService.addIngredients({
      name: ingredient.name,
      amount: -1
    });
  }

  onRemoveIngredient(ingredient: Ingredient) {
    this.shoppingService.removeIngredients(ingredient);
  }

}
