import { Component, Input, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { DeleteOneFromRecipeItem } from '../store/actions/recipe.actions';
import { Recipe } from '../store/models/recipe.model';
import { RecipesFeatureState } from '../store/reducers/recipes.reducer';
import { isAuthUserAuthenticated } from '../../app.reducers';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() id: string;
  @Input() recipe: Recipe;

  isUserAuthenticated: Observable<boolean>;

  constructor(private store: Store<RecipesFeatureState>) {
  }

  ngOnInit() {
    this.isUserAuthenticated = this.store.pipe(
      select(isAuthUserAuthenticated)
    );
  }

  onImageError(event) {
    event.target.src = 'http://epaper.gujaratimidday.com/images/no_image_thumb.gif';
  }

  onDelete() {
    this.store.dispatch(new DeleteOneFromRecipeItem(this.id));
  }

}
