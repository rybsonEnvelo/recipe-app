import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, switchMap, tap } from 'rxjs';
import { Ingredient } from '../interfaces/Ingredient';
import { Recipe } from '../interfaces/Recipe';
import { RecipeService } from '../recipe-list/recipe.service';
import { RecipeApiService } from '../shared/services/recipe-api.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  recipeRating = new ReplaySubject<number>(1);
  recipe = new BehaviorSubject<{ name: string; description: string[]; ingredients: Ingredient[] } | null>(null);
  rating: number = 0;

  constructor(private recipeApiService: RecipeApiService, private recipeService: RecipeService) {
    this.recipeRating
      .pipe(
        tap(console.warn),
        switchMap((recipeRating) => this.addRecipe(this.generateRecipeToPost(recipeRating)))
      )
      .subscribe();
  }

  splitToArray(value: string) {
    return value.split('\n');
  }

  addRecipe(recipe: Recipe) {
    return this.recipeApiService.addRecipe(recipe).pipe(switchMap(() => this.recipeService.getRecipes()));
  }

  generateRecipeToPost(rating: number) {
    return {
      name: this.recipe.value!.name,
      description: this.recipe.value!.description,
      rating: rating,
      ingredients: this.recipe.value!.ingredients,
      id: 0,
    };
  }
}