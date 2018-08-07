import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;

  constructor(private route: ActivatedRoute, private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => this.recipe = data['recipe']);
  }

  onToShoppingList() {
    this.shoppingListService.addIngredients(...this.recipe.ingredients);
  }

}
