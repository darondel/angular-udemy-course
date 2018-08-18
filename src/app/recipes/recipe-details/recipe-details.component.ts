import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../shared/recipe.model';
import { ShoppingService } from '../../shopping/shared/shopping.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;

  constructor(private route: ActivatedRoute, private shoppingService: ShoppingService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => this.recipe = data['recipe']);
  }

  onToShoppingList() {
    this.shoppingService.addIngredients(...this.recipe.ingredients);
  }

}
