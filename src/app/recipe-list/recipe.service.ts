import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, take, tap } from 'rxjs';
import { Recipe } from '../interfaces/Recipe';
import { RecipePost } from '../interfaces/RecipePost';
import { RecipeApiService } from '../shared/services/recipe-api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes$ = new Subject<Recipe[]>();

  constructor(private recipeApiService: RecipeApiService) {
    this.getRecipes().pipe(take(1)).subscribe();
  }

  getRecipes() {
    return this.recipeApiService.getRecipes().pipe(
      tap((recipes) => {
        this.recipes$.next(recipes);
      })
    );
  }

  addRecipe(recipe: RecipePost) {
    return this.recipeApiService.addRecipe(recipe).pipe(switchMap(() => this.getRecipes()));
  }
}
