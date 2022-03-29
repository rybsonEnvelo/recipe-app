import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  private API_URL: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  getRecipesById() {
    return this.httpClient.get<Recipe[]>(`${this.API_URL}/recipes`);
  }
}
