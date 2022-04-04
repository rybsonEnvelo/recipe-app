import { Ingredient } from './Ingredient.model';

export interface Recipe {
  id?: number;
  name: string;
  description: string[];
  ingredients: Ingredient[];
  rating?: number;
}
