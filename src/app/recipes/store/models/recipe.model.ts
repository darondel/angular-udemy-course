import { Ingredient } from '../../../shopping/store/models/ingredient.model';

export interface Recipe {

  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
  steps: string[];

}
