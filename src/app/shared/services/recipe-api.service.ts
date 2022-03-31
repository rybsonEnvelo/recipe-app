import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/interfaces/Recipe';
import { RecipePost } from 'src/app/interfaces/RecipePost';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.API_URL}/recipes`);
  }

  addRecipe(recipe: RecipePost) {
    return this.httpClient.post<RecipePost>(`${this.API_URL}/recipes`, recipe);
  }
}
