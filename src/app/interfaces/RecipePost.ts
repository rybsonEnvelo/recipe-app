import { Ingredient } from './Ingredient';

export interface RecipePost {
  name: string;
  description: string[];
  ingredients: Ingredient[];
  rating: number;
}
