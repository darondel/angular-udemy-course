import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from "@ngrx/store";

import { Recipe } from '../shared/recipe.model';
import { Upsert } from "../../shopping/store/actions/ingredient.actions";
import { IngredientState } from "../../shopping/store/reducers/ingredient.reducer";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;

  constructor(private route: ActivatedRoute, private store: Store<IngredientState>) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => this.recipe = data['recipe']);
  }

  onToShoppingList() {
    const ingredients = this.recipe.ingredients;

    if (ingredients.length) {
      ingredients.forEach(ingredient => this.store.dispatch(new Upsert(ingredient)));
    }
  }

}
