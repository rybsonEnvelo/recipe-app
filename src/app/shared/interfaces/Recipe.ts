import { Ingredient } from './Ingredient';

export interface Recipe {
  id?: number;
  name: string;
  description: string[];
  ingredients: Ingredient[];
  rating: number;
}
