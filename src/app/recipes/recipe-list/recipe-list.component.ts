import { Component, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

import { select, Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadAllFromRecipeList } from '../store/actions/recipe.actions';
import { Recipe } from '../store/models/recipe.model';
import { getRecipeEntities, RecipesFeatureState } from '../store/reducers/recipes.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [
    trigger('recipeItemsAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(-25px)'}),
          stagger('250ms', animate('550ms ease-in', style({opacity: 1, transform: 'translateY(0)'})))
        ], {optional: true}),
        query(':leave', animate('300ms ease-out', style({opacity: 0})), {optional: true})
      ])
    ])
  ]
})
export class RecipeListComponent implements OnInit {

  recipes: Observable<Dictionary<Recipe>>;
  recipesTotal: number;

  constructor(private store: Store<RecipesFeatureState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadAllFromRecipeList());
    this.recipes = this.store.pipe(
      select(getRecipeEntities),
      tap(recipes => this.recipesTotal = Object.entries(recipes).length)
    );
  }

  /**
   * Track recipes in an iterable.
   *
   * @param index the index of the recipe in the iterable
   * @param recipe the recipe
   * @return the track id of the recipe
   */
  trackRecipe(index: number, recipe: { key: string, value: Recipe }): any {
    return recipe.key;
  }

}
