import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subject, switchMap } from 'rxjs';
import { RecipePost } from '../interfaces/RecipePost';
import { RecipeService } from '../recipe-list/recipe.service';
import { RecipeApiService } from '../shared/services/recipe-api.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private recipeApiService: RecipeApiService, private recipeService: RecipeService) {}

  splitToArray(value: string) {
    return value.split('\n');
  }

  addRecipe(recipe: RecipePost) {
    return this.recipeApiService.addRecipe(recipe).pipe(switchMap(() => this.recipeService.getRecipes()));
  }

  generateRecipeToPost(form: FormGroup, formArray: FormArray) {
    return {
      name: form.get('name')!.value,
      description: this.splitToArray(form.get('description')!.value),
      ingredients: formArray.value,
      rating: 5,
    };
  }

  openModal(form: FormGroup, formArray: FormArray) {
    console.log(this.generateRecipeToPost(form, formArray));
  }
}
