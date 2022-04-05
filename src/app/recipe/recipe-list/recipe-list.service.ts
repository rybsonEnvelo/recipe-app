import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private apiService: ApiService, private userService: UserService, private router: Router) {
    this.getRecipes().pipe(take(1)).subscribe();
  }

  getRecipes() {
    if (this.userService.getUserRoleFormLocalStorage() === Role.AUTHOR) {
      return this.apiService.getRecipesByUserId(this.userService.getUserIdFormLocalStorage()).pipe(
        tap((recipes) => {
          this.recipes.next(recipes);
        })
      );
    }

    return this.apiService.getRecipes().pipe(
      tap((recipes) => {
        this.recipes.next(recipes);
      })
    );
  }

  filterRecipe(sortOption: string) {
    const [type, order] = sortOption.split(',');

    if (type === 'null') return this.getRecipes().pipe(take(1)).subscribe();

    if (this.userService.getUserRoleFormLocalStorage() === Role.AUTHOR) {
      return this.apiService
        .getFilteredRecipesByUser(this.userService.getUserIdFormLocalStorage(), type, order)
        .pipe(
          tap((e) => e.forEach((x) => console.warn(x))),
          tap((recipes) => this.recipes.next(recipes))
        )
        .pipe(take(1))
        .subscribe();
    }

    return this.apiService
      .getFilteredRecipes(type, order)
      .pipe(
        tap((e) => e.forEach((x) => console.warn(x))),
        tap((recipes) => this.recipes.next(recipes))
      )
      .pipe(take(1))
      .subscribe();
  }

  removeRecipe(id: number) {
    return this.apiService
      .removeRecipe(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['main']);
          this.getRecipes().pipe(take(1)).subscribe(); // Pytanie
        },
      });
  }
}

// w tym momencie pobieram jeszcze raz wszystkie przepisy, czy to dobry pomysł?
// czy lepszym byłoby nadpisanie istniejącej listy z usuniętym jednym elementem.
// Jeśli jak to w jaki sposób to zrobić?
