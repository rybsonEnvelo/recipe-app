import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/Recipe.model';
import { User } from 'src/app/shared/interfaces/User.model';
import { AuthObject } from '../interfaces/AuthObject.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnDestroy {
  private API_URL: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  ngOnDestroy(): void {
    console.error('destroyed');
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.API_URL}/recipes`);
  }

  getRecipeById(id: number) {
    return this.httpClient.get<Recipe>(`${this.API_URL}/recipes?id=${id}`);
  }

  getRecipesByUserId(id: number) {
    return this.httpClient.get<Recipe[]>(`${this.API_URL}/recipes?authorId=${id}`);
  }

  getFilteredRecipesByUser(id: number, type: string, order: string) {
    return this.httpClient.get<Recipe[]>(`${this.API_URL}/recipes?authorId=${id}&_sort=${type}&_order=${order}`);
  }

  getFilteredRecipes(type: string, order: string) {
    return this.httpClient.get<Recipe[]>(`${this.API_URL}/recipes?_sort=${type}&_order=${order}`);
  }

  addRecipe(recipe: Recipe) {
    return this.httpClient.post<Recipe>(`${this.API_URL}/recipes`, recipe);
  }

  removeRecipe(id: number) {
    return this.httpClient.delete(`${this.API_URL}/recipes/${id}`);
  }

  registerUser(user: User) {
    return this.httpClient.post<User>(`${this.API_URL}/register`, user);
  }

  loginUser(user: User) {
    return this.httpClient.post<AuthObject>(`${this.API_URL}/login`, user);
  }
}
