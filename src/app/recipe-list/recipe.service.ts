import { Injectable } from '@angular/core';
import { RecipeApiService } from '../shared/services/recipe-api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private recipeApiService: RecipeApiService) {}

  getRecipes() {
    return this.getRecipesById();
  }

  getRecipesById() {
    return this.recipeApiService.getRecipesById();
  }
}
