import { Injectable } from '@angular/core';
import { Subject, take, tap } from 'rxjs';
import { Role } from 'src/app/shared/enums/Role.enum';
import { UserService } from 'src/app/shared/services/user.service';
import { Recipe } from '../../shared/interfaces/Recipe.model';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeListService {
  private recipes = new Subject<Recipe[]>();

  get recipes$() {
    return this.recipes.asObservable();
  }

  constructor(private apiService: ApiService, private userService: UserService) {
    this.getRecipes().pipe(take(1)).subscribe();
  }

  getRecipes() {
    if (this.userService.getUserRoleFormLocalStorage() === Role.AUTHOR) {
      return this.apiService.getRecipesByUserId(this.userService.getUserIdFormLocalStorage()).pipe(
        tap((recipes) => {
          this.recipes.next(recipes);
        })
      );
    } else
      return this.apiService.getRecipes().pipe(
        tap((recipes) => {
          this.recipes.next(recipes);
        })
      );
  }
}
