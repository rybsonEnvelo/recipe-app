import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/shared/interfaces/Recipe.model';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private recipe = new Subject<Recipe>();

  get recipe$() {
    return this.recipe.asObservable();
  }

  emitRecipe(recipe: Recipe) {
    return this.recipe.next(recipe);
  }
}
