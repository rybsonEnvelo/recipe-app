import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, switchMap, tap } from 'rxjs';
import { Ingredient } from '../shared/interfaces/Ingredient';
import { Recipe } from '../shared/interfaces/Recipe';
import { RecipeListService } from '../recipe-list/recipe-list.service';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  recipeRating = new ReplaySubject<number>(1);
  recipe = new BehaviorSubject<{ name: string; description: string[]; ingredients: Ingredient[] } | null>(null);
  rating: number = 0;

  constructor(private apiService: ApiService, private recipeListService: RecipeListService) {
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
    return this.apiService.addRecipe(recipe).pipe(switchMap(() => this.recipeListService.getRecipes()));
  }

  generateRecipeToPost(rating: number) {
    return {
      name: this.recipe.value!.name,
      description: this.recipe.value!.description,
      rating: rating,
      ingredients: this.recipe.value!.ingredients,
    };
  }
}
