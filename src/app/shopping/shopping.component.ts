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
    ingredient.amount++;
  }

  onDecrementAmount(ingredient: Ingredient) {
    ingredient.amount--;
  }

  onRemoveIngredient(ingredient: Ingredient) {
    this.shoppingService.removeIngredients(ingredient);
  }

}
