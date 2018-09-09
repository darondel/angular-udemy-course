import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { LoadAllFromRecipeList } from '../store/actions/recipe.actions';
import { Recipe } from '../store/models/recipe.model';
import { getRecipeEntities, RecipesFeatureState } from '../store/reducers/recipes.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Observable<Dictionary<Recipe>>;

  constructor(private store: Store<RecipesFeatureState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadAllFromRecipeList());
    this.recipes = this.store.pipe(
      select(getRecipeEntities)
    );
  }

}
