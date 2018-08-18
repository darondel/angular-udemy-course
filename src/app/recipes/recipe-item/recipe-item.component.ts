import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() id: string;
  @Input() recipe: Recipe;

  constructor(private router: Router, private recipeService: RecipeService) {
  }

  ngOnInit() {
  }

  onImageError(event) {
    event.target.src = 'http://epaper.gujaratimidday.com/images/no_image_thumb.gif';
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id).subscribe();

    if (this.router.url.startsWith('/recipes/' + this.id)) {
      this.router.navigate(['/recipes']);
    }
  }

}
