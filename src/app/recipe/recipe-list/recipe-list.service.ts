import { Injectable } from '@angular/core';
import { Subject, take, tap } from 'rxjs';
import { Recipe } from '../../shared/interfaces/Recipe.model';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeListService {
  private recipes = new Subject<Recipe[]>();

  get recipes$() {
    return this.recipes.asObservable();
  }

  constructor(private apiService: ApiService) {
    this.getRecipes().pipe(take(1)).subscribe();
  }

  getRecipes() {
    return this.apiService.getRecipes().pipe(
      tap((recipes) => {
        this.recipes.next(recipes);
      })
    );
  }
}
