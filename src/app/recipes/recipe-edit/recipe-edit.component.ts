import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../shared/recipe.service';
import { Ingredient } from '../../shopping/store/models/ingredient.model';
import { ImageValidator } from '../../shared/image-validator.directive';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  @ViewChild('imagePreviewButton') imagePreviewButton: ElementRef;

  form: FormGroup;
  ingredients: FormArray;
  steps: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const recipe = <Recipe> data['recipe'];

      this.ingredients = this.formBuilder.array([]);
      this.steps = this.formBuilder.array([]);

      this.form = this.formBuilder.group({
        name: [recipe ? recipe.name : '', Validators.required],
        description: recipe ? recipe.description : '',
        imagePath: [recipe ? recipe.imagePath : '', [], ImageValidator.loadable],
        ingredients: this.ingredients,
        steps: this.steps
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

  /**
   * Submit the form.
   */
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

  /**
   * Display the image preview.
   */
  onImageInput() {
    const imagePreviewButtonElement = this.imagePreviewButton.nativeElement;

    if (imagePreviewButtonElement.getAttribute('aria-expanded') === 'true') {
      imagePreviewButtonElement.click();
    }
  }

  /**
   * Add an ingredient to the form.
   *
   * @param ingredient the ingredient to fill in
   */
  onAddIngredient(ingredient?: Ingredient) {
    this.ingredients.push(this.formBuilder.group({
      name: [ingredient ? ingredient.name : '', Validators.required],
      amount: [ingredient ? ingredient.amount : '', [Validators.required, Validators.min(1)]]
    }));
  }

  /**
   * Remove an ingredient from the form.
   *
   * @param index the index of the ingredient in the form
   */
  onRemoveIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  /**
   * Add a step to the form.
   *
   * @param step the step to fill in
   */
  onAddStep(step?: string) {
    this.steps.push(this.formBuilder.control(step, Validators.required));
  }

  /**
   * Remove a step from the form.
   *
   * @param index the index of the step in the form
   */
  onRemoveStep(index: number) {
    this.steps.removeAt(index);
  }

  /**
   * Check if the image can be previewed.
   *
   * @return true if the image can be previewed, false otherwise
   */
  isImagePreviewable(): boolean {
    const imagePathInput = this.form.get('imagePath');

    return imagePathInput.valid && imagePathInput.value;
  }

}
