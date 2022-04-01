import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/interfaces/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.API_URL}/recipes`);
  }

  addRecipe(recipe: Recipe) {
    return this.httpClient.post<Recipe>(`${this.API_URL}/recipes`, recipe);
  }
}
