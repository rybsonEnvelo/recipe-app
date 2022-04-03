import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
import { Recipe } from '../shared/interfaces/Recipe';
import { RecipeListService } from '../recipe-list/recipe-list.service';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private recipeRating = new ReplaySubject<number>(1);
  private recipe = new BehaviorSubject<Recipe | null>(null);
  private isReady = new BehaviorSubject<boolean>(false);

  get isReady$() {
    return this.isReady.asObservable();
  }

  constructor(private apiService: ApiService, private recipeListService: RecipeListService) {
    this.recipeRating
      .pipe(
        tap(() => this.isReady.next(true)),
        switchMap((recipeRating) => this.addRecipe(this.generateRecipeToPost(recipeRating)))
      )
      .subscribe();
  }

  emitRecipe(emitedRecipe: Recipe) {
    this.recipe.next(emitedRecipe);
  }

  emitRecipeRating(emitedRating: number) {
    this.recipeRating.next(emitedRating);
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
