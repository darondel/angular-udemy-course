import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ImageValidator } from '../../shared/image-validator.directive';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  @ViewChild('imagePreviewButton') imagePreviewButton: ElementRef;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const recipe = <Recipe> data['recipe'];

      this.form = this.formBuilder.group({
        name: [recipe ? recipe.name : '', Validators.required],
        description: recipe ? recipe.description : '',
        imagePath: [recipe ? recipe.imagePath : '', [], ImageValidator.loadable],
        ingredients: this.formBuilder.array([]),
        steps: this.formBuilder.array([])
      });

      if (recipe) {
        if (recipe.ingredients) {
          recipe.ingredients.forEach(ingredient => this.onAddIngredient(ingredient));
        }

        if (recipe.steps) {
          recipe.steps.forEach(step => this.onAddStep(step));
        }
      }
    });
  }

  onSubmit() {
    const id = this.route.snapshot.params['id'];
    const recipe = this.form.value;

    if (id) {
      this.recipeService.updateRecipe(id, recipe).subscribe(updatedRecipe => {
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    } else {
      this.recipeService.addRecipe(recipe).subscribe(recipeId => {
        this.router.navigate(['../' + recipeId], {relativeTo: this.route});
      });
    }
  }

  onImageInput() {
    const imagePreviewButtonElement = this.imagePreviewButton.nativeElement;

    if (imagePreviewButtonElement.getAttribute('aria-expanded') === 'true') {
      imagePreviewButtonElement.click();
    }
  }

  onAddIngredient(ingredient?: Ingredient) {
    (<FormArray> this.form.get('ingredients')).push(this.formBuilder.group({
      name: [ingredient ? ingredient.name : '', Validators.required],
      amount: [ingredient ? ingredient.amount : '', [Validators.required, Validators.min(1)]]
    }));
  }

  onRemoveIngredient(index: number) {
    (<FormArray> this.form.get('ingredients')).removeAt(index);
  }

  onAddStep(step?: string) {
    (<FormArray> this.form.get('steps')).push(this.formBuilder.control(step, Validators.required));
  }

  onRemoveStep(index: number) {
    (<FormArray> this.form.get('steps')).removeAt(index);
  }

  isImagePreviewable(): boolean {
    const imagePathInput = this.form.get('imagePath');

    return imagePathInput.valid && imagePathInput.value;
  }

}
