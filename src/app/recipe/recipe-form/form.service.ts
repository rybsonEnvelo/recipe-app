import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
import { Recipe } from '../../shared/interfaces/Recipe.model';
import { RecipeListService } from '../recipe-list/recipe-list.service';
import { ApiService } from '../../shared/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/interfaces/Ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private recipeRating = new ReplaySubject<number>(1);
  private recipe = new BehaviorSubject<{ name: string; description: string[]; ingredients: Ingredient[] } | null>(null);
  private isReady = new BehaviorSubject<boolean>(false);

  get isReady$() {
    return this.isReady.asObservable();
  }

  constructor(
    private apiService: ApiService,
    private recipeListService: RecipeListService,
    private formBuilder: FormBuilder
  ) {
    this.recipeRating
      .pipe(
        tap(() => this.isReady.next(true)),
        switchMap((recipeRating) => this.addRecipe(this.generateRecipeToPost(recipeRating)))
      )
      .subscribe();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(1600)]],
      ingredients: this.formBuilder.array([this.ingredientFormGroup()]),
    });
  }

  ingredientFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      value: ['', [Validators.required]],
    });
  }

  emitRecipe(emitedRecipe: { name: string; description: string[]; ingredients: Ingredient[] }) {
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

  getUserId(): number {
    console.warn(JSON.parse(localStorage.getItem('user')!).user.id);
    return JSON.parse(localStorage.getItem('user')!).user.id;
  }

  generateRecipeToPost(rating: number) {
    return {
      name: this.recipe.value!.name,
      description: this.recipe.value!.description,
      rating: rating,
      ingredients: this.recipe.value!.ingredients,
      authorId: this.getUserId(),
    };
  }
}
