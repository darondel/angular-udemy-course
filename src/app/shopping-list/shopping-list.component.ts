import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredientsSubscription: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredientsSubscription = this.shoppingListService.getIngredients().subscribe(ingredients => this.ingredients = ingredients);
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
    this.shoppingListService.removeIngredients(ingredient);
  }

}
