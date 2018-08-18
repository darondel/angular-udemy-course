import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ShoppingService } from './shared/shopping.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {

  ingredientsSubscription: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit() {
    this.ingredientsSubscription = this.shoppingService.getIngredients().subscribe(ingredients => this.ingredients = ingredients);
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
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
