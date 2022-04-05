import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Recipe } from 'src/app/shared/interfaces/Recipe.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private recipe = new Subject<Recipe>();

  get recipe$() {
    return this.recipe.asObservable();
  }

  constructor(private apiService: ApiService) {}

  emitRecipe(recipe: Recipe) {
    console.log('TAAAK');
    console.log(recipe);
    return this.recipe.next(recipe);
  }

  getSingleRecipe(id: number) {
    console.warn('start');
    return this.apiService
      .getRecipeById(id)
      .pipe(tap(console.warn))
      .subscribe((arr) => this.recipe.next(arr[0]));
  }
}
