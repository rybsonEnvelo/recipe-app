import { Ingredient } from './Ingredient';

export interface Recipe {
  id: number;
  name: string;
  details: string[];
  ingredients: Ingredient[];
  rating: number;
}
