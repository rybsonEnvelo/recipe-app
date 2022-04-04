import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, delay } from 'rxjs';
import { Recipe } from 'src/app/shared/interfaces/Recipe.model';
import { User } from 'src/app/shared/interfaces/User.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.API_URL}/recipes`);
  }

  addRecipe(recipe: Recipe) {
    return this.httpClient.post<Recipe>(`${this.API_URL}/recipes`, recipe);
  }

  registerUser(user: User) {
    return this.httpClient.post<User>(`${this.API_URL}/register`, user);
  }

  loginUser(user: User) {
    return this.httpClient.post<User>(`${this.API_URL}/login`, user);
  }
}
