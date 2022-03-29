import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../interfaces/Recipe';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private recipeSubject = new Subject<Recipe>();

  constructor() {}

  emitRecipe(recipe: Recipe) {
    return this.recipeSubject.next(recipe);
  }

  captureRecipe() {
    return this.recipeSubject.asObservable();
  }
}
