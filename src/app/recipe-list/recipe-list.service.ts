import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, take, tap } from 'rxjs';
import { Recipe } from '../shared/interfaces/Recipe';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeListService {
  recipes$ = new Subject<Recipe[]>();

  constructor(private apiService: ApiService) {
    this.getRecipes().pipe(take(1)).subscribe();
  }

  getRecipes() {
    return this.apiService.getRecipes().pipe(
      tap((recipes) => {
        this.recipes$.next(recipes);
      })
    );
  }
}
